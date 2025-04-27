import React, { useState, useCallback } from 'react';
import { useAnimeData } from '../../hooks/useAnimeData';
import {Link} from "react-router";

const TopAnime = () => {
    const { data: animes, loading } = useAnimeData('topAnime');
    const [selectedGenre, setSelectedGenre] = useState('all');
    const [selectedYear, setSelectedYear] = useState('all');
    const [sortBy, setSortBy] = useState('rank');
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'grid'

    const genres = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi'];
    const years = ['2025', '2024', '2023', '2022', '2021', '2020'];

    const filterAnimes = useCallback(() => {
        if (!animes) return [];
        return animes.filter(anime => {
            const genreMatch = selectedGenre === 'all' || anime.genres?.includes(selectedGenre);
            const yearMatch = selectedYear === 'all' || anime.year?.toString() === selectedYear;
            return genreMatch && yearMatch;
        }).sort((a, b) => {
            if (sortBy === 'rank') return a.rank - b.rank;
            if (sortBy === 'rating') return b.rating - a.rating;
            if (sortBy === 'year') return b.year - a.year;
            return 0;
        });
    }, [animes, selectedGenre, selectedYear, sortBy]);

    if (loading) return (
        <div className="min-h-screen flex items-center justify-center bg-[#0B1622]">
            <div className="flex flex-col items-center gap-4">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-sky-500 border-t-transparent shadow-lg shadow-sky-500/20"></div>
                <p className="text-sky-300 animate-pulse font-medium">Loading top anime...</p>
            </div>
        </div>
    );

    const filteredAnimes = filterAnimes();

    return (
        <div className="min-h-screen bg-[#0B1622] text-white pb-16">
            {/* Hero Section */}
            <div className="relative py-20 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-sky-900/20 via-[#0B1622] to-[#0B1622]"></div>
                <div className="relative max-w-7xl mx-auto px-4">
                    <div className="text-center space-y-4">
                        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-blue-400">
                                Top Rated Anime
                            </span>
                        </h1>
                        <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                            Discover the highest-rated and most popular anime series of all time, curated by our community.
                        </p>
                    </div>
                </div>
            </div>

            {/* Filters Section */}
            <div className="max-w-7xl mx-auto px-4 mb-8">
                <div className="bg-white/5 backdrop-blur-xl rounded-xl p-6 border border-white/10">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {/* Genre Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Genre</label>
                            <select
                                value={selectedGenre}
                                onChange={(e) => setSelectedGenre(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            >
                                <option value="all">All Genres</option>
                                {genres.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Year Filter */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Year</label>
                            <select
                                value={selectedYear}
                                onChange={(e) => setSelectedYear(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            >
                                <option value="all">All Years</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                        </div>

                        {/* Sort By */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">Sort By</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full bg-white/10 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                            >
                                <option value="rank">Rank</option>
                                <option value="rating">Rating</option>
                                <option value="year">Year</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-300">View Mode</label>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setViewMode('table')}
                                    className={`flex-1 px-4 py-2.5 rounded-lg border ${
                                        viewMode === 'table'
                                            ? 'bg-sky-500 border-sky-400 text-white'
                                            : 'bg-white/10 border-white/10 text-gray-300 hover:bg-sky-500/10'
                                    } transition-all duration-300`}
                                >
                                    Table
                                </button>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`flex-1 px-4 py-2.5 rounded-lg border ${
                                        viewMode === 'grid'
                                            ? 'bg-sky-500 border-sky-400 text-white'
                                            : 'bg-white/10 border-white/10 text-gray-300 hover:bg-sky-500/10'
                                    } transition-all duration-300`}
                                >
                                    Grid
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4">
                {viewMode === 'table' ? (
                    // Table View
                    <div className="bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rank</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Title</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Rating</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Year</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Members</th>
                                        <th className="px-6 py-4 text-left text-sm font-medium text-gray-300">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10">
                                    {filteredAnimes.map((anime) => (
                                        <tr
                                            key={anime.id}
                                            className="hover:bg-sky-500/5 transition-colors duration-200"
                                        >
                                            <td className="px-6 py-4">
                                                <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-400 text-xs font-medium">
                                                    #{anime.rank}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link to={`/anime/${anime.id}`} className="flex items-center gap-3 group">
                                                    <img
                                                        src={anime.image}
                                                        alt={anime.title}
                                                        className="w-12 h-16 object-cover rounded-md group-hover:ring-2 ring-sky-500 transition-all duration-300"
                                                    />
                                                    <span className="font-medium group-hover:text-sky-400 transition-colors duration-200">
                                                        {anime.title}
                                                    </span>
                                                </Link>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-yellow-400">{anime.rating}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-gray-300">{anime.year}</td>
                                            <td className="px-6 py-4 text-gray-300">{anime.members}</td>
                                            <td className="px-6 py-4">
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    anime.status
                                                        ? 'bg-green-500/20 text-green-400'
                                                        : 'bg-sky-500/20 text-sky-400'
                                                }`}>
                                                    {anime.status ? 'Watching' : 'Add to List'}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    // Grid View
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 lg:gap-6">
                        {filteredAnimes.map((anime, index) => (
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
                                    <div className="absolute bottom-0 p-4 w-full">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-1 rounded-md bg-violet-500/20 text-violet-400 text-xs font-medium">
                                                    #{anime.rank}
                                                </span>
                                                <div className="flex items-center gap-1">
                                                    <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                    </svg>
                                                    <span className="text-yellow-400 text-sm">{anime.rating}</span>
                                                </div>
                                            </div>
                                            <h3 className="text-sm font-semibold line-clamp-2">{anime.title}</h3>
                                            <div className="flex items-center gap-2 text-xs text-gray-400">
                                                <span>{anime.year}</span>
                                                {anime.genres?.slice(0, 2).map(genre => (
                                                    <span key={genre} className="px-1.5 py-0.5 rounded-full bg-white/10">
                                                        {genre}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {filteredAnimes.length === 0 && (
                    <div className="text-center py-12">
                        <div className="bg-white/5 backdrop-blur-xl rounded-lg p-6 inline-block">
                            <p className="text-gray-400">No anime found matching your filters.</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TopAnime;
