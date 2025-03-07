import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { useContext, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { BallTriangle } from 'react-loader-spinner'
import { Link } from 'react-router-dom';
import { cartContext } from '../../context/cartContext';


export default function FeatureProducts() {
    let { addToCart, getCart, setTotalCartItem } = useContext(cartContext)

    async function addCart(id) {
        let res = await addToCart(id)
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


    function getAllProducts() {
        return axios.get("https://ecommerce.routemisr.com/api/v1/products")
    }

    const { data, error, isLoading, isFetching } = useQuery({
        queryKey: ["featureProducts"],
        queryFn: getAllProducts
    });

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
                /> : <div className="row">
                    {data?.data?.data.map((product) => <div key={product.id} className="col-md-2">
                        <div className="product p-3 text-center">
                            <Link to={`details/${product.id}`}>
                                <img src={product.imageCover} className='w-100' alt={product.title} />
                                <p className='text-main'>{product.category.name}</p>
                                <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                <div className='d-flex justify-content-between'>
                                    <p>{product.price}EGP</p>
                                    <p>
                                        <i class="fa-solid fa-star rating-color"></i>
                                        {product.ratingsAverage}
                                    </p>
                                </div>
                            </Link>
                            <button onClick={() => addCart(product.id)} className='bg-main rounded text-white d-block me-auto w-75 m-auto'>add to cart</button>
                        </div>
                    </div>)}
                </div>}
            </div>
        </>
    )
}
