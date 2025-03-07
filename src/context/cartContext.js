import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const cartContext = createContext();
let headers = {
    token: localStorage.getItem("userToken")
}

function addToCart(id) {
    return axios.post("https://ecommerce.routemisr.com/api/v1/cart", {
        productId: id
    },
        { headers }).then((res) => res).catch((error) => error);
}

function getCart() {
    return axios.get("https://ecommerce.routemisr.com/api/v1/cart",
        { headers }).then((res) => res).catch((error) => error);
}
function removeSpecificProductFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { headers }).then((res) => res).catch((error) => error);
}
function updateProductQuantity(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
        count
    },
        { headers }).then((res) => res).catch((error) => error);
}


export function CartContextProvider(props) {
    let [cartId, setCartId] = useState(null)
    let [totalCartItem, setTotalCartItem] = useState(null)
    function onlinePayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers
        });

    }

    async function getInitialCart() {
        let { data } = await getCart()
        setTotalCartItem(data?.numOfCartItems)
        setCartId(data?.data?._id)
    }

    useEffect(() => {
        getInitialCart()
    }, [])

    return <cartContext.Provider value={{ addToCart, getCart, removeSpecificProductFromCart, updateProductQuantity, onlinePayment, totalCartItem, setTotalCartItem }}>{props.children}</cartContext.Provider>
}