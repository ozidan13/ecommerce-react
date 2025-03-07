import { useFormik } from 'formik'
import React, { useContext } from 'react'
import { cartContext } from '../../context/cartContext';

export default function CheckOut() {
  let { onlinePayment } = useContext(cartContext)
  async function payment(values) {
    let { data } = await onlinePayment(values)
    console.log(data);
    window.location.href=data.session.url
  }
  let formik = useFormik({
    initialValues: {
      "details": "",
      "phone": "",
      "city": ""
    },
    onSubmit: payment
  })
  return (
    <div className="container my-5">
      <h2 className='mb-3'>Shipping address</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="details" className='mb-2'>Details:</label>
          <input type="text" id='details' name='details' value={formik.values.details} onChange={formik.handleChange} className='form-control' />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="phone" className='mb-2'>Phone:</label>
          <input type="text" id='phone' name='phone' value={formik.values.phone} onChange={formik.handleChange} className='form-control' />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="city" className='mb-2'>City:</label>
          <input type="text" id='city' name='city' value={formik.values.city} onChange={formik.handleChange} className='form-control' />
        </div>
        <button className='btn bg-main w-100 text-white'>Payment Now</button>
      </form>
    </div>
  )
}
