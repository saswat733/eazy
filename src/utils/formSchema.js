import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
  email: Yup.string().trim().required("Email/Employee ID is Required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
});

export const forgetPasswordSchema = Yup.object().shape({
  email: Yup.string().trim().required("Email/Employee ID is Required"),
});

export const resetPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .trim()
    .min(8, "Password must be at least 8 characters")
    .required("Password is Required"),
  confPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const bankAccountSchema = Yup.object().shape({
  bank_id: Yup.string().trim().required("Bank Name is Required"),
  account_number: Yup.number()
    .typeError("Number Only!!")
    .required("Account Number is Required"),
  account_type: Yup.string().trim().required("Account Type is Required"),
  routing_number: Yup.string()
    .matches(/^\d+$/, "Routing number must contain only digits")
    .length(9, "Routing number must be exactly 9 digits")
    .required("Routing number is required")
    .required("Routing Number is Required"),
});
export const bankRulesSchema = Yup.object().shape({
  name: Yup.string().trim().required("Rule Name is Required"),
  transaction_for: Yup.string().trim().required("Transaction for is Required"),
  bank_accounts: Yup.array().min(1, "Bank Account is Required"),
  include_on: Yup.string().trim().required("Include On is Required"),
  condition_list: Yup.array().of(
    Yup.object().shape({
      condition_field: Yup.string().trim().required("Field is Required"),
      condition_type: Yup.string().trim().required("Type is Required"),
      condition_text: Yup.string().trim().required("Text is Required"),
    })
  ),
  transaction_type: Yup.string().when("then_condition", {
    is: (val) => val === "assign",
    then: (schema) => schema.required("Transaction Type is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  // payee_id: Yup.string().when("then_condition", {
  // 	is: (val) => val === "assign",
  // 	then: (schema) => schema.required("Payee is Required"),
  // otherwise: (schema) => schema.notRequired(),
  // }),
  category: Yup.string().when("then_condition", {
    is: (val) => val === "assign",
    then: (schema) => schema.required("Account is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const chartOfaccountSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is Required"),
  account_code: Yup.number()
    .typeError("Number Only!!")
    .required("Account Code is Required"),
  type: Yup.string().trim().required("Type is Required"),
  account_type_id: Yup.string().trim().required("Account Type is Required"),
  sub_account_type_id: Yup.string()
    .trim()
    .required("Sub Account Type is Required"),
  detail_type_id: Yup.string().trim().required("Detail Type is Required"),
  sub_detail_type_id: Yup.string()
    .trim()
    .required("Sub Detail Type is Required"),
});
export const accountTypeSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is Required"),
  start_range: Yup.number()
    .typeError("Number Only!")
    .required("Starting Range is Required"),
  end_range: Yup.number()
    .typeError("Number Only!")
    .required("Ending Range is Required"),
});
export const subAccountTypeSchema = Yup.object().shape({
  account_type_id: Yup.string().trim().required("Account Type is Required"),
  name: Yup.string().trim().required("Name is Required"),
  start_range: Yup.number()
    .typeError("Number Only!")
    .required("Starting Range is Required"),
  end_range: Yup.number()
    .typeError("Number Only!")
    .required("Ending Range is Required"),
});
export const detailTypeSchema = Yup.object().shape({
  sub_account_type_id: Yup.string()
    .trim()
    .required("Sub Account Type is Required"),
  name: Yup.string().trim().required("Name is Required"),
  start_range: Yup.number()
    .typeError("Number Only!")
    .required("Starting Range is Required"),
  end_range: Yup.number()
    .typeError("Number Only!")
    .required("Ending Range is Required"),
});
export const subDetailTypeSchema = Yup.object().shape({
  detail_type_id: Yup.string().trim().required("Detail Type is Required"),
  name: Yup.string().trim().required("Name is Required"),
  start_range: Yup.number()
    .typeError("Number Only!")
    .required("Starting Range is Required"),
  end_range: Yup.number()
    .typeError("Number Only!")
    .required("Ending Range is Required"),
});

export const addCompanySchema = Yup.object().shape({
  name: Yup.string().trim(),
  email: Yup.string().trim().email("Invalid email format"),
  website: Yup.string().trim().url("Invalid URL format"),
  tax_id: Yup.string()
    .matches(/^\d{9}$/, "Tax ID must be exactly 9 digits")
    .required("Tax ID is required"),
});

export const addEmployeeSchema = (isEdit) => {
  const baseSchema = {
    name: Yup.string().required("Name is Required"),
    surname: Yup.string(),
    email: Yup.string()
      .email("Enter valid email")
      .required("Email is Required"),
    phone: Yup.number()
      .typeError("Enter number only")
      .required("Phone Number is Required"),
    role_id: Yup.string().required("Role is Required"),
    organization_access: Yup.array().min(1, "Organizations is Required"),
  };

  return isEdit
    ? Yup.object().shape(baseSchema)
    : Yup.object().shape({
        ...baseSchema,
        password: Yup.string()
          .min(8, "Password must be at least 8 characters")
          .required("Password is Required"),
      });
};

export const roleSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is Required"),
});

export const createCustomerSchema = Yup.object().shape({
  display_name: Yup.string().trim().required("Customer Name is Required"),
});

export const productSchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is Required"),
  income_sheet_account: Yup.string()
    .trim()
    .required("Income Account is Required"),
  tax: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Tax cannot be negative"),
  sales_price: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Price cannot be negative"),
});
export const productCategorySchema = Yup.object().shape({
  name: Yup.string().trim().required("Name is Required"),
});
export const forReviewSchema = Yup.object().shape({
  // account_code
  payee_id: Yup.string().when("account_code", {
    is: (ac_number) => {
      // Explicitly parse account_code as a number for comparison
      const accountNumber = String(ac_number);
      // return accountNumber == 12000;
      return accountNumber.startsWith("12") || accountNumber.startsWith("20");
      // (accountNumber >= 12000 &&
      // 	accountNumber <= 12999 &&
      // 	accountNumber !== 12900) ||
      // (accountNumber >= 20000 && accountNumber <= 20999)
    },
    then: (schema) => schema.required("Payee is required for this account"),
    otherwise: (schema) => schema.nullable(), // Name is optional
  }),
  account_category_id: Yup.string().required("Account is Required"),
});
export const invcoieSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Invoice Date is Required"),
  // due_date: Yup.string().required("Due Date is Required"),
  due_date: Yup.string()
    .required("Due Date is Required")
    .test(
      "is-greater",
      "Due date cannot be earlier than the invoice date",
      function (value) {
        const { date } = this.parent;
        return date && value && new Date(value) >= new Date(date);
      }
    ),
  invoice_no: Yup.string().required("Invoice number is Required"),
  product_list: Yup.array().of(
    Yup.object().shape({
      product: Yup.string().required("Product is Required"),
      qty: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Quantity cannot be negative"),
      rate: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Rate cannot be negative"),
      tax: Yup.number()
        .typeError("Number Only!!")
        .nullable()
        .min(0, "Tax cannot be negative"),
    })
  ),
  shipping_charges: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Shipping Charge cannot be negative"),
});
export const creditNoteSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Credit Date is Required"),
  // due_date: Yup.string().required("Due Date is Required"),
  credit_note_no: Yup.string().required("Credit Note is Required"),
  product_list: Yup.array().of(
    Yup.object().shape({
      product: Yup.string().required("Product is Required"),
      qty: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Quantity cannot be negative"),
      rate: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Rate cannot be negative"),
      tax: Yup.number()
        .typeError("Number Only!!")
        .nullable()
        .min(0, "Tax cannot be negative"),
    })
  ),
  shipping_charges: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Shipping Charge cannot be negative"),
});
export const debitNoteSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Payment Date is Required"),
  cheque_no: Yup.string().when("payment_method", {
    is: (val) => val === "Cheque",
    then: (schema) => schema.required("Cheque Number is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expense_product_list: Yup.array().of(
    Yup.object().shape({
      amount: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Amount cannot be negative"),
    })
  ),
});
export const paymentReceivedSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Payment Date is Required"),
  cheque_no: Yup.string().when("primary_payment_method", {
    is: (val) => val === "Cheque",
    then: (schema) => schema.required("Cheque Number is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  deposit_to: Yup.string().when("payment_status", {
    is: (val) => val === "payment_received",
    then: (schema) => schema.required("Deposit To is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  total_amount: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Amount cannot be negative")
    .required("Amount is Required"),
});
export const billPaymentSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Payment Date is Required"),
  cheque_no: Yup.string().when("primary_payment_method", {
    is: (val) => val === "Cheque",
    then: (schema) => schema.required("Cheque Number is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  deposit_to: Yup.string().when("payment_status", {
    is: (val) => val === "bill_payment",
    then: (schema) => schema.required("Deposit To is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  total_amount: Yup.number()
    .typeError("Number Only!!")
    .required("Amount is Required")
    .min(0, "Amount cannot be negative"),
});
export const expenseTransactionSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  date: Yup.string().required("Payment Date is Required"),
  cheque_no: Yup.string().when("payment_method", {
    is: (val) => val === "Cheque",
    then: (schema) => schema.required("Cheque Number is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expense_product_list: Yup.array().of(
    Yup.object().shape({
      amount: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Amount cannot be negative"),
    })
  ),
});
export const billSchema = Yup.object().shape({
  payee_id: Yup.string().required("Customer is Required"),
  balance_sheet_account: Yup.string().required("Account is Required"),
  bill_no: Yup.number()
    .typeError("Number Only!!")
    .required("Bill No is Required"),
  date: Yup.string().required("Payment Date is Required"),
  cheque_no: Yup.string().when("payment_method", {
    is: (val) => val === "Cheque",
    then: (schema) => schema.required("Cheque Number is Required"),
    otherwise: (schema) => schema.notRequired(),
  }),
  expense_product_list: Yup.array().of(
    Yup.object().shape({
      amount: Yup.number()
        .typeError("Number Only!!")
        .required("Required")
        .min(0, "Amount cannot be negative"),
    })
  ),
});

export const generalEntriesSchema = Yup.object().shape({
  journal_number: Yup.string().required("Journal number is required"),
  entries: Yup.array().of(
    Yup.object().shape({
      name: Yup.string().when("account_code", {
        is: (ac_number) => {
          // Explicitly parse account_code as a number for comparison
          const accountNumber = Number(ac_number);
          return (
            (accountNumber >= 12000 &&
              accountNumber <= 12999 &&
              accountNumber !== 12900) ||
            (accountNumber >= 20000 && accountNumber <= 20999)
          );
        },
        then: (schema) => schema.required("Name is required for this account"),
        otherwise: (schema) => schema.nullable(), // Name is optional
      }),
    })
  ),
});

export const UpdateProfileSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name should have at least 2 characters")
    .max(50, "Name can't be longer than 50 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
});
export const fixedAssetSchema = Yup.object().shape({
  assets_name: Yup.string().trim().required("Asset Name is Required"),
  category: Yup.string().required("Category is Required"),
  purchase_date: Yup.string().required("Purchase Date is Required"),
  purchase_price: Yup.number()
    .typeError("Number Only!!")
    .required("Purchase Price is Required")
    .min(0, "Price cannot be negative"),
  shipping_charge: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Shipping charge cannot be negative"),
  installation_charge: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Installation charge cannot be negative"),
  accumulated_depreciation: Yup.number()
    .typeError("Number Only!!")
    .nullable()
    .min(0, "Accumulated depreciation cannot be negative"),
  location: Yup.string().trim().required("Location is Required"),
});
export const runDepreciationSchema = Yup.object().shape({
  type: Yup.string().required("Type is Required"),
});

export const bankReconciliationSchema = Yup.object().shape({
  bank_account: Yup.string().required("Bank Account is Required"),
  start_balance: Yup.number()
    .typeError("Number Only!!")
    .required("Start Balance is Required"),
  end_balance: Yup.number()
    .typeError("Number Only!!")
    .required("End Balance is Required"),
  end_date: Yup.string().required("End Date is Required"),
});
