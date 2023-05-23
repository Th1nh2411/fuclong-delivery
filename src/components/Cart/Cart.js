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

const cx = classNames.bind(styles);
const orderList = [
    {
        id: 1,
        img: images.drinkEx,
        name: 'Trà Sữa Nhãn Sen',
        size: 0,
        toppings: [],
        price: 55,
    },
    {
        id: 2,
        img: images.drinkEx2,
        name: 'Nhãn đá xay',
        size: 1,
        toppings: [
            { name: 'Trái nhãn', id: 1 },
            { name: 'Miếng vải', id: 2 },
            { name: 'Miếng đào', id: 3 },
        ],
        price: 55,
    },
];
function Cart({ onCloseModal = () => {} }) {
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
                    <div className={cx('title')}>Giỏ hàng của bạn (2 món)</div>
                </div>
                <AiOutlineClose className={cx('close-icon')} />
            </div>
            <div className={cx('body')}>
                {orderList.map((item, index) => (
                    <CartItem data={item} key={index} />
                ))}
            </div>
            <div className={cx('footer')}></div>
        </Modal>
    );
}

export default memo(Cart);
