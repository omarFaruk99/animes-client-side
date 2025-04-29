import { useState, useEffect, useCallback } from 'react';
import useAxiosPublic from "./useAxiosPublic.jsx";

export const useAnimeReviews = (animeId) => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    const fetchReviews = useCallback(async () => {
        try {
            setLoading(true);
            const response = await axiosPublic.get('/anime/comments');
            // Filter reviews for specific anime
            const animeReviews = response.data.filter(
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
    }, [animeId, axiosPublic]);

    useEffect(() => {
        fetchReviews();
    }, [fetchReviews]);

    return { reviews, loading, error, refetch: fetchReviews };
};

