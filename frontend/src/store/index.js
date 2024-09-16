import { produce } from 'immer';
import { create } from 'zustand';
import { devtools, persist, subscribeWithSelector } from 'zustand/middleware';
import cookie from 'cookie';

const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1);
const store = (set) => ({
    setPriceMin: (priceMin) =>
        set(
            produce((state) => {
                state.data.priceMin = priceMin;
            }),
        ),

    setPriceMax: (priceMax) =>
        set(
            produce((state) => {
                state.data.priceMax = priceMax;
            }),
        ),

    setStartDate: (date) =>
        set(
            produce((state) => {
                state.data.date = date;
            }),
        ),

    setCateId: (cateId) =>
        set(
            produce((state) => {
                state.data.cateId = cateId;
            }),
        ),

    setLocation: (keyword) =>
        set(
            produce((state) => {
                state.data.keyword = keyword; // Assuming 'keyword' is location
            }),
        ),

    setPage: (page) =>
        set(
            produce((state) => {
                state.data.page = page;
            }),
        ),

    setUser: (user) =>
        set(
            produce((state) => {
                state.data.user = user;
            }),
        ),
    setAccessToken: (token) =>
        set(
            produce((state) => {
                state.data.token = token;
            }),
        ),
    setTourid: (tourId) =>
        set(
            produce((state) => {
                state.data.tourId = tourId;
            }),
        ),
    setCart: (cart) =>
        set(
            produce((state) => {
                state.data.cart = cart;
            }),
        ),

    data: {
        cookies: cookie.parse(document.cookie),
        user: null,
        keyword: '',
        token: null,
        tourId: '',
        cart: null,
        // priceMin: '',
        // priceMax: '',
        // date: '',
        // cateId: '',
        // page: 1,
    },
});

export default create(persist(store, { name: 'userInfo' }));
