import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import { HiShoppingBag } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import CartItem from './CartItem';
import LocalStorageManager from '../../utils/LocalStorageManager';

const cx = classNames.bind(styles);

function Cart({ onCloseModal = () => {} }) {
    const [cartList, setCartList] = useState([]);
    const localStorageManager = LocalStorageManager.getInstance();
    useEffect(() => {
        const storedCart = localStorageManager.getItem('cart');
        if (storedCart) {
            setCartList(storedCart);
        }
    }, []);
    return (
        <Modal
            className={cx('wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <div className={cx('header')}>
                <div className={cx('left-side')}>
                    <HiShoppingBag className={cx('icon')} />
                    <div className={cx('title')}>Giỏ hàng của bạn ({cartList.length} món)</div>
                </div>
                <AiOutlineClose onClick={onCloseModal} className={cx('close-icon')} />
            </div>
            <div className={cx('body')}>
                {cartList.map((item, index) => (
                    <CartItem data={item} key={index} />
                ))}
            </div>
            <div className={cx('footer')}>
                <div className={cx('total')}>
                    <div className={cx('total-title')}>Tổng tiền tạm tính:</div>
                    <div className={cx('total-num')}>140.000đ</div>
                </div>
                <Button primary className={cx('checkout-btn')}>
                    {' '}
                    Thanh toán
                </Button>
            </div>
        </Modal>
    );
}

export default Cart;
