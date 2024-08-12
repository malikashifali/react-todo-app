import React, { useState } from 'react';
import { Typography, Card, Button, message } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

const { Title } = Typography;

export default function Home() {
  const [menu, setMenu] = useState(JSON.parse(localStorage.getItem('menu')) || []);
  const navigate = useNavigate(); 

  const handleDelete = (itemId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (confirmDelete) {
      const updatedMenu = menu.filter(item => item.uid !== itemId);
      setMenu(updatedMenu);
      localStorage.setItem("menu", JSON.stringify(updatedMenu));
      message.success("Item deleted successfully");
    }
  };

  const handleEdit = (itemId) => {
    navigate(`/dashboard/edit-menu/${itemId}`); 
  };

  return (
    <main className='dashboard-menu'>
      <div className="container">
        <div className="row mt-4 text-center">
          <div className="col">
            <Title level={2}>Products</Title>
          </div>
        </div>
        <div className="row mt-3">
          {menu.length ? (
            menu.map((item) => {
              const { uid, itemName, description, price, category } = item;
              return (
                <div key={uid} className="col-md-6 col-lg-4 mb-3">
                  <Card className='card border-0' style={{ minHeight: 270 }}>
                    <Title level={4}>Name: {itemName}</Title>
                    <Title level={5}>Description: {description}</Title>
                    <Title level={5}>Price: ${price}</Title>
                    <Title level={5}>Category: {category}</Title>
                    <div className='d-flex justify-content-end'>
                      <Button
                        type='primary'
                        className='me-2 mt-4'
                        onClick={() => { handleEdit(uid) }}
                      >
                        <EditOutlined />
                      </Button>
                      <Button
                        type='primary'
                        danger
                        className='mt-4'
                        onClick={() => handleDelete(uid)}
                      >
                        <DeleteOutlined />
                      </Button>
                    </div>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <Title level={4} className="text-center">No items in the menu</Title>
            </div>
          )}
          <div className="col-md-6 col-lg-4 mb-3">
            <Card className='card border-0 d-flex justify-content-center align-items-center' style={{ minHeight: 270 }}>
              <Link to='/dashboard/create-menu'>
                <PlusOutlined className='fs-1' />
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
