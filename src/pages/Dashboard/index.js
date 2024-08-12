import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import About from './About';
import NoPage from 'pages/Frontend/NoPage';
import Header from 'components/Header';
import Footer from 'components/Footer';
import CreateMenu from './CreateMenu';
import EditProduct from './EditProduct';
import EditProfile from './EditProfile';

export default function Index() {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='about' element={<About />} />
                <Route path='create-menu' element={<CreateMenu />} />
                <Route path='edit-menu/:id' element={<EditProduct />} />
                <Route path='edit-profile' element={<EditProfile />} />
                <Route path='*' element={<NoPage />} />
            </Routes>
            <Footer />
        </>
    );
}
