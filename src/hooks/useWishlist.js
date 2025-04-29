import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';
import { toast } from 'react-toastify';

export const useWishlist = (userEmail) => {
    const [wishlist, setWishlist] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    // Fetch user's wishlist
    useEffect(() => {
        const fetchWishlist = async () => {
            if (!userEmail) {
                setWishlist([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axiosPublic.get(`/user/wishlist/${userEmail}`);
                setWishlist(response.data || []);
                setError(null);
            } catch (err) {
                setError('Failed to fetch wishlist');
                console.error('Error fetching wishlist:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchWishlist();
    }, [userEmail, axiosPublic]);

    // Toggle anime in wishlist
    const toggleWishlist = async (anime, userEmail) => {
        if (!userEmail) {
            toast.error('Please login to add to wishlist');
            return false;
        }

        try {
            const animeData = {
                animeId: anime.id,
                userEmail: userEmail,
                // title: anime.title,
                // image: anime.image,
                // rating: anime.rating,
                // year: anime.year,
                // members: anime.members
            };

            // Check if anime is already in wishlist
            const exists = wishlist.some(item => item.animeId === anime.id);

            if (exists) {
                // Remove from wishlist
                await axiosPublic.delete(`/user/wishlist/${userEmail}/${anime.id}`);
                setWishlist(prev => prev.filter(item => item.animeId !== anime.id));
                toast.success('Removed from wishlist');
            } else {
                // Add to wishlist
                await axiosPublic.post('/user/wishlist', animeData);
                setWishlist(prev => [...prev, animeData]);
                toast.success('Added to wishlist');
            }

            return true;
        } catch (error) {
            console.error('Error toggling wishlist:', error);
            toast.error('Failed to update wishlist');
            return false;
        }
    };

    // Check if an anime is in the wishlist
    const isInWishlist = (animeId) => {
        return wishlist.some(item => item.animeId === animeId);
    };

    return {
        wishlist,
        loading,
        error,
        toggleWishlist,
        isInWishlist
    };
};