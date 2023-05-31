import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import { HiShoppingBag } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import CartItem from './CartItem';
import LocalStorageManager from '../../utils/LocalStorageManager';
import DetailItem from '../DetailItem/DetailItem';
import * as cartService from '../../services/cartService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';

const cx = classNames.bind(styles);

function Cart({ onCloseModal = () => {} }) {
    const [cartData, setCartData] = useState([]);
    const localStorageManager = LocalStorageManager.getInstance();
    const [state, dispatch] = useContext(StoreContext);
    const getCartItem = async () => {
        const token = localStorageManager.getItem('token');
        const results = await cartService.getCartItem(state.idShop, token);
        if (results) {
            setCartData(results);
        }
    };
    useEffect(() => {
        getCartItem();
    }, [state.detailItem.show]);
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
                            Giỏ hàng của bạn ({cartData.cart && cartData.cart.length} món)
                        </div>
                    </div>
                    <AiOutlineClose onClick={onCloseModal} className={cx('close-icon')} />
                </div>
                <div className={cx('body')}>
                    {cartData.cart &&
                        cartData.cart.map((item, index) => (
                            <CartItem
                                onEdit={(data) => {
                                    // setShowDetailItem(true);
                                    // setDetailItem(data);
                                    dispatch(actions.setDetailItem({ show: true, data: item, editing: true }));
                                }}
                                data={item}
                                key={index}
                            />
                        ))}
                </div>
                <div className={cx('footer')}>
                    <div className={cx('total')}>
                        <div className={cx('total-title')}>Tổng tiền tạm tính:</div>
                        <div className={cx('total-num')}>
                            {cartData.total && priceFormat(cartData.total.toFixed(3))}đ
                        </div>
                    </div>
                    <Button primary className={cx('checkout-btn')}>
                        {' '}
                        Thanh toán
                    </Button>
                </div>
            </Modal>
        </>
    );
}

export default Cart;
