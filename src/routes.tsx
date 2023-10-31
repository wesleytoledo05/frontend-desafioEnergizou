import React from "react"
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import RegisterCompany from "./pages/RegisterCompany"
import Informations from "./pages/Informations";
import ChangeInformations from "./pages/ChangeInformations";
import { RoutesEnum } from "./enums/PagesRoutesEnum";


const MainRoutes = () => (
    <Routes>
        <Route path={RoutesEnum.HOME} element={<Home />} />
        <Route path={RoutesEnum.REGISTERCOMPANY} element={<RegisterCompany />} />
        <Route path={RoutesEnum.INFORMATIONS} element={<Informations />} />
        <Route path={RoutesEnum.CHANGEINFORMATION} element={<ChangeInformations />} />
    </Routes>
)

export default MainRoutes;