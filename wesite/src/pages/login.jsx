import { Card, Form, Input, Button, message, Space, Row, Col } from 'antd';

import { Loader } from 'lucide-react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

function LoginPage() {
  const [messageApi, contextHolder] = message.useMessage();
     const { useUser,setUser } = useContext(UserContext);  
     console.log("here ",useUser);
     
  
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const  navigator  = useNavigate()
  const [loading, setLoading] = useState(false);
  const success = (content) => {
    messageApi.open({
      type: 'success',
      content: content,
    });
  };

  const error = (content) => {
    messageApi.open({
      type: 'error',
      content: content,
    });
  };
  const login = async (values) => {
    setLoading(true);

    const response = await axios.post(`${baseUrl}/auth/login`,
      {
        email: values.email,
        password: values.password,
      }

    ).then(data => {
      localStorage.setItem("user", JSON.stringify(data.data))
      success(data.mesage)
      setUser(data.data)
      console.log("Found some data", data);

      setLoading(false)
      navigator("/")

    }).catch(e => {
      error("user not found")
      // error(e.response.data.mesage)
      console.log("oops found Error", e);
      setLoading(false)


    })
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 px-4">
      <Card
        title={<h2 className="text-center text-xl font-semibold">Welcome Back</h2>}
        className="w-full max-w-md shadow-lg rounded-lg"
      >
        {contextHolder}
        <Form
          name="loginForm"
          layout="vertical"
          onFinish={login}
          size="large"
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Enter a valid email address' }
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Row justify="space-between" className="mb-4">
            <Col>
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:text-blue-600 transition-colors"
              >
                Forgot password?
              </Link>
            </Col>
          </Row>

          <Button
            type="primary"
            htmlType="submit"
            block
            className="flex items-center justify-center gap-2"
            disabled={loading}
          >
            {loading && <Loader className="animate-spin w-4 h-4" />}
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Form>

        <div className="text-center mt-4 text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 transition-colors"
          >
            Sign up
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default LoginPage;
