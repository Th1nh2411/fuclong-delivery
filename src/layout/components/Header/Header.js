import styles from './Header.module.scss';
import classNames from 'classnames/bind';
import images from '../../../assets/images';
import { AiOutlineUser } from 'react-icons/ai';
import { IoLogOutOutline } from 'react-icons/io5';
import Button from '../../../components/Button';
import Menu from '../../../components/Popper/Menu';
import Image from '../../../components/Image';
import Search from '../Search';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import config from '../../../config';
import { HiShoppingCart } from 'react-icons/hi';
import { MdOutlineHistoryEdu } from 'react-icons/md';
import Tippy from '@tippyjs/react';
const cx = classNames.bind(styles);

function Header() {
    const navigate = useNavigate();
    const USER_MENU = [
        {
            icon: <AiOutlineUser />,
            title: 'View profile',
            to: config.routes.profile,
        },

        {
            icon: <IoLogOutOutline />,
            title: 'Log out',
            separate: true,
            type: 'logout',
        },
    ];
    const getUserFirstName = (name) => {
        if (name) {
            const nameArray = name.split(' ');
            return nameArray[nameArray.length - 1];
        }
        return '';
    };
    const handleOnchangeMenu = (menuItem) => {
        switch (menuItem.type) {
            case 'language':
                //change language
                console.log(menuItem);
                break;
            case 'logout':
                navigate(config.routes.login);
                localStorage.removeItem('token');
                break;
            default:
                console.log('default');
        }
    };

    return (
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
                        <Tippy content="Lịch sử mua hàng" placement="bottom" duration={0}>
                            <div className={cx('action-icon')}>
                                <MdOutlineHistoryEdu />
                            </div>
                        </Tippy>

                        <Tippy content="Giỏ hàng" placement="bottom" duration={0}>
                            <div className={cx('action-icon')}>
                                <HiShoppingCart />
                                <div className={cx('num-item-cart')}>2</div>
                            </div>
                        </Tippy>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
