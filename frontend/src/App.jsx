import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import NoPage from './pages/NoPage'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import CreateDocs from './pages/CreateDocs'
function App() {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path = "/" element = {isLoggedIn?<Home/>:<Signup/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route path = "/signin" element = {<Signin/>}/>
      <Route path = "/create/:docId" element = {isLoggedIn?<CreateDocs/>:<Navigate to="/signin" />}/>
      <Route path = "*" element = {isLoggedIn?<NoPage/>:<Navigate to="/signin"/>}/>
    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}
export default App
