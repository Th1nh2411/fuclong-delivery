import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { memo, useContext, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import * as authService from '../../services/authService';
import LocalStorageManager from '../../utils/LocalStorageManager';
import { StoreContext, actions } from '../../store';
import RegisterForm from './RegisterForm';

const cx = classNames.bind(styles);

function LoginForm({ onCloseModal = () => {} }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [loginForm, setLoginForm] = useState(true);
    const [loginStatus, setLoginStatus] = useState('');
    const localStorageManager = LocalStorageManager.getInstance();
    const [state, dispatch] = useContext(StoreContext);
    const handleSubmitLogin = (e) => {
        e.preventDefault();

        // fetch api login
        const postLogin = async () => {
            const results = await authService.login(phoneNumber, password);
            if (results && results.isSuccess) {
                localStorageManager.setItem('token', results.token);
                localStorageManager.setItem('userInfo', results.customer);
                dispatch(actions.setUserInfo(results.customer));
                dispatch(
                    actions.setToast({
                        show: true,
                        content: 'Đăng nhập thành công',
                        title: 'Đăng nhập',
                    }),
                );
                const getNewInvoice = state.getCurrentInvoice();
                onCloseModal();
            } else {
                setLoginStatus('Số điện thoại hoặc mật khẩu chưa đúng');
            }
        };
        postLogin();
    };
    const handleChangePhoneValue = (e) => {
        setPhoneNumber(e.target.value);
        setLoginStatus('');
    };
    const handleChangePasswordValue = (e) => {
        setPassword(e.target.value);
        setLoginStatus('');
    };
    return (
        <Modal
            className={cx('wrapper')}
            handleClickOutside={() => {
                onCloseModal();
            }}
        >
            <Image src={images.logo2} className={cx('logo')} />
            <div className={cx('title')}> {loginForm ? 'Đăng nhập' : 'Đăng kí'} </div>
            {loginForm ? (
                <form onSubmit={handleSubmitLogin}>
                    <Input onChange={handleChangePhoneValue} value={phoneNumber} title="Số điện thoại" />

                    <Input
                        onChange={handleChangePasswordValue}
                        value={password}
                        title="Mật khẩu"
                        type="password"
                        errorMessage={loginStatus}
                        errorCondition={loginStatus}
                    />

                    <Button className={cx('login-btn')} primary>
                        Đăng nhập
                    </Button>
                    <div className={cx('toggle-form')}>
                        <span
                            onClick={() => {
                                setLoginForm(false);
                            }}
                        >
                            Quên mật khẩu?
                        </span>
                    </div>
                    <div className={cx('toggle-form')}>
                        Chưa có tài khoản?{' '}
                        <span
                            onClick={() => {
                                setLoginForm(false);
                            }}
                        >
                            Đăng kí
                        </span>
                    </div>
                </form>
            ) : (
                <RegisterForm onClickChangeForm={() => setLoginForm(true)} />
            )}
        </Modal>
    );
}

export default memo(LoginForm);
