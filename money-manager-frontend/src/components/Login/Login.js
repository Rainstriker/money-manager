import React from 'react';
import 'antd/dist/antd.css';
import { Form, Input, Button, Checkbox, notification } from 'antd';

import Backend from '../../util/Backend';
import LocalStorageService from '../../services/localStorageService';
import { withRouter } from 'react-router-dom';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

const Login = props => {
  
  const onFinish = values => {
    const body = {
      username: values.username,
      password: values.password,
    };
    Backend.login(body
      ).then( result => {
        LocalStorageService.setToken(result.data.token);
        props.setRole('user');
        notification.success({
          message: `Good to see you!`,
          placement: 'bottomRight'
        });
        props.history.push('/manage');
      }).catch( err => {
        notification.error({
          message: `Login failed.`,
          placement: 'bottomRight'
        });
        console.log(err);
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form style={{paddingRight: 60, margin: 'auto'}}
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
}

export default withRouter(Login);