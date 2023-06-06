import styles from './HistoryPage.module.scss';
import classNames from 'classnames/bind';
import { BsFillClipboard2Fill, BsFillPhoneFill } from 'react-icons/bs';
import Button from '../../components/Button';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as invoiceService from '../../services/invoiceService';
import { StoreContext, actions } from '../../store';
import { priceFormat } from '../../utils/format';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineRight } from 'react-icons/ai';
import Image from '../../components/Image/Image';
import { Link } from 'react-router-dom';
import config from '../../config';
import LocalStorageManager from '../../utils/LocalStorageManager';
const cx = classNames.bind(styles);

function CheckoutPage() {
    const [listInvoice, setListInvoice] = useState([]);
    const localStorageManager = LocalStorageManager.getInstance();
    const getListInvoice = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.getAllInvoice(token);
            if (results.isSuccess) {
                setListInvoice(results.invoices);
            }
        }
    };
    useEffect(() => {
        getListInvoice();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <BsFillClipboard2Fill className={cx('title-icon')} /> Lịch sử đặt hàng
            </div>
            <div className={cx('body')}>
                {listInvoice.map((item, index) => (
                    <div key={index} className={cx('invoice-wrapper')}></div>
                ))}
            </div>
        </div>
    );
}

export default CheckoutPage;
