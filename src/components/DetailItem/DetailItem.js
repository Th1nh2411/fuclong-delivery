import styles from './DetailItem.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useState } from 'react';
import Modal from '../Modal/Modal';

const cx = classNames.bind(styles);

function DetailItem({ data = {}, onCloseModal }) {
    return (
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            hehe
        </Modal>
    );
}

export default memo(DetailItem);
