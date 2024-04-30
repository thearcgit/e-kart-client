import React from 'react'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-purple-700 to-pink-500">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <p className="text-lg text-white mb-8">Oops! The page you're looking for could not be found.</p>
        <Link to="/" className="bg-white text-purple-700 hover:bg-purple-700 hover:text-white py-2 px-6 rounded-lg transition duration-300">Go to Home</Link>
      </div>
      <div className="absolute bottom-0 w-full text-center pb-8">
        <p className="text-white opacity-50">Illustration by <a href="https://www.freepik.com/vectorkhazana" target="_blank" rel="noopener noreferrer" className="underline">vectorkhazana</a> on Freepik</p>
      </div>
    </div>
      
    </>
  )
}

export default PageNotFound
