import styles from './DetailAdress.module.scss';
import classNames from 'classnames/bind';
import { memo, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Modal from '../Modal/Modal';
import Image from '../Image/Image';
import * as mapService from '../../services/mapService';
import * as shopService from '../../services/shopService';

import LocalStorageManager from '../../utils/LocalStorageManager';
import { IoLocationSharp, IoSearch } from 'react-icons/io5';
import { BiTargetLock } from 'react-icons/bi';
import { useDebounce } from '../../hooks';
import { AiFillCloseCircle, AiOutlineClose, AiOutlineLoading3Quarters } from 'react-icons/ai';
import images from '../../assets/images';
import { StoreContext, actions } from '../../store';

const cx = classNames.bind(styles);

function DetailAdress({ data = {}, onCloseModal = () => {}, onChangeLocation = () => {} }) {
    const [location, setLocation] = useState({ latitude: data.latitude, longitude: data.longitude });
    const [address, setAddress] = useState(data.address);
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [shopList, setShopList] = useState([]);
    const [loading, setLoading] = useState(false);
    const debouncedValue = useDebounce(searchValue, 500);
    const [state, dispatch] = useContext(StoreContext);
    const getCurrentLocation = () => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });
            onChangeLocation(latitude, longitude);
            const results = await mapService.getAddress(latitude, longitude);
            if (results) {
                setAddress(results.display_name);
            }
        });
    };

    const getShopListData = async () => {
        const results = await shopService.getListShop(location.latitude, location.longitude);
        if (results) {
            setShopList(results.listStoreNearest);
        }
    };
    useEffect(() => {
        getShopListData();
    }, [location]);
    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const results = await mapService.searchAddress(debouncedValue);
            setSearchResult(results);

            setLoading(false);
        };
        fetchApi();
    }, [debouncedValue]);
    const handleClearSearch = () => {
        setSearchValue('');
        setSearchResult([]);
    };
    const handleChangeInput = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ')) {
            setSearchValue(searchValue);
        }
    };
    const handleClickAddress = (latitude, longitude, newAddress) => {
        setLocation({ latitude, longitude });
        setAddress(newAddress);
        setSearchResult([]);
        setSearchValue('');
        onChangeLocation(latitude, longitude);
    };
    const handleClickCurrentLocation = () => {
        getCurrentLocation();
    };
    const handleChangeShop = (id, distance) => {
        dispatch(actions.setIdShop(id));
        dispatch(actions.setDistance(distance));
        onCloseModal();
    };
    return (
        <Modal
            className={cx('detail-wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <div className={cx('header')}>
                <Image src={images.logo3} className={cx('header-logo')} />
                <div className={cx('header-title')}>Giao hàng</div>
                <AiOutlineClose
                    onClick={() => {
                        onCloseModal();
                    }}
                    className={cx('close-icon')}
                />
            </div>
            <div className={cx('search')}>
                <div className={cx('search-icon')}>
                    <IoSearch />
                </div>
                <input onChange={handleChangeInput} value={searchValue} placeholder="Vui lòng nhập địa chỉ" />
                {loading ||
                    (!!searchValue && (
                        <button onClick={handleClearSearch} className={cx('clear')}>
                            <AiFillCloseCircle />
                        </button>
                    ))}

                {loading && <AiOutlineLoading3Quarters className={cx('loading')} />}
            </div>
            {searchResult.length !== 0 ? (
                <div className={cx('search-result')}>
                    {searchResult.map((item, index) => (
                        <div
                            onClick={() => handleClickAddress(item.lat, item.lon, item.display_name)}
                            key={index}
                            className={cx('search-item')}
                        >
                            <IoLocationSharp className={cx('location-icon')} />
                            <div>
                                <div className={cx('address-title')}>
                                    {item.address.house_number} {item.address.road}
                                </div>
                                <div className={cx('address-detail')}>{item.display_name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <div className={cx('chosen-address')}>
                        <span>Địa chỉ đã chọn :</span> {address}
                    </div>
                    <div onClick={handleClickCurrentLocation} className={cx('current-address')}>
                        <BiTargetLock className={cx('icon')} />
                        Lấy vị trí hiện tại
                    </div>
                    <div className={cx('divider')}></div>
                    <div className={cx('shop-result')}>
                        <div className={cx('shop-title')}>Các cửa hàng gần nhất</div>
                        {shopList.map((item, index) => (
                            <div
                                onClick={() => handleChangeShop(item.detailShop.idShop, item.distance)}
                                key={index}
                                className={cx('shop-item', { active: item.detailShop.idShop === state.idShop })}
                            >
                                <Image src={item.detailShop.image} className={cx('shop-img')} />
                                <div className={cx('shop-info')}>
                                    <div className={cx('shop-address')}>{item.detailShop.address}</div>
                                    <div className={cx('shop-distance')}>
                                        Khoảng cách tới quán :{' '}
                                        {item.distance / 100 > 1
                                            ? `${(item.distance / 1000).toFixed(2)} km`
                                            : 'dưới 100 m'}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </Modal>
    );
}

export default DetailAdress;
