import react from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import LoginPage from './Pages/Login'
import SignUpPage from './Pages/Signup'
import Landing from './Pages/Landing'
import Home from './Pages/Home'


function App() {


  return (
    <>
       
     <BrowserRouter>
        <Routes>
        <Route path="/" element={<Landing/>}/>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/home" element={<Home/>}/>
        </Routes>
     
     
     </BrowserRouter>
    </>
  )
}

export default App