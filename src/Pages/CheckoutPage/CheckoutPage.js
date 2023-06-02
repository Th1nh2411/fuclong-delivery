import styles from './CheckoutPage.module.scss';
import classNames from 'classnames/bind';
import { BsFillClipboard2Fill } from 'react-icons/bs';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Form, Row } from 'react-bootstrap';
import Slider from '../../components/Slider/Slider';
import OrderItem from '../../components/OrderItem/OrderItem';
import { useContext, useEffect, useState } from 'react';
import * as shipService from '../../services/shipService';
import { StoreContext, actions } from '../../store';
import { useLocation } from 'react-router';
import { priceFormat } from '../../utils/format';
import { FALSE } from 'sass';
const cx = classNames.bind(styles);

function CheckoutPage() {
    const location = useLocation();
    const data = location.state;
    const [checkPolicy, setCheckPolicy] = useState(FALSE);
    const [shippingFee, setShippingFee] = useState(15);
    const [state, dispatch] = useContext(StoreContext);
    const getShippingFee = async () => {
        const results = await shipService.getShippingFee(state.distance);
        if (results.total > 15) {
            setShippingFee(results.total);
        }
    };
    const handleCheckBoxPolicy = (e) => {
        if (e.target.checked) {
            setCheckPolicy(true);
        } else {
            setCheckPolicy(false);
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <BsFillClipboard2Fill className={cx('title-icon')} /> Xác nhận đơn hàng
            </div>
            <div className={cx('body')}>
                <div className={cx('delivery-section')}>
                    <div className={cx('body-title')}>Giao hàng</div>
                </div>
                <div className={cx('checkout-section')}>
                    <div className={cx('body-title')}>Các món đã chọn</div>
                    <div className={cx('cart-list')}>
                        {data.cart.map((item, index) => (
                            <div key={index} className={cx('cart-item')}>
                                <div>
                                    <div className={cx('item-name')}>
                                        {item.name}({item.size ? 'L' : 'M'}) x{item.quantityProduct}
                                    </div>
                                    <div className={cx('item-topping')}>
                                        {item.listTopping.map((item) => item.name).join(', ')}
                                    </div>
                                </div>
                                <div className={cx('item-price')}>{priceFormat(item.totalProducts)}đ</div>
                            </div>
                        ))}
                    </div>
                    <div className={cx('body-title')}>Hóa đơn thanh toán</div>
                    <div className={cx('total')}>
                        <span className={cx('item-name')}>Tổng tiền các món</span>{' '}
                        <span className={cx('item-price')}>{priceFormat(data.total)}đ</span>
                    </div>
                    <div className={cx('total')}>
                        <span className={cx('item-name')}>Phí vận chuyển</span>{' '}
                        <span className={cx('item-price')}>{priceFormat(shippingFee)}đ</span>
                    </div>
                    <div className={cx('total')}>
                        <span className={cx('item-name')}>Thành tiền</span>{' '}
                        <span className={cx('item-price-final')}>{priceFormat(data.total + shippingFee)}đ</span>
                    </div>
                    <div className={cx('policy-wrapper')}>
                        <Form.Check
                            className={cx('policy-check')}
                            checked={checkPolicy}
                            type="checkbox"
                            isValid
                            onChange={(e) => handleCheckBoxPolicy(e)}
                        />
                        <div className={cx('policy-title')}></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
