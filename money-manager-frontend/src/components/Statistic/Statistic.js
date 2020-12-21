import React, { useState } from 'react';
import './Statistic.css';
import Tool from '../../util/Tool';
import IncomeAndExpense from './IncomeAndExpense';
import CategoryChart from './CategoryChart';
import { Button } from 'antd';

const Statistic = props => {
  const [btn, setBtn] = useState('sum');
  const filterIncome = arr => {
    let income = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount <= 0) continue;
      income += arr[i].amount;
    }
    return income;
  }

  const filterExpense = arr => {
    let expense = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0) continue;
      expense += arr[i].amount;
    }
    return expense;
  }

  const filterExpenseByCategory = (arr, name) => {
    let expense = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount > 0) continue;
      if (arr[i].category !== name) continue;
      expense += arr[i].amount;
    }
    return Math.abs(expense);
  }

  const filterIncomeByCategory = (arr, name) => {
    let income = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].amount <= 0) continue;
      if (arr[i].category !== name) continue;
      income += arr[i].amount;
    }
    return income;
  }

  // Expense Data for expense chart

  let foodExpense = 0;
  let socialExpense = 0;
  let householdExpense = 0;
  let transportationExpense = 0;
  let entertainmentExpense = 0;
  let healthExpense = 0;
  let apparelExpense = 0;
  let educationExpense = 0;
  let beautyExpense = 0;
  if (props.transactions) {
    foodExpense = filterExpenseByCategory(props.transactions, 'Food');
    socialExpense = filterExpenseByCategory(props.transactions, 'Social');
    householdExpense = filterExpenseByCategory(props.transactions, 'Household');
    transportationExpense = filterExpenseByCategory(props.transactions, 'Transportation');
    entertainmentExpense = filterExpenseByCategory(props.transactions, 'Entertainment');
    healthExpense = filterExpenseByCategory(props.transactions, 'Health');
    apparelExpense = filterExpenseByCategory(props.transactions, 'Apparel');
    educationExpense = filterExpenseByCategory(props.transactions, 'Education');
    beautyExpense = filterExpenseByCategory(props.transactions, 'Beauty');
  }
  const categoryExpenseArr = [
    foodExpense,
    socialExpense,
    householdExpense,
    transportationExpense,
    entertainmentExpense,
    healthExpense,
    apparelExpense,
    educationExpense,
    beautyExpense
  ];

  // Income Data for income chart

  let foodIncome = 0;
  let socialIncome = 0;
  let householdIncome = 0;
  let transportationIncome = 0;
  let entertainmentIncome = 0;
  let healthIncome = 0;
  let apparelIncome = 0;
  let educationIncome = 0;
  let beautyIncome = 0;
  if (props.transactions) {
    foodIncome = filterIncomeByCategory(props.transactions, 'Food');
    socialIncome = filterIncomeByCategory(props.transactions, 'Social');
    householdIncome = filterIncomeByCategory(props.transactions, 'Household');
    transportationIncome = filterIncomeByCategory(props.transactions, 'Transportation');
    entertainmentIncome = filterIncomeByCategory(props.transactions, 'Entertainment');
    healthIncome = filterIncomeByCategory(props.transactions, 'Health');
    apparelIncome = filterIncomeByCategory(props.transactions, 'Apparel');
    educationIncome = filterIncomeByCategory(props.transactions, 'Education');
    beautyIncome = filterIncomeByCategory(props.transactions, 'Beauty');
  }
  const categoryIncomeArr = [
    foodIncome,
    socialIncome,
    householdIncome,
    transportationIncome,
    entertainmentIncome,
    healthIncome,
    apparelIncome,
    educationIncome,
    beautyIncome,
  ];

  let income = 0;
  let expense = 0;
  if (props.transactions) {
    income = filterIncome(props.transactions);
    expense = filterExpense(props.transactions);
  }

  const changeCharthandle = () => {
    if (btn === 'sum') {
      return <IncomeAndExpense income={income} expense={expense} />
    } else if (btn === 'expense') {
      return <CategoryChart data={categoryExpenseArr} name={'Total expense by category'} />
    } else if (btn === 'income') {
      return <CategoryChart data={categoryIncomeArr} name={'Total income by category'} />
    }
  }

  const changeChangeEvent = value => {
    setBtn(value);
  }

  return (
    <div className='card'>
      <h1>Statistic</h1>
      <h3 className='balance'>Your balance <span className={income + expense > 0 ? 'plus' : 'minus'}>
        {Tool.numberWithCommas(income + expense)}</span>
      </h3>
      <div id='button-container'>
        <Button 
          value='sum' 
          onClick={() => changeChangeEvent('sum')} >
            Summary
        </Button>
        <Button 
          value='expense'
          onClick={() => changeChangeEvent('expense')} >
            Expense by Category
        </Button>
        <Button 
          value='income' 
          onClick={() => changeChangeEvent('income')} >
            Income by Category
        </Button>
      </div>
      {changeCharthandle()}
      <div className='sum-table'>
        <div className='row'>
          <h4>Income</h4>
          <h4>Expense</h4>
        </div>
        <div className='row'>
          <h2 className='plus'>{Tool.numberWithCommas(income)}</h2>
          <h2 className='minus'>{Tool.numberWithCommas(expense)}</h2>
        </div>
      </div>
    </div>
  );
}

export default Statistic;