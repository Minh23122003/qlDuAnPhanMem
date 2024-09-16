import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Footer from './layout/Footer';
import Header from './layout/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Login from './components/Login';
import UserContext from './contexts/UserContext';
import UserReducer from './reducers/UserReducer';
import Cookies from 'js-cookie';
import { useReducer } from 'react';
import News from './components/News';
import SignUp from './components/SignUp';
import store from './store';
import Profile from './components/Profile';
import Cart from './components/Cart';
import TicketPrices  from './components/TicketPrices';
import TourDetail  from './components/TourDetail';

const App = () => {
    const user = store((state) => state.data.user);

    // let user = '';
    // if (Cookies.get('user') != null) {
    //     user = JSON.parse(Cookies.get('user'));
    // }
    // const [user, dispatch] = useReducer(UserReducer, currentUser);

    return (
        <>
            {/* <UserContext.Provider value={[user, dispatch]}> */}
            <BrowserRouter>
                {/* {user && <Header />}   */}
                {<Header />}
                <Container>
                    <Routes>
                        {/* <Route path="/" element={<Home />} /> */}
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={user ? <Home /> : <Login />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/news" element={<News />} />
                        <Route path="/logout" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/ticket" element={<TicketPrices />} />
                        <Route path="/tourDetail" element={<TourDetail />} />
                    </Routes>
                </Container>
                {/* <Footer /> */}
            </BrowserRouter>
            {/* </UserContext.Provider> */}
        </>
    );
};

export default App;
