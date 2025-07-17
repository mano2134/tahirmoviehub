import { createBrowserRouter, RouterProvider } from 'react-router'
import './App.css'
import Layout from './components/Layout/Layout'
import About from './components/Pages/About'
import Home from './components/Pages/Home'
import WatchLists from './components/Pages/WatchLists'
import Footer from './components/Pages/Footer'
import { useState } from 'react'
import PageError from './components/UI/PageError'
import MovieDtails from './components/UI/MovieDtails'
import ContactUs from './components/Pages/ContactUs'
/*** ?api------>> http://www.omdbapi.com/?s=titanic&apikey=f5cc863a */

function App() {
  const [MovieArr, setMovieArr] = useState([]);
  

  const router = createBrowserRouter([
    {
      Path:"/",
      element:<Layout />,
      errorElement:<PageError/>,
      children:[
        {
          path:"/",
          element:<Home MovieArr={MovieArr} setMovieArr={setMovieArr}/>
        },
        {
          path:"/:id",
          element:<MovieDtails />
        },
        {
          path:"/watchLists",
          element:<WatchLists MovieArr={MovieArr}/>
        },
         {
          path:"/about",
          element:<About/>
        },
         {
          path:"/contact",
          element:<ContactUs/>,
          children:[{
            path:"",
            element:<Footer/>
          }]
        },
      ]
    }
  ])
  

  return <RouterProvider router={router} />
}

export default App
