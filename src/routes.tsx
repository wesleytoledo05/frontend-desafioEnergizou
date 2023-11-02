import React from "react"
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home"
import RegisterCompany from "./pages/RegisterCompany"
import Detail from "./pages/Detail";
import UpdateCompany from "./pages/UpdateCompany";


const MainRoutes = () => (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registercompany" element={<RegisterCompany />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/updatecompany/:id" element={<UpdateCompany />} />
    </Routes>
)

export default MainRoutes;