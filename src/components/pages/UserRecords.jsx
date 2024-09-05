import React, { useState, useEffect } from 'react';
import Pagination from '../layout/Pagination'
import { getUserRecords, inactivateUserRecord } from '../../services/APIManager';
import styles from './UserRecords.module.css';
import Error from '../layout/Error';
import Table from '../layout/Table';
import Button from '../form/Button';

function UserRecords({ token, areDeletedRecords, text }) {
  const [search, setSearch] = useState('');
  const [records, setRecords] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [error, setError] = useState('');
  const [recharge, setRecharge] = useState(false);

  useEffect(() => {
    setError(null);
    //Check if exists records in localstorage
    const storageRecords = (areDeletedRecords 
      ? localStorage.getItem('storedRecordsInactives') 
      : localStorage.getItem('storedRecordsActives'));

    if(!storageRecords) {
      getUserRecords(token, search, currentPage, pageSize, areDeletedRecords)
      .then((data)=> (
        setRecords(data.content),
        setTotalPages(data.totalPages),
        handleSaveLocalStorage(data)
      ))
      .catch((err)=> (
        setError(err.response.data.message),
        setRecords([])
      ))
    } else {
      handleRechargeHooks();
      const parseRecords = JSON.parse(storageRecords);
      setRecords(parseRecords.content);
      setTotalPages(parseRecords.totalPages);
    }
  }, [currentPage, pageSize, areDeletedRecords, recharge]);

  const handleSaveLocalStorage = (data) => {
    if(areDeletedRecords){
      localStorage.setItem('storedRecordsInactives', JSON.stringify(data));
      localStorage.setItem('storedRecordsInactivesCurrentPage', parseInt(currentPage));
      localStorage.setItem('storedRecordsInactivesTotalPages', parseInt(totalPages));
      localStorage.setItem('storedRecordsInactivesPageSize', parseInt(pageSize));
      localStorage.setItem('storedRecordsInactivesSearch', search);
    } else {
      localStorage.setItem('storedRecordsActives', JSON.stringify(data));
      localStorage.setItem('storedRecordsActivesCurrentPage', parseInt(currentPage));
      localStorage.setItem('storedRecordsActivesTotalPages', parseInt(totalPages));
      localStorage.setItem('storedRecordsActivesPageSize', parseInt(pageSize));
      localStorage.setItem('storedRecordsActivesSearch', search);
    }
  }

  const handleRechargeHooks = () => {
    if(areDeletedRecords){
      setCurrentPage(localStorage.getItem('storedRecordsInactivesCurrentPage'));
      setTotalPages(localStorage.getItem('storedRecordsInactivesTotalPages'));
      setPageSize(localStorage.getItem('storedRecordsInactivesPageSize'));
      setSearch(localStorage.getItem('storedRecordsInactivesSearch'));
    } else {
      setCurrentPage(localStorage.getItem('storedRecordsActivesCurrentPage'));
      setTotalPages(localStorage.getItem('storedRecordsActivesTotalPages'));
      setPageSize(localStorage.getItem('storedRecordsActivesPageSize'));
      setSearch(localStorage.getItem('storedRecordsActivesSearch'));
    }
  }

  const handleCleanStorage = (all) => {
    if(areDeletedRecords || all){
      localStorage.removeItem('storedRecordsInactives');
      localStorage.removeItem('storedRecordsInactivesCurrentPage');
      localStorage.removeItem('storedRecordsInactivesTotalPages');
      localStorage.removeItem('storedRecordsInactivesPageSize');
      localStorage.removeItem('storedRecordsInactivesSearch');
    } 
    if(!areDeletedRecords || all) {
      localStorage.removeItem('storedRecordsActives');
      localStorage.removeItem('storedRecordsActivesCurrentPage');
      localStorage.removeItem('storedRecordsActivesTotalPages');
      localStorage.removeItem('storedRecordsActivesPageSize');
      localStorage.removeItem('storedRecordsActivesSearch');
    }
  }

   

  const handlePageSize = (size) => {
    if (size !== pageSize) {
      setPageSize(parseInt(size));
      handleCleanStorage(false);
    }
  }
 
  const handleCurrentPage = (page) => {
    if (page !== currentPage) {
      setCurrentPage(parseInt(page));
      handleCleanStorage(false);
    }
  }

  const handleRechargeList = (all) => {
    {recharge ? setRecharge(false) : setRecharge(true)}
    handleCleanStorage(all);
  }

  const handleSearch = (e) => {
    e.preventDefault();
    setSearch(search);
    handleRechargeList(false);
  }


  const handleAction = (id) => {
    const deleteRecover = `${!areDeletedRecords ? "delete" : "recover"}`;
    const isConfirmed = window.confirm(`Are you sure you want to ${deleteRecover} this record?`);
    if (isConfirmed) {
      inactivateUserRecord(token, id, !areDeletedRecords)
      .then(() => handleRechargeList(true))
    }
  }; 

  const currentRecords = 
  (records.length > 0) ?
    records.slice(0, pageSize)
  : []

  return (
    <div className={`${styles.records_container} table table-striped`}>
      <nav className={`${styles.records_nav} navbar-light`}>
      <h3 className="card-title">{text}</h3>
        <form className={styles.form_record} onSubmit={handleSearch}>
          <input className={`${styles.input_record}`} 
          type="search" 
          placeholder="search" 
          aria-label="search" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}/>
          <Button type="submit" btnClass={`${styles.button_record} btn btn-outline-primary`} text="search" />
        </form>
      </nav>
      <Table 
        records={records} 
        currentRecords={currentRecords} 
        onSetRecords={setRecords}
        onSetAction={handleAction}
        btnClass={!areDeletedRecords ? "btn btn-danger" : "btn btn-primary"}
        btnText={!areDeletedRecords ? "Delete": "Recover"}/>
      <Pagination 
        totalPages={totalPages} 
        pageSize={pageSize} 
        onHandlePageSize={handlePageSize} 
        currentPage={currentPage} 
        onHandleChangePage={handleCurrentPage}/>
      {error && <Error message={error} />}
    </div>
  );
}

export default UserRecords;