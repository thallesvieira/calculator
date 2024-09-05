import Button from '../form/Button'
import styles from './Table.module.css'

function Table({records, currentRecords, onSetRecords, onSetAction, btnClass, btnText}) {

    //Method for sorting columns
    const handleSort = (key) => {
        const sorted = [...records].sort((a, b) => (a[key] > b[key] ? 1 : -1));
        onSetRecords(sorted);
    };

    //Const to add list of number in the first column of table
    const handleOrder = () => {return order +=1;}
    var order = 0;

    return (
        <table className={`${styles.table_container} table table-striped`}>
            <thead>
            <tr>
            <th scope="col">#</th>
                <th scope="col" onClick={() => handleSort('operation')}>Operation</th>
                <th scope="col" onClick={() => handleSort('amount')}>Amount</th>
                <th scope="col" onClick={() => handleSort('balance')}>Balance</th>
                <th scope="col" onClick={() => handleSort('response')}>Response</th>
                <th scope="col" onClick={() => handleSort('date')}>Date</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {currentRecords.map((record) => (
                <tr key={record.id}>
                <td>{handleOrder()}</td>
                <td>{record.operation}</td>
                <td>{record.amount}</td>
                <td>{record.balance}</td>
                <td>{record.response}</td>
                <td>{record.date}</td>
                <td>
                    <button className={btnClass} onClick={() => onSetAction(record.id)}>{btnText}</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default Table;