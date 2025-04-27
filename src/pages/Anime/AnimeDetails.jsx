import React from 'react';
import { useParams } from 'react-router';
import { useAnimeData } from '../../hooks/useAnimeData';
import { useAnimeReviews } from '../../hooks/useAnimeReviews';

const AnimeDetails = () => {
    const { id } = useParams();
    const { data: animes, loading, error, toggleAnimeStatus } = useAnimeData('topAnime');
    const { reviews, loading: reviewsLoading, error: reviewsError } = useAnimeReviews(id);
    
    const anime = animes?.find(a => a.id === parseInt(id));

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/20"></div>
                <p className="text-violet-300 animate-pulse font-medium">Loading anime details...</p>
            </div>
        </div>
    );

    if (error || !anime) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
            <div className="bg-red-500/10 p-6 rounded-lg border border-red-500/20 text-red-400 backdrop-blur-xl">
                {error || 'Anime not found'}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0B1622] text-white">
            {/* Hero Section */}
            <div className="relative min-h-[85vh] lg:min-h-[75vh] overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 backdrop-blur-md transform scale-105">
                        <img 
                            src={anime.image} 
                            alt=""
                            className="w-full h-full object-cover opacity-20"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B1622] via-[#0B1622]/95 to-[#0B1622]/60"></div>
                    <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                </div>

                {/* Content */}
                <div className="relative h-full max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8 lg:gap-12">
                        {/* Left Side - Poster */}
                        <div className="w-full max-w-[300px] shrink-0 animate-fadeIn">
                            <div className="aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 bg-gray-800/30 backdrop-blur-sm relative group">
                                <img 
                                    src={anime.image} 
                                    alt={anime.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                        </div>

                        {/* Right Side - Info */}
                        <div className="flex-1 w-full text-center md:text-left animate-fadeInUp">
                            <div className="space-y-6">
                                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                                    {anime.title}
                                </h1>
                                
                                <div className="flex flex-wrap gap-3 items-center justify-center md:justify-start text-sm">
                                    <div className="flex items-center gap-1.5 bg-yellow-500/10 backdrop-blur-sm px-4 py-2 rounded-full border border-yellow-500/20 shadow-lg shadow-yellow-500/5">
                                        <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                        <span className="font-semibold text-yellow-400">{anime.rating}</span>
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg shadow-white/5">
                                        {anime.year}
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-violet-500/10 backdrop-blur-sm border border-violet-500/20 shadow-lg shadow-violet-500/5">
                                        Rank #{anime.rank}
                                    </div>
                                    <div className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg shadow-white/5 flex items-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                        {anime.members}
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed max-w-3xl text-lg backdrop-blur-sm bg-black/20 p-6 rounded-xl border border-white/5">
                                    {anime.description || "No description available for this anime."}
                                </p>

                                <button
                                    onClick={() => toggleAnimeStatus(anime.id)}
                                    className={`inline-flex items-center gap-2 px-8 py-3 rounded-lg text-sm font-medium transition-all duration-500 transform hover:scale-105 ${
                                        anime.status 
                                        ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25' 
                                        : 'bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white hover:shadow-lg hover:shadow-violet-500/25'
                                    }`}
                                >
                                    {anime.status ? (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                            </svg>
                                            Added to My List
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                            </svg>
                                            Add to My List
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">Reviews</h2>
                    <button className="px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-500 to-fuchsia-600 hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 text-sm font-medium transform hover:scale-105">
                        Write a Review
                    </button>
                </div>

                {reviewsLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-violet-500 border-t-transparent"></div>
                    </div>
                ) : reviewsError ? (
                    <div className="text-center text-red-400 py-12 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/20">
                        {reviewsError}
                    </div>
                ) : reviews.length === 0 ? (
                    <div className="text-center text-gray-400 py-12 bg-white/5 backdrop-blur-xl rounded-lg border border-white/10">
                        No reviews yet. Be the first to review!
                    </div>
                ) : (
                    <div className="grid gap-6">
                        {reviews.map((review) => (
                            <div key={review.id} className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-violet-500/20">
                                <div className="flex items-start gap-4">
                                    <div className="shrink-0">
                                        <img 
                                            src={review.reviewerImage}
                                            alt={review.reviewerName}
                                            className="w-12 h-12 rounded-full object-cover ring-2 ring-white/10 group-hover:ring-violet-500/50 transition-all duration-500"
                                            onError={(e) => {
                                                e.target.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(review.reviewerName);
                                            }}
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex justify-between items-start gap-x-4">
                                            <div>
                                                <h3 className="font-semibold text-lg truncate pr-4">
                                                    {review.reviewerName}
                                                </h3>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span>{review.rating}</span>
                                                    </div>
                                                    <span>•</span>
                                                    <span>{new Date(review.date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <button className="flex items-center gap-2 text-gray-400 hover:text-violet-400 transition-all duration-300 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 group-hover:opacity-100 opacity-0 border border-white/10 hover:border-violet-500/20">
                                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                                </svg>
                                                <span className="text-sm">{review.likes}</span>
                                            </button>
                                        </div>
                                        <p className="mt-4 text-gray-300 leading-relaxed">
                                            {review.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnimeDetails;