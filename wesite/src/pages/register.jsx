import { Card, Form, Input, Button, message, Space } from 'antd';
import { Loader } from 'lucide-react';
import React, { useState } from 'react';
import { data, Link } from 'react-router-dom';
import axios from 'axios';
function Register() {
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState(false);
    const baseUrl = import.meta.env.VITE_API_BASE_URL;

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
    const register = async (values) => {
        setLoading(true);
        const response = await axios.post(`${baseUrl}/auth/register`,
                {
                    email: values.email,
                    password: values.password,
                    name: values.uname
                }

            ).then(data=>{
                success(data.mesage)
                console.log("Foun some data", data);
                setLoading(false)
                
            }).catch(e=>{
                error(e.response.data.mesage)
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
                    onFinish={register}
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
                        label="Name"
                        name="uname"
                        rules={[
                            { required: true, message: 'Please enter your name' },
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
                    <Form.Item
                        label="Retype Password"
                        name="rtpwd"
                        rules={[{ required: true, message: 'Please enter your password' }]}
                    >
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>

                    <Button
                        type="primary"
                        htmlType="submit"
                        block
                        className="flex items-center justify-center gap-2"
                        disabled={loading}
                    >
                        {loading && <Loader className="animate-spin w-4 h-4" />}
                        {loading ? 'Registering ...' : 'Register'}
                    </Button>
                </Form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    allready have acount?{' '}
                    <Link
                        to="/login"
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </Card>
        </div>
    );
}

export default Register;
