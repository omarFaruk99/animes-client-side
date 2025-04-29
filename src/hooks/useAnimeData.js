import { useState, useEffect } from 'react';
import useAxiosPublic from "./useAxiosPublic.jsx";

// The 'type' parameter is used to filter animes. It can be:
// - 'all' (default): shows all animes
// - 'featured': shows only special/featured animes
export const useAnimeData = (type = 'all') => {
    const axiosPublic = useAxiosPublic()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                // const response = await axios.get('/src/data/animeData.json');

                const response = await axiosPublic.get('/anime')

                // Get saved anime statuses from browser's localStorage
                // If nothing is saved, use empty object {}
                const savedStatuses = JSON.parse(localStorage.getItem('animeListStatuses') || '{}');
                
                // Transform each anime object:
                // 1. Keep all original properties using ...anime
                // 2. Add status from localStorage (or false if not found)
                // 3. Convert rating from string to number
                let animes = response.data.map(anime => ({
                    ...anime,
                    status: savedStatuses[anime.id] || false,
                    rating: parseFloat(anime.rating)
                }));
                
                // Sort animes by rating (highest to lowest)
                // Example: [9.5, 8.7, 7.2]
                animes.sort((a, b) => b.rating - a.rating);
                
                // If type is 'featured', only keep animes where isFeatured is true
                // Example usage: useAnimeData('featured')
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