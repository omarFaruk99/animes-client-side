import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import { useAnimeData } from '../../hooks/useAnimeData';
import { useUserComments } from '../../hooks/useUserComments';
import { Link } from 'react-router';

const Profile = () => {
    const { user } = useAuth();
    const { data: animes } = useAnimeData('topAnime');
    const { comments, loading: commentsLoading, error: commentsError } = useUserComments(user?.email);
    const [activeTab, setActiveTab] = useState('watchlist');
    
    // Filter animes that are in user's watchlist (status: true)
    const watchlist = animes.filter(anime => anime.status);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
                <div className="text-center space-y-4">
                    <h2 className="text-2xl font-bold text-white">Please sign in to view your profile</h2>
                    <Link
                        to="/login"
                        className="inline-block px-6 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0B1622] text-white pb-16">
            {/* Profile Header */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-[#0B1622] to-[#0B1622]"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="flex flex-col items-center space-y-4">
                        <img
                            src={user.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.displayName)}
                            alt={user.displayName}
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-sky-500/50 shadow-lg shadow-sky-500/25"
                        />
                        <h1 className="text-3xl font-bold text-white">{user.displayName}</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>
                </div>
            </div>

            {/* Content Tabs */}
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex space-x-2 mb-8">
                    <button
                        onClick={() => setActiveTab('watchlist')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'watchlist'
                            ? 'bg-sky-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-sky-500/10 hover:text-sky-400'
                        }`}
                    >
                        My Watchlist
                    </button>
                    <button
                        onClick={() => setActiveTab('comments')}
                        className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                            activeTab === 'comments'
                            ? 'bg-sky-500 text-white'
                            : 'bg-white/5 text-gray-300 hover:bg-sky-500/10 hover:text-sky-400'
                        }`}
                    >
                        My Comments
                    </button>
                </div>

                {/* Watchlist Content */}
                {activeTab === 'watchlist' && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        {watchlist.length > 0 ? (
                            watchlist.map((anime, index) => (
                                <Link
                                    key={anime.id}
                                    to={`/anime/${anime.id}`}
                                    className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm ring-1 ring-white/10 animate-fadeIn"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <img
                                        src={anime.image}
                                        alt={anime.title}
                                        className="w-full h-full object-cover transform group-hover:scale-105 transition-all duration-700"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                        <div className="absolute bottom-0 p-4">
                                            <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
                                            <div className="flex items-center gap-2 mt-2">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-yellow-400">{anime.rating}</span>
                                                </div>
                                                <span className="text-xs text-gray-400">{anime.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 inline-block">
                                    <p className="text-gray-400">Your watchlist is empty. Start adding some anime!</p>
                                    <Link
                                        to="/top-anime"
                                        className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                    >
                                        Browse Top Anime
                                    </Link>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Comments Content */}
                {activeTab === 'comments' && (
                    <div className="space-y-6">
                        {commentsLoading ? (
                            <div className="flex justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-2 border-sky-500 border-t-transparent"></div>
                            </div>
                        ) : commentsError ? (
                            <div className="text-center py-12 bg-red-500/10 backdrop-blur-xl rounded-lg border border-red-500/20">
                                <p className="text-red-400">{commentsError}</p>
                            </div>
                        ) : comments.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 inline-block">
                                    <p className="text-gray-400">You haven't made any comments yet.</p>
                                    <Link
                                        to="/top-anime"
                                        className="inline-block mt-4 px-6 py-2 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-sm font-medium transition-all duration-300 transform hover:scale-105"
                                    >
                                        Browse Anime to Comment
                                    </Link>
                                </div>
                            </div>
                        ) : (
                            <div className="grid gap-6">
                                {comments.map((comment) => (
                                    <div 
                                        key={comment.id}
                                        className="group bg-white/5 backdrop-blur-xl rounded-xl p-6 hover:bg-white/10 transition-all duration-500 border border-white/10 hover:border-sky-500/20"
                                    >
                                        <div className="flex items-start gap-4">
                                            <Link 
                                                to={`/anime/${comment.animeId}`}
                                                className="shrink-0"
                                            >
                                                <img 
                                                    src={comment.animeImage || 'https://via.placeholder.com/80x120'}
                                                    alt={comment.animeTitle || 'Anime'}
                                                    className="w-20 h-30 object-cover rounded-lg ring-2 ring-white/10 group-hover:ring-sky-500/50 transition-all duration-500"
                                                />
                                            </Link>
                                            <div className="flex-1 min-w-0">
                                                <Link 
                                                    to={`/anime/${comment.animeId}`}
                                                    className="text-lg font-semibold text-white hover:text-sky-400 transition-colors duration-200"
                                                >
                                                    {comment.animeTitle || 'Unknown Anime'}
                                                </Link>
                                                <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span>{comment.rating}</span>
                                                    </div>
                                                    {/*<span>{new Date(comment.date).toLocaleDateString()}</span>*/}
                                                </div>
                                                <p className="mt-4 text-gray-300 leading-relaxed">
                                                    {comment.content}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;