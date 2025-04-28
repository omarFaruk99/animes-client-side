import React from 'react';
import { useAnimeData } from '../../hooks/useAnimeData';
import AnimationSwiper from '../../components/animations/AnimationSwiper';
import {Link} from "react-router";

const Home = () => {
    const { data: animes, loading } = useAnimeData();

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-violet-500 border-t-transparent shadow-lg shadow-violet-500/20"></div>
                <p className="text-violet-300 animate-pulse font-medium">Loading featured anime...</p>
            </div>
        </div>
    );

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen bg-[#0B1622] text-white">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="relative max-w-7xl mx-auto px-4 py-20">
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white drop-shadow-lg animate-fadeIn">
                            Discover Amazing Anime
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-4 drop-shadow-lg animate-fadeIn animate-delay-200">
                            Explore the best anime series and movies, all in one place
                        </p>
                    </div>

                    <div className="mb-8">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500 mb-6">
                            Featured Anime
                        </h2>
                        <div className="h-[450px]">
                            <AnimationSwiper />
                        </div>
                    </div>

                    <div className="text-center">
                        <Link 
                            to="/top-anime"
                            className="inline-block px-8 py-3 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white text-lg font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-sky-500/25 animate-fadeIn animate-delay-300"
                        >
                            Browse Top Anime
                        </Link>
                    </div>
                </div>
            </section>

            {/* Top Anime Section */}
            <section className="relative py-12 px-4 bg-[#0B1622]">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-sky-900/10 to-transparent"></div>
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
                <div className="relative max-w-7xl mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-500">
                            Most Popular Anime
                        </h2>
                        <Link
                            to="/top-anime"
                            className="text-sm text-sky-400 hover:text-sky-300 transition-colors duration-300"
                        >
                            View All →
                        </Link>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
                        {animes?.sort((a, b) => parseFloat(b.members.replace('M', '')) - parseFloat(a.members.replace('M', '')))
                            .map((anime, index) => (
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
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                    <div className="absolute bottom-0 p-4 w-full">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between gap-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2 py-1 rounded-md bg-sky-500/20 text-sky-400 text-xs font-medium">
                                                        #{index + 1}
                                                    </span>
                                                    <div className="flex items-center gap-1">
                                                        <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.95-.69l1.07-3.292z" />
                                                        </svg>
                                                        <span className="text-yellow-400">{anime.rating}</span>
                                                    </div>
                                                </div>
                                                <span className="text-xs px-2 py-1 rounded-md bg-violet-500/20 text-violet-400">
                                                    {anime.members}
                                                </span>
                                            </div>
                                            <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span>{anime.year}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Home;