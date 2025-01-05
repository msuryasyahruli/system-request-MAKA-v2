import React from 'react'
import ReactDOM from 'react-dom/client'
import { Navigate, RouterProvider,createBrowserRouter } from 'react-router-dom'
import Dasboard from './pages/Dasboard'
import Request from './pages/Request'
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'

const router = createBrowserRouter([
  {path:"/",element:<Navigate to="/system-request/dasboard"/>},
  {path:"/system-request/dasboard",element:<Dasboard/>},
  {path:"/request/pickup-part-import",element:<Request/>}
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
)
