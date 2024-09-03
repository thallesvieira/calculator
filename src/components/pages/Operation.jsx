import React, { useState, useEffect } from 'react';
import styles from './Operation.module.css';
import { getOperations, realizeOperation } from '../../services/APIManager';
import Error from '../layout/Error';
import Result from '../layout/Result';
import FormGroup from '../form/FormGroup';
import Button from '../form/Button';
import Select from '../form/Select';

function Operation({ token, onHandleUserBalance, onHandleCleanRecords }) {
  const [operations, setOperations] = useState([]);
  const [selectedOperation, setSelectedOperation] = useState('');
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedOperations = localStorage.getItem('storedOperations');

    if (!storedOperations) { // Only fetch if no operations are found in localStorage
      getOperations(token)
      .then((data) =>  {
        setOperations(data);
        // Save the fetched operations to localStorage
        localStorage.setItem('storedOperations', JSON.stringify(data));
        setSelectedOperation(data[0].name);
      })
      .catch((err)=> {
        // Set error and show to uer if API return a error
        setError(err.response.data.message);
        setResult(null);
      });
    } else {
      const parsedOperations = JSON.parse(storedOperations);
      setOperations(parsedOperations);
      setSelectedOperation(parsedOperations[0].name);
    }
  }, [token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);
    
    const operationType = operations.find(op => op.name === selectedOperation)?.type;
    
    realizeOperation(token, number1, number2, operationType)
    .then((response)=> (
      setResult(response),
      onHandleUserBalance(token),
      onHandleCleanRecords()      
    ))
    .catch((err)=> (
      setError(err.response.data.message),
      setResult(null)
    ));
  };

  return (
    <div className={`${styles.operation_container} card`}>
      <div className="card-body">
        <h3 className="card-title">New Operation</h3>
        <form className={styles.form_operation} onSubmit={handleSubmit}>
          <Select 
          text={"Operation:"}
          options={operations} 
          selectedOption={selectedOperation}
          onHandleOnChange={setSelectedOperation}/> 
          <FormGroup 
            text="Number 1(optional for Random String):" 
            type="number" 
            disabled={selectedOperation === 'RANDOM STRING'} 
            onHandleSetValue={setNumber1} 
            value={number1} />
          <FormGroup 
            text="Number 2 (optional for Square Root and Random String):" 
            type="number" 
            disabled={selectedOperation === 'SQUARE ROOT' || selectedOperation === 'RANDOM STRING'}
            onHandleSetValue={setNumber2} 
            value={number2} />
          <Button type="submit" btnClass="btn btn-primary" text="Realize Operation" />
        </form>
        {result !== null && <Result result={result} />}
        {error &&  <Error message={error}/>}
      </div>
    </div>
  );
}

export default Operation;