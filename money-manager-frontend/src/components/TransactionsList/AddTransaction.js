import React from 'react';
import Backend from '../../util/Backend';
import { Form, Input, Button, InputNumber, Select } from 'antd';
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddTransaction = props => {
  const onFinish = (values) => {
    const body = {
      name: values.name,
      category: values.category,
      amount: values.amount,
    };
    Backend.addTransaction(body
      ).then(props.refresh).catch(err => console.log(err));
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form 
      {...layout}
      name="basic"
      initialValues={{
      remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      className='add-container'>
      <h3>Add new transaction</h3>
      <Form.Item
        label="Content"
        name="name"
        rules={[
          {
            required: true,
            message: 'Invalid value!',
          },
        ]} 
        className='input-container'>
        <Input id='content-input' placeholder="salary, fried chicken, smartphone and etc."/>
      </Form.Item>
      <Form.Item
          name="category"
          label="Category"
          rules={[
            {
              required: true,
            },
          ]}
          className='input-container'
        >
          <Select
            placeholder="Select a category"
            allowClear
          >
            <Option value="Food">Food</Option>
            <Option value="Social">Social</Option>
            <Option value="Household">Household</Option>
            <Option value="Transportation">Transportation</Option>
            <Option value="Entertainment">Entertainment</Option>
            <Option value="Health">Health</Option>
            <Option value="Apparel">Apparel</Option>
            <Option value="Education">Education</Option>
            <Option value="Beauty">Beauty</Option>
          </Select>
        </Form.Item>
      <Form.Item 
        label="Amount"
        name="amount"
        rules={[
          {
            required: true,
            message: 'Invalid value!',
          },
        ]}
        className='input-container'>
        <InputNumber placeholder="0"/>
      </Form.Item>  
      <Button type="primary" htmlType="submit" id='add-button'>Add new transaction</Button>
    </Form>
  );
}

export default AddTransaction;