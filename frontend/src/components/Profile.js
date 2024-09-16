import React from 'react';
import { Card, Button } from 'react-bootstrap';
import store from '../store';

const Profile = () => {
    const user = store((state) => state.data.user);

    return (
        <div className="container mt-4">
            <Card className="text-center">
                <Card.Header as="h5">Hồ sơ</Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>
                            <strong>Thông tin người dùng</strong>
                        </p>
                        <p>
                            Chào <strong>{`${user.first_name} ${user.last_name}`}</strong>
                        </p>
                        <p>
                            Email: <strong>{user.email}</strong>
                        </p>
                        <p>
                            Địa chỉ: <strong>{user.info.address}</strong>
                        </p>
                        <p>
                            Số điện thoại: <strong>{user.info.phone}</strong>
                        </p>
                    </Card.Text>
                    <div className="d-flex justify-content-center">
                        <img
                            src={user.avatar}
                            alt="User Avatar"
                            className="rounded-circle"
                            width="100"
                            height="100"
                        />
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Profile;
