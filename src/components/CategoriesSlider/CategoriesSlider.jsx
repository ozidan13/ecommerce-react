import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';

export default function CategoriesSlider() {
    let settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1
    };
    
    let [categories, setCategories] = useState([])
    async function getCategories() {
        let { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/categories")
        // console.log(data.data);
        setCategories(data.data)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <>
            <div className="container my-5">
                <h2>Shoo Populer Categories</h2>
                <Slider {...settings}>
                    {categories.map((category) =>
                        <div className="category px-1" key={category.id}>
                            <img className='w-100' height={200} src={category.image} alt="" />
                            <h5>{category.name}</h5>
                        </div>)}
                </Slider>
            </div>
        </>
    )
}
