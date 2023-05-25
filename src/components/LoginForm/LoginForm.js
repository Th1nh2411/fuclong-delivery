import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';
import * as accountService from '../../services/accountService';
import LocalStorageManager from '../../utils/LocalStorageManager';

const cx = classNames.bind(styles);

function LoginForm({ onCloseModal = () => {} }) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginForm, setLoginForm] = useState(true);
    const [loginStatus, setLoginStatus] = useState('');
    const localStorageManager = LocalStorageManager.getInstance();

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        // fetch api login
        const postLogin = async () => {
            const results = await accountService.login({ phone: phoneNumber, password });
            if (results.isSuccess) {
                localStorageManager.setItem('token', results.token);
                onCloseModal(true);
            } else if (results.isExist === false) {
                setLoginStatus(results.message);
            } else {
                setLoginStatus('Mật khẩu chưa đúng');
            }
        };
        // fetch api register
        const postRegister = async () => {};
        if (loginForm) {
            postLogin();
        } else {
            postRegister();
        }
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
            <div className={cx('title')}>{loginForm ? 'Đăng nhập' : 'Đăng kí'}</div>
            <form onSubmit={handleSubmitLogin}>
                <Input onChange={handleChangePhoneValue} value={phoneNumber} title="Số điện thoại" />
                <Input
                    onChange={handleChangePasswordValue}
                    value={password}
                    title="Mật khẩu"
                    type="password"
                    errorCondition={loginStatus}
                    errorMessage={loginStatus}
                />
                {!loginForm && (
                    <Input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                        title="Xác nhận mật khẩu"
                        errorMessage="Xác nhận không trùng với mật khẩu trên"
                        errorCondition={confirmPassword !== password && confirmPassword !== ''}
                    />
                )}

                <Button className={cx('login-btn')} primary>
                    {loginForm ? 'Đăng nhập' : 'Đăng kí tài khoản'}
                </Button>
                {loginForm ? (
                    <div className={cx('toggle-form')}>
                        Chưa có tài khoản? <span onClick={() => setLoginForm(!loginForm)}>Đăng kí</span>
                    </div>
                ) : (
                    <div className={cx('toggle-form')}>
                        <span onClick={() => setLoginForm(!loginForm)}>Đăng nhập</span>
                    </div>
                )}
            </form>
        </Modal>
    );
}

export default memo(LoginForm);
