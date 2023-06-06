import styles from './PaymentPage.module.scss';
import classNames from 'classnames/bind';

import { useLocation, useNavigate } from 'react-router';
import { priceFormat } from '../../utils/format';

import Image from '../../components/Image';
import Modal from '../../components/Modal';
import Button from '../../components/Button';
import { QRIcon } from '../../components/Icons/Icons';
import * as invoiceService from '../../services/invoiceService';
import { useContext, useEffect, useMemo, useState } from 'react';
import { StoreContext, actions } from '../../store';
import LocalStorageManager from '../../utils/LocalStorageManager';
import config from '../../config';
import dayjs from 'dayjs';
const cx = classNames.bind(styles);

function CheckoutPage() {
    const location = useLocation();
    const {
        payment = {
            id: 1,
            name: 'MoMo',
            logo: 'https://minio.thecoffeehouse.com/image/tchmobileapp/386_ic_momo@3x.png',
            qrCode: 'https://static.mservice.io/blogscontents/momo-upload-api-211217174745-637753600658721515.png',
        },
        total,
        idShipping_company,
        shippingFee,
        date,
    } = location.state;
    const [state, dispatch] = useContext(StoreContext);
    const [idInvoice, setIdInvoice] = useState();
    const [showConfirmCancelInvoice, setShowConfirmCancelInvoice] = useState();
    const localStorageManager = LocalStorageManager.getInstance();
    const navigate = useNavigate();
    const createInvoice = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.createInvoice(idShipping_company, shippingFee, state.idShop, token);
            setIdInvoice(results.idInvoice);
            if (results.isSuccess) {
                dispatch(actions.setCart(false));
                // console.log(state.getCurrentInvoice());
                const getNewInvoice = state.getCurrentInvoice();
            }
        }
    };
    console.log(state.currentInvoice);
    const confirmPaymentInvoice = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.confirmInvoice(idInvoice, total, token);
            setIdInvoice(results.idInvoice);
        }
    };

    useEffect(() => {
        createInvoice();
    }, []);
    const handleCancelInvoice = async () => {
        const token = localStorageManager.getItem('token');
        if (token) {
            const results = await invoiceService.cancelCurrentInvoice(token);
        }
        dispatch(actions.setToast({ show: true, title: 'Hủy đơn', content: 'Hủy đơn thành công' }));
        dispatch(actions.setCurrentInvoice(null));
        navigate(config.routes.home);
    };
    const orderTime = useMemo(() => (date ? dayjs(date).format('HH:mm DD/MM/YYYY') : 'Vừa lên đơn'), []);
    return (
        <>
            {showConfirmCancelInvoice && (
                <Modal handleClickOutside={() => setShowConfirmCancelInvoice(false)} className={cx('confirm-wrapper')}>
                    <div className={cx('confirm-title')}>Bạn chắc chắn muốn hủy đơn ?</div>
                    <div className={cx('confirm-actions')}>
                        <Button onClick={() => setShowConfirmCancelInvoice(false)}>Trở lại</Button>
                        <Button onClick={handleCancelInvoice} primary>
                            Xác nhận
                        </Button>
                    </div>
                </Modal>
            )}
            <div className={cx('wrapper')}>
                <div className={cx('title')}>
                    <Image src={payment.logo} className={cx('title-icon')} /> Cổng thanh toán {payment.name}
                </div>
                <div className={cx('body')}>
                    <div className={cx('qr-scan-wrapper')}>
                        <div className={cx('qr-scan-title')}>Quét mã QR để thanh toán</div>
                        <div className={cx('qr-scan-subtitle')}>Số tiền : {priceFormat(total + shippingFee)}đ</div>
                        <div className={cx('qr-scan-subtitle')}>Thời gian đặt đơn : {orderTime}</div>
                        <div className={cx('qr-img-wrapper')}>
                            <Image src={payment.qrCode} className={cx('qr-img')} />
                        </div>
                        <div className={cx('qr-scan-subtitle')}>
                            <QRIcon className={cx('icon')} />
                            Sử dụng <b>App {payment.name}</b> hoặc ứng dụng camera hỗ trợ QR code để quét mã
                        </div>
                        <div className={cx('actions-wrapper')}>
                            <div onClick={() => setShowConfirmCancelInvoice(true)} className={cx('actions-back')}>
                                Hủy đơn
                            </div>
                            <div onClick={() => confirmPaymentInvoice()} className={cx('actions-paid')}>
                                Đã thanh toán?
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutPage;
