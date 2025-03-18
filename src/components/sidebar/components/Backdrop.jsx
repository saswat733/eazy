import { useSidebar } from "../../../context/SidebarContext";

const Backdrop= () => {
  const { isMobileOpen, toggleMobileSidebar } = useSidebar();

  if (!isMobileOpen) return null;

  return (
    <div
      className="bg-opacity-50/50 fixed inset-0 z-40 bg-gray-900 lg:hidden"
      onClick={toggleMobileSidebar}
    />
  );
};

export default Backdrop;
