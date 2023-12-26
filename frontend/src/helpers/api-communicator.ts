import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  const response = await axios.post("/users/login", { email, password });
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  const data = await response.data;
  return data;
};
