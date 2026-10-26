
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AboutPage from "./pages/about";
import Home from "./pages/home";
import DailyTasksPage from "./pages/daily-tasks";
import LoginPage from "./pages/login-page";
import AIKnowledgeWorkspace from "./pages/ai-knowledge-workspace";

function App() {
  return (
    <Routes>
      {/* Public route */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/" element={<AIKnowledgeWorkspace />} />

      {/* Protected routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/daily-task" element={<DailyTasksPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
