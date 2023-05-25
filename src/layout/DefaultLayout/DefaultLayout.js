import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useEffect, useState } from 'react';
import Cart from '../../components/Cart/Cart';
import { HiShoppingCart } from 'react-icons/hi';
import { BiArrowToTop } from 'react-icons/bi';
import LocalStorageManager from '../../utils/LocalStorageManager';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [backToTop, setBackToTop] = useState(false);
    const localStorageManager = LocalStorageManager.getInstance();
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                setBackToTop(true);
            } else {
                setBackToTop(false);
            }
        });
    }, []);
    const scrollUp = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>
            {backToTop && (
                <div onClick={scrollUp} className={cx('back-top-btn')}>
                    <BiArrowToTop />
                </div>
            )}
            {showCart && <Cart onCloseModal={() => setShowCart(false)} />}
            <div id="show-cart-btn" onClick={() => setShowCart(true)} className={cx('show-cart-btn')}>
                <HiShoppingCart />
                <div id="num-item-cart" className={cx('num-item-cart')}>
                    {localStorageManager.getItem('cart') ? localStorageManager.getItem('cart').length : 0}
                </div>
            </div>
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
