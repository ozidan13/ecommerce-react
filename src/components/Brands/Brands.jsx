import React, { createContext, use, useContext, useState } from 'react'
import styles from './Brands.module.css'
import { Helmet } from 'react-helmet'

export default function Brands() {
    return (
        <>
        <Helmet>
            <title>Brands Page</title>
        </Helmet>
            <h2>Brands</h2>
        </>
    )
}
