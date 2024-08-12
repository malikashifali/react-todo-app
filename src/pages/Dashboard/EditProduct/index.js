import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, Form, Input, InputNumber, Button, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';

const { Title } = Typography;

const initialState = { itemName: "", description: "", price: 0, category: "" };

export default function EditProduct() {
    const [state, setState] = useState(initialState);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams(); 
    const [form] = Form.useForm();

    useEffect(() => {
        const menu = JSON.parse(localStorage.getItem("menu")) || [];
        const menuItem = menu.find(item => item.uid === id);
        if (menuItem) {
            setState(menuItem);
            form.setFieldsValue(menuItem);
        }
    }, [id, form]);

    const handleChange = e => {
        const { name, value } = e.target;
        setState(prevState => ({ ...prevState, [name]: value }));
        form.setFieldsValue({ [name]: value });
    };

    const handleNumberChange = value => {
        setState(prevState => ({ ...prevState, price: value }));
        form.setFieldsValue({ price: value });
    };

    const handleUpdateMenu = () => {
        const { itemName, description, price, category } = state;

        const updatedMenuItem = {
            ...state,
            itemName,
            description,
            price,
            category,
            dateModified: new Date().getTime(),
        };

        setIsProcessing(true);

        const menu = JSON.parse(localStorage.getItem("menu")) || [];

        const updatedMenu = menu.map(oldItem => oldItem.uid === state.uid ? updatedMenuItem : oldItem);

        setTimeout(() => {
            setIsProcessing(false);
            localStorage.setItem("menu", JSON.stringify(updatedMenu));
            message.success("Menu item updated successfully");
            navigate("/dashboard");
        }, 2000);
    };

    return (
        <main className='dashboard-menu'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card border-0 p-4 my-4 mx-auto" style={{ maxWidth: 400 }}>
                            <Title level={2} className='text-center'>Edit Menu</Title>
                            <Form form={form} layout='vertical' onFinish={handleUpdateMenu}>
                                <Form.Item
                                    label='Item Name'
                                    name='itemName'
                                    rules={[{ required: true, message: "Please enter item name" }]}
                                >
                                    <Input
                                        placeholder='Item Name'
                                        name='itemName'
                                        value={state.itemName}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Description'
                                    name='description'
                                    rules={[{ required: true, message: "Please enter description" }]}
                                >
                                    <TextArea
                                        rows={4}
                                        placeholder='Description'
                                        style={{ resize: "none" }}
                                        name='description'
                                        value={state.description}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Price'
                                    name='price'
                                    rules={[{ required: true, message: "Please enter price" }]}
                                >
                                    <InputNumber
                                        placeholder='Price'
                                        className='w-100'
                                        value={state.price}
                                        onChange={handleNumberChange}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label='Category'
                                    name='category'
                                    rules={[{ required: true, message: "Please enter category" }]}
                                >
                                    <Input
                                        placeholder='Category'
                                        className='w-100'
                                        name='category'
                                        value={state.category}
                                        onChange={handleChange}
                                    />
                                </Form.Item>
                                <Button htmlType='submit' type='primary' block loading={isProcessing}>Update Menu</Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
