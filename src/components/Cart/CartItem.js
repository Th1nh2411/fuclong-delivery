import styles from './Cart.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import { AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import LocalStorageManager from '../../utils/LocalStorageManager';

const cx = classNames.bind(styles);

function CartItem({ data = {}, onEdit }) {
    const localStorageManager = LocalStorageManager.getInstance();
    const handleEditItem = () => {
        onEdit(data);
    };
    const handleDelItem = () => {};
    return (
        <div className={cx('item-wrapper')}>
            <div className={cx('item-left-side')}>
                <div className={cx('item-img-wrapper')}>
                    <Image src={data.img} className={cx('item-img')} />
                </div>
                <div className={cx('item-info')}>
                    <div className={cx('item-name')}>
                        {data.name} ({data.size ? 'L' : 'M'})
                    </div>
                    <div className={cx('item-topping')}>
                        {data.toppings.length !== 0 && <span>Topping :</span>}{' '}
                        {data.toppings.map((topping) => topping.name).join(', ')}
                    </div>
                    <div className={cx('item-price')}>{data.price}.000đ</div>
                </div>
            </div>
            <div className={cx('item-actions')}>
                <div onClick={handleEditItem} className={cx('action-edit')}>
                    <AiTwotoneEdit />
                </div>
                <div onClick={handleDelItem} className={cx('action-del')}>
                    <AiTwotoneDelete />
                </div>
            </div>
        </div>
    );
}

export default CartItem;
