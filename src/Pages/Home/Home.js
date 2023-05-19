import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { useEffect, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const cx = classNames.bind(styles);

function Home() {
    const [sliderCheck, setSliderCheck] = useState(0);
    const sliders = [images.coconutCaramel, images.longan, images.twoFor1, images.stayTuned];
    const handleClickChangeSlide = (value) => {
        setSliderCheck(value);
    };
    console.log(1);
    useEffect(() => {
        var counter = 0;
        const slideInterval = setInterval(() => {
            setSliderCheck(sliderCheck + 1);
            if (sliderCheck === sliders.length - 1) {
                counter = 0;
                setSliderCheck(0);
            }
        }, 3000);
        return () => clearInterval(slideInterval);
    }, [sliderCheck]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slider-section')}>
                <div className={cx('slide-list')}>
                    {sliders.map((slider, index) => (
                        <Image
                            key={index}
                            className={cx('slide')}
                            src={slider}
                            style={index === 0 ? { marginLeft: sliderCheck * -100 + '%' } : {}}
                        />
                    ))}
                </div>
                <div className={cx('slide-dots')}>
                    {sliders.map((slider, index) => (
                        <input
                            key={index}
                            onChange={() => handleClickChangeSlide(index)}
                            value={index}
                            checked={sliderCheck == index}
                            type="radio"
                            name="slide-dot"
                        />
                    ))}
                </div>
                <div
                    onClick={() => {
                        if (sliderCheck === sliders.length) {
                            setSliderCheck(0);
                        } else {
                            setSliderCheck((prev) => prev - 1);
                        }
                    }}
                    className={cx('left-slide-btn')}
                >
                    <FiChevronLeft />
                </div>
                <div
                    onClick={() => {
                        if (sliderCheck === sliders.length) {
                            setSliderCheck(0);
                        } else {
                            setSliderCheck((prev) => prev + 1);
                        }
                    }}
                    className={cx('right-slide-btn')}
                >
                    <FiChevronRight />
                </div>
            </div>
        </div>
    );
}

export default Home;
