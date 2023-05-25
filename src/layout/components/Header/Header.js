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
import { useState } from 'react';
import LoginForm from '../../../components/LoginForm/LoginForm';
const cx = classNames.bind(styles);

function Header() {
    const login = true;
    const [showLoginForm, setShowLoginForm] = useState(false);
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
            case 'language':
                //change language
                console.log(menuItem);
                break;
            case 'logout':
                localStorage.removeItem('token');
                break;
            default:
                console.log('default');
        }
    };

    return (
        <>
            {showLoginForm && <LoginForm onCloseModal={() => setShowLoginForm(false)} />}

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
                            <div className={cx('delivery-body')}>
                                <div className={cx('delivery-title')}>Giao hàng</div>
                                <div className={cx('delivery-subtitle')}>
                                    A75 Lê Văn Việt, Hiệp Phú, Quận 9, Tp Hồ Chí Minh
                                </div>
                            </div>
                        </div>
                        <div className={cx('actions')}>
                            {!login ? (
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
