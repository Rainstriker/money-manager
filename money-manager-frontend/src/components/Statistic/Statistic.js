import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';
import './Statistic.css';

const defaultLabelStyle = {
  fontSize: '14px',
  fontFamily: 'Roboto Condensed, sans-serif',
  color: '#ffffff'
};

const Statistic = props => {

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

  let income = 0;
  let expense = 0;

  if (props.transactions) {
    income = filterIncome(props.transactions);
    expense = filterExpense(props.transactions);
  }

  let incomePercentage = Math.abs(Math.abs((expense / income)) - 1 * 100);
  let expensePercentage = Math.abs(expense / income * 100);
  const shiftSize = 7;
  let labelPie = ({ dataEntry }) => Math.round(dataEntry.percentage) + '%';
  
  if (!expensePercentage || expensePercentage === 0) {
    expensePercentage = 0;
    incomePercentage = 100;
  } else if (!incomePercentage || incomePercentage === 0) {
    expensePercentage = 100;
    incomePercentage = 0;
  } else {
    labelPie = false
  }
  return (
    <div className='card'>
      <h1>Statistic</h1>
      <h3 className='balance'>Your balance <span className={ income + expense > 0 ? 'plus' : 'minus'}>{income + expense}</span></h3>
      <PieChart
        data={[
          { title: 'Income', value: incomePercentage, color: '#39e0e6', fill: '#ffffff' },
          { title: 'Expense', value: expensePercentage, color: '#f26e41', fill: '#ffffff' },
        ]}
        animate={true}
        animationEasing='ease-in'
        reveal='50'
        lineWidth={50}
        style={{ height: '200px' }}
        radius={PieChart.defaultProps.radius - shiftSize}
        segmentsShift={(index) => (index === 0 ? shiftSize : 0.5)}
        label={labelPie}
        labelStyle={defaultLabelStyle}
        labelPosition={70}
      />
      <div className='sum-table'>
          <div  className='row'>
            <h4>Income</h4>
            <h4>Expense</h4>
          </div>
          <div className='row'>
            <h2 className='plus'>{income}</h2>
            <h2 className='minus'>{expense}</h2>
          </div>
        </div>
    </div>
  );
}

export default Statistic;