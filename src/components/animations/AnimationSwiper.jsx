import React, { useEffect, useState } from 'react';
import { useAnimeData } from '../../hooks/useAnimeData';
import './styles.css';

const AnimationSwiper = () => {
    const { data: animes } = useAnimeData('featured');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (!animes?.length) return;

        const interval = setInterval(() => {
            setIsTransitioning(true);
            setTimeout(() => {
                setCurrentIndex((prev) => (prev + 1) % animes.length);
                setIsTransitioning(false);
            }, 500);
        }, 5000);

        return () => clearInterval(interval);
    }, [animes]);

    if (!animes?.length) return null;

    const currentAnime = animes[currentIndex];
    const nextIndex = (currentIndex + 1) % animes.length;
    const nextAnime = animes[nextIndex];

    return (
        <div className="relative w-full h-full overflow-hidden">
            {/* Current Slide */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                    isTransitioning ? 'opacity-0' : 'opacity-100'
                }`}
            >
                <img
                    src={currentAnime.image}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1622] via-[#0B1622]/60 to-transparent"></div>
            </div>

            {/* Next Slide (Preload) */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${
                    isTransitioning ? 'opacity-100' : 'opacity-0'
                }`}
            >
                <img
                    src={nextAnime.image}
                    alt=""
                    className="w-full h-full object-cover opacity-50"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1622] via-[#0B1622]/60 to-transparent"></div>
            </div>

            {/* Indicator Dots */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {animes.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            setIsTransitioning(true);
                            setTimeout(() => {
                                setCurrentIndex(index);
                                setIsTransitioning(false);
                            }, 500);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex
                                ? 'w-6 bg-violet-500'
                                : 'bg-white/30 hover:bg-white/50'
                        }`}
                    />
                ))}
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev - 1 + animes.length) % animes.length);
                        setIsTransitioning(false);
                    }, 500);
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <button
                onClick={() => {
                    setIsTransitioning(true);
                    setTimeout(() => {
                        setCurrentIndex((prev) => (prev + 1) % animes.length);
                        setIsTransitioning(false);
                    }, 500);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-black/30 text-white/70 hover:bg-black/50 hover:text-white transition-all duration-300"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};

export default AnimationSwiper;
