import React from 'react';
import { Typography, Card } from 'antd';

const { Title } = Typography;

export default function Home() {
  const menu = JSON.parse(localStorage.getItem('menu')) || [];


  return (
    <main className='dashboard-menu'>
      <div className="container">
        <div className="row mt-4">
          <div className="col">
            <Title level={2} className='text-center'>Products</Title>
          </div>
        </div>
        <div className="row mt-3">
          {menu.length ? (
            menu.map((item) => {
              const { uid, itemName, description, price, category } = item;
              return (
                <div key={uid} className="col-md-6 col-lg-4 mb-3">
                  <Card className='card border-0' style={{ minHeight: 240 }}>
                    <Title level={4}>Name: {itemName}</Title>
                    <Title level={5}>Description: {description}</Title>
                    <Title level={5}>Price: ${price}</Title>
                    <Title level={5}>Category: {category}</Title>
                  </Card>
                </div>
              );
            })
          ) : (
            <div className="col-12">
              <Title level={4} className="text-center">No items in the menu</Title>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
