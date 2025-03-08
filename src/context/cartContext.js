import axios from "axios";
import { createContext, useEffect, useState } from "react";

// Create cart context
export const cartContext = createContext();

// Base API URL
const BASE_URL = "https://ecommerce.routemisr.com/api/v1";

// Cart context provider component
export function CartContextProvider(props) {
    const [cartId, setCartId] = useState(null);
    const [totalCartItem, setTotalCartItem] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    // Function to get headers with token
    const getHeaders = () => {
        return {
            token: localStorage.getItem("userToken")
        };
    };

    // Add product to cart
    const addToCart = async (productId) => {
        try {
            console.log("Adding to cart, product ID:", productId);
            const response = await axios.post(
                `${BASE_URL}/cart`, 
                { productId }, 
                { headers: getHeaders() }
            );
            console.log("Add to cart response:", response);
            return response;
        } catch (error) {
            console.error("Add to cart error:", error);
            throw error;
        }
    };

    // Get cart contents
    const getCart = async () => {
        try {
            const response = await axios.get(
                `${BASE_URL}/cart`, 
                { headers: getHeaders() }
            );
            console.log("Get cart response:", response);
            return response;
        } catch (error) {
            console.error("Get cart error:", error);
            throw error;
        }
    };

    // Remove specific product from cart
    const removeSpecificProductFromCart = async (productId) => {
        try {
            const response = await axios.delete(
                `${BASE_URL}/cart/${productId}`, 
                { headers: getHeaders() }
            );
            console.log("Remove from cart response:", response);
            return response;
        } catch (error) {
            console.error("Remove from cart error:", error);
            throw error;
        }
    };

    // Update product quantity in cart
    const updateProductQuantity = async (productId, count) => {
        try {
            const response = await axios.put(
                `${BASE_URL}/cart/${productId}`, 
                { count }, 
                { headers: getHeaders() }
            );
            console.log("Update quantity response:", response);
            return response;
        } catch (error) {
            console.error("Update quantity error:", error);
            throw error;
        }
    };

    // Online payment checkout
    const onlinePayment = async (shippingAddress) => {
        try {
            const response = await axios.post(
                `${BASE_URL}/orders/checkout-session/${cartId}?url=http://localhost:3000`, 
                { shippingAddress }, 
                { headers: getHeaders() }
            );
            console.log("Checkout response:", response);
            return response;
        } catch (error) {
            console.error("Checkout error:", error);
            throw error;
        }
    };

    // Initialize cart on component mount
    const getInitialCart = async () => {
        setIsLoading(true);
        try {
            if (!localStorage.getItem("userToken")) {
                console.log("No token found, skipping initial cart fetch");
                setIsLoading(false);
                return;
            }
            
            const response = await getCart();
            console.log("Initial cart data:", response.data);
            
            if (response.data) {
                setTotalCartItem(response.data.numOfCartItems || 0);
                setCartId(response.data.data?._id || null);
            }
        } catch (error) {
            console.error("Error fetching initial cart:", error);
            // Don't set cart items to 0 on error
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize cart on mount
    useEffect(() => {
        getInitialCart();
    }, []);

    // Provide context values
    return (
        <cartContext.Provider 
            value={{ 
                addToCart, 
                getCart, 
                removeSpecificProductFromCart, 
                updateProductQuantity, 
                onlinePayment, 
                totalCartItem, 
                setTotalCartItem,
                isLoading,
                cartId
            }}
        >
            {props.children}
        </cartContext.Provider>
    );
}