import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import api from '../services/api';
import Logo from "../assets/Logo.png";

import "./cadastro.css";
import "./form.css";

const Cadastro: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleHomeButton = () => {
    navigate('/');
  }

  const handleSignUp = async (e: any) => {
    e.preventDefault();
    const data = {
        username: username,
        password: password
    }
    try {
        const response = await api.post('/register', data);
        console.log(response.headers);
        console.log(response.data);
        if(response.status === 401 || response.status === 400)
        {
            throw new Error(response.data.message);
        }
        navigate('/');
    } catch (error: any) {
        setError(error.message);
    }
};
  return (
    <div className='main-cadastro'>
      <form onSubmit={handleSignUp} className="form-cadastro">
      <img src={Logo} alt="Logo" width="200px" className='image image-cadastro'/>
      <h1>Cadastro</h1>
          {error && <p className='error'>{error}</p>}
          <input 
              type="text"
              name="username"
              className='textInput'
              onChange={e => setUsername(e.target.value)}
              required
          />
          <span>usuario</span>
          <br />
          <br />
          <input
              type="password"
              name="password"
              className='textInput'
              onChange={e => setPassword(e.target.value)}
              required
          />
          <span>senha</span>
          <br />
          <br />
          <input type="submit" value="Cadastrar-se" className='submit'/>
          <button className='submit homeButton' onClick={handleHomeButton}>Voltar para pagina principal.</button>
      </form>
    </div>
  );
}

export default Cadastro;