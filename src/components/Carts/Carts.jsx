import React, { useContext, useEffect, useState } from 'react'
import styles from './Carts.module.css'
import Categories from '../Categories/Categories'
import { Helmet } from 'react-helmet'
import { cartContext } from '../../context/cartContext'
import { BallTriangle } from 'react-loader-spinner'
import axios from 'axios'
import { Link } from 'react-router-dom'
export default function Carts(props) {

    let [cart, setCart] = useState({})
    let { getCart, removeSpecificProductFromCart, updateProductQuantity,setTotalCartItem } = useContext(cartContext)
    async function getCartDetails() {
        let { data } = await getCart()
        setTotalCartItem(data.numOfCartItems)
        setCart(data)
    }

    async function deleteProductFromCart(id) {
        let { data } = await removeSpecificProductFromCart(id)
        setCart(data)
        setTotalCartItem(data.numOfCartItems)
    }

    async function updateProductCount(id, count) {
        let { data } = await updateProductQuantity(id, count)
        console.log(data);
        data.data.products.map((ele) => {
            if (ele.count == 0) {
                deleteProductFromCart(ele.product._id)
            }
        })
        setCart(data)
    }




    useEffect(() => {
        getCartDetails()
    }, [])

    return (
        <>
            <Helmet>
                <title>Carts Page</title>
            </Helmet>
            <div className="container my-5">
                {cart.data ? <div className="w-75 mx-auto bg-main-light p-5">
                    <h3>Cart Shop</h3>
                    <div className='d-flex justify-content-between align-items-center my-3'>
                        <h3 className='h5'>Total Price : <span className='text-main'>{cart?.data?.totalCartPrice} EGP</span></h3>
                        <h3 className='h5'>Total Numbers : <span className='text-main'>{cart?.numOfCartItems}</span></h3>
                    </div>

                    {cart.data.products.map((ele) => <div key={ele._id} className="row py-3 border-bottom">
                        <div className="col-md-2">
                            <img className='w-100' src={ele.product.imageCover} alt="" />
                        </div>
                        <div className="col-md-10">
                            <div className="d-flex justify-content-between align-items-center'">
                                <div>
                                    <h4>{ele.product.title.split(" ").slice(0, 3).join(" ")}</h4>
                                    <p>{ele.price} EGP</p>
                                    <button onClick={() => deleteProductFromCart(ele.product._id)} className='text-danger p-0'><i class="fa-solid fa-trash-can"></i> Remove</button>
                                </div>
                                <div>
                                    <button onClick={() => updateProductCount(ele.product._id, ele.count - 1)} className='btn bg-danger text-white'>-</button>
                                    <span className='mx-2'>{ele.count}</span>
                                    <button onClick={() => updateProductCount(ele.product._id, ele.count + 1)} className='btn bg-main text-white'>+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    )}
                    <Link className='btn bg-main w-100 mt-5 text-white' to={'/checkout'}>Go To CheckOut</Link>

                </div> : <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center"
                    visible={true}
                />}
            </div>
        </>
    )
}
