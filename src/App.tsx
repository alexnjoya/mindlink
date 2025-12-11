import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Dashboard } from "./components/dashboard/Dashboard";
import { MySession } from "./pages/MySession";
import { Psychologists } from "./pages/support";
import { Calendar } from "./pages/Calendar";
import { Journal } from "./pages/Journal";
import { CognitiveGames as CognitiveGamesPage } from "./pages/CognitiveGames";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<DashboardLayout><Dashboard /></DashboardLayout>} />
        <Route path="/sessions" element={<DashboardLayout><MySession /></DashboardLayout>} />
        <Route path="/psychologists" element={<DashboardLayout><Psychologists /></DashboardLayout>} />
        <Route path="/calendar" element={<DashboardLayout><Calendar /></DashboardLayout>} />
        <Route path="/journal" element={<DashboardLayout><Journal /></DashboardLayout>} />
        <Route path="/games" element={<DashboardLayout><CognitiveGamesPage /></DashboardLayout>} />
        <Route path="/chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
