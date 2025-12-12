import "./App.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./redux/store";
import API from "./config/axiosConfig";
import { setGames, setStats } from "./redux/slices/content-slice/contentSlice";
import { computeStats } from "./utils/game/dashboardUtils";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Home } from "./components/dashboard/Home";
import { MySession } from "./pages/MySession";
import { Psychologists } from "./pages/support";
import { Calendar } from "./pages/Calendar";
import { Journal } from "./pages/Journal";
import { CognitiveGames as CognitiveGamesPage } from "./pages/CognitiveGames";
import { GamePage } from "./components/games/GamePage";
import { Chat } from "./pages/Chat";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";




function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth!);
  const { games, stats } = useSelector((state: RootState) => state.content);


  const fetchAllGames = async () => {
    try {
      const response = await API.get("/game/");
      if (response.data?.games) {
        dispatch(setGames({ games: response.data.games }));
      } else {
        console.log("Couldn't fetch all games");
      }
    } catch (error) {
      console.log("Error fetching games:", error);
    }
  };

  const fetchGameStats = async () => {
    try {
      const response = await API.get(`/game-session/user/complete/${user!.userId}`);
      if (response.data?.gameSessions) {
        const userStats = computeStats(response.data.gameSessions) || []
        dispatch(setStats({ stats: userStats }));
      } else {
        console.log("Couldn't fetch stats");
      }
    } catch (error) {
      console.log("Error fetching stats:", error);
    }
  };

  useEffect(() => {
    fetchAllGames();
    fetchGameStats();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<DashboardLayout userName={user?.username!}><Home /></DashboardLayout>} />
        <Route path="/sessions" element={<DashboardLayout><MySession /></DashboardLayout>} />
        <Route path="/psychologists" element={<DashboardLayout><Psychologists /></DashboardLayout>} />
        <Route path="/calendar" element={<DashboardLayout><Calendar /></DashboardLayout>} />
        <Route path="/journal" element={<DashboardLayout><Journal /></DashboardLayout>} />
        <Route path="/games" element={<DashboardLayout><CognitiveGamesPage games={games!} /></DashboardLayout>} />
        <Route path="/chat" element={<DashboardLayout><Chat /></DashboardLayout>} />
        <Route path="/profile" element={<DashboardLayout><Profile /></DashboardLayout>} />
        <Route path="/settings" element={<DashboardLayout><Settings /></DashboardLayout>} />
        <Route path="/games/:game" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
