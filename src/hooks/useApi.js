import axios from "axios";
import { useAuth } from "../context/AuthContext";

export const useApi = () => {
  const { token } = useAuth();
  const callApi = async (method, endPoint, isProtected = false, data = {}) => {
    switch (method) {
      case "get": {
        return await axios.get(
          endPoint,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "post": {
        return await axios.post(
          endPoint,
          JSON.stringify(data),
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "delete": {
        return await axios.delete(
          endPoint,
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
      case "put": {
        return await axios.put(
          endPoint,
          JSON.stringify(data),
          isProtected && {
            headers: { authorization: token },
          }
        );
      }
    }
  };
  return { callApi };
};
