import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import { MdAccountBalanceWallet, MdDashboard, MdLockPerson, MdOutlineBarChart, MdOutlineInsertPageBreak } from "react-icons/md";
import SidebarWidget from "./components/SidebarWidget";
import { IoIosArrowDown } from "react-icons/io";
import { HiDocumentReport, HiOutlineDotsHorizontal } from "react-icons/hi";
import { IoPieChartOutline } from "react-icons/io5";
import { FaMoneyCheckAlt, FaRegUserCircle } from "react-icons/fa";
import { SiReacthookform } from "react-icons/si";
import { TbTableShortcut } from "react-icons/tb";
import { BiCube, BiSolidBuildingHouse } from "react-icons/bi";
import { CiPlug1 } from "react-icons/ci";
import { RiBankFill } from "react-icons/ri";

const navItems = [
  {
    icon: <MdDashboard />,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: <RiBankFill />,
    name: "Banking",
    subItems: [
      {
        name: "Bank Account Setup",
        path: "banking/bank-account-setup",
      },
      {
        name: "Banking Overview",
        path: "banking/overview",
      },
      {
        name: "All Transactions",
        path: "/all-transactions",
      },
      {
        name: "Bank Reconciliation",
        path: "/bank-reconciliation",
      },
      {
        name: "Bank Rules & Automation",
        path: "/bank-automation",
      },
    ],
  },
  {
    icon: <MdOutlineBarChart />,
    name: "Sales",
    subItems: [
      {
        name: "360 view",
        path: "/360-view",
      },
      {
        name: "All Sales",
        path: "/all-sales",
      },
      {
        name: "Customers",
        path: "/customers",
      },
      {
        name: "Invoice",
        path: "/invoice",
      },
      {
        name: "Product & Service",
        path: "/product-service",
      },
      {
        name: "Payment Received",
        path: "/payment-received",
      },
      {
        name: "Credit Note",
        path: "sales/credit-note",
      },
    ],
  },
  {
    icon: <FaMoneyCheckAlt />,
    name: "Expense",
    subItems: [
      {
        name: "Expense Transactions",
        path: "/expense-transaction",
      },
      {
        name: "Bills",
        path: "/bills",
      },
      {
        name: "Vendor Management",
        path: "/vendor-management",
      },
      {
        name: "Contractors",
        path: "/contractors",
      },
      {
        name: "Bill Payments",
        path: "/bill-payments",
      },
      {
        name: "Debit Note",
        path: "/debit-note",
      },
    ],
  },
  {
    icon: <MdAccountBalanceWallet />,
    name: "Accounting",
    subItems: [
      {
        name: "Charts of Accounts",
        path: "/charts-of-accounts",
      },
      {
        name: "Account Type",
        path: "/account-type",
      },
      {
        name: "Sub Account Type",
        path: "/subaccount-type",
      },
      {
        name: "Detail Type",
        path: "/detail-type",
      },
      {
        name: "Sub Detail Type",
        path: "/sub-detail-type",
      },
      {
        name: "General Entries",
        path: "/general-entries",
      },
    ],
  },
  {
    icon: <BiSolidBuildingHouse />,
    name: "Fixed Assets",
    subItems: [
      {
        name: "All Fixed Assets",
        path: "/all-fixed-assets",
      },
      {
        name: "Run Depreciation",
        path: "/run-depreciation",
      },
    ],
  },
  
  {
    icon: <MdLockPerson />,
    name: "Roles & Permission",
    path: "/roles-permission",
  },
  {
    icon: <HiDocumentReport  />,
    name: "Reports",
    path: "/reports",
  },
  {
    icon: <BiSolidBuildingHouse />,
    name: "Company",
    subItems: [
      {
        name: "All Companies",
        path: "/all-companies",
      },
      {
        name: "Admin Profile",
        path: "/profile",
      },
      {
        name: "Employees",
        path: "/employees",
      },
    ],
  },
];


const Sidebar = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  useEffect(() => {
    let submenuMatched = false;
    [navItems].forEach((menu, menuType) => {
      menu.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({ type: menuType, index });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) =>
      prev?.type === menuType && prev?.index === index
        ? null
        : { type: menuType, index }
    );
  };

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <IoIosArrowDown
                  className={`ml-auto h-5 w-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="ml-9 mt-2 space-y-1">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="ml-auto flex items-center gap-1">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );

  return (
    <aside
      className={`fixed left-0 top-0 z-50 mt-16 flex h-screen flex-col border-r border-gray-200 bg-white px-5 text-gray-900 transition-all duration-300 ease-in-out dark:border-gray-800 dark:bg-gray-900 lg:mt-0 
        ${
          isExpanded || isMobileOpen
            ? "w-[290px]"
            : isHovered
            ? "w-[290px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`flex py-8 ${
          !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
        }`}
      >
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img
                className="dark:hidden"
                src="/images/logo/logo.svg"
                alt="Logo"
                width={150}
                height={40}
              />
              <img
                className="hidden dark:block"
                src="/images/logo/logo-dark.svg"
                alt="Logo"
                width={150}
                height={40}
              />
            </>
          ) : (
            <img
              src="/images/logo/logo-icon.svg"
              alt="Logo"
              width={32}
              height={32}
            />
          )}
        </Link>
      </div>
      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        <nav className="mb-6">
          <div className="flex flex-col gap-4">
            <div>
              <h2
                className={`mb-4 flex text-xs uppercase leading-[20px] text-gray-400 ${
                  !isExpanded && !isHovered
                    ? "lg:justify-center"
                    : "justify-start"
                }`}
              >
                {isExpanded || isHovered || isMobileOpen ? (
                  "Menu"
                ) : (
                  <HiOutlineDotsHorizontal className="size-6" />
                )}
              </h2>
              {renderMenuItems(navItems, "main")}
            </div>
          </div>
        </nav>
        {/* {isExpanded || isHovered || isMobileOpen ? <SidebarWidget /> : null} */}
      </div>
    </aside>
  );
};

export default Sidebar;
