import api from "./api";

export const login = async (email, password) => {

    const response = await api.post("/login", {
        email,
        password,
    });

    return response.data;

};

export const getToken = () => {

    return localStorage.getItem("token");

};

export const getUser = () => {

    const user = localStorage.getItem("user");

    return user ? JSON.parse(user) : null;

};

export const isAuthenticated = () => {

    return !!getToken();

};

export const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

};