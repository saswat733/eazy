// import store from "../features/store";

import moment from "moment";
import { CONSTANTS } from "./staticData";
// import * as CryptoJS from "crypto-js";

export const findValueByKey = (data, key, value) => {
  if (
    typeof data === "object" &&
    data !== null &&
    key in data &&
    data[key] === value
  ) {
    return data;
  }

  if (Array.isArray(data)) {
    for (let element of data) {
      const result = findValueByKey(element, key, value);
      if (result) {
        return result;
      }
    }
  }

  if (typeof data === "object" && data !== null) {
    for (let objValue of Object.values(data)) {
      const result = findValueByKey(objValue, key, value);
      if (result) {
        return result;
      }
    }
  }

  return null;
};

export const findParent = (data, path) => {
  if (!data) return null;
  for (const item of data) {
    if (item.submodules) {
      for (const subItem of item.submodules) {
        if (path.startsWith(subItem.path)) {
          // if (subItem.link === path) {
          return item;
        }
      }
      const parent = findParent(item.submodules, path);
      if (parent) return parent;
    }
  }
  return null;
};

export const extractModules = (data, permissionsKeys) => {
  let modules = [];

  const traverse = (items) => {
    items?.forEach((item) => {
      const permissions = {};
      permissionsKeys.forEach((key) => {
        permissions[key] = item.permissions ? item.permissions[key] : {};
        if (!permissions[key]) {
          permissions[key] = {
            create: false,
            delete: false,
            edit: false,
            view: false,
          };
        }
      });

      modules.push({
        sidebarId: item.id,
        // title: item.title,
        permissions: permissions,
      });

      if (item.submodules && item.submodules.length > 0) {
        traverse(item.submodules);
      }
    });
  };

  traverse(data);

  return modules;
};

export const findLastSubmoduleWithEmptySubmodules = (module) => {
  if (module.submodules.length > 0) {
    if (module.submodules[0].submodules.length > 0) {
      return module.submodules[0].submodules[0].path;
    } else {
      return module.submodules[0].path;
    }
  }
};

export const loadingButtonStyle = {
  textTransform: "capitalize",
  marginBlock: 2,
  minWidth: "150px",
  display: "flex",
  alignItems: "center",
  gap: 1,
  marginInline: "auto",
};
export const nameLinkStyle = {
  display: "inline-flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  fontSize: CONSTANTS.fontSize,
  "&:hover": {
    opacity: 0.8,
    textDecoration: "underline",
  },
};

export const removeExtraSymbols = (record) => {
  if (record) {
    let cleanedDesc = record.replace(/"/g, '"');
    return cleanedDesc;
  }
};

export const getTitleName = (str) => {
  const capitalizedText = str
    ? str.replaceAll("-", " ").replace(/\b\w/g, (c) => c?.toUpperCase())
    : "";
  return capitalizedText;
};

export const getLinkColor = (theme) => {
  const _theme_mode = localStorage.getItem("theme_mode") || "light";
  if (_theme_mode === "dark") {
    return theme.palette.primary.light;
  }
  return theme.palette.primary.main;
};

export const getODId = (values) => {
  if (!values) return "";
  if (values?.department) {
    return values?.department + "_dp" + "@" + values?.organization;
  } else {
    return values?.organization + "_bs";
  }
};

export const getPostODId = async (values) => {
  if (values.ogdptype === "bs") {
    values["organization"] = values.organization + "_bs";
  }
  const ODValue = values?.organization?.split("_");
  if (ODValue[1] === "bs") {
    values["organization"] = parseInt(ODValue[0]);
    delete values["department"];
  } else {
    values["department"] = ODValue[0];
    delete values["organization"];
  }
};

export const filterDataByOrganization = (values, data) => {
  if (
    values?.organization === "undefined_bs" ||
    typeof values?.organization === "number"
  )
    return data;
  const ODValue = values?.organization?.split("_");
  if (!ODValue) return data;
  if (ODValue[1] === "bs") {
    const filterData = data.filter((itm) => itm.organization == ODValue[0]);
    return filterData;
  }
  const org = ODValue[1]?.split("@")[1];
  const _filterData = data.filter((itm) => itm.organization == org);
  return _filterData;
};

export const preFillFormData = (e, setFieldValue, data) => {
  if (!e) {
    data.forEach((itm) => {
      setFieldValue(itm.to, "");
    });
  } else {
    data.forEach((itm) => {
      setFieldValue(itm.to, e[itm.fill]);
    });
  }
};

export const makeArrayUnique = (array) => {
  const seen = new Set();
  return array.filter((obj) => {
    const value = JSON.stringify(obj);
    return !seen.has(value) && seen.add(value);
  });
};

export const arrayToObject = (array) => {
  return array.reduce((obj, item) => {
    const key = Object.keys(item)[0];
    obj[key] = item[key];
    return obj;
  }, {});
};

const getMainColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
};

export const convertHSENodeData = (originalData) => {
  if (!originalData) {
    return null;
  }

  const {
    id,
    name,
    profile,
    position,
    children,
    legal_role = "",
  } = originalData;

  const node = {
    id: id.toString(),
    data: {
      profile,
      name,
      position,
      legal_role,
    },

    children: [],
  };

  if (children && children.length > 0) {
    node.children = children.map((child) => convertHSENodeData(child));
  }

  return node;
};

export const maskDigits = (number, value) => {
  var firstSixDigits = value.substring(0, number);
  var maskedDigits = Array(value.substring(number).length)
    .fill(1)
    .map((itm) => "*")
    .join("");
  return firstSixDigits + maskedDigits;
};

export const calculateDuration = (startDate, endDate) => {
  if (startDate && endDate && moment(startDate).isBefore(endDate)) {
    const diffInMinutes = moment(endDate).diff(startDate, "minutes");
    const days = Math.floor(diffInMinutes / 1440);
    const hours = Math.floor((diffInMinutes % 1440) / 60);
    const minutes = Math.floor((diffInMinutes % 1440) % 60);

    return `${days} day(s) ${hours}h ${minutes}m`;
  } else {
    return "";
  }
};

export const getParsedValues = (value) => {
  if (!value) return [];
  if (value.includes("[{")) {
    return JSON.parse(value);
  } else {
    const newVal = value.split(",").map((itm) => ({
      accountability: itm.replaceAll('"', ""),
    }));
    return newVal;
  }
};

export const transformArrayToNested = (array) => {
  const map = array.reduce((acc, curr) => {
    acc[curr.id] = { ...curr, organizations: [] };
    return acc;
  }, {});

  const result = [];
  array.forEach((item) => {
    if (item.parent_id == 0) {
      result.push(map[item.id]);
    } else {
      const parent = map[item.parent_id];
      parent?.organizations?.push(map[item.id]);
    }
  });

  return result;
};

export const getFirstAndLastDayOfMonth = (monthYear) => {
  const [month, year] = monthYear.split(" ");
  const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
  const firstDay = new Date(year, monthIndex, 1);
  const lastDay = new Date(year, monthIndex + 1, 0);

  return { firstDay, lastDay };
};

// export const encrypt = (plainText) => {
//   const cipherText = CryptoJS.AES.encrypt(
//     plainText,
//     import.meta.env.VITE_SOCKET_SECRET_KEY
//   ).toString();
//   return cipherText;
// };

// export const decryptData = (cipherText) => {
//   const bytes = CryptoJS.AES.decrypt(
//     cipherText,
//     import.meta.env.VITE_SOCKET_SECRET_KEY
//   );
//   const plainText = bytes.toString(CryptoJS.enc.Utf8);
//   return plainText;
// };

export const handleSaveMore = (props, handleSubmit) => {
  props.validateForm().then((data) => {
    if (Object.keys(data).length === 0) {
      handleSubmit(props.values, {
        addMore: true,
        resetForm: props.resetForm,
      });
    } else {
      props.setTouched(data);
    }
  });
};

export const getColorFromImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = function (event) {
      const img = new Image();
      img.crossOrigin = "Anonymous";
      img.src = event.target.result;

      img.onload = function () {
        // Create an off-screen canvas
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        // Downsample the image (optional)
        const width = img.width > 100 ? 100 : img.width;
        const height = img.height > 100 ? 100 : img.height;
        canvas.width = width;
        canvas.height = height;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Get the image data
        const imageData = ctx.getImageData(0, 0, width, height);
        const pixels = imageData.data;

        const colorCounts = {};
        let i = 0;

        // Iterate through every pixel and collect color info
        while (i < pixels.length) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];
          i += 4;

          // Ignore fully transparent pixels
          if (a === 0) continue;

          // Create the hex color string
          const color = rgbToHex(r, g, b);

          // Count the frequency of each color
          colorCounts[color] = (colorCounts[color] || 0) + 1;
        }

        // Find the most frequent color
        const sortedColors = Object.entries(colorCounts).sort(
          (a, b) => b[1] - a[1]
        );

        // Return the dominant color (hex format)
        resolve(sortedColors[0][0]);
      };

      img.onerror = function () {
        reject("Image loading failed");
      };
    };

    reader.onerror = function () {
      reject("File reading failed");
    };

    // Read the file as a data URL
    reader.readAsDataURL(file);
  });
};

// Helper function to convert RGB to HEX
const rgbToHex = (r, g, b) => {
  const toHex = (x) => x.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};

// export const checkDateFormat = (dateStr, selectedFormat) => {
// 	const isValid = moment(dateStr, selectedFormat, true).isValid();
// 	return isValid;
// };

export const checkDateFormat = (dateStr, selectedFormat) => {
  const normalizedDate = moment(dateStr, ["D/M/YY", "DD/MM/YY"], true).format(
    selectedFormat
  );

  const isValid = moment(normalizedDate, selectedFormat, true).isValid();

  return isValid ? normalizedDate : false;
};

export const getDateValue = (val, format) => {
  if (!val) return "-";
  if (val === "0000-00-00") return "-";
  return moment(val, "YYYY-MM-DD").format("MM/DD/YYYY");
};

export const getColorValueByType = (status) => {
  switch (status) {
    case "Sales Receipt":
      return "#28a745";
    case "Refund":
      return "#dc3545";
    case "Deposit":
      return "#6f42c1";
    case "invoice":
      return "#0076ff";
    case "Credit Note":
      return "#fd7e14";
    default:
      return "#000";
  }
};

export const getContrastColor = (hexcolor = "000000") => {
  let hex = hexcolor ? hexcolor.replace("#", "") : "000000";
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((x) => x + x)
      .join("");
  }

  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  const luminance = (r, g, b) => {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  return luminance(r, g, b) > 0.5 ? "#000" : "#fff";
};

export const randomFiveDigitNumber = () => {
  return Math.floor(10000 + Math.random() * 90000);
};

export const calculateTotal = (values, field) => {
  return values?.reduce((acc, current) => {
    const value = parseFloat(current[field]) || 0;
    return acc + value;
  }, 0);
};

// export const handleExport = async ({ api, fileName }) => {
// 	const response = await api({
// 		all: true,
// 	});
// 	console.log("response", response);
// };

// Helper function to convert data to CSV
export const exportToCSV = (filename, rows) => {
  if (!rows || rows.length === 0) return;

  const separator = ",";
  const keys = Object.keys(rows[0]);

  // Create the CSV header
  const csvContent =
    keys.join(separator) +
    "\n" +
    rows
      .map((row) => {
        return keys
          .map((key) => {
            let cell = row[key] || ""; // Ensure no `undefined` values
            if (typeof cell === "string") {
              // Escape commas and quotes
              cell = `"${cell.replace(/"/g, '""')}"`;
            }
            return cell;
          })
          .join(separator);
      })
      .join("\n");

  // Create a download link and click it programmatically
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.setAttribute("download", `${filename}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const filterGetDate = (date, dFormat = "MM-DD-YYYY") => {
  const currentDate = moment();
  let startDate, endDate;

  switch (date) {
    case "today":
      startDate = moment(currentDate).startOf("day");
      endDate = moment(currentDate).endOf("day");
      break;

    case "yesterday":
      startDate = moment(currentDate).subtract(1, "day").startOf("day");
      endDate = moment(currentDate).subtract(1, "day").endOf("day");
      break;
    case "thisWeek":
      startDate = moment(currentDate).startOf("week");
      endDate = moment(currentDate).endOf("week");
      break;
    case "lastWeek":
      startDate = moment(currentDate).subtract(1, "week").startOf("week");
      endDate = moment(currentDate).subtract(1, "week").endOf("week");
      break;
    case "thisMonth":
      startDate = moment(currentDate).startOf("month");
      endDate = moment(currentDate).endOf("month");
      break;
    case "lastMonth":
      startDate = moment(currentDate).subtract(1, "month").startOf("month");
      endDate = moment(currentDate).subtract(1, "month").endOf("month");
      break;
    case "thisQuarter":
      startDate = moment(currentDate).startOf("quarter");
      endDate = moment(currentDate).endOf("quarter");
      break;
    case "lastQuarter":
      startDate = moment(currentDate).subtract(1, "quarter").startOf("quarter");
      endDate = moment(currentDate).subtract(1, "quarter").endOf("quarter");
      break;
    case "last6Months":
      startDate = moment(currentDate).subtract(6, "months").startOf("month");
      endDate = moment(currentDate).endOf("month");
      break;
    case "last12Months":
      startDate = moment(currentDate).subtract(12, "months").startOf("month");
      endDate = moment(currentDate).endOf("month");
      break;
    case "thisYear":
      startDate = moment(currentDate).startOf("year");
      endDate = moment(currentDate).endOf("year");
      break;
    case "previousYear":
      startDate = moment(currentDate).subtract(1, "year").startOf("year");
      endDate = moment(currentDate).subtract(1, "year").endOf("year");
      break;
    default:
      if (/^\d{4}$/.test(date)) {
        startDate = moment(date, "YYYY").startOf("year");
        endDate = moment(date, "YYYY").endOf("year");
      } else {
        throw new Error("Invalid filter");
      }
  }

  return {
    startDate: startDate.format(dFormat),
    endDate: endDate.format(dFormat),
  };
};

export const isColumnVisible = (allColumns, column) => {
  const isVisible = allColumns.find((c) => c.field === column)?.visible;
  return isVisible;
};

export const flattenObjectDataToArray = (data) => {
  let flattenedArray = [];

  function flattenObject(obj) {
    Object.keys(obj).forEach((key) => {
      if (Array.isArray(obj[key])) {
        // If it's an array, concatenate the array items
        flattenedArray = flattenedArray.concat(obj[key]);
      } else if (typeof obj[key] === "object" && obj[key] !== null) {
        // console.log("obj[key]", obj[key]);
        // If it's an object, recursively flatten it
        flattenObject(obj[key]);
      }
    });
  }

  // Start flattening the main object
  flattenObject(data);

  return flattenedArray;
};

export const getDueDateValue = (paymentTerms, invoiceDate, dateFormat) => {
  // console.log(
  // 	"paymentTerms, invoiceDate, dateFormat",
  // 	paymentTerms,
  // 	invoiceDate,
  // 	dateFormat
  // );
  if (!invoiceDate) return null;
  switch (paymentTerms) {
    case "Due on receipt":
      return moment(invoiceDate, dateFormat);
    case "Net 15":
      return moment(invoiceDate, dateFormat).add(15, "days");
    case "Net 30":
      return moment(invoiceDate, dateFormat).add(30, "days");
    case "Net 60":
      return moment(invoiceDate, dateFormat).add(60, "days");
    default:
      return null;
  }
};

export const flattenPermissions = (permissions) => {
  let flatPermissions = [];

  function flatten(item) {
    const { submenu, ...itemWithoutSubmenu } = item;
    flatPermissions.push(itemWithoutSubmenu);
    if (submenu && submenu.length > 0) {
      submenu.forEach(flatten);
    }
  }
  permissions.forEach(flatten);
  return flatPermissions;
};
