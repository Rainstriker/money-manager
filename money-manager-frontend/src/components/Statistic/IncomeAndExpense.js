import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

const defaultLabelStyle = {
  fontSize: '14px',
  fontFamily: 'Roboto Condensed, sans-serif',
  color: '#ffffff',
};

const IncomeAndExpense = props => {
  let incomePercentage = 0;
  let expensePercentage = 0;

  const shiftSize = 7;
  let labelPie = ({ dataEntry }) => Math.round(dataEntry.percentage) + '%';

  if (props.income !== 0 && props.expense !== 0) {
    incomePercentage = Math.abs(Math.abs((props.expense / props.income)) - 1 * 100);
    expensePercentage = Math.abs(props.expense / props.income * 100);
  } else if (props.income !== 0) {
    incomePercentage = 100;
  } else if (props.expense !== 0) {
    expensePercentage = 100;
  } else {
    labelPie = false;
  }

  return (
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
  );
}

export default IncomeAndExpense;