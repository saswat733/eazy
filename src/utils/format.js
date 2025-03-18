import parsePhoneNumber from "libphonenumber-js";

export const formatNumberToUS = (number = 0) => {
  if (!number) return "$0.00";
  const formattedNumber = Math.abs(number).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return number < 0 ? `-$${formattedNumber}` : `$${formattedNumber}`;
};

export const getFormattedTime = () => {
  return new Date().toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false, 
  });
};

export const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return "-";
  if (phoneNumber.toString().startsWith("+")) return phoneNumber;
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber);
  const cleaned = parsedPhoneNumber.nationalNumber.replace(/[^\d]/g, "");
  const usNumber = cleaned.slice(-10);
  const usNumberWithDashes = usNumber.replace(
    /(\d{3})(\d{3})(\d{4})/,
    "$1-$2-$3"
  );
  return "+" + parsedPhoneNumber.countryCallingCode + " " + usNumberWithDashes;
};

export const formatAccountName = (type = "", name = "", account = "") => {
  const accountFormat = String(account).slice(-4); 
  const formattedName = name.replace(/\s+/g, "_"); 

  return `${formattedName}${type ? `_${type}` : ""}_${accountFormat}`;
};

export const formatCOAName = (code = "", name = "") => {
  return `${code}:${name}`;
};

export const payeeName = (name = "", surname = "", display_name = "") => {
  return display_name || `${name} ${surname ?? ""}`;
};

export const getFullAddress = (
  line1 = "",
  line2 = "",
  city = "",
  state = "",
  country = "",
  zip = ""
) => {
  const parts = [line1, line2, city, state, country, zip]
    .filter(Boolean)
    .join(", ");

  return parts || "-";
};
