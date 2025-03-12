// src/pages/HomePage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    React.useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return <div>Redirecting...</div>;
};

export default HomePage;