import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'

const ProductDetailPage = () => {
  return (
    <div>
      <Navbar>

        <AdminProductDetail />
      </Navbar>
      
    </div>
  )
}

export default ProductDetailPage
