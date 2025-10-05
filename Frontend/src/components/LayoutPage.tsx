import { Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { NavBar } from "./NavBar";
import VoiceAssistantButton from "./VoiceAssistantButton";

const Layout = () => {
  const { isAuthenticated, loading } = useAuth();
  return (
    <div>
      <NavBar />
      <main>
        {/* Render contents only after successful login */}
        {!loading && isAuthenticated && <Outlet />}
      </main>
      <VoiceAssistantButton />
    </div>
  );
};

export default Layout;
