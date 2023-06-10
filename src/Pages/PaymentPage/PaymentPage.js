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
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineRight } from 'react-icons/ai';
import { BsFillPhoneFill } from 'react-icons/bs';
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
        cartInvoice,
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
                    <div className={cx('delivery-section')}>
                        <div className={cx('cart-list-wrapper')}>
                            <div className={cx('body-title')}>Các món đã chọn</div>
                            <div className={cx('cart-list')}>
                                {cartInvoice &&
                                    cartInvoice.map((item, index) => (
                                        <div key={index} className={cx('cart-item')}>
                                            <div>
                                                <div className={cx('item-name')}>
                                                    {item.name}({item.size ? 'L' : 'M'}) x{item.quantityProduct}
                                                </div>
                                                <div className={cx('item-topping')}>
                                                    {item.listTopping.map((item) => item.name).join(', ')}
                                                </div>
                                            </div>
                                            {item.totalProducts && (
                                                <div className={cx('item-price')}>
                                                    {priceFormat(item.totalProducts)}đ
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                        <div className={cx('delivery-wrapper')}>
                            <div className={cx('body-title')}>
                                Giao hàng{' '}
                                {idShipping_company === 1 ? (
                                    <Image
                                        src={'https://thicao.com/wp-content/uploads/2019/07/logo-moi-cua-grab.jpg'}
                                        className={cx('delivery-company-img')}
                                    />
                                ) : (
                                    <Image
                                        src={
                                            'https://images.squarespace-cdn.com/content/v1/5f9bdbe0209d9a7ee6ea8797/1612706541953-M447AAUK2JK58U0K8B4N/now+food+logo.jpeg'
                                        }
                                        className={cx('delivery-company-img')}
                                    />
                                )}
                            </div>
                            <div
                                onClick={() => dispatch(actions.setDetailAddress({ show: true }))}
                                className={cx('info')}
                            >
                                <div className={cx('info-body')}>
                                    <IoLocationSharp className={cx('info-icon')} />
                                    <div className={cx('info-detail')}>{state.detailAddress.address}</div>
                                </div>
                                <AiOutlineRight className={cx('info-actions')} />
                            </div>
                            <div className={cx('info')}>
                                <div className={cx('info-body')}>
                                    <BsFillPhoneFill className={cx('info-icon')} />
                                    {state.userInfo && (
                                        <div>
                                            <div className={cx('info-title')}>{state.userInfo.name}</div>
                                            <div className={cx('info-detail')}>
                                                Số điện thoại : {state.userInfo.phone || '09999999'}
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <AiOutlineRight className={cx('info-actions')} />
                            </div>
                            <div className={cx('delivery-subtitle')}>
                                Thời gian đặt đơn : <span>{orderTime}</span>
                            </div>
                            <div className={cx('delivery-subtitle')}>
                                Số tiền : <span>{priceFormat(total + shippingFee)}đ</span>
                            </div>
                        </div>
                    </div>
                    <div className={cx('qr-scan-wrapper')}>
                        <div className={cx('qr-scan-title')}>Quét mã QR để thanh toán</div>

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
