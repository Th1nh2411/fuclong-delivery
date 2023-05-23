import styles from './OrderItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image/Image';
import { Col } from 'react-bootstrap';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

const cx = classNames.bind(styles);

function OrderItem({ data = {} }) {
    return (
        <div className={cx('order-item')}>
            <div className={cx('order-img-wrapper')}>
                <Image src={data.img} className={cx('order-img')} />
            </div>
            <div className={cx('order-name')}>{data.name}</div>
            <div className={cx('order-footer')}>
                <div className={cx('order-price')}>{data.price}.000đ</div>
                <div className={cx('order-add-btn')}>
                    Đặt món
                    <MdOutlineAddShoppingCart className={cx('add-icon')} />
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
