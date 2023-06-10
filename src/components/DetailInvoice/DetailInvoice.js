import styles from './DetailInvoice.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import * as cartService from '../../services/cartService';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { BillIcon } from '../Icons';

const cx = classNames.bind(styles);

function DetailInvoice({ data, onCloseModal = () => {} }) {
    return (
        <Modal
            className={cx('wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <div className={cx('title')}>
                <BillIcon height="3rem" width="3rem" className={cx('title-icon')} /> Chi tiết đơn hàng
            </div>
            <div className={cx('body')}></div>
        </Modal>
    );
}

export default DetailInvoice;
