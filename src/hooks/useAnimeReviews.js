import { useState, useEffect } from 'react';
import axios from 'axios';

export const useAnimeReviews = (animeId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                setLoading(true);
                const response = await axios.get('/src/data/reviews.json');
                // Filter reviews for specific anime
                const animeReviews = response.data.reviews.filter(
                    review => review.animeId === parseInt(animeId)
                );
                setReviews(animeReviews);
                setError(null);
            } catch (err) {
                setError('Failed to fetch reviews');
                console.error('Error fetching reviews:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchReviews();
    }, [animeId]);

    return { reviews, loading, error };
};