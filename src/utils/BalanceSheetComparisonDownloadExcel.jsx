import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import TableChartIcon from '@mui/icons-material/TableChart';
import { formatNumberToUS } from './format';

const BalanceSheetComparisonExcel = ({ data, companyName, dateFormat, size, username }) => {
  const period1 = data[0];
  const period2 = data[1];

  function capitalizeText(text) {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

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

  const generateComparisonExcel = () => {
    const structuredData1 = extractStructuredData(period1.data.balance_sheet);
    const structuredData2 = extractStructuredData(period2.data.balance_sheet);

    // Build rows as an array of arrays
    const rows = [];
    
    // Header Section
    rows.push([companyName]);
    rows.push(["Balance Sheet Comparison"]);
    rows.push([`Report run by ${username} at ${new Date().toLocaleString('en-GB')}`]);
    rows.push([]);
    const period1Date = `${getDateValue(period1.start_date, dateFormat)} - ${getDateValue(period1.end_date, dateFormat)}`;
    const period2Date = `${getDateValue(period2.start_date, dateFormat)} - ${getDateValue(period2.end_date, dateFormat)}`;
    rows.push([`Comparing ${period1Date} vs ${period2Date}`]);
    rows.push([]);
    // Column Headers
    rows.push(["Item", "Period 1", "Period 2", "Difference"]);

    // Render structured data
    structuredData1.forEach((section1, index) => {
      const section2 = structuredData2[index];

      // Main Section Header Row
      rows.push([`${section1.name}`, "", "", ""]);

      // Sub-sections
      section1.subsections.forEach((subSection1, subIndex) => {
        const subSection2 = section2.subsections[subIndex];

        // Sub-section Header Row
        rows.push([`  ${subSection1.name}`, "", "", ""]);

        // Categories
        subSection1.categories.forEach((category1, catIndex) => {
          const category2 = subSection2.categories[catIndex];
          const value1 = category1.value;
          const value2 = category2.value;
          const difference = value2 - value1;
          rows.push([
            `    ${category1.name}`,
            formatNumberToUS(value1),
            formatNumberToUS(value2),
            formatNumberToUS(difference)
          ]);
        });

        // Sub-section Total Row
        const total1 = subSection1.total;
        const total2 = subSection2.total;
        const totalDiff = total2 - total1;
        rows.push([
          `    Total ${subSection1.name}`,
          formatNumberToUS(total1),
          formatNumberToUS(total2),
          formatNumberToUS(totalDiff)
        ]);
        // Empty row for spacing
        rows.push([]);
      });

      // Main Section Total Row
      const sectionTotal1 = section1.total;
      const sectionTotal2 = section2.total;
      const sectionTotalDiff = sectionTotal2 - sectionTotal1;
      rows.push([
        `Total ${section1.name}`,
        formatNumberToUS(sectionTotal1),
        formatNumberToUS(sectionTotal2),
        formatNumberToUS(sectionTotalDiff)
      ]);
      // Empty row after main section
      rows.push([]);
    });

    // Create worksheet and workbook
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Balance Sheet Comparison");

    // Export the workbook to an Excel file
    XLSX.writeFile(workbook, "balance_sheet_comparison.xlsx");
  };

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width: '200px' }} size={size} onClick={generateComparisonExcel}>
      <TableChartIcon sx={{ marginRight: "10px", padding: "2px 5px" }} /> Download Excel
    </Button>
  );
};

export default BalanceSheetComparisonExcel;
