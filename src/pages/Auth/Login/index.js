import React, { useState } from 'react';
import { Button, Divider, Form, Input, Typography, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';

const initialState = { email: "", password: "" };

export default function Login() {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const [form] = Form.useForm();
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();

  const { dispatch } = useAuthContext()

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLogin = () => {
    const { email, password } = formData;
    const loginUser = users.find(user => user.email === email);

    if (loginUser) {
      if (loginUser.password === password) {
        message.success("Login successful!");
        dispatch({
          type: "SET_LOGGED_IN",
          payload: { user: { email, password } }
        });
        localStorage.setItem("user", JSON.stringify(loginUser))
        navigate('/dashboard');
      } else {
        message.error("Incorrect password");
      }
    } else {
      message.error("User not found with this email");
    }

    form.resetFields();
  };

  const { Title } = Typography;

  return (
    <main className='auth'>
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="card border-0">
              <Title level={2} className='text-center'>Login</Title>
              <Divider />

              <Form form={form} layout="vertical" onFinish={handleLogin}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                  <Input
                    placeholder='Input your email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  label="Password"
                  name="password"
                  className='mb-1'
                  rules={[{ required: true, message: 'Please input your password!' }]}
                >
                  <Input.Password
                    placeholder='Input your password'
                    name='password'
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Link to='/auth/reset-password'>Forgot Password?</Link>

                <Button className='mt-3' type='primary' htmlType='submit' block>Login</Button>
                <p className='mb-0 mt-3'>Don't Have An Account? <Link to='/auth/register'>Register</Link> Here.</p>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}