import styles from './CheckoutPage.module.scss';
import classNames from 'classnames/bind';
import { BsFillClipboard2Fill, BsFillPhoneFill } from 'react-icons/bs';
import Button from '../../components/Button';
import images from '../../assets/images';
import { Col, Form, Row } from 'react-bootstrap';
import { useContext, useEffect, useState } from 'react';
import * as shipService from '../../services/shipService';
import { StoreContext, actions } from '../../store';
import { useLocation } from 'react-router';
import { priceFormat } from '../../utils/format';
import { IoLocationSharp } from 'react-icons/io5';
import { AiOutlineRight } from 'react-icons/ai';
const cx = classNames.bind(styles);

function CheckoutPage() {
    const location = useLocation();
    const data = location.state;
    const [checkPolicy, setCheckPolicy] = useState(false);
    const [shippingFee, setShippingFee] = useState(15);
    const [state, dispatch] = useContext(StoreContext);
    const getShippingFee = async () => {
        const results = await shipService.getShippingFee(state.distance);
        if (results && results.total > 15) {
            setShippingFee(results.total);
        }
    };
    useEffect(() => {
        getShippingFee();
    }, [state.distance]);
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
                    <div className={cx('cart-list-wrapper')}>
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
                    </div>
                    <div className={cx('delivery-wrapper')}>
                        <div className={cx('body-title')}>Giao hàng</div>
                        <div onClick={() => dispatch(actions.setDetailAddress({ show: true }))} className={cx('info')}>
                            <div className={cx('info-body')}>
                                <IoLocationSharp className={cx('info-icon')} />
                                <div className={cx('info-detail')}>{state.detailAddress.address}</div>
                            </div>
                            <AiOutlineRight className={cx('info-actions')} />
                        </div>
                        <div className={cx('info')}>
                            <div className={cx('info-body')}>
                                <BsFillPhoneFill className={cx('info-icon')} />
                                <div>
                                    <div className={cx('info-title')}>{state.userInfo.name}</div>
                                    <div className={cx('info-detail')}>
                                        Số điện thoại : {state.userInfo.phone || '09999999'}
                                    </div>
                                </div>
                            </div>
                            <AiOutlineRight className={cx('info-actions')} />
                        </div>
                    </div>
                </div>
                <div className={cx('checkout-section')}>
                    <div className={cx('payment-wrapper')}>
                        <div className={cx('body-title')}>Phương thức thanh toán</div>
                    </div>
                    <div className={cx('checkout-wrapper')}>
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
                            <div className={cx('policy-title')}>
                                Tôi đã đọc, hiểu và đồng ý với tất cả các{' '}
                                <span>điều khoản, điều kiện và chính sách</span> liên quan
                            </div>
                        </div>
                        <Button className={cx('checkout-btn')} disable={!checkPolicy} primary>
                            Tiến hành thanh toán
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;
