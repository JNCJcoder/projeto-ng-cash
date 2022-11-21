import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../services/api';

import Table from '../components/table';

import "./conta.css";
import "./table.css";
import "./form.css";

const Conta: React.FC = () => {
  const [balance, setBalance] = useState('');
  const [creditedUsername, setCreditedUsername] = useState('');
  const [value, setValue] = useState('');
  const [user, setUser] = useState('');
  const [transactionList, setTransactionList] = useState([]);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  let token = localStorage.getItem('token');

  useEffect(() => {
    api.get('/user', {
      headers: { Authorization: token, }
    })
    .then(response => {
      if(response.status !== 200)
      {
        handleLogOut();
        return;
      }
      setBalance(response.data.balance);
      setUser(response.data.username);
      handleTransactionList();
    });
  }, [token]);

  const handleLogOut = () => {
    localStorage.clear();
    setBalance('');
    setUser('');
    setCreditedUsername('');
    setValue('');
    setTransactionList([]);
    setError('');
    token = '';
    navigate('/');
  }

  const handleTransactionList = async () => {
    api.get('/transactions', {
      headers: { Authorization: token, }
    })
    .then(response => {
      setTransactionList(response.data);
    });
  }

  const handleTransaction = async (e: any) => {
    e.preventDefault();
    const data = {
      debitedUsername: user,
      creditedUsername: creditedUsername,
      value: value
    }
    console.log(data);
    try {
      const response = await api.post('/transactions', data, {
        headers: { Authorization: token, }
      });
      console.log(response);
      if(response.status === 201)
      {
        alert('Transação feita com sucesso!!');
        navigate('/');
      }
      else
      {
        throw new Error(response.data.message);
      }
  } catch (error: any) {
      setError(error.message);
  }
  }

  if(!token)
  {
    return <div></div>;
  }

  return (
    <div className='main-conta'>
      <header className='header-conta'>
        <h3>Olá, {user}. seu saldo é <em>R${balance}</em></h3>
        <button className='submit logout' onClick={handleLogOut}>deslogar</button>
      </header>
      <div className='divisor'>
        <section className='createTransaction'>
          <form onSubmit={handleTransaction}>
          <h1>Fazer Transação</h1>
          {error && <p className='error'>{error}</p>}
          <input 
              type="text"
              name="creditedUsername"
              className='textInput'
              onChange={e => setCreditedUsername(e.target.value)}
              required
          />
          <span>Usuario Creditado:</span>
          <br />
          <br />
          <input 
              type="text"
              name="value"
              className='textInput'
              onChange={e => setValue(e.target.value)}
              required
          />
          <span>Valor:</span>
          <br />
          <br />
          <input type="submit" value="Concluir transação" className='submit finish'/>
          </form>
        </section>
        <aside className='transactionList'>
        <h1>Transações</h1>
        <Table data={transactionList} />
        </aside>
      </div>
    </div>
  );
}

export default Conta;