import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addNewProductAsync, fetchProductByIdAsync, resetProductForm, selectedProductById, upadteProductAsync } from '../../product/productSlice';
import { fetchProductById } from '../../product/productApi';

const AdminProductForm = () => {
    const brands = useSelector(state => state.product.brands)
    const categories = useSelector(state => state.product.categories)
    const selectedProduct = useSelector(selectedProductById)
    const productId = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, reset, setValue, formState: errors } = useForm()
    const formSubmit = (data) => {
        const product = productId.id ? { ...data, id: selectedProduct.id } : { ...data }
        product.images = [product.image1, product.image2, product.image3, product.image4]
        delete product["image1"]
        delete product["image2"]
        delete product["image3"]
        delete product["image4"]
        product.price = +product.price
        product.discountPercentage = +product.discountPercentage
        product.stock = +product.stock
        if (productId.id) dispatch(upadteProductAsync(product))
        else dispatch(addNewProductAsync(product))
        dispatch(resetProductForm())
        reset()
        navigate(`/admin`)
    }

    const handleDelete = () => {
        let product = { ...selectedProduct, deleted: true }
        dispatch(upadteProductAsync(product))
    }
    const handleCancel = () => {
        dispatch(resetProductForm())
        navigate('/admin')
    }


    useEffect(() => {
        if (!!productId.id) {
            dispatch(fetchProductByIdAsync(productId.id))
        }

    }, [productId.id])

    useEffect(() => {
        if (!!selectedProduct) {
            setValue(`title`, selectedProduct?.title)
            setValue(`description`, selectedProduct?.description)
            setValue(`price`, selectedProduct?.price)
            setValue(`stock`, selectedProduct?.stock)
            setValue(`discountPercentage`, selectedProduct?.discountPercentage)
            setValue(`category`, selectedProduct?.category)
            setValue(`brand`, selectedProduct?.brand)
            setValue(`image1`, selectedProduct?.images[0])
            setValue(`image2`, selectedProduct?.images[1])
            setValue(`image3`, selectedProduct?.images[2])
            setValue(`image4`, selectedProduct?.images[3])
            setValue(`thumbnail`, selectedProduct?.thumbnail)
        }

    }, [selectedProduct])


    return (
        <form noValidate onSubmit={handleSubmit(formSubmit)}>
            <div className="space-y-12 bg-white p-5">
                <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Add Product</h2>
                    {/* <p className="mt-1 text-sm leading-6 text-gray-600">
                        This information will be displayed publicly so be careful what you share.
                    </p> */}

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-gray-900">
                                Product Name
                            </label>
                            <div className="mt-2">
                                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                    <input
                                        type="text"
                                        id="title"
                                        {...register("title", { required: "Title is required." })}
                                        autoComplete="title"
                                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="description" className="block text-sm font-medium leading-6 text-gray-900">
                                description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    rows={3}
                                    {...register("description")}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    defaultValue={''}
                                />
                            </div>
                        </div>


                    </div>
                </div>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                            Price
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="price"
                                {...register("price", { required: "Price is required." })}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="discountPercentage" className="block text-sm font-medium leading-6 text-gray-900">
                            Discount
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="discountPercentage"
                                {...register("discountPercentage", { required: "Discount is required." })}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-2 ">
                        <label htmlFor="stock" className="block text-sm font-medium leading-6 text-gray-900">
                            Stock
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="stock"
                                {...register("stock", { required: "Stock is required." })}
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>



                    <div className="sm:col-span-3 sm:col-start-1">
                        <label htmlFor="category" className="block text-sm font-medium leading-6 text-gray-900">
                            Categories
                        </label>
                        <div className="mt-2">
                            <select
                                id="category"
                                autoComplete="category"
                                {...register("category", { required: "Title is required." })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value=''>-choose category-</option>
                                {categories.map(category =>
                                    <option value={category?.value}>{category?.label}</option>
                                )}

                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-3">
                        <label htmlFor="brand" className="block text-sm font-medium leading-6 text-gray-900">
                            Brands
                        </label>
                        <div className="mt-2">
                            <select
                                id="brand"
                                autoComplete="brand"
                                {...register("brand", { required: "Title is required." })}
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                            >
                                <option value=''>-choose brand-</option>
                                {brands.map(brand =>
                                    <option value={brand?.value}>{brand?.label}</option>
                                )}

                            </select>
                        </div>
                    </div>

                    <div className="sm:col-span-4">
                        <label htmlFor="image1" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 1
                        </label>
                        <div className="mt-2">
                            <input
                                id="image1"
                                type="text"
                                {...register("image1")}
                                autoComplete="image1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="image2" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 2
                        </label>
                        <div className="mt-2">
                            <input
                                id="image2"
                                {...register("image2")}
                                type="text"
                                autoComplete="image1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="image3" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 3
                        </label>
                        <div className="mt-2">
                            <input
                                id="image3"
                                {...register("image3")}
                                type="text"
                                autoComplete="image1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="image4" className="block text-sm font-medium leading-6 text-gray-900">
                            Image 4
                        </label>
                        <div className="mt-2">
                            <input
                                id="image4"
                                {...register("image4")}
                                type="text"
                                autoComplete="image1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    <div className="sm:col-span-4">
                        <label htmlFor="thumbnail" className="block text-sm font-medium leading-6 text-gray-900">
                            Thumbnail
                        </label>
                        <div className="mt-2">
                            <input
                                id="thumbnail"
                                {...register("thumbnail")}
                                type="text"
                                autoComplete="image1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>



                </div>

                {/* <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                        We'll always let you know about important changes, but you pick what else you want to hear about.
                    </p>

                    <div className="mt-10 space-y-10">
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">By Email</legend>
                            <div className="mt-6 space-y-6">
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="comments"
                                            name="comments"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="comments" className="font-medium text-gray-900">
                                            Comments
                                        </label>
                                        <p className="text-gray-500">Get notified when someones posts a comment on a posting.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="candidates"
                                            name="candidates"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="candidates" className="font-medium text-gray-900">
                                            Candidates
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate applies for a job.</p>
                                    </div>
                                </div>
                                <div className="relative flex gap-x-3">
                                    <div className="flex h-6 items-center">
                                        <input
                                            id="offers"
                                            name="offers"
                                            type="checkbox"
                                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                        />
                                    </div>
                                    <div className="text-sm leading-6">
                                        <label htmlFor="offers" className="font-medium text-gray-900">
                                            Offers
                                        </label>
                                        <p className="text-gray-500">Get notified when a candidate accepts or rejects an offer.</p>
                                    </div>
                                </div>
                            </div>
                        </fieldset>
                        <fieldset>
                            <legend className="text-sm font-semibold leading-6 text-gray-900">Push Notifications</legend>
                            <p className="mt-1 text-sm leading-6 text-gray-600">These are delivered via SMS to your mobile phone.</p>
                            <div className="mt-6 space-y-6">
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-everything"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-everything" className="block text-sm font-medium leading-6 text-gray-900">
                                        Everything
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-email"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-email" className="block text-sm font-medium leading-6 text-gray-900">
                                        Same as email
                                    </label>
                                </div>
                                <div className="flex items-center gap-x-3">
                                    <input
                                        id="push-nothing"
                                        name="push-notifications"
                                        type="radio"
                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    />
                                    <label htmlFor="push-nothing" className="block text-sm font-medium leading-6 text-gray-900">
                                        No push notifications
                                    </label>
                                </div>
                            </div>
                        </fieldset>
                    </div>
                </div> */}
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
                <button
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900"
                    onClick={handleCancel}
                >

                    Cancel
                </button>
                <button
                    onClick={handleDelete}
                    className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Delete
                </button>
                <button
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    {productId?.id ? "Edit" : "Add"}
                </button>
            </div>
        </form>
    );
};

export default AdminProductForm;
