import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';
import Logo from "../assets/Logo.png";

import './home.css';
import "./form.css";

const Home: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    useEffect(() => {
        if(token)
        {
            navigate('/conta');
        }
    },[token]);

    const handleSignInButton = () => {
        navigate("/cadastro");
    }

    const handleSignUp = async (e: any) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        }
        try {
            const response = await api.post('/login', data);
            if(response.status === 401 || response.status === 400)
            {
                throw new Error(response.data.message);
            }
            localStorage.setItem('token', 'Bearer ' + response.data.token);
            navigate("/conta");
        } catch (error: any) {
            setError(error.message);
        }
    };

  return (
    <div className='main'>
        <section />
        <aside>
            <img src={Logo} alt="Logo" width="200px" className='image'/>
            <form onSubmit={handleSignUp}>
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
                <input type="submit" value="Logar" className='submit'/>
            </form>
            <button className='submit' onClick={handleSignInButton}>Cadastrar-se</button>
        </aside>
    </div>
  );
}

export default Home;