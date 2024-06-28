import {useState} from "react";
import {Form} from "./auth-form";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:3001/auth/login", data);
            setCookies("access_token", response.data.token);
            window.localStorage.setItem("userID", response.data.userID);
            navigate("/");
        } catch (err) {
            let errMessage = '';
            if (err.response && err.response.status === 401) {
                errMessage ='Неверное имя пользователя или пароль';
            } else if (err.response && err.response.status === 404) {
                errMessage ='Пользователь не найден. Возможно не верное имя пользователя';
            } else {
                errMessage ='Ошибка сервера. Попробуйте позже';
            }
            toast.error(errMessage);
        }
    }

    return (
        <>
            <Form
                label="Войти"
                onSubmit={onSubmit}
            />
            <ToastContainer />
        </>
    )
}