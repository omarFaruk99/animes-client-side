import React, { useState } from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../hooks/useAxiosPublic';
import { toast } from 'react-toastify';

const ReviewModal = ({ isOpen, onClose, animeId, onReviewSubmitted }) => {
    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();
    const [rating, setRating] = useState(0);
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!user) {
            toast.error('Please login to submit a review');
            return;
        }

        if (rating === 0) {
            toast.error('Please select a rating');
            return;
        }

        if (content.trim().length < 10) {
            toast.error('Review must be at least 10 characters long');
            return;
        }

        try {
            setIsSubmitting(true);
            
            const reviewData = {
                animeId: parseInt(animeId),
                // reviewerId: user.uid,
                // reviewerName: user.displayName,
                // reviewerImage: user.photoURL,
                reviewerEmail: user.email,
                rating: rating.toFixed(1),
                date: new Date().toISOString().split('T')[0],
                content: content.trim()
            };

            console.log("review Data===========>",reviewData);
            
            await axiosPublic.post('/anime/comments', reviewData);
            
            toast.success('Review submitted successfully!');
            onReviewSubmitted();
            onClose();
            
            // Reset form
            setRating(0);
            setContent('');
        } catch (error) {
            console.error('Error submitting review:', error);
            toast.error('Failed to submit review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-[#0B1622]/95 rounded-xl border border-white/10 shadow-xl animate-fadeIn">
                <div className="p-6 space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">Write a Review</h3>
                        <button
                            onClick={onClose}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating Section */}
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                Rating
                            </label>
                            <div className="flex items-center gap-2">
                                {[...Array(10)].map((_, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setRating(index + 1)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                                            index < rating
                                                ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20'
                                                : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                                        }`}
                                    >
                                        {index + 1}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Review Content */}
                        <div>
                            <label className="block text-sm font-medium text-white/90 mb-2">
                                Your Review
                            </label>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Share your thoughts about this anime..."
                                rows={6}
                                className="w-full px-4 py-3 rounded-lg border border-white/10 bg-white/5 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isSubmitting ? 'Submitting...' : 'Submit Review'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ReviewModal;