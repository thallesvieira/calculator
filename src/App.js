import React, { useEffect, useState } from 'react';
import Login from './components/pages/Login';
import Operation from './components/pages/Operation';
import UserRecords from './components/pages/UserRecords';
import { checkToken, getUserBalance, signOut } from './services/APIManager';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Container from './components/layout/Container';
import SignOut from './components/layout/SignOut';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';

function App() {
  const [token, setToken] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userBalance, setUserBalance] = useState(0); 

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      checkToken(storedToken)
      .then(()=> (
        setToken(storedToken),
        setIsLoggedIn(true),
        handleUserBalance(storedToken)
      ))
      .catch(()=> (
        localStorage.removeItem('authToken'),
        setIsLoggedIn(false),
        setToken(''),
        handleCleanStorageRecords(),
        handleCleanStorageDeletedRecords()
      ))
    }
  }, []);

  const handleLogin = async ({type, token}) => {
    const fullToken = type + ' ' +token
    setToken(fullToken);
    localStorage.setItem('authToken', fullToken);      
    setIsLoggedIn(true);
    await handleUserBalance(fullToken);
  };

  const handleLogout = async () => {
    if(token != '') {
      signOut(token)
      .then(()=> (
        localStorage.removeItem('authToken'),
        setIsLoggedIn(false),
        setToken(''),
        handleCleanStorageRecords(),
        handleCleanStorageDeletedRecords()
      ))
    }
  };

  const handleCleanStorageRecords = () => {
    localStorage.removeItem('storedRecordsActives');
    localStorage.removeItem('storedRecordsActivesCurrentPage');
    localStorage.removeItem('storedRecordsActivesTotalPages');
    localStorage.removeItem('storedRecordsActivesPageSize');
    localStorage.removeItem('storedRecordsActivesSearch');
  }

  const handleCleanStorageDeletedRecords = () => {
    localStorage.removeItem('storedOperations');
    localStorage.removeItem('storedRecordsInactives');
    localStorage.removeItem('storedRecordsInactivesCurrentPage');
    localStorage.removeItem('storedRecordsInactivesTotalPages');
    localStorage.removeItem('storedRecordsInactivesPageSize');
    localStorage.removeItem('storedRecordsInactivesSearch');
  }

  const handleUserBalance = (token) => {
    getUserBalance(token)
    .then((balance) => setUserBalance(balance))
  }

  return (
    <div className="app-container">
      {isLoggedIn ? (
        <>
          <Router>
            <Navbar onLogout={handleLogout} balance={userBalance}/>
            {/* <Container customClass="min-height"> */}
            <Routes>
              <Route exact path='/' element={<Home />}></Route>
              <Route path='/operation' element={<Operation token={token} onHandleCleanRecords={handleCleanStorageRecords} onHandleUserBalance={handleUserBalance}/>}></Route>
              <Route path='/records' element={<UserRecords token={token} text={"Records"} areDeletedRecords={false}/>}></Route>
              <Route path='/deleted-records' element={<UserRecords token={token} text={"Deleted Records"} areDeletedRecords={true}/>}></Route>
              <Route path='/sign-out' element={<SignOut onHandleLogout={handleLogout}/>}></Route>
            </Routes>
            {/* </Container> */}
            <Footer />  
          </Router>
        </>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;