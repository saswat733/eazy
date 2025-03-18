import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import { getDateValue } from './helper';
import TableChartIcon from '@mui/icons-material/TableChart';
import { formatNumberToUS } from '../utils/format';

const ProfitAndLossDownloadExcel = ({ data, companyName, date, dateFormat, size, username }) => {

  function capitalizeText(text) {
    return text
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  // Data extraction similar to your PDF component
  const extractStructuredData = (incomeStatementData) => {
    const structuredData = [];
    
    for (const mainSectionKey in incomeStatementData) {
      const mainSection = incomeStatementData[mainSectionKey];
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

  const generateProfitAndLossExcel = () => {
    const structuredData = extractStructuredData(data.income_statement);
    const rows = [];
    
    // Header Section
    rows.push([companyName]);
    rows.push(["Profit & Loss Statement"]);
    rows.push([`For duration between ${getDateValue(date.startDate, dateFormat)} - ${getDateValue(date.endDate, dateFormat)}`]);
    rows.push([`Report run by ${username} at ${new Date().toLocaleString('en-GB')}`]);
    rows.push([]); // Blank row for spacing
    rows.push(["Item", "Amount"]); // Column headers

    // Render each main section with its sub-sections and categories
    structuredData.forEach(section => {
      // Main Section Header
      rows.push([`${section.name}`]);
      
      section.subsections.forEach(subSection => {
        // Sub-section Header
        rows.push([`  ${subSection.name}`]);
        
        // Categories
        subSection.categories.forEach(category => {
          rows.push([
            `    ${category.name}`,
            formatNumberToUS(category.value)
          ]);
        });
        
        // Sub-section Total
        rows.push([
          `    Total ${subSection.name}`,
          formatNumberToUS(subSection.total)
        ]);
        rows.push([]); // Spacing row
      });
      
      // Main Section Total
      rows.push([
        `Total ${section.name}`,
        formatNumberToUS(section.total)
      ]);
      rows.push([]); // Spacing row
    });

    // Create worksheet and workbook, then export as Excel file
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Profit & Loss");

    XLSX.writeFile(workbook, "profit_and_loss.xlsx");
  };

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width: '200px' }} size={size} onClick={generateProfitAndLossExcel}>
      <TableChartIcon sx={{ marginRight: "10px", padding: "2px 5px" }} /> Download Excel
    </Button>
  );
};

export default ProfitAndLossDownloadExcel;
