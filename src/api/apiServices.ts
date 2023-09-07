import axios, { AxiosResponse } from "axios";
import { URLS } from "./config";

// added a function that returns headers for the HTTP request
const headerData = () => {
  return {
    "Access-Control-Allow-Origin": "*",
  };
};

// Created an instance of axios
const instance = axios.create({
  timeout: 30000,
  headers: headerData(),
});

const responseBody = (response: AxiosResponse) => {
  return response;
};

// handle errors in the HTTP request
const errorBody = (err: any) => {
  console.log("errorBody", err);

  if (err.code === "ERR_NETWORK") {
    return {
      message: "Please check internet connectivity, then retry!",
      status: 501,
    };
  } else if (err.code === "ERR_BAD_RESPONSE") {
    if (err.response.data.code) {
      return {
        message: "Please contact support, issue in server",
        status: 501,
      };
    } else if (err.response.data.message) {
      return {
        message: err.response.data.message,
        status: err.response.data.status,
      };
    } else {
      return {
        message: "Please contact support, something wrong with server",
        status: 501,
      };
    }
  } else if (err.code === "ERR_BAD_REQUEST") {
    if (err.response.data.message) {
      return {
        message:
          typeof err.response.data.message === `string`
            ? err.response.data.message
            : JSON.stringify(err.response.data.message),
        status: err.response.data.status,
      };
    } else if (typeof err.response.data === "string") {
      return {
        message: err.response.data,
        status: err.response.status,
      };
    } else {
      return {
        message: "Oops, Something went wrong!",
        status: err.response.status,
      };
    }
  }
};

// Defined HTTP request methods (get, post, put, delete)
const request = {
  get: (url: string, headers: any = { ...headerData() }) =>
    instance.get(url, { headers }).then(responseBody).catch(errorBody),
  post: (url: string, body: any, headers: any = { ...headerData() }) =>
    instance.post(url, body, { headers }).then(responseBody).catch(errorBody),
  put: (url: string, body: any, headers: any = { ...headerData() }) =>
    instance.put(url, body, { headers }).then(responseBody).catch(errorBody),
  delete: (url: string, headers: any = { ...headerData() }) =>
    instance.delete(url, { headers }).then(responseBody).catch(errorBody),
};

// user related api calls
export const USER = {
  getUserData: (pageNumber: number) =>
    request.get(`${URLS.GET_ALL_USERS}?page=${pageNumber}`),

  addNewUser: (bodyData: any) =>
    request.post(`${URLS.GET_ALL_USERS}`, bodyData),

  updateUserData: (userId: number, updatedData: any) =>
    request.put(`${URLS.GET_ALL_USERS}/${userId}`, updatedData),

  deleteUser: (userId: number) =>
    request.delete(`${URLS.GET_ALL_USERS}/${userId}`),
};
