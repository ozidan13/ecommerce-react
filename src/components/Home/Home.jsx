import React from 'react'
import Carts from '../Carts/Carts'
import Categories from '../Categories/Categories'
import { Helmet } from "react-helmet";
import MainSlider from '../MainSlider/MainSlider'
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider'
import FeatureProducts from '../FeatureProducts/FeatureProducts';
export default function Home() {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
      </Helmet>
      <MainSlider />
      <CategoriesSlider />
      <FeatureProducts />
    </>
  )
}
