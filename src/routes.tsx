import { Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import About from "./pages/About/About";
import ContactUs from "./pages/ContactUs/ContactUs";
import ESports from "./pages/eSports/ESports";
import Home from "./pages/Home/Home";
import News from "./pages/News/News";
import Sponsors from "./pages/Sponsors/Sponsors";
import Pacotes from "./pages/pacotes";
import Bracket from "./pages/Bracket";
import LoginPage from "./pages/LoginPage";
import CadastroTorcedor from "./pages/CadastroTorcedor";
import CadastroGamer from "./pages/CadastroGamer";
import LiveMatchPage from "./pages/LiveMatchPage/LiveMatchPage";
// import Teams from "./pages/Teams/Teams";

export const AppRoutes = () => {
  return (
    <Routes>
  <Route element={<App />}>
    <Route index element={<Home />} />
    <Route path="/" element={<Home />} />
    <Route path="sobre" element={<About />} />
    {/* <Route path="team" element={<Teams />} /> */}
    <Route path="noticias" element={<News />} />
    <Route path="patrocinadores-parceiros" element={<Sponsors />} />
    <Route path="e-sports" element={<ESports />} />
    <Route path="contato" element={<ContactUs />} />
     <Route path="Pacotes" element={<Pacotes />} />
    {/* <Route path="Bracket" element={<Bracket />} />
    <Route path="LoginPage" element={<LoginPage/>}/>
    <Route path="CadastroTorcedor" element={<CadastroTorcedor/>}/>
    <Route path="CadastroGamer" element={<CadastroGamer/>}/>
    <Route path="LiveMatchPage" element={<LiveMatchPage/>}/> */}
    <Route path="*" element={<Navigate to="/" />} />
  </Route>
</Routes>

  );
};
