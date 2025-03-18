import React from 'react';
import { jsPDF } from 'jspdf';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import { PictureAsPdf } from '@mui/icons-material';
import { formatNumberToUS } from '../utils/format';

const BalanceSheetComparisonDownloadPDF = ({ data, companyName, dateFormat, size, username }) => {
  const period1 = data[0];
  const period2 = data[1];

  function capitalizeText(text) {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  function generateComparisonPDF() {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftMargin = 10;
    const rightMargin = 10;
    let currentY = 20;

    // Column positions for numeric values
    const period1X = pageWidth * 0.55;
    const period2X = pageWidth * 0.75;
    const differenceX = pageWidth - rightMargin;

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

    const drawLine = (y) => {
      doc.setDrawColor(0, 0, 0);
      doc.line(leftMargin, y, pageWidth - rightMargin, y);
    };

    // Header Section
    doc.setFontSize(8);
    doc.text(
      `Report run by ${username} at ${new Date().toLocaleString('en-GB')}`,
      pageWidth - rightMargin,
      10,
      { align: "right" }
    );

    doc.setFontSize(18);
    doc.setTextColor(...styles.mainSectionHeader.color);
    doc.text(companyName, pageWidth / 2, currentY, { align: "center" });
    currentY += 10;

    doc.setFontSize(16);
    doc.text("Balance Sheet Comparison", pageWidth / 2, currentY, { align: "center" });
    currentY += 10;

    doc.setFontSize(12);
    const period1Date = `${getDateValue(period1.start_date, dateFormat)} - ${getDateValue(period1.end_date, dateFormat)}`;
    const period2Date = `${getDateValue(period2.start_date, dateFormat)} - ${getDateValue(period2.end_date, dateFormat)}`;
    doc.text(`Comparing ${period1Date} vs ${period2Date}`, pageWidth / 2, currentY, { align: "center" });
    currentY += 15;

    // Column Headers
    doc.setFontSize(10);
    doc.text("Period 1", period1X, currentY, { align: "right" });
    doc.text("Period 2", period2X, currentY, { align: "right" });
    doc.text("Difference", differenceX, currentY, { align: "right" });
    currentY += 10;
    drawLine(currentY);
    currentY += 5;

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

    const structuredData1 = extractStructuredData(period1.data.balance_sheet);
    const structuredData2 = extractStructuredData(period2.data.balance_sheet);

    const renderComparisonSection = (section1, section2) => {
      // Main Section Header
      checkPageBreak(styles.mainSectionHeader.height + 4);
      doc.setFillColor(...styles.mainSectionHeader.bgColor);
      doc.rect(leftMargin, currentY, pageWidth - leftMargin - rightMargin, styles.mainSectionHeader.height, "F");
      doc.setFontSize(14);
      doc.setTextColor(...styles.mainSectionHeader.color);
      doc.text(section1.name, leftMargin + 2, currentY + styles.mainSectionHeader.height - 2);
      currentY += styles.mainSectionHeader.height;

      // Sub-sections
      section1.subsections.forEach((subSection1, subIndex) => {
        const subSection2 = section2.subsections[subIndex];
        
        // Sub-section Header
        checkPageBreak(styles.subSectionHeader.height + 8);
        doc.setFillColor(...styles.subSectionHeader.bgColor);
        doc.rect(leftMargin, currentY, pageWidth - leftMargin - rightMargin, styles.subSectionHeader.height, "F");
        doc.setFontSize(12);
        doc.setTextColor(...styles.subSectionHeader.color);
        doc.text(subSection1.name, leftMargin + 5, currentY + styles.subSectionHeader.height - 2);
        currentY += styles.subSectionHeader.height + 4;

        // Categories
        subSection1.categories.forEach((category1, catIndex) => {
          const category2 = subSection2.categories[catIndex];
          checkPageBreak(styles.lineHeight + 4);
          doc.setFontSize(10);
          doc.setTextColor(0, 0, 0);

          // Category Name
          doc.text(category1.name, leftMargin + styles.categoryIndent, currentY);

          // Values using formatNumberToUS
          const value1 = category1.value;
          const value2 = category2.value;
          const difference = value2 - value1;

          doc.text(formatNumberToUS(value1), period1X, currentY, { align: "right" });
          doc.text(formatNumberToUS(value2), period2X, currentY, { align: "right" });
          doc.text(formatNumberToUS(difference), differenceX, currentY, { align: "right" });

          currentY += styles.lineHeight;
        });

        // Sub-section Total
        checkPageBreak(styles.lineHeight);
        doc.setFontSize(10);
        const total1 = subSection1.total;
        const total2 = subSection2.total;
        const totalDiff = total2 - total1;

        doc.text(`Total ${subSection1.name}`, leftMargin + 5, currentY);
        doc.text(formatNumberToUS(total1), period1X, currentY, { align: "right" });
        doc.text(formatNumberToUS(total2), period2X, currentY, { align: "right" });
        doc.text(formatNumberToUS(totalDiff), differenceX, currentY, { align: "right" });
        
        drawLine(currentY + 2);
        currentY += 10;
      });

      // Main Section Total
      checkPageBreak(styles.lineHeight);
      doc.setFontSize(12);
      const sectionTotal1 = section1.total;
      const sectionTotal2 = section2.total;
      const sectionTotalDiff = sectionTotal2 - sectionTotal1;

      doc.setTextColor(...styles.mainSectionHeader.color);
      doc.text(`Total ${section1.name}`, leftMargin, currentY);
      doc.text(formatNumberToUS(sectionTotal1), period1X, currentY, { align: "right" });
      doc.text(formatNumberToUS(sectionTotal2), period2X, currentY, { align: "right" });
      doc.text(formatNumberToUS(sectionTotalDiff), differenceX, currentY, { align: "right" });
      
      drawLine(currentY + 2);
      currentY += 12;
    };

    // Render all sections
    structuredData1.forEach((section1, index) => {
      renderComparisonSection(section1, structuredData2[index]);
    });

    // Footer
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.text("eazeaccount", leftMargin, pageHeight - 5);
      doc.text(`Page ${i} of ${pageCount}`, pageWidth - rightMargin, pageHeight - 5, { align: 'right' });
    }

    doc.save('balance_sheet_comparison.pdf');
  }

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width: '200px' }} size={size} onClick={generateComparisonPDF}>
      <PictureAsPdf sx={{ marginRight: "10px", padding: "2px 5px" }} /> Download PDF
    </Button>
  );
};

export default BalanceSheetComparisonDownloadPDF;