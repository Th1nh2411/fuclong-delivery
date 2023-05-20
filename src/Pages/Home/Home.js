import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import Slider from '../../components/Slider/Slider';
import OrderItem from '../../components/OrderItem/OrderItem';
import { useState } from 'react';

const cx = classNames.bind(styles);

const orderTypes = [
    { img: images.drink, name: 'Thức uống' },
    { img: images.coffee, name: 'Cà phê' },
    { img: images.tea, name: 'Trà' },
    { img: images.bakery, name: 'Bakery' },
];
const orderList = [
    { img: images.drinkEx, name: 'Trà Sữa Nhãn Sen', price: 55 },
    { img: images.drinkEx2, name: 'Nhãn đá xay', price: 55 },
    { img: images.drinkEx, name: 'Trà Sữa Nhãn Sen', price: 55 },
    { img: images.drinkEx2, name: 'Nhãn đá xay', price: 55 },
    { img: images.drinkEx, name: 'Trà Sữa Nhãn Sen', price: 55 },
    { img: images.drinkEx2, name: 'Nhãn đá xay', price: 55 },
];

function Home() {
    const [orderType, setOrderType] = useState(0);
    return (
        <div className={cx('wrapper')}>
            <Slider />
            <section className={cx('order-section')}>
                <div className={cx('type-list')}>
                    {orderTypes.map((type, index) => (
                        <div
                            key={index}
                            onClick={() => setOrderType(index)}
                            className={cx('type-item', { active: orderType === index })}
                        >
                            <div className={cx('type-img-wrapper')}>
                                <Image src={type.img} className={cx('type-img')} />
                            </div>
                            <div className={cx('type-name')}>{type.name}</div>
                        </div>
                    ))}
                </div>
                <div className={cx('order-subtitle')}>
                    Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo hạng khi được tạo ra từ sự phấn đấu
                    không ngừng cùng niềm đam mê. Và chính kết nối dựa trên niềm tin, sự trung thực và tin yêu sẽ góp
                    phần mang đến những nét đẹp trong văn hóa thưởng trà và cà phê ngày càng bay cao, vươn xa.
                </div>
                <Row className={cx('order-list')}>
                    {orderList.map((item, index) => (
                        <OrderItem data={item} key={index} />
                    ))}
                </Row>
            </section>
        </div>
    );
}

export default Home;
