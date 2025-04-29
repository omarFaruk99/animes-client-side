import React from 'react';
import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'http://192.168.68.150:8080',
});

const UseAxiosPublic = () => {
    return axiosPublic;
};

export default UseAxiosPublic;




