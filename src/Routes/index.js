import Home from '../Pages/Home';
import CheckoutPage from '../Pages/CheckoutPage';
import PaymentPage from '../Pages/PaymentPage';
import config from '../config';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.history, component: Home },
    { path: config.routes.checkout, component: CheckoutPage },
    { path: config.routes.payment, component: PaymentPage },
];
