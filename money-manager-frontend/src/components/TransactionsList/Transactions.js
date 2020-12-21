import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import Backend from '../../util/Backend';
import Tool from '../../util/Tool';



const Transactions = props => {
  const removeItem = value => {
    Backend.removeTransaction(value
     ).then(props.refresh
       ).catch(err => console.log(err));
  }

  return (
    <div className={`transaction category-${props.category}`}>
      <div className={`category-text color-${props.category}`}>
        <p key={props.category} className='content'>{props.category}</p>
      </div>
      <p key={props.name} className='content-name'>{props.name}</p>
      <div className='amount'>
        <p key={props.amount} className={ props.amount > 0 ? 'plus' : 'minus'} id='transaction'>{Tool.numberWithCommas(props.amount)}</p>
        <button 
          className='remove' 
          value={props.value} 
          onClick={() => removeItem(props.value)}>
          <MinusCircleOutlined />
        </button>
      </div>
    </div>
  );
}

export default Transactions;