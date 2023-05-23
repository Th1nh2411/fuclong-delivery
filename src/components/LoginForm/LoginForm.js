import styles from './LoginForm.module.scss';
import classNames from 'classnames/bind';
import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '../Modal/Modal';
import Input from '../Input';
import Button from '../Button';
import images from '../../assets/images';
import Image from '../Image/Image';

const cx = classNames.bind(styles);

function LoginForm({ onCloseModal = () => {} }) {
    const [numberValue, setNumberValue] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loginForm, setLoginForm] = useState(true);

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        // fetch api login

        // fetch api register

        if (loginForm) {
        } else {
        }
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
                <Input onChange={(e) => setNumberValue(e.target.value)} value={numberValue} title="Số điện thoại" />
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    title="Mật khẩu"
                    type="password"
                />
                {!loginForm && (
                    <Input
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                        type="password"
                        title="Xác nhận mật khẩu"
                        errorMessage="Xác nhận không trùng với mật khẩu trên"
                        errorCondition={confirmPassword !== password}
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
