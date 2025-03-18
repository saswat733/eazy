import { useState } from "react";
import ComponentCard from "components/common/ComponentCard";
import Label from "../../components/form/Label";
import Input from "components/form/input/InputField";
import Select from "components/form/Select";
import { FaEyeSlash } from "react-icons/fa";
import { IoEyeSharp } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";

export default function CreditNote() {
  const [showPassword, setShowPassword] = useState(false);
  const options = [
    { value: "akash", label: "Akash" },
    { value: "test", label: "Test" },
    { value: "final", label: "Final" },
  ];
  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };
//   const [dateOfBirth, setDateOfBirth] = useState("");

//   const handleDateChange = (date) => {
//     setDateOfBirth(date[0].toLocaleDateString()); // Handle selected date and format it
//   };


  return (
    <ComponentCard title="Credit Note">
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Label htmlFor="customer">Customer</Label>
            <Select
              options={options}
              placeholder="Select Option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          <div>
            <Label htmlFor="customer">Balance Sheet Account</Label>
            <Select
              options={options}
              placeholder="Select Option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <Label htmlFor="customer">Credit Note No.</Label>
            <Select
              options={options}
              placeholder="Select Option"
              onChange={handleSelectChange}
              className="dark:bg-dark-900"
            />
          </div>
          {/* <div>
            <Label htmlFor="datePicker">Date Picker Input</Label>
            <div className="flatpickr-wrapper relative w-full">
              <Flatpickr
                value={dateOfBirth} // Set the value to the state
                onChange={handleDateChange} // Handle the date change
                options={{
                  dateFormat: "Y-m-d", // Set the date format
                }}
                placeholder="Select an option"
                className="shadow-theme-xs focus:outline-hidden focus:ring-3 bg-transparent h-11 w-full appearance-none rounded-lg border border-gray-300 px-4 py-2.5  text-sm text-gray-800 placeholder:text-gray-400  focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30  dark:focus:border-brand-800"
              />
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
                <FaRegCalendarAlt className="size-6" />
              </span>
            </div>
          </div> */}
        </div>
        <div>
          <Label>Select Input</Label>
          <Select
            options={options}
            placeholder="Select an option"
            onChange={handleSelectChange}
            className="dark:bg-dark-900"
          />
        </div>
        <div>
          <Label>Password Input</Label>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 z-30 -translate-y-1/2 cursor-pointer"
            >
              {showPassword ? (
                <IoEyeSharp className="size-5 fill-gray-500 dark:fill-gray-400" />
              ) : (
                <FaEyeSlash className="size-5 fill-gray-500 dark:fill-gray-400" />
              )}
            </button>
          </div>
        </div>

        <div>
          <Label htmlFor="tm">Date Picker Input</Label>
          <div className="relative">
            <Input
              type="time"
              id="tm"
              name="tm"
              onChange={(e) => console.log(e.target.value)}
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">
              <IoMdTime className="size-6" />
            </span>
          </div>
        </div>
        <div>
          <Label htmlFor="tm">Input with Payment</Label>
          <div className="relative">
            <Input
              type="text"
              placeholder="Card number"
              className="pl-[62px]"
            />
            <span className="absolute left-0 top-1/2 flex h-11 w-[46px] -translate-y-1/2 items-center justify-center border-r border-gray-200 dark:border-gray-800">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6.25" cy="10" r="5.625" fill="#E80B26" />
                <circle cx="13.75" cy="10" r="5.625" fill="#F59D31" />
                <path
                  d="M10 14.1924C11.1508 13.1625 11.875 11.6657 11.875 9.99979C11.875 8.33383 11.1508 6.8371 10 5.80713C8.84918 6.8371 8.125 8.33383 8.125 9.99979C8.125 11.6657 8.84918 13.1625 10 14.1924Z"
                  fill="#FC6020"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
