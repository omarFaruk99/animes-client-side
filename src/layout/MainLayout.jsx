import React from 'react';
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router";
import Footer from "./Footer.jsx";

const MainLayout = () => {
    return (
        <>
            <Navbar></Navbar>
            <main className="min-h-[calc(100vh-262px)]">
                <Outlet></Outlet>
            </main>
            <Footer></Footer>
        </>
    );
};

export default MainLayout;