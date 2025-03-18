import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import { PictureAsPdf } from '@mui/icons-material';
import { formatNumberToUS } from "../utils/format";

const BalanceSheetDownloadPDF = ({ data, companyName, date, dateFormat, size, username }) => {

  function capitalizeText(text) {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function generateBalanceSheetPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 10;
    const rightMargin = 10;
    let currentY = 20;

    const styles = {
      marginBottom: 15,
      lineHeight: 7,
      mainSectionHeader: {
        height: 10,
        color: [0, 51, 102],
        bgColor: [230, 230, 250]
      },
      subSectionHeader: {
        height: 8,
        color: [34, 139, 34],
        bgColor: [240, 240, 240]
      },
      categoryIndent: 15
    };

    const checkPageBreak = (neededHeight) => {
      if (currentY + neededHeight > pageHeight - styles.marginBottom) {
        doc.addPage();
        currentY = 20;
      }
    };

    const addText = (text, x, options = {}, addHeight = styles.lineHeight) => {
      checkPageBreak(addHeight);
      doc.text(text, x, currentY, options);
      currentY += addHeight;
    };

    const drawLine = (y) => {
      doc.setDrawColor(0, 0, 0);
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
    };

    doc.setFontSize(8);
    doc.text(
      `Report run by ${username} at ${new Date().toLocaleString('en-GB')}`,
      pageWidth - rightMargin,
      10,
      { align: "right" }
    );

    doc.setFontSize(18);
    doc.setTextColor(...styles.mainSectionHeader.color);
    addText(companyName, pageWidth / 2, { align: "center" }, styles.lineHeight + 2);

    doc.setFontSize(16);
    addText("Balance Sheet", pageWidth / 2, { align: "center" });

    doc.setFontSize(12);
    addText(
      `For duration between ${getDateValue(date.startDate, dateFormat)} - ${getDateValue(date.endDate, dateFormat)}`,
      pageWidth / 2,
      { align: "center" }
    );
    currentY += 4;

    const extractStructuredData = (balanceSheetData) => {
      const structuredData = [];
      
      for (const mainSectionKey in balanceSheetData) {
        const mainSection = balanceSheetData[mainSectionKey];
        const mainSectionObj = {
          name: capitalizeText(mainSectionKey.replace(/_/g, ' ')),
          subsections: [],
          total: mainSection.open_balance
        };

        for (const subSectionKey in mainSection) {
          const subSection = mainSection[subSectionKey];
          if (subSection.type === 'detailType') {
            const subSectionObj = {
              name: capitalizeText(subSectionKey.replace(/_/g, ' ')),
              categories: [],
              total: subSection.open_balance
            };

            for (const categoryKey in subSection) {
              const category = subSection[categoryKey];
              if (category.type === 'subDetailType') {
                subSectionObj.categories.push({
                  name: capitalizeText(categoryKey.replace(/_/g, ' ')),
                  value: category.open_balance
                });
              }
            }

            mainSectionObj.subsections.push(subSectionObj);
          }
        }

        structuredData.push(mainSectionObj);
      }
      
      return structuredData;
    };

    const structuredData = extractStructuredData(data.balance_sheet);

    const renderSection = (section) => {
      checkPageBreak(styles.mainSectionHeader.height + 4);
      doc.setFillColor(...styles.mainSectionHeader.bgColor);
      doc.rect(leftMargin, currentY, pageWidth - leftMargin - rightMargin, styles.mainSectionHeader.height, "F");
      doc.setFontSize(14);
      doc.setTextColor(...styles.mainSectionHeader.color);
      doc.text(section.name, leftMargin + 2, currentY + styles.mainSectionHeader.height - 2);
      currentY += styles.mainSectionHeader.height;

      section.subsections.forEach(subSection => {
        checkPageBreak(styles.subSectionHeader.height + 8);
        doc.setFillColor(...styles.subSectionHeader.bgColor);
        doc.rect(leftMargin, currentY, pageWidth - leftMargin - rightMargin, styles.subSectionHeader.height, "F");
        doc.setFontSize(12);
        doc.setTextColor(...styles.subSectionHeader.color);
        doc.text(subSection.name, leftMargin + 5, currentY + styles.subSectionHeader.height - 2);
        currentY += styles.subSectionHeader.height + 4;

        subSection.categories.forEach(category => {
          checkPageBreak(styles.lineHeight + 4);
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);
          
          doc.text(category.name, leftMargin + styles.categoryIndent, currentY);
          
          const formattedValue = formatNumberToUS(category.value);
          doc.text(
            category.value < 0 ? `${formattedValue}` : formattedValue,
            pageWidth - rightMargin,
            currentY,
            { align: "right" }
          );
          
          currentY += styles.lineHeight;
        });

        checkPageBreak(styles.lineHeight);
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0);
        doc.text(`Total ${subSection.name}`, leftMargin + 5, currentY);
        doc.text(
          formatNumberToUS(subSection.total),
          pageWidth - rightMargin,
          currentY,
          { align: "right" }
        );
        drawLine(currentY + 2);
        currentY += 10;
      });

      checkPageBreak(styles.lineHeight);
      doc.setFontSize(12);
      doc.setTextColor(...styles.mainSectionHeader.color);
      doc.text(`Total ${section.name}`, leftMargin, currentY);
      doc.text(
        formatNumberToUS(section.total),
        pageWidth - rightMargin,
        currentY,
        { align: "right" }
      );
      drawLine(currentY + 2);
      currentY += 12;
    };

    structuredData.forEach(section => renderSection(section));

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text("eazeaccount", leftMargin, pageHeight - 5);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - rightMargin, pageHeight - 5, { align: 'right' });
    }

    doc.save('balance_sheet.pdf');
  }

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width: '200px' }} size={size} onClick={generateBalanceSheetPDF}>
      <PictureAsPdf sx={{ marginRight: "10px", padding: "2px 5px" }} /> Download PDF
    </Button>
  );
};

export default BalanceSheetDownloadPDF;
