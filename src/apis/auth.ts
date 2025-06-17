import axios from "axios";
import { API_PREFIX } from "../constants/config";

const AUTH_PREFIX = `${API_PREFIX}/auth`;
export const signup = async () => {
  try {
    const response = await axios.post(`${AUTH_PREFIX}/signup`);

    if (response.code != "SUCCESS")
  } catch (error) {}
};
