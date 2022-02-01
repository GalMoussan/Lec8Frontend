import './App.css';
import UserSignUpPage from './pages/UserSignUpPage';
import Hello from './pages/Hello';
import { ReactFragment } from 'react'
import * as apiCalls from './Api/ApiCalls'
import LoginPage from './pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainHeader from './components/MainHeader';
import HomePage from './pages/HomePage';
import OtherPage from './pages/OtherPage';

function App() {
  const actions = {
    postLogin: apiCalls.login,
    postSignUp: apiCalls.signUp

  }
  return (


    <BrowserRouter>
      <MainHeader />

      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/other" element={<OtherPage/>} />
        <Route path="/login" element={<LoginPage actions={actions}/>} />
        <Route path="/signup" element={<UserSignUpPage actions={actions}/>} />
      </Routes>


    </BrowserRouter>


  );
}

export default App;
