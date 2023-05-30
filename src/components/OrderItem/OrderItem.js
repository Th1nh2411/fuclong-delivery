import styles from './OrderItem.module.scss';
import classNames from 'classnames/bind';
import Image from '../Image/Image';
import { Col } from 'react-bootstrap';
import { MdOutlineAddShoppingCart } from 'react-icons/md';

const cx = classNames.bind(styles);

function OrderItem({ data = {} }) {
    const { Recipe, discount } = data;
    return (
        <div className={cx('order-item')}>
            <div className={cx('order-img-wrapper')}>
                <Image src={Recipe.image} className={cx('order-img')} />
                {discount !== 100 && (
                    <div className={cx('sale-off')}>
                        <span className={cx('sale-off-percent')}>{100 - discount}% OFF</span>
                    </div>
                )}
            </div>
            <div className={cx('order-name')}>{Recipe.name}</div>
            <div className={cx('order-footer')}>
                <div className={cx('order-price')}>{Recipe.price}.000đ</div>
                <div className={cx('order-add-btn')}>
                    Đặt món
                    <MdOutlineAddShoppingCart className={cx('add-icon')} />
                </div>
            </div>
        </div>
    );
}

export default OrderItem;
