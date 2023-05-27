import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import { IoLogInOutline, IoLogOutOutline } from 'react-icons/io5';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { HiShoppingCart, HiUserCircle } from 'react-icons/hi';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import Tippy from '@tippyjs/react';
import Button from '../../../components/Button/Button';
import { useEffect, useState } from 'react';
import LoginForm from '../../../components/LoginForm/LoginForm';
import Toast from '../../../components/Toast/Toast';
import LocalStorageManager from '../../../utils/LocalStorageManager';
import axios from 'axios';
import * as mapService from '../../../services/mapService';
import DetailAdress from '../../../components/DetailAdress/DetailAdress';
const cx = classNames.bind(styles);

function Header() {
    const [showLoginForm, setShowLoginForm] = useState(false);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [currentLocation, setCurrentLocation] = useState(false);
    const [address, setAddress] = useState('');
    const localStorageManager = LocalStorageManager.getInstance();

    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentLocation({ latitude, longitude });
        });
    };
    const getAddress = async () => {
        const results = await mapService.getAddress(currentLocation.latitude, currentLocation.longitude);
        if (results) {
            console.log(results.display_name);
            setAddress(results.display_name);
        }
    };
    useEffect(() => {
        getLocation();
    }, []);
    useEffect(() => {
        getAddress();
    }, [currentLocation]);

    console.log(currentLocation, address);
    const USER_MENU = [
        {
            icon: <MdOutlineHistoryEdu />,
            title: 'Lịch sử đặt hàng',
            to: config.routes.history,
        },

        {
            icon: <IoLogOutOutline />,
            title: 'Đăng xuất',
            separate: true,
            type: 'logout',
        },
    ];

    const handleOnchangeMenu = (menuItem) => {
        switch (menuItem.type) {
            case 'history':
                //change language
                console.log(menuItem);
                break;
            case 'logout':
                localStorageManager.removeItem('token');
                setLoginSuccess(0);
                break;
            default:
                console.log('default');
        }
    };

    return (
        <>
            {showLoginForm && (
                <LoginForm
                    onCloseModal={(loginSuccess) => {
                        setShowLoginForm(false);
                        setLoginSuccess(loginSuccess);
                    }}
                />
            )}
            {loginSuccess && (
                <Toast content="Đăng nhập thành công" title="Đăng nhập" onClose={() => setLoginSuccess(false)} />
            )}
            {showAddressForm && (
                <DetailAdress
                    data={{ ...currentLocation, address: address }}
                    onCloseModal={() => {
                        setShowAddressForm(false);
                    }}
                />
            )}
            <header className={cx('wrapper')}>
                <div className={cx('inner')}>
                    <div className={cx('side-group')}>
                        <Link to={config.routes.dairy}>
                            <div className={cx('logo-wrapper')}>
                                <img src={images.logo} className={cx('logo')} alt="logo" />
                            </div>
                        </Link>
                        {/* Search */}
                        <Search />
                    </div>
                    <div className={cx('side-group')}>
                        <div className={cx('delivery-wrapper')}>
                            <Image
                                className={cx('delivery-img')}
                                src="https://order.phuclong.com.vn/_next/static/images/delivery-686d7142750173aa8bc5f1d11ea195e4.png"
                            />
                            <div onClick={() => setShowAddressForm(true)} className={cx('delivery-body')}>
                                {address ? (
                                    <>
                                        <div className={cx('delivery-title')}>Giao hàng</div>{' '}
                                        <div className={cx('delivery-subtitle')}>{address}</div>
                                    </>
                                ) : (
                                    <div className={cx('delivery-no-address')}>
                                        Chọn địa chỉ giao, quán để xem chính xác các món ăn
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className={cx('actions')}>
                            {localStorageManager.getItem('token') ? (
                                <>
                                    <Menu items={USER_MENU} onChange={handleOnchangeMenu}>
                                        <div className={cx('action-icon')}>
                                            <HiUserCircle />
                                        </div>
                                    </Menu>
                                </>
                            ) : (
                                <Button
                                    onClick={() => setShowLoginForm(true)}
                                    className={cx('login-btn')}
                                    leftIcon={<IoLogInOutline />}
                                >
                                    Đăng nhập
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}

export default Header;
