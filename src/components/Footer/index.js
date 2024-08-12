import React from 'react'

export default function Footer() {
    const year = new Date().getFullYear()
  return (
    <footer className='py-2 bg-primary text-white'>
      <div className="container">
        <div className="row">
            <div className="col">
                <p className="mb-0 text-center">&copy;{year}. All Rights Reserved By <b>KM Products</b>.</p>
            </div>
        </div>
      </div>
    </footer>
  )
}
