import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import { HiShoppingBag } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import CartItem from './CartItem';
import LocalStorageManager from '../../utils/LocalStorageManager';
import * as cartService from '../../services/cartService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';
import { Link } from 'react-router-dom';
import config from '../../config';
import Image from '../Image/Image';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function Cart({ data = {}, onCloseModal = () => {}, onDelItem = () => {} }) {
    return (
        <>
            <Modal
                className={cx('wrapper')}
                handleClickOutside={() => {
                    onCloseModal();
                }}
            >
                <div className={cx('header')}>
                    <div className={cx('left-side')}>
                        <HiShoppingBag className={cx('icon')} />
                        <div className={cx('title')}>
                            Giỏ hàng của bạn (
                            {data.cart ? data.cart.reduce((total, current) => current.quantityProduct + total, 0) : 0}{' '}
                            món)
                        </div>
                    </div>
                    <AiOutlineClose onClick={onCloseModal} className={cx('close-icon')} />
                </div>
                <div className={cx('body')}>
                    {data.cart && data.cart.length !== 0 ? (
                        data.cart.map((item, index) => <CartItem onDelItem={onDelItem} data={item} key={index} />)
                    ) : (
                        <div className={cx('empty-cart-wrapper')}>
                            <Image src={images.emptyCart} className={cx('empty-cart-img')} />
                            <div className={cx('empty-cart-title')}>Không có sản phẩm</div>
                        </div>
                    )}
                </div>
                <div className={cx('footer')}>
                    <div className={cx('total')}>
                        <div className={cx('total-title')}>Tổng tiền tạm tính:</div>
                        <div className={cx('total-num')}>{data.total && priceFormat(data.total)}đ</div>
                    </div>
                    {data.cart && data.cart.length !== 0 ? (
                        <Link onClick={() => onCloseModal()} to={config.routes.checkout} state={data}>
                            <Button primary className={cx('checkout-btn')}>
                                {' '}
                                Thanh toán
                            </Button>
                        </Link>
                    ) : (
                        <Button onClick={() => onCloseModal()} primary className={cx('checkout-btn')}>
                            {' '}
                            Quay lại
                        </Button>
                    )}
                </div>
            </Modal>
        </>
    );
}

export default Cart;
