import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, InputGroup, FormControl, Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import APIs, { authApi, endpoints } from '../configs/APIs';
import store from '../store';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

function TourPage() {
    const StyledNavLink = styled(Link)`
        color: black !important;
        font-size: 1.25rem;
        font-weight: 600;
        text-decoration: none;
        margin-right: 15px;

        &:hover {
            color: #cccccc !important;
        }
    `;
    const [minValue, setMinValue] = useState('');
    const [maxValue, setMaxValue] = useState('');
    const [destination, setDestination] = useState('');
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState('');
    const [date, setDate] = useState('');
    const nav = useNavigate();
    // const [keyword, setKeyword] = useState('');
    const [page, setPage] = useState(1);
    const [priceMax, setPriceMax] = useState('');
    const [priceMin, setPriceMin] = useState('');
    const [price, setPrice] = useState('');

    const [cateId, setCateId] = useState('');
    // const { keyword, page, priceMax, priceMin, cateId } = store((state) => state.data);
    const { keyword } = store((state) => state.data);
    const { setTourid } = store((state) => state);
    // const {    } = store((state) => state);
    // const { setCateId, setPage, setPriceMax, setPriceMin, setStartDate, setLocation } = store(
    //     (state) => state,
    // );

    const loadTours = async () => {
        if (page > 0) {
            let url = `${endpoints['tours']}?price_min=${priceMin}&&price_max=${priceMax}&&start_date=${date}&&cate_id=${categories}&&location=${destination}&&page=${page}`;
            try {
                setLoading(true);
                let res = await APIs.get(url);
                if (page === 1) setTours(res.data.results);
                else if (page > 1)
                    setTours((current) => {
                        return [...current, ...res.data.results];
                    });
                if (res.data.next === null) setPage(0);
            } catch (ex) {
                console.error(ex);
            } finally {
                setLoading(false);
            }
        }
    };

    const loadCategories = async () => {
        try {
            let res = await APIs.get(endpoints['cateTours']);
            setCategories(res.data);
        } catch (ex) {
            console.error(ex);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    useEffect(() => {
        loadTours();
        console.log({ tours });
    }, [page, priceMin, priceMax, date, cateId, destination, keyword]);

    const handleMinValueChange = (event) => {
        setMinValue(event.target.value);
        setPriceMin(event.target.value); // Sync minValue with priceMin
    };

    const handleMaxValueChange = (event) => {
        setMaxValue(event.target.value);
        setPriceMax(event.target.value); // Sync maxValue with priceMax
    };

    const handleDestinationChange = (event) => {
        setDestination(event.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        loadTours();
    };
    const handleSetCategory = (category) => {
        setCategories(category);
        setPage(1);
        loadTours();
    };
    const handleTourDetail = (tourId) => {
        nav('/tourDetail');
        setTourid(tourId)
    };
    return (
        <Container fluid>
            <Row className="mb-4 mt-4">
                <Col>
                    <Button variant="light" onClick={() => handleSetCategory('')}>
                        Tất cả
                    </Button>
                    <Button variant="light" onClick={() => handleSetCategory('1')}>
                        Miền Nam
                    </Button>
                    <Button variant="light" onClick={() => handleSetCategory('2')}>
                        Miền Trung
                    </Button>
                    <Button variant="light" onClick={() => handleSetCategory('3')}>
                        Miền Bắc
                    </Button>
                </Col>
            </Row>

            <Row className="mb-4">
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Nhập giá trị thấp nhất"
                            value={minValue}
                            onChange={handleMinValueChange} // Cập nhật giá trị cho minValue
                        />
                        <Button variant="outline-secondary" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Nhập giá trị cao nhất"
                            value={maxValue}
                            onChange={handleMaxValueChange} // Cập nhật giá trị cho maxValue
                        />
                        <Button variant="outline-secondary" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </InputGroup>
                </Col>
                <Col>
                    <InputGroup>
                        <FormControl
                            placeholder="Nhập điểm đến"
                            value={destination}
                            onChange={handleDestinationChange} // Cập nhật giá trị cho destination
                        />
                        <Button variant="outline-secondary" onClick={handleSearch}>
                            Tìm kiếm
                        </Button>
                    </InputGroup>
                </Col>
            </Row>

            <h4>Danh sách Tour du lịch</h4>
            <Row>
                {tours.map((tour, index) => (
                    <Col sm={4} key={index}>
                        {/* <StyledNavLink to={'/tourDetail'} className="mb-0"> */}
                        <div className="tour-item bg-light p-3 mb-3" onClick={()=> handleTourDetail(tour.id)}>
                            <div
                                className="img-placeholder mb-2"
                                style={{ height: '150px', backgroundColor: '#f8d7da' }}
                            ></div>
                            <p>{tour.description}</p>
                        </div>
                        {/* </StyledNavLink> */}
                    </Col>
                ))}
            </Row>

            <Pagination className="mt-4">
                <Pagination.Prev onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : prev))} />
                <Pagination.Item>{page}</Pagination.Item>
                <Pagination.Next onClick={() => setPage((prev) => prev + 1)} />
            </Pagination>
        </Container>
    );
}

export default TourPage;
