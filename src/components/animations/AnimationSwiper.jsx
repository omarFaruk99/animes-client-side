import React from 'react';
import { useAnimeData } from '../../hooks/useAnimeData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const AnimationSwiper = () => {
    const { data: animes } = useAnimeData('featuredAnime');

    if (!animes?.length) return null;

    return (
        <div className="w-full h-full">
            <Swiper
                modules={[Pagination, FreeMode, Autoplay]}
                slidesPerView={1}
                spaceBetween={20}
                freeMode={true}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                breakpoints={{
                    // when window width is >= 640px (sm)
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    // when window width is >= 768px (md)
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    // when window width is >= 1024px (lg)
                    1024: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
                className="mySwiper"
            >
                {animes.map((anime) => (
                    <SwiperSlide key={anime.id}>
                        <div className="relative w-full h-full group rounded-lg overflow-hidden">
                            <img
                                src={anime.image}
                                alt={anime.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
                                <div className="absolute bottom-0 p-4 text-left">
                                    <h3 className="text-lg font-semibold text-white">{anime.title}</h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <div className="flex items-center gap-1">
                                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span className="text-yellow-400">{anime.rating}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default AnimationSwiper;
