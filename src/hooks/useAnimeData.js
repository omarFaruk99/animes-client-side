import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAnimeData = (type = 'all') => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/src/data/animeData.json');
                const savedStatuses = JSON.parse(localStorage.getItem('animeListStatuses') || '{}');
                
                // Sort animes by rating and assign ranks
                let animes = response.data.animes.map(anime => ({
                    ...anime,
                    status: savedStatuses[anime.id] || false,
                    rating: parseFloat(anime.rating)
                }));
                
                // Sort by rating and assign calculated ranks
                animes.sort((a, b) => b.rating - a.rating);
                
                // Filter based on type if needed
                if (type === 'featured') {
                    animes = animes.filter(anime => anime.isFeatured);
                }
                
                setData(animes);
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