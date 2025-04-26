import React from 'react';
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router";
import Footer from "./Footer.jsx";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </div>
    );
};

export default MainLayout;