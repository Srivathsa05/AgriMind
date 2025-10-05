import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar";
import VoiceAssistantButton from "./VoiceAssistantButton";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <main>
        {/* The Outlet component renders the current page (e.g., Index, CropRecommender) */}
        <Outlet />
      </main>
      <VoiceAssistantButton />
    </div>
  );
};

export default Layout;
