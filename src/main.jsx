import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Route, RouterProvider, createBrowserRouter, createRoutesFromChildren } from 'react-router-dom'
import Home from './components/Home.jsx'
import Detail from './components/Detail.jsx'
import Layout from './Layout.jsx'
import Hourly from './components/Hourly.jsx'

import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import Forecast from './components/Forecast.jsx'

const router = createBrowserRouter(
  createRoutesFromChildren(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='detail' element={<Detail />} />
      <Route path='hourly' element={<Hourly />} />
      <Route path='forecast' element={<Forecast />} />
    </Route>
  )
)

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:<Layout/>,
//     children:[
//       {
//         path:"",
//         element:<Home/>
//       },
//       {
//         path:"detail",
//         element:<Detail/>
//       }
//     ]
//   }
// ])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
