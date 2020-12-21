import { PropertySafetyFilled } from '@ant-design/icons';
import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

const categoryExpenseLabelsArr = [
  'Food', 
  'Social',
  'Houdehold',
  'Transportation',
  'Entertainment',
  'Health',
  'Apparel',
  'Education',
  'Beauty'
]

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

const CategoryChart = props => {

  const labelName = props.name;

  const data = {
    labels: categoryExpenseLabelsArr,
    datasets: [
      {
        label: labelName,
        data: props.data,
        backgroundColor: [
          '#17B774',
          '#0085FF',
          '#41CFB6',
          '#FF7A00',
          '#D13593',
          '#E02D22',
          '#C1A12E',
          '#3AC1C1',
          '#E16BF4',
        ],

        borderWidth: 1,
      },
    ],
  }

  return (
    <HorizontalBar data={data} options={options} />
  );
}

export default CategoryChart;