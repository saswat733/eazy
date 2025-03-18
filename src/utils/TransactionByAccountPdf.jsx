import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import { PictureAsPdf } from '@mui/icons-material';

const TransactionByAccountPDF = ({ data, companyName, date, dateFormat, size, username }) => {
  function generateTransactionByAccountPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 10;
    const rightMargin = 10;
    let currentY = 20;
    const lineHeight = 7;

    // Helper: Check for page break
    const checkPageBreak = (neededHeight) => {
      if (currentY + neededHeight > pageHeight - 20) {
        doc.addPage();
        currentY = 20;
      }
    };

    // Header Section
    doc.setFontSize(8);
    doc.text(`Report run by ${username} at ${new Date().toLocaleString('en-GB')}`, pageWidth - rightMargin, 10, { align: "right" });
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text(companyName, pageWidth / 2, currentY, { align: "center" });
    currentY += lineHeight + 2;
    doc.setFontSize(16);
    doc.text("Transaction by Account Report", pageWidth / 2, currentY, { align: "center" });
    currentY += lineHeight;
    doc.setFontSize(12);
    doc.text(`For duration between ${getDateValue(date.startDate, dateFormat)} - ${getDateValue(date.endDate, dateFormat)}`, pageWidth / 2, currentY, { align: "center" });
    currentY += lineHeight + 4;

    // Loop through each account in the report
    data.forEach((account) => {
      // Account header
      checkPageBreak(10);
      doc.setFontSize(14);
      doc.setTextColor(34, 139, 34);
      doc.text(`${account.name} (Code: ${account.account_code})`, leftMargin, currentY);
      currentY += lineHeight;

      // If transactions exist for the account, render table headers and rows
      if (account.transactions && account.transactions.length > 0) {
        // Table Headers
        checkPageBreak(10);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("Date", leftMargin, currentY);
        doc.text("Type", leftMargin + 30, currentY);
        doc.text("Description", leftMargin + 70, currentY);
        doc.text("Debit", pageWidth - rightMargin - 40, currentY, { align: "right" });
        doc.text("Credit", pageWidth - rightMargin, currentY, { align: "right" });
        currentY += lineHeight;
        // Draw a separator line
        doc.setDrawColor(0, 0, 0);
        doc.line(leftMargin, currentY, pageWidth - rightMargin, currentY);
        currentY += 2;

        // Transaction rows
        account.transactions.forEach((tran) => {
          checkPageBreak(lineHeight);
          doc.setFontSize(10);
          // Date and type
          doc.text(tran.date, leftMargin, currentY);
          doc.text(tran.type, leftMargin + 30, currentY);
          // Description (trim if too long)
          let description = tran.description ? tran.description : "";
          if (description.length > 40) {
            description = description.substring(0, 40) + '...';
          }
          doc.text(description, leftMargin + 70, currentY);
          // Debit and Credit (formatted as currency)
          const formattedDebit = tran.debit ? `$${parseFloat(tran.debit).toFixed(2)}` : "";
          const formattedCredit = tran.credit ? `$${parseFloat(tran.credit).toFixed(2)}` : "";
          doc.text(formattedDebit, pageWidth - rightMargin - 40, currentY, { align: "right" });
          doc.text(formattedCredit, pageWidth - rightMargin, currentY, { align: "right" });
          currentY += lineHeight;
        });
      } else {
        // No transactions message
        checkPageBreak(lineHeight);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text("No transactions available", leftMargin, currentY);
        currentY += lineHeight;
      }
      // Add spacing between accounts
      currentY += 5;
    });

    // Footer with page numbering
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text("eazeaccount", leftMargin, pageHeight - 5);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - rightMargin, pageHeight - 5, { align: 'right' });
    }

    // Save the PDF file
    doc.save('transaction_by_account_report.pdf');
  }

  return (
    <Button
      sx={{ backgroundColor: '#d3d3d3', width: '200px' }}
      size={size}
      onClick={generateTransactionByAccountPDF}
    >
      <PictureAsPdf sx={{ marginRight: "10px", padding: "2px 5px" }} />
      Download PDF
    </Button>
  );
};

export default TransactionByAccountPDF;
