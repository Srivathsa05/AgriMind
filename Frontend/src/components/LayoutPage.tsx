import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <main>
        {/* The Outlet component renders the current page (e.g., Index, CropRecommender) */}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
