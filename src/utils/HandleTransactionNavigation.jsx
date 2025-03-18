import { useState } from "react";
import ForReviewForm from "../pages/Banking/Transactions/ForReviewForm";
import { useNavigate } from "react-router-dom";

const HandleTransactionNavigation = ({ data, children }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [editData, setEditData] = useState(null);
    const navigate = useNavigate();

    const handleNavigation = (data) => {
        const type = data.type.toLowerCase();
        switch (type) {
            case "invoice":
                navigate(`/sales/invoice/edit/${data.sales_id}`);
                break;
            case "credit note":
                navigate(`/sales/credit-note/edit/${data.sales_id}`);
                break;
            case "deposit":
            case "refund":
            case "sales receipt":
                setEditData({ ...data?.transaction_details, type });
                setIsDrawerOpen(true);
                break;
            case "fixed assets":
                navigate(`/fixed-assets/edit/${data.fixed_asset_id}`);
                break;
            case "expense":
                if (!data?.transaction_details) {
                    navigate(`/expense/expense-transactions/edit/${data.expense_id}`);
                } else {
                    setEditData({ ...data?.transaction_details, type });
                    setIsDrawerOpen(true);
                }
                break;
            case "bill":
                navigate(`/expense/bills/edit/${data.expense_id}`);
                break;
            case "debit note":
                navigate(`/expense/debit-note/edit/${data.expense_id}`);
                break;
            case "payment":
                if (data?.transaction_details) {
                    setEditData({ ...data?.transaction_details, type });
                    setIsDrawerOpen(true);
                }
                break;
            case "payment receive":
                navigate(`/sales/payment-received`);
                break;
            case "invoice tax":
                navigate(`/sales/invoice/edit/${data?.sales_id}`);
                break;
            case "credit note tax":
                navigate(`/sales/credit-note/edit/${data?.sales_id}`);
                break;
            case "transaction":
                setEditData({ ...data, id: data.transaction_id, type });
                setIsDrawerOpen(true);
                break;
            case "bill payment":
                navigate(`/expense/bills/edit/${data.expense_id}`);
                break;
            default:
                break;
        }
    };

    return (
        <>
            <div
                onClick={() => handleNavigation(data)}
                style={{ cursor: "pointer", display: "inline-block" }}
            >
                {children}
            </div>

            <ForReviewForm
                open={isDrawerOpen}
                close={() => {
                    setIsDrawerOpen(false);
                    setEditData(null);
                }}
                editData={editData}
            />
        </>
    );
};

export default HandleTransactionNavigation;
