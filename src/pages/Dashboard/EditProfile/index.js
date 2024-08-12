import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal } from 'antd';
import { useAuthContext } from 'contexts/AuthContext';

export default function EditProfile() {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalForm] = Form.useForm(); // Separate form instance for the modal
    const { state, handleUpdateUser } = useAuthContext();
    const { user } = state;
    const { fullName, email, password } = user; // Assuming user object has a password field

    // Initialize form values when component mounts
    useEffect(() => {
        form.setFieldsValue({ fullName, email });
    }, [form, fullName, email]);

    const handleUpdateProfile = () => {
        // Show modal for password verification
        setIsModalVisible(true);
    };

    const handleOk = async () => {
        try {
            const modalValues = await modalForm.validateFields(); // Validate modal form
            const { password: inputPassword } = modalValues;
            const { fullName, email } = form.getFieldsValue();

            if (inputPassword !== password) {
                message.error('Incorrect password');
                return;
            }

            await handleUpdateUser({ fullName, email });
            message.success('Profile updated successfully!');
            setIsModalVisible(false);
        } catch (error) {
            // Error handling if password is incorrect or other validation issues
            if (error.errorFields) {
                message.error('Please check your input.');
            } else {
                message.error('Failed to update profile');
            }
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <main className='auth'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card p-4 border-0">
                            <h1 className='mb-4'>Edit Profile</h1>
                            <Form
                                form={form}
                                layout='vertical'
                                onFinish={handleUpdateProfile}
                            >
                                <Form.Item
                                    label='Full Name'
                                    name='fullName'
                                    rules={[{ required: true, message: 'Full name is required' }]}
                                >
                                    <Input placeholder='Full Name' />
                                </Form.Item>
                                <Form.Item
                                    label='Email'
                                    name='email'
                                    rules={[
                                        { required: true, message: 'Email is required' },
                                        { type: 'email', message: 'Please enter a valid email' }
                                    ]}
                                >
                                    <Input placeholder='Email' />
                                </Form.Item>
                                <Button type='primary' block htmlType='submit'>
                                    Update Profile
                                </Button>
                            </Form>

                            <Modal
                                title="Confirm Password"
                                visible={isModalVisible}
                                onOk={handleOk}
                                onCancel={handleCancel}
                                okText="Confirm"
                                cancelText="Cancel"
                            >
                                <Form form={modalForm} layout="vertical">
                                    <Form.Item
                                        label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please enter your password' }]}
                                    >
                                        <Input.Password placeholder='Enter your password' />
                                    </Form.Item>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
