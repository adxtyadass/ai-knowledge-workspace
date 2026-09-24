import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/layout/appLayout";
import AboutPage from "./pages/about";
import Home from "./pages/home";

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
