import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Signup from './pages/signup';
import Signin from './pages/signin';
import Home from './pages/home';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  (sessionStorage.getItem('logged'))
    ? (
      <BrowserRouter>
        <Routes>
          <Route exact path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    )
    : (
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Signin />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    )
);
=======
import Signin from './pages/signin';
import Home from './pages/home';
import Admin from './pages/admin';
import Adduser from './pages/adduser';


const root = ReactDOM.createRoot(document.getElementById('root'));

const sessionData = JSON.parse(sessionStorage.getItem('true'));
const role = sessionData?.user?.role;

root.render(
  role === 'admin' ? (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Admin />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/adduser' element={<Adduser />} />
      </Routes>
    </BrowserRouter>
  ) : role === 'user' ? (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />
      </Routes>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Signin />} />
      </Routes>
    </BrowserRouter>
  )
);
>>>>>>> ae23ec7f2d08608c6b6861fab13a9871a71eca7f
