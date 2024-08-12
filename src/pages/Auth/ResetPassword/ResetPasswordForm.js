import { Button, Form, Input, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function ResetPasswordForm() {
    const [form] = useForm();
    const { id } = useParams();
    const navigate = useNavigate(); // Correctly call useNavigate here

    if (!id) {
        return (
            <main className='auth'>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-6">
                            <div className="card border-0 p-4">
                                <h1 className='mb-4'>Error</h1>
                                <p>Invalid reset link.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        );
    }

    const handleChangePassword = async (values) => {
        const { newPassword, confirmPassword } = values;

        if (newPassword !== confirmPassword) {
            message.error('Passwords do not match');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userIndex = users.findIndex(u => u.uid === id); // Ensure to check with 'uid'

        if (userIndex !== -1) {
            // Hash the password in a real application
            users[userIndex].password = newPassword;
            localStorage.setItem('users', JSON.stringify(users));
            navigate('/auth/login'); // Use navigate correctly here
            message.success('Password changed successfully!');
        } else {
            message.error('User not found');
        }
    };

    return (
        <main className='auth'>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card border-0 p-4">
                            <h1 className='mb-4'>Reset Password</h1>
                            <Form
                                layout='vertical'
                                form={form}
                                onFinish={handleChangePassword}
                            >
                                <Form.Item
                                    name='newPassword'
                                    label='New Password'
                                    rules={[{ required: true, message: 'Please enter your new password' }]}
                                >
                                    <Input.Password placeholder='New Password' />
                                </Form.Item>
                                <Form.Item
                                    name='confirmPassword'
                                    label='Confirm Password'
                                    rules={[
                                        { required: true, message: 'Please confirm your new password' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('newPassword') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject('Passwords do not match');
                                            },
                                        }),
                                    ]}
                                >
                                    <Input.Password placeholder='Confirm Password' />
                                </Form.Item>
                                <Button type='primary' htmlType='submit' block>
                                    Change Password
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
