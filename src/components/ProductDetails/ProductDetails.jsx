import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useContext } from 'react'
import { BallTriangle } from 'react-loader-spinner';
import { useParams } from 'react-router-dom'
import Slider from 'react-slick';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    let settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    let params = useParams()
    function getSpecificProduct(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    }
    const { data, isLoading } = useQuery({
        queryKey: ["specificProduct"],
        queryFn: () => getSpecificProduct(params.id)
    });
    // console.log(data?.data?.data);

    let { addToCart, setTotalCartItem } = useContext(cartContext)
    async function addCart(id) {
        let res = await addToCart(id)
        // console.log(res);
        if (res.data.status == "success") {
            setTotalCartItem(res.data.numOfCartItems)
            toast.success('product added to cart success', {
                style: { backgroundColor: "#0aad0a", color: "#fff" },
                icon: '👏',
            });
        } else {
            toast.error('product not added to cart', {
                style: { backgroundColor: "red", color: "#fff" },
            });
        }
    }
    return (
        <>
            <div className="container my-5">
                {isLoading ? <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass="justify-content-center"
                    visible={true}
                /> : <div className="row  align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {data.data.data.images.map((ele, index) => <img className='w-100' key={index} src={ele} alt="" />)}
                        </Slider>
                    </div>

                    <div className="col-md-7">
                        <h3>{data?.data?.data?.title}</h3>
                        <p>{data?.data?.data?.description}</p>
                        <p>{data?.data?.data?.category?.name}</p>
                        <div className='d-flex justify-content-between'>
                            <p>{data?.data?.data?.price}EGP</p>
                            <p>
                                <i class="fa-solid fa-star rating-color"></i>
                                {data?.data?.data?.ratingsAverage}
                            </p>
                        </div>
                        <button onClick={() => addCart(data?.data?.data.id)} className='bg-main rounded text-white d-block  py-1 w-100'>add to cart</button>
                    </div>
                </div>}

            </div>
        </>
    )
}
