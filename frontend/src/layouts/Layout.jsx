import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import s from './Layout.module.css';
import Navbar from "../components/Navbar";

export default function Layout() {
    return (
        <div className={s.wrapper}>
            <Navbar />
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}