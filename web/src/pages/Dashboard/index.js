import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles.css';

import api from '../../services/api';

export default function Dashboard() {
    const [ spots, setSpots ] = useState([]);
    
    useEffect(() => {
        async function loadSpots() {
            const user_id = localStorage.getItem('user');
            const response = await api.get('/dashboard', {
                headers: {
                    user_id
                }
            }); 

            setSpots(response.data);
        }

        loadSpots();
    }, []);

    function renderPrice(value) {
        return value ? `RS${value}/dia` : 'GRATUITO';
    }

    return (
        <>
            <ul className="spot-list">
                {spots.map(spot => (
                    <li key={spot._id}>
                        <header style={{ backgroundImage: `url(${spot.thumbnail_url})` }} />
                        <strong>{spot.company}</strong>
                        <span>{renderPrice(spot.price)}</span>
                    </li>
                ))}
            </ul>

            <Link to="/new">
                <button className="btn">Cadastar novo spot</button>
            </Link>
        </>
    );
}