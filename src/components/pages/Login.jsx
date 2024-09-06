import React, { useState } from 'react';
import styles from './Login.module.css';
import { authenticate } from '../../services/APIManager';
import Error from '../layout/Error';
import Button from '../form/Button';
import FormGroup from '../form/FormGroup';

function Login({ onLogin, onHandleLoading }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  onHandleLoading();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    authenticate(username, password)
    .then((data)=> onLogin(data))
    .catch((err)=> (
        console.log(err),
        setError('Login failed. Please check your credentials.')
    ));
  };

  return (
    <div className={`${styles.login_container} card`}>
      <div className="card-body">
        <h3 className="card-title">Login</h3>
        <form className={styles.form_login} onSubmit={handleSubmit}>
          <FormGroup
            text="Username" 
            type="email" 
            disabled={false}
            onHandleSetValue={setUsername} 
            value={username} />
          <FormGroup
            text="Password" 
            type="password" 
            disabled={false}
            onHandleSetValue={setPassword} 
            value={password} />
          <Button type="submit" btnClass="btn btn-primary" text="Login" />
          {error && <Error message={error} />}
        </form>
      </div>
    </div>
  );
}

export default Login;