import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './index.module.css';

const Swiper = memo(({
    slides,
    loop = true,
    counter = true,
    swiperContainerStyles = {},
    counterContainerStyles = {},
    counterItemsStyles = {},
    activeCounterItemStyles = {},
    autoSwipeDelay = 3000
}) => {
    const isSingleImage = slides.length === 1;
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop, draggable: !isSingleImage });
    const [currentIndex, setCurrentIndex] = useState(0);
    const [progress, setProgress] = useState(100);
    const progressIntervalRef = useRef(null);

    const resetProgress = () => {
        setProgress(100);
        if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
        }
    };

    const onSelect = useCallback(() => {
        if (emblaApi) {
            setCurrentIndex(emblaApi.selectedScrollSnap());
            resetProgress();
        }
    }, [emblaApi]);

    useEffect(() => {
        if (emblaApi && !isSingleImage) {
            emblaApi.on('select', onSelect);
            emblaApi.on('settle', onSelect);
            onSelect();
        }
    }, [emblaApi, onSelect, isSingleImage]);


    useEffect(() => {
        if (!emblaApi || !autoSwipeDelay || isSingleImage) return;

        let startTime = Date.now();

        const updateProgress = () => {
            const elapsedTime = Date.now() - startTime;
            const newProgress = 100 - (elapsedTime / autoSwipeDelay) * 100;

            if (newProgress <= 0) {
                setProgress(100);
                emblaApi.scrollNext();
                startTime = Date.now();
            } else {
                setProgress(newProgress);
                progressIntervalRef.current = requestAnimationFrame(updateProgress);
            }
        };

        progressIntervalRef.current = requestAnimationFrame(updateProgress);

        return () => {
            if (progressIntervalRef.current) {
                cancelAnimationFrame(progressIntervalRef.current);
            }
        };
    }, [emblaApi, autoSwipeDelay, isSingleImage, currentIndex]);

    const handleDotClick = (index) => {
        if (emblaApi) {
            emblaApi.scrollTo(index);
            resetProgress();
        }
    };

    return (
        <div
            style={swiperContainerStyles}
            className={`${styles.swiperContainer} ${isSingleImage ? styles.singleImageContainer : ''}`}
        >
            <div className={styles.progressBarContainer}>
                <div className={styles.progressBar} style={{ width: `${progress}%` }} />
            </div>

            <div className={styles.embla} ref={!isSingleImage ? emblaRef : null}>
                <div className={styles.emblaContainer}>
                    {slides.map((slide, index) => (
                        <div className={styles.emblaSlide} key={index}>
                            <img src={slide} alt={`Slide ${index}`} className={styles.image} />
                        </div>
                    ))}
                </div>
            </div>

            {counter && slides.length > 1 && (
                <div className={styles.dots} style={{ ...counterContainerStyles }}>
                    {slides.map((_, index) => (
                        <div
                            key={index}
                            className={`${styles.dot}`}
                            style={currentIndex === index ? { ...counterItemsStyles, ...activeCounterItemStyles } : counterItemsStyles}
                            onClick={() => handleDotClick(index)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
});

Swiper.displayName = "Swiper";

export default Swiper;




































