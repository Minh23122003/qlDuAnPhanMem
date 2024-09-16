import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import APIs, { authApi, endpoints } from '../configs/APIs';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        first_name: 'demo',
        last_name: 'demo',
        username: 'maverick',
        email: 'tranki809@gmail.com',
        password: '123456',
        phone: '0372598588',
        avatar: '',
        address: 'Ho chi minh',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = new FormData();

        for (const key in formData) {
            form.append(key, formData[key]);
        }
        try {
            let res = await APIs.post(endpoints['register'], form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (res.status === 201) {
                let res1 = await APIs.post(endpoints['customer'], {
                    phone: formData.phone,
                    address: formData.address,
                    user_id: res.data.id,
                });
                if (res1.status === 201) {
                    nav('/login');
                    toast.success('Đăng ký thành công', {
                        position: 'top-right',
                        autoClose: 3000,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: 'light',
                    });
                }
            }
            console.log(res);
        } catch (error) {
            console.error('AxiosError: ', error);
            toast.error('Đăng ký không thành công', {
                position: 'top-right',
                autoClose: 3000,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: 'light',
            });
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
                            minWidth: '400px',
                        }}
                    >
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formFirstName" className="mb-3">
                                <Form.Label>Tên</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập tên"
                                    name="firstName"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formLastName" className="mb-3">
                                <Form.Label>Họ & Tên Đệm</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="tên đệm"
                                    name="lastName"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formUsername" className="mb-3">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    placeholder="Nhập username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formEmail" className="mb-3">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="Nhập email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Phone</Form.Label>
                                <Form.Control
                                    type="phone"
                                    placeholder="Nhập phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="formAddress" className="mb-3">
                                <Form.Label>Address</Form.Label>
                                <Form.Control
                                    type="address"
                                    placeholder="Nhập address"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            {/* <Form.Group controlId="formPhone" className="mb-3">
                                <Form.Label>Số điện thoại</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Nhập số điện thoại"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </Form.Group> */}

                            <Form.Group controlId="formPassword" className="mb-3">
                                <Form.Label>Mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Form.Group controlId="formConfirmPassword" className="mb-3">
                                <Form.Label>Xác nhận mật khẩu</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="Nhập lại mật khẩu"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group controlId="avatar" className="mb-3">
                                <Form.Label>Avatar</Form.Label>
                                <Form.Control
                                    type="file"
                                    name="avatar"
                                    value={formData.avatar}
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <Button variant="dark" type="submit" className="w-100 mt-3">
                                Sign Up
                            </Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default SignUpForm;
