import axios from "axios";
export const callApi = async (
  method,
  endPoint,
  isProtected = false,
  data = {}
) => {
  const token = localStorage?.getItem("token");
  if (isProtected) endPoint = `/api/user/${endPoint}`;
  else endPoint = `/api/${endPoint}`;
  token &&
    isProtected &&
    axios.interceptors.request.use(
      (config) => {
        config.headers.authorization = token;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

  switch (method) {
    case "get": {
      return await axios.get(endPoint);
    }
    case "post": {
      return await axios.post(endPoint, data);
    }
    case "delete": {
      return await axios.delete(endPoint);
    }
    case "put": {
      return await axios.put(endPoint, data);
    }
    default: {
      return;
    }
  }
};
