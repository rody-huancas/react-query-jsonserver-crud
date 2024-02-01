import axios from "axios";

const productApi = axios.create({
  baseURL: "http://localhost:3030",
});

export const getProducts = async () => {
  const { data } = await productApi("/products");
  return data;
};

export const createProduct = async (product) =>
  productApi.post("/products", product);
