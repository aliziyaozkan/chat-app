import { Routes, Route } from "react-router-dom";
import React from 'react'
import Home from "../pages/Home";
import Auth from "../pages/Auth";
function RouterConfig() {
    return (

        <Routes>
            <Route path='/login' element={<Auth />} />
            <Route path='/' element={<Home />} />

        </Routes>
    )
}

export default RouterConfig