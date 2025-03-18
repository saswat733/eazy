import React from 'react';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import TableChartIcon from '@mui/icons-material/TableChart';
import { getDateValue } from './helper';
import { formatNumberToUS } from '../utils/format';

const TransactionByDateDownloadExcel = ({ data, companyName, dateFormat, size, username }) => {
  const transactions = data.data.rows;

  const generateTransactionExcel = () => {
    const rows = [];
    
    // Header Section
    rows.push([companyName]);
    rows.push(["Transaction by Date Report"]);
    rows.push([`Report run by ${username} at ${new Date().toLocaleString('en-GB')}`]);
    rows.push([]); // Empty row for spacing
    
    // Column Headers
    rows.push(["Date", "Account", "Code", "Type", "Description", "Debit", "Credit"]);
    
    // Data rows
    transactions.forEach(tx => {
      const txDate = getDateValue(tx.date, dateFormat);
      const accountName = tx.account_name || "";
      const accountCode = tx.account_code || "";
      const type = tx.type || "";
      const description = tx.description || "";
      const debit = tx.debit ? formatNumberToUS(parseFloat(tx.debit)) : "";
      const credit = tx.credit ? formatNumberToUS(parseFloat(tx.credit)) : "";
      rows.push([txDate, accountName, accountCode, type, description, debit, credit]);
    });
    
    // Create worksheet and workbook, then export the file.
    const worksheet = XLSX.utils.aoa_to_sheet(rows);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transaction by Date");
    XLSX.writeFile(workbook, "transaction_by_date_report.xlsx");
  };

  return (
    <Button sx={{ backgroundColor: '#d3d3d3', width:'200px' }} size={size} onClick={generateTransactionExcel}>
      <TableChartIcon sx={{ marginRight:"10px", padding:"2px 5px" }} /> Download Excel
    </Button>
  );
};

export default TransactionByDateDownloadExcel;
