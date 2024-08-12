import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ResetPassword() {
    const [form] = useForm();
    const navigate = useNavigate();

    const handleResetPassword = async (values) => {
        const { email } = values;
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === email);

        if (user) {
            if (user.uid) { // Ensure uid is present
                navigate(`/auth/reset-password/${user.uid}`);
                message.success('Password reset link has been sent to your email.');
            } else {
                message.error('User ID is not available.');
            }
        } else {
            message.error('Email not found.');
        }
    };

    return (
        <main className='auth'>
            <div className="row">
                <div className="col d-flex justify-content-center align-items-center">
                    <div className="card border-0 p-4">
                        <h1 className='mb-4'>Reset Password</h1>
                        <Form
                            form={form}
                            layout='vertical'
                            onFinish={handleResetPassword}
                        >
                            <Form.Item
                                name='email'
                                rules={[
                                    { required: true, message: "Please enter your email" },
                                    { type: 'email', message: "Please enter a valid email" }
                                ]}
                            >
                                <Input placeholder='Enter Your Email' />
                            </Form.Item>
                            <Button type='primary' block htmlType='submit'>
                                Reset Password
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
        </main>
    );
}
