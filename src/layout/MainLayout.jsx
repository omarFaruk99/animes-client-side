import React from 'react';
import Navbar from "./Navbar.jsx";
import {Outlet} from "react-router";

const MainLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main>
                <Outlet></Outlet>
            </main>
            <footer></footer>
        </div>
    );
};

export default MainLayout;