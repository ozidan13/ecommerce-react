import React from 'react'
import styles from './NotFound.module.css'
import notfound from '../../assets/images/error.svg'
export default function NotFound() {
    return (
        <div className='text-center my-5'>
            <h2>NotFound</h2>
            <img src={notfound}  alt="notfound image" />
        </div>
    )
}
