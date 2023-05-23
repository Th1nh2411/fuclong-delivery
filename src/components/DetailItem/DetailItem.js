import styles from './DetailItem.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Image from '../Image/Image';
import { MdOutlineAddShoppingCart } from 'react-icons/md';
import { HiMinusCircle, HiPlusCircle } from 'react-icons/hi';
import { Col, Form, Row } from 'react-bootstrap';

const cx = classNames.bind(styles);
const sizeOrders = [
    { price: 0, name: 'Nhỏ' },
    { price: 10, name: 'Vừa' },
    { price: 16, name: 'Lớn' },
];
const toppings = [
    { id: 1, price: 5, name: 'Pudding' },
    { id: 2, price: 10, name: 'Trân châu đen' },
    { id: 3, price: 10, name: 'Phô mai' },
    { id: 4, price: 10, name: 'Miếng đào' },
    { id: 5, price: 12, name: 'Kem Trứng' },
];
function DetailItem({ data = {}, onCloseModal = () => {} }) {
    const [num, setNum] = useState(1);
    const [priceSize, setPriceSize] = useState(0);
    const [checkedToppings, setCheckedToppings] = useState([]);

    const handleChangeToppingCheckBox = (e) => {
        if (e.target.checked) {
            setCheckedToppings([Number(e.target.value), ...checkedToppings]);
        } else {
            const newToppings = checkedToppings.filter((item) => item !== Number(e.target.value));
            setCheckedToppings(newToppings);
        }
    };
    const total = useMemo(() => {
        // Duyệt qua từng phần tử topping đã check, tìm phần tử đã check trong list toppings có cả price và lấy price của phần tử đó cộng vào total
        const checkedToppingPrice = checkedToppings.reduce((total, currentId) => {
            const toppingPrice = toppings.find((item) => item.id === currentId);
            if (toppingPrice) {
                return toppingPrice.price + total;
            }
        }, 0);
        return data.price + priceSize + checkedToppingPrice;
    }, [priceSize, checkedToppings]);
    console.log(checkedToppings);
    return (
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <Row className={cx('detail-body')}>
                <Col>
                    <div className={cx('order-img-wrapper')}>
                        <Image src={data.img} className={cx('order-img')} />
                    </div>
                </Col>
                <Col>
                    <div className={cx('order-content-wrapper')}>
                        <div className={cx('order-name')}>{data.name}</div>
                        <div className={cx('order-info')}>
                            Sự kết hợp tuyệt vời của hương sen thơm lừng và hạt nhãn ngọt mát. Món ăn này mang đến một
                            trải nghiệm tinh tế và đầy mê hoặc cho vị giác của bạn.
                        </div>
                        <div className={cx('order-price-wrapper')}>
                            <div className={cx('order-price')}>{data.price}.000đ</div>
                            <div className={cx('order-quantity-wrapper')}>
                                <HiMinusCircle
                                    className={cx('order-minus', { disable: num === 1 })}
                                    onClick={() => {
                                        if (num !== 1) {
                                            setNum((prev) => prev - 1);
                                        }
                                    }}
                                />
                                <div className={cx('order-quantity')}>{num}</div>
                                <HiPlusCircle className={cx('order-add')} onClick={() => setNum((prev) => prev + 1)} />
                            </div>
                        </div>
                        <div className={cx('order-title')}>Chọn size (bắt buộc)</div>
                        <div className={cx('order-size-list')}>
                            <Form>
                                <div className="d-flex justify-content-between">
                                    {sizeOrders.map((item, index) => (
                                        <div key={index} className={cx('order-size-item')}>
                                            <Form.Check
                                                value={item.price}
                                                checked={item.price === priceSize}
                                                type="radio"
                                                isValid
                                                name="order-size"
                                                id={`size-${index}`}
                                                onChange={(e) => setPriceSize(Number(e.target.value))}
                                            ></Form.Check>
                                            <label htmlFor={`size-${index}`}>
                                                {item.name} + {item.price}k
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </Form>
                        </div>
                        <div className={cx('order-title')}>Chọn topping (tùy chọn)</div>
                        <div className={cx('order-topping-list')}>
                            {toppings.map((topping, index) => (
                                <label key={index} className={cx('order-topping-item')}>
                                    <div className={cx('order-topping-title')}>{topping.name}</div>
                                    <div className={cx('order-topping-check')}>
                                        <span className={cx('order-topping-price')}>+{topping.price}.000đ</span>
                                        <Form.Check
                                            value={topping.id}
                                            checked={
                                                checkedToppings !== [] &&
                                                checkedToppings.some((item) => item === topping.id)
                                            }
                                            type="checkbox"
                                            isValid
                                            id={`size-${index}`}
                                            onChange={(e) => handleChangeToppingCheckBox(e)}
                                        ></Form.Check>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                </Col>
            </Row>
            <div className={cx('order-add-btn')}>
                {total}.000đ - Thêm vào giỏ hàng
                <MdOutlineAddShoppingCart className={cx('add-icon')} />
            </div>
        </Modal>
    );
}

export default memo(DetailItem);
