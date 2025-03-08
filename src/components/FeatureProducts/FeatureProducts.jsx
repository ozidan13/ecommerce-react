import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { BallTriangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import { cartContext } from '../../context/cartContext';

export default function FeatureProducts() {
    const [isAddingToCart, setIsAddingToCart] = useState({});
    const { addToCart, setTotalCartItem } = useContext(cartContext);
    const isLoggedIn = localStorage.getItem("userToken") !== null;

    // Function to add product to cart
    async function handleAddToCart(id) {
        if (!isLoggedIn) {
            toast.error('Please sign in to add products to cart', {
                style: { backgroundColor: "orange", color: "#fff" },
            });
            return;
        }

        if (!id) {
            toast.error('Invalid product ID', {
                style: { backgroundColor: "red", color: "#fff" },
            });
            return;
        }

        // Set loading state for this specific product
        setIsAddingToCart(prev => ({ ...prev, [id]: true }));
        
        try {
            console.log("Adding product to cart with ID:", id);
            const response = await addToCart(id);
            console.log("Add to cart response:", response);
            
            if (response.data && response.data.status === "success") {
                setTotalCartItem(response.data.numOfCartItems);
                toast.success('Product added to cart successfully', {
                    style: { backgroundColor: "#0aad0a", color: "#fff" },
                    icon: '👏',
                });
            } else {
                toast.error('Failed to add product to cart', {
                    style: { backgroundColor: "red", color: "#fff" },
                });
            }
        } catch (error) {
            console.error("Error adding to cart:", error);
            toast.error('Error adding to cart. Please try again.', {
                style: { backgroundColor: "red", color: "#fff" },
            });
        } finally {
            // Clear loading state for this specific product
            setIsAddingToCart(prev => ({ ...prev, [id]: false }));
        }
    }

    // Function to fetch all products
    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
            console.log("Products data:", response.data);
            return response.data;
        } catch (error) {
            console.error("Error fetching products:", error);
            throw error;
        }
    };

    // Use React Query to fetch products
    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts
    });

    // Show error state
    if (isError) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">
                    Failed to load products. Please try again.
                    <button 
                        className="btn btn-outline-danger ms-3" 
                        onClick={() => refetch()}
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    // Show loading state
    if (isLoading) {
        return (
            <div className="container my-5 text-center">
                <BallTriangle
                    height={100}
                    width={100}
                    radius={5}
                    color="#4fa94d"
                    ariaLabel="ball-triangle-loading"
                    wrapperClass="justify-content-center"
                    visible={true}
                />
            </div>
        );
    }

    // Show products
    return (
        <div className="container my-5">
            <div className="row">
                {data?.data?.map((product) => (
                    <div key={product._id} className="col-md-2 mb-3">
                        <div className="product p-3 text-center h-100">
                            <Link to={`/details/${product._id}`}>
                                <img 
                                    src={product.imageCover} 
                                    className='w-100' 
                                    alt={product.title} 
                                />
                                <p className='text-main'>{product.category.name}</p>
                                <h3 className='h6'>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                                <div className='d-flex justify-content-between'>
                                    <p>{product.price} EGP</p>
                                    <p>
                                        <i className="fa-solid fa-star rating-color"></i>
                                        {product.ratingsAverage}
                                    </p>
                                </div>
                            </Link>
                            {isLoggedIn ? (
                                <button 
                                    onClick={() => handleAddToCart(product._id)} 
                                    className='bg-main rounded text-white d-block me-auto w-75 m-auto'
                                    disabled={isAddingToCart[product._id]}
                                >
                                    {isAddingToCart[product._id] ? (
                                        <><i className="fa fa-spinner fa-spin me-2"></i>Adding...</>
                                    ) : (
                                        'Add to cart'
                                    )}
                                </button>
                            ) : (
                                <Link to="/signin" className='btn btn-outline-secondary d-block me-auto w-75 m-auto'>
                                    Sign in to add to cart
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
