import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthContext } from 'contexts/AuthContext';
import { LoginOutlined, LogoutOutlined } from '@ant-design/icons';

export default function Navbar() {
    const { state, handleLogout } = useAuthContext();
    const navigate = useNavigate();
    const { isAuthenticated, user } = state;

    const handleLogin = () => {
        navigate('/auth/login');
    };

    return (
        <header>
            <nav className="navbar navbar-expand-lg bg-primary navbar-dark">
                <div className="container">
                    <Link to='/' className="navbar-brand">KM</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to='/about' className="nav-link">About</Link>
                            </li>
                            {isAuthenticated ? (
                                <>
                                    <li className="nav-item">
                                        <Link to='/dashboard' className="nav-link">Dashboard</Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <button className="nav-link dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                            Profile
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li>
                                                <Link to='/dashboard/about' className="dropdown-item">Profile</Link>
                                            </li>
                                            <li>
                                                <Link to='/dashboard/edit-profile' className="dropdown-item">Edit Profile</Link>
                                            </li>
                                        </ul>
                                    </li>
                                    <li className="nav-item">
                                        <Link to='/dashboard/create-menu' className="nav-link">Create Menu</Link>
                                    </li>
                                </>
                            ) : null}
                        </ul>
                        <div className="d-flex">
                            {!isAuthenticated ? (
                                <button className="btn btn-outline-success" onClick={handleLogin}>
                                    <LoginOutlined /> Login
                                </button>
                            ) : (
                                <>
                                    <p className="mb-0 me-2 text-white d-flex justify-content-center align-items-center">
                                        {user.email}
                                    </p>
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                                        <LogoutOutlined /> Logout
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
