import { useState } from 'react'
import './App.css'
import Signup from './components/Signup/Signup'
import Login from './components/Login';
import Home from './components/Home';
import { BrowserRouter as Router} from 'react-router-dom';
import {Routes, Route} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <Router>
      <div>
      <Toaster
  position="top-right"
  reverseOrder={false}
/>
        <section className="w-full h-full bg-gray-50 dark:bg-gray-900">                              
            <Routes>                                                                        
              <Route path="/" element={<Home/>}/>
              <Route path="/signup" element={<Signup/>}/>
              <Route path="/login" element={<Login/>}/>
            </Routes>                    
        </section>
      </div>
    </Router>
  )
}

export default App
