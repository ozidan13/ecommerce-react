import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom'
import { BallTriangle } from 'react-loader-spinner';
import Slider from 'react-slick';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

export default function ProductDetails() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    
    // Get the product ID from URL params
    const { id } = useParams();
    
    // Get cart context
    const { addToCart, setTotalCartItem } = useContext(cartContext);
    
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    
    // Fetch product details
    useEffect(() => {
        async function fetchProductDetails() {
            setLoading(true);
            setError(null);
            
            try {
                console.log("Fetching product with ID:", id);
                const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
                console.log("Product data:", response.data);
                
                if (response.data && response.data.data) {
                    setProduct(response.data.data);
                } else {
                    setError("Product data not found");
                }
            } catch (err) {
                console.error("Error fetching product:", err);
                setError("Failed to load product details. Please try again.");
            } finally {
                setLoading(false);
            }
        }
        
        if (id) {
            fetchProductDetails();
        }
    }, [id]);
    
    // Add to cart function
    async function handleAddToCart(productId) {
        if (!productId) {
            toast.error('Invalid product ID', {
                style: { backgroundColor: "red", color: "#fff" },
            });
            return;
        }
        
        setIsAddingToCart(true);
        
        try {
            console.log("Adding to cart, product ID:", productId);
            const response = await addToCart(productId);
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
        } catch (err) {
            console.error("Error adding to cart:", err);
            toast.error('Error adding to cart. Please try again.', {
                style: { backgroundColor: "red", color: "#fff" },
            });
        } finally {
            setIsAddingToCart(false);
        }
    }
    
    // Show loading state
    if (loading) {
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
    
    // Show error state
    if (error) {
        return (
            <div className="container my-5">
                <div className="alert alert-danger">{error}</div>
            </div>
        );
    }
    
    // Show product not found
    if (!product) {
        return (
            <div className="container my-5">
                <div className="alert alert-warning">Product not found</div>
            </div>
        );
    }
    
    // Show product details
    return (
        <div className="container my-5">
            <div className="row align-items-center">
                <div className="col-md-4">
                    {product.images && product.images.length > 0 ? (
                        <Slider {...settings}>
                            {product.images.map((image, index) => (
                                <img 
                                    className='w-100' 
                                    key={index} 
                                    src={image} 
                                    alt={`Product image ${index + 1}`} 
                                />
                            ))}
                        </Slider>
                    ) : (
                        <img 
                            className='w-100' 
                            src={product.imageCover} 
                            alt="Product cover" 
                        />
                    )}
                </div>

                <div className="col-md-7">
                    <h3>{product.title}</h3>
                    <p>{product.description}</p>
                    <p>{product.category?.name}</p>
                    <div className='d-flex justify-content-between'>
                        <p>{product.price} EGP</p>
                        <p>
                            <i className="fa-solid fa-star rating-color"></i>
                            {product.ratingsAverage}
                        </p>
                    </div>
                    <button 
                        onClick={() => handleAddToCart(product._id)} 
                        className='bg-main rounded text-white d-block py-1 w-100'
                        disabled={isAddingToCart}
                    >
                        {isAddingToCart ? (
                            <><i className="fa fa-spinner fa-spin me-2"></i>Adding...</>
                        ) : (
                            'Add to cart'
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
