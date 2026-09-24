import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import AboutPage from "./pages/about";
import Home from "./pages/home";
import DailyTasksPage from "./pages/daily-tasks";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/daily-task" element={<DailyTasksPage />} />
      </Route>
    </Routes>
  );
}

export default App;
