import React, { useEffect, useState } from 'react';
import Transactions from './Transactions';
import AddTransaction from './AddTransaction';
import './TransactionsList.css'
import Backend from '../../util/Backend';

const TransactionsList = props => {
  const [transaction, setTransaction] = useState(props.transactions);
  const [sortValue, setSortValue] = useState('All Category');

  // const onChangeHandle = e => {
  //   let name = e.target.value;
  //   console.log('running')
  //   if (name === 'All Category') {
  //     setTransaction(props.transactions);
  //     setSortValue('All Category');
  //   } else if (props.transactions) {
  //     const filterredArr = props.transactions.filter(data => data.category === name);
  //     setSortValue(name);
  //     setTransaction(filterredArr);
  //   }
  // }


  // const onChangeAfterAddWhileSorted = () => {
  //   setSortValue('All Category');
  //   setTransaction(props.transactions);
  // }

  // useEffect(() => {
  //   onChangeAfterAddWhileSorted();
  //   setTransaction(props.transactions);
  // }, [])

  // let filteredTransaction 
  // if (transaction) {
  //   filteredTransaction = transaction;
  // } else {
  //   filteredTransaction = props.transactions;
  // }

  return (
    <>
      {/* <h3>Account History</h3>
      <select name="category" onChange={onChangeHandle}>
        <option value="All Category" >All Category</option>
        <option value="Food">Food</option>
        <option value="Social">Social</option>
        <option value="Household">Household</option>
        <option value="Transportation">Transportation</option>
        <option value="Health">Health</option>
        <option value="Apparel">Apparel</option>
        <option value="Education">Education</option>
        <option value="Beauty">Beauty</option>
      </select> */}
      <div className='trans-container'>
        {props.transactions && props.transactions.map((data, i) => {
          return <Transactions
            key={i}
            name={data.name}
            category={data.category}
            amount={data.amount}
            value={data.id}
            refresh={props.refresh} 
          />
        })}
      </div>
      <AddTransaction refresh={props.refresh} />
    </>
  );
}

export default TransactionsList;