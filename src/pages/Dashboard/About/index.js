import React from 'react'
import { useAuthContext } from 'contexts/AuthContext'
import { Typography } from 'antd'

const { Title } = Typography

export default function About() {
  
  const { state } = useAuthContext()
  const { user } = state
  const { fullName, email, uid } = user


  return (
    <main>
      <div className="container">
        <div className="row">
          <div className="col d-flex justify-content-center">
            <div className="card p-3 mt-5" style={{ width: 300 }}>
              <Title level={5}>Name: {fullName}</Title>
              <Title level={5}>Email: {email}</Title>
              <Title level={5}>ID: {uid}</Title>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
