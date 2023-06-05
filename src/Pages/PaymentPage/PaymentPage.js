import styles from './PaymentPage.module.scss';
import classNames from 'classnames/bind';

import { useLocation } from 'react-router';
import { priceFormat } from '../../utils/format';

import Image from '../../components/Image';
import { QRIcon } from '../../components/Icons/Icons';
import * as invoiceService from '../../services/invoiceService';
import { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);

function CheckoutPage() {
    const location = useLocation();
    const { payment, total, shippingCompany, shippingFee } = location.state;
    const [state, dispatch] = useContext(StoreContext);
    const [idInvoice, setIdInvoice] = useState();
    const createInvoice = async () => {
        const token = LocalStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.createInvoice(shippingCompany, shippingFee, state.idShop, token);
            setIdInvoice(results.idInvoice);
        }
    };
    const confirmPaymentInvoice = async () => {
        const token = LocalStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.confirmInvoice(idInvoice, total, token);
            setIdInvoice(results.idInvoice);
        }
    };
    const getCurrentInvoice = async () => {
        const token = LocalStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.getCurrentInvoice(token);
            setIdInvoice(results.idInvoice);
        }
    };
    useEffect(() => {
        // createInvoice();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <Image src={payment.logo} className={cx('title-icon')} /> Cổng thanh toán {payment.name}
            </div>
            <div className={cx('body')}>
                <div className={cx('qr-scan-wrapper')}>
                    <div className={cx('qr-scan-title')}>Quét mã QR để thanh toán</div>
                    <div className={cx('qr-scan-subtitle')}>Số tiền : {priceFormat(total + shippingFee)}đ</div>
                    <div className={cx('qr-img-wrapper')}>
                        <Image src={payment.qrCode} className={cx('qr-img')} />
                    </div>
                    <div className={cx('qr-scan-subtitle')}>
                        <QRIcon className={cx('icon')} />
                        Sử dụng <b>App {payment.name}</b> hoặc ứng dụng camera hỗ trợ QR code để quét mã
                    </div>
                    <div className={cx('actions-wrapper')}>
                        <Link>
                            <div className={cx('actions-back')}>Quay về</div>
                        </Link>
                        <div onClick={() => confirmPaymentInvoice()} className={cx('actions-paid')}>
                            Đã thanh toán?
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
