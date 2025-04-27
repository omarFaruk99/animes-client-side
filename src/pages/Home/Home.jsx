import React from 'react';
// import { Link } from 'react-router-dom';
import { useAnimeData } from '../../hooks/useAnimeData';
import AnimationSwiper from '../../components/animations/AnimationSwiper';
import {Link} from "react-router";

const Home = () => {
    const { data: topAnimes, loading } = useAnimeData('topAnime');
    const { data: newReleases } = useAnimeData('newReleases');

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/20"></div>
                <p className="text-violet-300 animate-pulse font-medium">Loading amazing content...</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0B1622] text-white pb-16">
            {/* Top Anime Section */}
            <section className="py-16 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-violet-400 to-fuchsia-400">
                            Top Rated Anime
                        </h2>
                        <Link
                            to="/top-anime"
                            className="text-sm text-violet-400 hover:text-violet-300 transition-colors duration-300"
                        >
                            View All →
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        {topAnimes?.slice(0, 10).map((anime) => (
                            <Link
                                key={anime.id}
                                to={`/anime/${anime.id}`}
                                className="group relative aspect-[2/3] rounded-xl overflow-hidden bg-gray-800/30 backdrop-blur-sm ring-1 ring-white/10"
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
                                                <span className="text-sm text-yellow-400">{anime.rating}</span>
                                            </div>
                                            <span className="text-xs text-gray-400">{anime.year}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;