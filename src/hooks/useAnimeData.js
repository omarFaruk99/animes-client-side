import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAnimeData = (type = 'topAnime') => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/src/data/animeData.json');
                // Get saved list status from localStorage
                const savedStatuses = JSON.parse(localStorage.getItem('animeListStatuses') || '{}');
                
                // Merge saved statuses with fetched data
                const dataWithStatus = response.data[type].map(anime => ({
                    ...anime,
                    status: savedStatuses[anime.id] || false
                }));
                
                setData(dataWithStatus);
                setError(null);
            } catch (err) {
                setError('Failed to fetch anime data');
                console.error('Error fetching anime data:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [type]);

    const toggleAnimeStatus = (animeId) => {
        setData(prevData => {
            const newData = prevData.map(anime => 
                anime.id === animeId ? { ...anime, status: !anime.status } : anime
            );
            
            // Save updated statuses to localStorage
            const savedStatuses = JSON.parse(localStorage.getItem('animeListStatuses') || '{}');
            const updatedAnime = newData.find(a => a.id === animeId);
            if (updatedAnime) {
                savedStatuses[animeId] = updatedAnime.status;
                localStorage.setItem('animeListStatuses', JSON.stringify(savedStatuses));
            }
            
            return newData;
        });
    };

    return { data, loading, error, toggleAnimeStatus };
};