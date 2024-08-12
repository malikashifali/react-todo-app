import React, { useState, useEffect } from 'react';
import { Button, Divider, Flex, Form, Input, Spin, Typography, message } from 'antd';
import { Link } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';

const initialState = { fullName: "", email: "", password: "", confirmPassword: "", uid: "" };

export default function Register() {
  const [users, setUsers] = useState([]);
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialState);
  const [isAppLoading, setIsAppLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setIsAppLoading(false)
    }, 1000);
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
      uid: Math.random().toString(36).slice(2)
    }));
  };

  const handleRegister = () => {
    if (formData.password !== formData.confirmPassword) {
      message.error("Passwords do not match!");
      return;
    }

    const updatedUsers = [...users, formData];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
    setFormData(initialState);
    form.resetFields();
    message.success("Registration successful!");
  };

  const { Title } = Typography;
  return (
    <main className='auth'>
      {isAppLoading
        ? <>
          <Flex align="center" gap="middle">
            <Spin
              indicator={
                <LoadingOutlined
                  style={{
                    fontSize: 48,
                  }}
                  spin
                />
              }
            />
          </Flex>
        </>
        : <div className="container">
          <div className="row">
            <div className="col d-flex justify-content-center align-items-center">
              <div className="card border-0">
                <Title level={2} className='text-center'>Register</Title>
                <Divider />

                <Form form={form} layout="vertical" onFinish={handleRegister}>
                  <Form.Item label="Full Name" name="fullName" rules={[{ required: true, message: 'Please input your full name!' }]}>
                    <Input placeholder='Input your full name' name='fullName' value={formData.fullName} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}>
                    <Input placeholder='Input your email' name='email' value={formData.email} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Please input your password!' }]}>
                    <Input.Password placeholder='Input your password' name='password' value={formData.password} onChange={handleChange} />
                  </Form.Item>
                  <Form.Item label="Confirm Password" name="confirmPassword" rules={[{ required: true, message: 'Please confirm your password!' }]}>
                    <Input.Password placeholder='Input your password again' name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} />
                  </Form.Item>

                  <Button type='primary' htmlType='submit' className='w-100'>Register</Button>
                  <p className='mb-0 mt-3'>Already Have An Account? <Link to='/auth/login'>Login</Link> Here.</p>
                </Form>
              </div>
            </div>
          </div>
        </div>}
    </main>
  );
}