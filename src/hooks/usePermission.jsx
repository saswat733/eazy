import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useSearchParams } from "react-router-dom";
import { findValueByKey } from "../utils/helper";
import { selectUser } from "../features/auth/authSlice";
import { selectSidebar } from "../features/sidebar/sidebarSlice";

const usePermission = (title = "") => {
  const [permissions, setPermissions] = useState({
    view: true,
    create: true,
    edit: true,
    delete: true,
  });
  const [searchParams] = useSearchParams();
  const { pathname } = useLocation();

  // const { user } = useSelector(selectUser);

  const { menus } = useSelector(selectSidebar);

  const activeTab = searchParams.get("tab") || "";
  const activeSubTab = searchParams.get("subtab") || "";

  const getPermissions = async () => {
    let activePath;
    if (activeSubTab) {
      activePath = pathname + "?tab=" + activeTab + "&subtab=" + activeSubTab;
    } else if (activeTab) {
      activePath = pathname + "?tab=" + activeTab;
    } else {
      activePath = pathname;
    }
    const module = title
      ? await findValueByKey(menus, "title", title)
      : await findValueByKey(menus, "path", activePath);

    let resultObject = {
      view: false,
      edit: false,
      delete: false,
      create: false,
    };
    if (module) {
      const perm = module?.permissions || {};
      // const org = JSON.parse(user?.organization || "[1]");
      // const foundPermissions = org?.map((key) => perm[key]);
      // console.log("foundPermissions", foundPermissions);
      resultObject = {
        view: module ? perm?.view : true,
        edit: module ? perm?.edit : true,
        delete: module ? perm?.delete : true,
        create: module ? perm?.create : true,
        // view: module ? foundPermissions?.some((obj) => obj?.view) : true,
        // edit: module ? foundPermissions?.some((obj) => obj?.edit) : true,
        // delete: module ? foundPermissions?.some((obj) => obj?.delete) : true,
        // create: module ? foundPermissions?.some((obj) => obj?.create) : true,
      };
    }
    if (menus?.length > 0) {
      setPermissions(resultObject);
    }
  };

  useEffect(() => {
    getPermissions();
  }, [pathname, activeTab, activeSubTab, title, menus]);

  return { 
    permissions };
};
export default usePermission;
