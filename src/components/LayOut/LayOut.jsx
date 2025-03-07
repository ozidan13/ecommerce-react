import React from 'react'
import styles from './LayOut.module.css'
import Footer from '../Footer/Footer.jsx'
import { Outlet } from 'react-router-dom'
import NavBar from '../NavBar/NavBar.jsx'
import { Toaster } from 'react-hot-toast';
export default function LayOut() {
    return (
        <>
            <NavBar />
            <Outlet />
            <Toaster />
            <Footer />
        </>
    )
}
