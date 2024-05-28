import React from 'react'
import ProductDetail from '../features/product/components/ProductDetail'
import Navbar from '../features/navbar/Navbar'
import AdminProductDetail from '../features/admin/components/AdminProductDetail'
import AdminProductForm from '../features/admin/components/AdminProductForm'

const AdminProductFormPage = () => {
  return (
    <div>
      <Navbar>

        <AdminProductForm />
      </Navbar>
      
    </div>
  )
}

export default AdminProductFormPage