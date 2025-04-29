// import { useState, useEffect } from 'react';
// import useAxiosPublic from './useAxiosPublic';

// export const useUserComments = (userEmail) => {
//     const [comments, setComments] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);
//     const axiosPublic = useAxiosPublic();

//     useEffect(() => {
//         const fetchComments = async () => {
//             if (!userEmail) return;

//             try {
//                 setLoading(true);
//                 const response = await axiosPublic.get('/user/comment', {
//                     params: { userEmail } // Send as query parameter
//                 });
//                 setComments(response.data.comments || []); // Handle potential undefined
//                 setError(null);
//             } catch (err) {
//                 setError(err.response?.data?.error || 'Failed to fetch comments');
//                 console.error('Error fetching user comments:', err);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         fetchComments();
//     }, [userEmail, axiosPublic]);

//     return { comments, loading, error };
// };




import { useState, useEffect } from 'react';
import useAxiosPublic from './useAxiosPublic';

export const useUserComments = (userEmail) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const axiosPublic = useAxiosPublic();

    useEffect(() => {
        const fetchComments = async () => {
            if (!userEmail) return;

            try {
                setLoading(true);
                console.log('Fetching comments for:', userEmail);
                const response = await axiosPublic.get('/user/comment', {
                    params: { userEmail }
                });
                
                // Better handling of the response
                if (response.data && Array.isArray(response.data)) {
                    setComments(response.data);
                } else if (response.data && response.data.comments) {
                    setComments(response.data.comments);
                } else {
                    setComments([]);
                }
                setError(null);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to fetch comments');
                console.error('Error fetching user comments:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchComments();
    }, [userEmail, axiosPublic]);

    return { comments, loading, error };
};