import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        {/* The Outlet component renders the current page (e.g., Index, CropRecommender) */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
