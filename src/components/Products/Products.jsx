import React from 'react'
import styles from './Products.module.css'
import { Helmet } from 'react-helmet';
export default function Products() {
    function search(formData) {
        const name = formData.get("name");
        console.log(`you search for ${name}`);
        const email = formData.get("email");
        console.log(`you search for ${email}`);


    }
    return (
        <>
            <Helmet>
                <title>Products Page</title>
            </Helmet>
            <div>products</div>
        </>

    )
}
