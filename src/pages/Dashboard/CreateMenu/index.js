import React, { useState } from 'react'
import { Button, Form, Input, InputNumber, message, Typography } from 'antd'
import TextArea from 'antd/es/input/TextArea'

const { Title } = Typography

const initialState = { itemName: "", description: "", price: "", category: "", }

export default function CreateMenu() {
    const [menu, setMenu] = useState(JSON.parse(localStorage.getItem("menu")) || [])
    const [menuItem, setMenuItem] = useState(initialState)
    const [form] = Form.useForm()

    const handleCreateMenu = () => {
        const updatedMenu = [...menu, menuItem]
        setMenu(updatedMenu)
        localStorage.setItem("menu", JSON.stringify(updatedMenu))
        setMenuItem(initialState)
        form.resetFields()
        message.success("Menu Item Added Successfully")
    }

    const handleChange = e => setMenuItem(prevState => ({ ...prevState, [e.target.name]: e.target.value, uid:Math.random().toString(36).slice(2) }))

    const handleNumberChange = value => {
        setMenuItem(prevState => ({ ...prevState, price: value }))
    }

    const { itemName, description, price, category } = menuItem

    return (
        <main className='dashboard-menu'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <div className="card border-0 p-4 my-4 mx-auto" style={{ maxWidth: 400 }}>
                            <Title level={2} className='text-center'>Add Product</Title>
                            <Form form={form} layout='vertical' onFinish={handleCreateMenu}>
                                <Form.Item label='Item Name' name='itemName' rules={[{ required: true, message: "Please enter item name" }]}>
                                    <Input placeholder='Item Name' name='itemName' value={itemName} onChange={handleChange} />
                                </Form.Item>
                                <Form.Item label='Description' name='description' rules={[{ required: true, message: "Please enter description" }]}>
                                    <TextArea rows={4} placeholder='Description' name='description' value={description} onChange={handleChange} style={{ resize: "none" }} />
                                </Form.Item>
                                <Form.Item label='Price' name='price' rules={[{ required: true, message: "Please enter price" }]}>
                                    <InputNumber placeholder='Price' name='price' value={price} className='w-100' onChange={handleNumberChange} />
                                </Form.Item>
                                <Form.Item label='Category' name='category' rules={[{ required: true, message: "Please enter category" }]}>
                                    <Input placeholder='Category' name='category' value={category} className='w-100' onChange={handleChange} />
                                </Form.Item>
                                <Form.Item>
                                    <Button htmlType='submit' type='primary' block>Add Product</Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}