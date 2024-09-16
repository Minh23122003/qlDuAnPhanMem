import { useContext, useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import UserContext from '../contexts/UserContext';
import Cookies from 'js-cookie';
import APIs, { authApi, endpoints } from '../configs/APIs';
import { toast } from 'react-toastify';
import store from '../store';

const Login = () => {
    // const [user, dispatch] = useContext(UserContext);
    const nav = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    // const [q] = useSearchParams();
    // const [user, setUser] = useState({});
    const setUser = store((state) => state.setUser);
    const setAccessToken = store((state) => state.setAccessToken);

    // const [loading, setLoading] = React.useState(false)
    // const nav = useNavigation();
    // const dispatch = useContext(MyDispatchContext)
    // const [err, setErr] = React.useState(false)

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const res = await Apis.post(endpoints['login'], { username, password });
    //         dispatch({
    //             type: 'login',
    //             payload: res.data,
    //         });
    //         Cookies.remove('token');
    //         Cookies.remove('user');

    //         Cookies.set('token', res.data.token);
    //         Cookies.set('user', JSON.stringify(res.data));
    //     } catch (e) {
    //         console.error(e);
    //     }
    // };

    // if (user) {
    //     let next = q.get('next') || '/';
    //     return <Navigate to={next} />;
    // }
    const handleSubmit = async () => {
        try {
            let res = await APIs.post(
                endpoints['login'],
                {
                    username,
                    password,
                    client_id: 'tozzohglZGqr2sy5PNiw7r2s7oHv5iJZgM3UGkTn',
                    client_secret:
                        'izM8odbIFMpMabbVjrW0qPqEtIJdQdeazvymq2uwwXuPQRSVxJKDooDAJdrHDBtTCIuVyGTHc1SaRHoSxDJcBGrmWn0t1rZhJwWiVQsg5mSHEnaQhsSrvcYwCgUjuXmF',
                    grant_type: 'password',
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            );
            console.info(res.data);

            if (res.status === 200) {
                toast.success('Đăng nhập thành công', {
                    position: 'top-right',
                    autoClose: 3000,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: 'light',
                });
                // Cookies.set('access-token', res.data.access_token);
                setAccessToken(res.data.access_token)

                setTimeout(async () => {
                    let user = await authApi(res.data.access_token).get(endpoints['current-user']);
                    console.info(user.data);
                    // Cookies.set('user', JSON.stringify(user.data));
                    setUser(user.data)
                    nav('/');
                }, 100);
            }
        } catch (ex) {
            console.error(ex);
        }
    };
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
                height: '100vh',
                backgroundColor: '#e6dfdf',
            }}
        >
            <Row className="justify-content-center">
                <Col lg={'auto'}>
                    <div
                        className="p-5"
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '10px',
                            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Nhập Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formPassword" className="mt-3">
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formCheckbox" className="mt-3">
                                <Form.Check
                                    type="checkbox"
                                    label="Show Password"
                                    onChange={(e) => setShowPassword(e.target.checked)}
                                />
                            </Form.Group>

                            <Button variant="dark" onClick={handleSubmit} className="w-100 mt-4">
                                Login
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
