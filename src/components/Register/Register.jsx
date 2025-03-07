import styles from './Rigister.module.css'
import axios from 'axios'
import { useFormik } from 'formik'
import { useState } from 'react'
import { Helmet } from 'react-helmet'
import { data, useNavigate } from 'react-router-dom'
import * as Yup from 'yup'
export default function Register() {
    let navigate = useNavigate()
    let [errors, setErrors] = useState('')
    let [isLoading, setIsLoading] = useState(false)


    async function callRegister(reqBody) {
        try {
            setErrors("")
            setIsLoading(true)
            let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', reqBody)
                .catch(
                    (err) => {
                        setIsLoading(false)
                        setErrors(err.response.data.message)
                    }
                )

            if (data.message === "success") {
                setIsLoading(false)
                navigate('/signin')
            }
            console.log("success", data);
        }
        catch (error) {
            console.log("error", error);
        }

    }


    const validationSchema = Yup.object({
        name: Yup.string().min(3, "name is too short").required("name is required"),
        email: Yup.string().email("email not valid").required("email is required"),
        password: Yup.string().matches(/^[A-z0-9]{3,8}$/, "passowrd not valid").required("passowrd is requird"),
        rePassword: Yup.string().oneOf([Yup.ref('password')], "passord and rePassword not match").required("passowrd is requird"),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "phone not valid").required("phone required")
    })

    let register = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            rePassword: "",
            phone: ""
        },
        validationSchema,
        onSubmit: callRegister
    })



    return (
        <>
            <Helmet>
                <title>Rigester Page</title>
            </Helmet>
            <div className="container w-50 mx-auto my-5">
                <h2 className='mb-3'>Rigister Now :</h2>
                <form onSubmit={register.handleSubmit}>
                    <div className="form-groupe">
                        <label htmlFor="fullName" className='mb-1'>Full Name :</label>
                        <input type="text" id='fullName' name='name' value={register.values.name} onChange={register.handleChange} onBlur={register.handleBlur} className='form-control mb-3' />
                        {register.errors.name && register.touched.name ? <div className='alert alert-danger'>{register.errors.name}</div> : null}
                    </div>
                    <div className="form-groupe">
                        <label htmlFor="email" className='mb-1'>Email :</label>
                        <input type="text" id='email' name='email' value={register.values.email} onChange={register.handleChange} onBlur={register.handleBlur} className='form-control mb-3' />
                        {register.errors.email && register.touched.email ? <div className='alert alert-danger'>{register.errors.email}</div> : null}
                    </div>
                    <div className="form-groupe">
                        <label htmlFor="password" className='mb-1'>Password:</label>
                        <input type="password" id='password' name='password' value={register.values.password} onChange={register.handleChange} onBlur={register.handleBlur} className='form-control mb-3' />
                        {register.errors.password && register.touched.password ? <div className='alert alert-danger'>{register.errors.password}</div> : null}
                    </div>
                    <div className="form-groupe">
                        <label htmlFor="rePassword" className='mb-1'>rePassword :</label>
                        <input type="password" id='rePassword' name='rePassword' value={register.values.rePassword} onChange={register.handleChange} onBlur={register.handleBlur} className='form-control mb-3' />
                        {register.errors.rePassword && register.touched.rePassword ? <div className='alert alert-danger'>{register.errors.rePassword}</div> : null}
                    </div>
                    <div className="form-groupe">
                        <label htmlFor="phone" className='mb-1'>Phone :</label>
                        <input type="text" id='phone' name='phone' value={register.values.phone} onChange={register.handleChange} onBlur={register.handleBlur} className='form-control mb-3' />
                        {register.errors.phone && register.touched.phone ? <div className='alert alert-danger'>{register.errors.phone}</div> : null}
                    </div>
                    {errors ? <div className='bg-danger p-3 text-white text-center mb-3'>{errors}</div> : null}
                    <button className='btn bg-main text-white d-block ms-auto' disabled={!(register.isValid && register.dirty)}>{isLoading ? <i class="fa fa-spinner fa-spin"></i> : 'Register'} </button>
                </form>
            </div>
        </>
    )
}
