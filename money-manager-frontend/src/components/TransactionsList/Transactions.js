import React from 'react';
import { MinusCircleOutlined } from '@ant-design/icons';
import Backend from '../../util/Backend';

const Transactions = props => {
  const removeItem = value => {
    console.log(value)
    Backend.removeTransaction(value
     ).then(props.refresh
       ).catch(err => console.log(err));
  }

  return (
    <div className='transaction'>
      <p className='content'>{props.name}</p>
      <div className='amount'>
        <p className={ props.amount > 0 ? 'plus' : 'minus'} id='transaction'>{props.amount}</p>
        <button className='remove' value={props.value} onClick={() => removeItem(props.value)}>
          <MinusCircleOutlined />
        </button>
      </div>
    </div>
  );
}

export default Transactions;