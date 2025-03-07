import React, { useContext, useState } from 'react'
import styles from './Signin.module.css'
import { useFormik } from 'formik'
import axios from 'axios';
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom';
import { tokenContext } from '../../context/token';
export default function Signin() {
    let [errors, setErrors] = useState('')
    let [isLoading, setIsLoading] = useState(false)
    let { setToken } = useContext(tokenContext)

    let navigate = useNavigate()

    async function callLogin(reBody) {
        try {
            setIsLoading(false)
            setErrors("")
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', reBody)
                .catch(
                    (err) => {
                        setIsLoading(true)
                        setErrors(err.response.data.message)
                    }
                )
            if (data.message === "success") {
                setIsLoading(false)
                navigate('/home')
                localStorage.setItem("userToken", data.token)
                setToken(data.token)
            }
            console.log(data);
        }
        catch (error) {
            console.log("error", error);
        }

    }
    const validationSchema = Yup.object({
        email: Yup.string().email("email not valid").required("email is required"),
        password: Yup.string().matches(/^[A-Z a-z 0-9]{3,8}$/, "passowrd not valid").required("passowrd is requird")
    })

    let loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: callLogin
    })

    return (
        <>
            <div className="container w-50 mx-auto my-5">
                {errors ? <div className='bg-danger text-white p-3 text-center rounded'>{errors}</div> : null}
                <h2 className='mb-3'>LogIn Now :</h2>
                <form onSubmit={loginForm.handleSubmit}>

                    <div className="form-groupe">
                        <label htmlFor="email">Email :</label>
                        <input type="text" className='form-control mb-3' value={loginForm.values.email} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} id='email' name='email' />
                        {loginForm.errors.email && loginForm.touched.email ? <div className='alert alert-danger'>{loginForm.errors.email}</div> : null}
                    </div>

                    <div className="form-groupe">
                        <label htmlFor="password" className='mb-1'>Password:</label>
                        <input type="password" id='password' name='password' value={loginForm.values.password} onChange={loginForm.handleChange} onBlur={loginForm.handleBlur} className='form-control mb-3' />
                        {loginForm.errors.password && loginForm.touched.password ? <div className='alert alert-danger'>{loginForm.errors.password}</div> : null}
                    </div>
                    <button className='btn bg-main text-white' disabled={!(loginForm.isValid && loginForm.dirty)}>{isLoading ? <i class="fa fa-spinner fa-spin"></i> : "LogIn"}</button>
                </form>
            </div>
        </>
    )
}

