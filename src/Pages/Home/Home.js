import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Image from '../../components/Image';
import images from '../../assets/images';
import { Col, Row } from 'react-bootstrap';
import Slider from '../../components/Slider/Slider';
import OrderItem from '../../components/OrderItem/OrderItem';
import { useContext, useEffect, useState } from 'react';
import DetailItem from '../../components/DetailItem/DetailItem';
import * as shopService from '../../services/shopService';
import { StoreContext } from '../../store';
const cx = classNames.bind(styles);

const orderTypes = [
    { img: images.drink, name: 'Thức uống' },
    { img: images.coffee, name: 'Cà phê' },
    { img: images.tea, name: 'Trà' },
    { img: images.bakery, name: 'Bakery' },
];

function Home() {
    const [orderType, setOrderType] = useState(0);
    const [showDetailItem, setShowDetailItem] = useState();
    const [detailItem, setDetailItem] = useState(0);
    const [menu, setMenu] = useState([]);
    const [state, dispatch] = useContext(StoreContext);
    const getListItem = async () => {
        const results = await shopService.getItemShop(state.idShop, orderType);
        if (results.menu) {
            console.log(results);
            setMenu(results.menu);
        }
    };
    useEffect(() => {
        getListItem();
    }, [orderType, state.idShop]);
    return (
        <>
            {showDetailItem && <DetailItem data={detailItem} onCloseModal={() => setShowDetailItem(false)} />}
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
                        Chúng tôi tin rằng từng sản phẩm trà và cà phê sẽ càng thêm hảo hạng khi được tạo ra từ sự phấn
                        đấu không ngừng cùng niềm đam mê. Và chính kết nối dựa trên niềm tin, sự trung thực và tin yêu
                        sẽ góp phần mang đến những nét đẹp trong văn hóa thưởng trà và cà phê ngày càng bay cao, vươn
                        xa.
                    </div>
                    <Row className={cx('order-list')}>
                        {menu.map((item, index) => (
                            <Col
                                key={index}
                                md="3"
                                onClick={() => {
                                    setShowDetailItem(true);
                                    setDetailItem(item);
                                }}
                            >
                                <OrderItem data={item} key={index} />
                            </Col>
                        ))}
                    </Row>
                </section>
            </div>
        </>
    );
}

export default Home;
