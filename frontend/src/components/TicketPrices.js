import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Navbar, Nav, InputGroup } from 'react-bootstrap';

const TourBooking = () => {
    const [ticketType, setTicketType] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [availableTickets, setAvailableTickets] = useState(64);

    const ticketPrices = {
        adult: 4000000,
        childUnder5: 3500000,
        child5to10: 3700000,
        child11to18: 3800000,
        seniorOver50: 3900000,
    };

    const handleTicketTypeChange = (e) => {
        setTicketType(e.target.value);
    };

    const handleQuantityChange = (e) => {
        setQuantity(e.target.value);
    };

    const handleBooking = () => {
        if (ticketType && quantity > 0) {
            console.log(`Booked ${quantity} tickets for ${ticketType}`);
            setAvailableTickets(availableTickets - quantity);
        } else {
            alert('Please select a ticket type and enter a valid quantity.');
        }
    };

    return (
        <Container className="my-5">
            <h2 className="text-center mb-4">Đặt tour</h2>

            <Row className="mb-3">
                <Col>
                    <h5>Giá vé:</h5>
                    <ul>
                        <li>Vé người lớn: {ticketPrices.adult.toLocaleString()} đồng</li>
                        <li>
                            Vé trẻ em (dưới 5 tuổi): {ticketPrices.childUnder5.toLocaleString()}{' '}
                            đồng
                        </li>
                        <li>
                            Vé trẻ em (từ 5 đến 10 tuổi): {ticketPrices.child5to10.toLocaleString()}{' '}
                            đồng
                        </li>
                        <li>
                            Vé trẻ em (từ 11 đến 18 tuổi):{' '}
                            {ticketPrices.child11to18.toLocaleString()} đồng
                        </li>
                        <li>
                            Vé người già (trên 50 tuổi):{' '}
                            {ticketPrices.seniorOver50.toLocaleString()} đồng
                        </li>
                    </ul>
                    <p>Số vé còn lại: {availableTickets}</p>
                </Col>
            </Row>

            <Form>
                <Form.Group as={Row} className="mb-3">
                    <Form.Label column sm={2}>
                        Chọn loại vé
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                            type="radio"
                            label="Vé người lớn"
                            name="ticketType"
                            value="Vé người lớn"
                            onChange={handleTicketTypeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Vé trẻ em (dưới 5 tuổi)"
                            name="ticketType"
                            value="Vé trẻ em (dưới 5 tuổi)"
                            onChange={handleTicketTypeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Vé trẻ em (từ 5 đến 10 tuổi)"
                            name="ticketType"
                            value="Vé trẻ em (từ 5 đến 10 tuổi)"
                            onChange={handleTicketTypeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Vé trẻ em (từ 11 đến 18 tuổi)"
                            name="ticketType"
                            value="Vé trẻ em (từ 11 đến 18 tuổi)"
                            onChange={handleTicketTypeChange}
                        />
                        <Form.Check
                            type="radio"
                            label="Vé người già (trên 50 tuổi)"
                            name="ticketType"
                            value="Vé người già (trên 50 tuổi)"
                            onChange={handleTicketTypeChange}
                        />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-4">
                    <Form.Label column sm={2}>
                        Nhập số vé
                    </Form.Label>
                    <Col sm={10}>
                        <InputGroup>
                            <Form.Control
                                type="number"
                                value={quantity}
                                onChange={handleQuantityChange}
                                min={1}
                            />
                        </InputGroup>
                    </Col>
                </Form.Group>

                <Button variant="primary" className="w-100" onClick={handleBooking}>
                    Đặt vé
                </Button>
            </Form> 
        </Container>
    );
};

export default TourBooking;
