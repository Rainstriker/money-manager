import React from 'react';
import { Form, Input, Button, InputNumber } from 'antd';

import Backend from '../../util/Backend';

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
      amount: values.amount,
    };
    Backend.addTransaction(body
      ).then(props.refresh
        ).catch(err => console.log(err));
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
        <Input id='content-input'/>
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
        <InputNumber/>
      </Form.Item>  
      <Button type="primary" htmlType="submit" id='add-button'>Add new transaction</Button>
    </Form>
  );
}

export default AddTransaction;