import Home from '../Pages/Home';
import CheckoutPage from '../Pages/CheckoutPage';
import config from '../config';

export const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.history, component: Home },
    { path: config.routes.checkout, component: CheckoutPage },
];
