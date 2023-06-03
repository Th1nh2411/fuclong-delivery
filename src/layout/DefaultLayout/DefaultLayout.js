import Header from '../components/Header';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import { useContext, useEffect, useState } from 'react';
import Cart from '../../components/Cart/Cart';
import { HiShoppingCart } from 'react-icons/hi';
import { BiArrowToTop } from 'react-icons/bi';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { StoreContext, actions } from '../../store';
import DetailItem from '../../components/DetailItem/DetailItem';
import LoginForm from '../../components/LoginForm/LoginForm';
import Toast from '../../components/Toast/Toast';
import * as cartService from '../../services/cartService';
import config from '../../config';
import { useLocation } from 'react-router';
import DetailChange from '../../components/DetailChange/DetailChange';
import * as mapService from '../../services/mapService';
import * as shopService from '../../services/shopService';
import DetailAddress from '../../components/DetailAddress';
const cx = classNames.bind(styles);
function DefaultLayout({ children }) {
    const [showCart, setShowCart] = useState(false);
    const [cartData, setCartData] = useState({});
    const [cartQuantity, setCartQuantity] = useState(0);
    const [backToTop, setBackToTop] = useState(false);
    const [showDetailChange, setShowDetailChange] = useState(false);

    const [location, setLocation] = useState(false);
    const [address, setAddress] = useState('');

    const localStorageManager = LocalStorageManager.getInstance();
    const [state, dispatch] = useContext(StoreContext);
    const currentPath = useLocation().pathname;
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

    const handleCLickShowCart = () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            setShowCart(true);
        } else {
            dispatch(actions.setShowLogin(true));
        }
    };
    const getCartData = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await cartService.getCartItem(state.idShop, token);
            if (results) {
                setCartData(results);
                const totalQuantityItem =
                    results.cart && results.cart.reduce((total, current) => current.quantityProduct + total, 0);
                setCartQuantity(totalQuantityItem);
            }
            if (results.listIdProduct) {
                setShowDetailChange(true);
            }
        } else {
            setCartQuantity(0);
        }
    };
    useEffect(() => {
        getCartData();
    }, [state.idShop, state.userInfo]);

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
        });
    };
    const getUserInfoToken = () => {
        if (localStorageManager.getItem('userInfo')) {
            const userInfo = localStorageManager.getItem('userInfo');
            dispatch(actions.setUserInfo(userInfo));
        }
    };
    const getAddress = async () => {
        if (location) {
            const results = await mapService.getAddress(location.latitude, location.longitude);
            if (results) {
                setAddress(results.display_name);
                dispatch(actions.setDetailAddress({ address: results.display_name }));
            }
        }
    };
    const setNearestShopFromAddress = async () => {
        if (location) {
            const results = await shopService.getListShop(location.latitude, location.longitude);
            if (results) {
                dispatch(actions.setIdShop(results.listStoreNearest[0].detailShop.idShop));
                dispatch(actions.setDistance(results.listStoreNearest[0].distance));
            }
        }
    };
    useEffect(() => {
        getLocation();
        getUserInfoToken();
    }, []);
    useEffect(() => {
        getAddress();
        setNearestShopFromAddress();
    }, [location]);
    return (
        <>
            <div className={cx('wrapper')}>
                <Header />
                <div className={cx('container')}>
                    <div className={cx('content')}>{children}</div>
                </div>
                <Footer />
            </div>

            {showDetailChange && <DetailChange data={cartData} onCloseModal={() => setShowDetailChange(false)} />}
            {state.toast.show && (
                <Toast
                    content={state.toast.content}
                    title={state.toast.title}
                    onClose={() => dispatch(actions.setToast({ show: false }))}
                />
            )}

            {backToTop && (
                <div onClick={scrollUp} className={cx('back-top-btn')}>
                    <BiArrowToTop />
                </div>
            )}
            {showCart && (
                <Cart data={cartData} onCloseModal={() => setShowCart(false)} onDelItem={() => getCartData()} />
            )}
            {state.detailItem.show && (
                <DetailItem
                    data={state.detailItem.data}
                    onCloseModal={(editing) => {
                        dispatch(actions.setDetailItem({ show: false, data: {} }));
                        if (editing) {
                            setTimeout(() => {
                                getCartData();
                            }, [100]);
                        }
                    }}
                    editing={state.detailItem.editing}
                />
            )}
            {state.detailAddress.show && (
                <DetailAddress
                    data={{ ...location, address: address }}
                    onCloseModal={() => {
                        dispatch(actions.setDetailAddress({ show: false }));
                    }}
                    onChangeLocation={(latitude, longitude) => {
                        setLocation({ latitude, longitude });
                    }}
                />
            )}
            {state.showLogin && (
                <LoginForm
                    onCloseModal={() => {
                        dispatch(actions.setShowLogin(false));
                        // dispatch(
                        //     actions.setToast({
                        //         show: loginSuccess,
                        //         content: 'Đăng nhập thành công',
                        //         title: 'Đăng nhập',
                        //     }),
                        // );
                    }}
                />
            )}
            {currentPath !== config.routes.checkout && (
                <div id="show-cart-btn" onClick={handleCLickShowCart} className={cx('show-cart-btn')}>
                    <HiShoppingCart />
                    <div id="num-item-cart" className={cx('num-item-cart')}>
                        {cartQuantity || 0}
                    </div>
                </div>
            )}
        </>
    );
}
DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
export default DefaultLayout;
