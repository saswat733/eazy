import React from 'react';
import { Button } from '@mui/material';
import * as XLSX from 'xlsx';
import { getDateValue } from './helper';
import { GridOn } from '@mui/icons-material';
import { formatNumberToUS } from "../utils/format";

const BalanceSheetDownloadExcel = ({ data, companyName, date, dateFormat, size, username }) => {
  // Utility to capitalize text
  function capitalizeText(text) {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Extract structured data similar to the PDF version
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

  const generateBalanceSheetExcel = () => {
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    const wsData = [];

    // Build header rows
    wsData.push([companyName]);
    wsData.push(["Balance Sheet Comparison"]);
    wsData.push([
      `For duration between ${getDateValue(date.startDate, dateFormat)} - ${getDateValue(date.endDate, dateFormat)}`
    ]);
    wsData.push([]); // Empty row for spacing
    wsData.push([`Report run by ${username} at ${new Date().toLocaleString('en-GB')}`]);
    wsData.push([]);

    // Extract and structure data
    const structuredData = extractStructuredData(data.balance_sheet);

    // Render each section in rows
    structuredData.forEach(section => {
      // Main section header row
      wsData.push([section.name]);
      // Process each sub-section
      section.subsections.forEach(subSection => {
        // Sub-section header row (indented)
        wsData.push(["  " + subSection.name]);
        // Header row for inner categories
        wsData.push(["    Category", "Value"]);
        // Category rows
        subSection.categories.forEach(category => {
          wsData.push([
            "    " + category.name,
            formatNumberToUS(category.value)
          ]);
        });
        // Sub-section total row
        wsData.push([
          "    Total " + subSection.name,
          formatNumberToUS(subSection.total)
        ]);
        // Empty row for spacing
        wsData.push([]);
      });
      // Main section total row
      wsData.push([
        "Total " + section.name,
        formatNumberToUS(section.total)
      ]);
      // Empty row for spacing
      wsData.push([]);
    });

    // Convert array of arrays to worksheet
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    // Append worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, "Balance Sheet");
    // Write workbook and trigger download
    XLSX.writeFile(wb, "balance_sheet.xlsx");
  };

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width: '200px' }} size={size} onClick={generateBalanceSheetExcel}>
      <GridOn sx={{ marginRight: "10px", padding: "2px 5px" }} /> Download Excel
    </Button>
  );
};

export default BalanceSheetDownloadExcel;
