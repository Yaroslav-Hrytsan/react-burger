import React from 'react'
import Categories from '../components/Categories'
import Sort from '../components/Sort'
import ProductList from '../components/ProductsList'

const Home: React.FC = () => {
  return (
    <>
    <div className=' flex justify-between items-center'>
      <Categories />
      <Sort/>
     </div>
     <ProductList/>
     
    </>
  )
}

export default Home
