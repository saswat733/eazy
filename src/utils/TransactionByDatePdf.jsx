import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import { PictureAsPdf } from '@mui/icons-material';
import { formatNumberToUS } from '../utils/format';

const TransactionByDateDownloadPDF = ({ data, companyName, dateFormat, size, username }) => {
  // Extract transactions from the API response.
  const transactions = data.data.rows;

  const generateTransactionPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Margins and layout
    const leftMargin = 10;
    const rightMargin = 10;
    let currentY = 20;
    const rowHeight = 20; // Height for each row of data
    const fontSize = 10; // Base font size for table rows

    // Column positions (in mm from the left edge):
    // Adjust as needed to fit your data.
    const colDate = 10;
    const colAccountName = 35;
    const colAccountCode = 80;
    const colType = 100;
    const colDescription = 125;
    const colDebit = 165;
    const colCredit = 200;

    // Helper to truncate text to avoid overlap
    // maxLength is how many characters you allow before truncation.
    const truncateText = (text = "", maxLength = 15) => {
      return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
    };

    // Header Section
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(
      `Report run by ${username} at ${new Date().toLocaleString('en-GB')}`,
      pageWidth - rightMargin,
      10,
      { align: "right" }
    );

    // Company Name
    doc.setFontSize(16);
    doc.text(companyName, pageWidth / 2, currentY, { align: "center" });
    currentY += rowHeight;

    // Report Title
    doc.setFontSize(14);
    doc.text("Transaction by Date Report", pageWidth / 2, currentY, { align: "center" });
    currentY += rowHeight;

    // Table Header
    doc.setFontSize(fontSize);
    doc.text("Date", colDate, currentY);
    doc.text("Account", colAccountName, currentY);
    doc.text("Code", colAccountCode, currentY);
    doc.text("Type", colType, currentY);
    doc.text("Description", colDescription, currentY);
    doc.text("Debit", colDebit, currentY, { align: "right" });
    doc.text("Credit", colCredit, currentY, { align: "right" });

    currentY += rowHeight - 1; // Move down for the line
    doc.setDrawColor(0, 0, 0);
    doc.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
    currentY += 5;

    // Set font for data rows
    doc.setFontSize(fontSize);

    // Render each transaction as a row
    transactions.forEach((tx) => {
      // Check page break
      if (currentY + rowHeight > pageHeight - 15) {
        doc.addPage();
        currentY = 20;
      }

      const txDate = getDateValue(tx.date, dateFormat);
      const accountName = truncateText(tx.account_name, 15);
      const accountCode = truncateText(tx.account_code, 8);
      const type = truncateText(tx.type, 10);
      const description = truncateText(tx.description, 20);
      const debit = tx.debit ? formatNumberToUS(parseFloat(tx.debit)) : "";
      const credit = tx.credit ? formatNumberToUS(parseFloat(tx.credit)) : "";

      // Print each column
      doc.text(txDate, colDate, currentY);
      doc.text(accountName, colAccountName, currentY);
      doc.text(accountCode, colAccountCode, currentY);
      doc.text(type, colType, currentY);
      doc.text(description, colDescription, currentY);
      doc.text(debit, colDebit, currentY, { align: "right" });
      doc.text(credit, colCredit, currentY, { align: "right" });

      currentY += rowHeight;
    });

    // Footer with page numbering
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text("eazeaccount", leftMargin, pageHeight - 5);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - rightMargin, pageHeight - 5, { align: "right" });
    }

    // Save the PDF
    doc.save("transaction_by_date_report.pdf");
  };

  return (
    <Button
      sx={{ backgroundColor: '#d3d3d3', width: '200px' }}
      size={size}
      onClick={generateTransactionPDF}
    >
      <PictureAsPdf sx={{ marginRight: "10px", padding: "2px 5px" }} />
      Download PDF
    </Button>
  );
};

export default TransactionByDateDownloadPDF;
