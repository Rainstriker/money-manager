import React from 'react';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';
import './TransactionsList.css'

const TransactionsList = props => {
  return (
    <>
      <h3>Account History</h3>
      <div className='trans-container'>
        {props.transactions && props.transactions.map((data, i) => {
          return <Transactions key={i} name={data.name} amount={data.amount} value={data.id} refresh={props.refresh}/>
        })}
      </div>
      <AddTransaction refresh={props.refresh}/>
    </>
  );
}

export default TransactionsList;