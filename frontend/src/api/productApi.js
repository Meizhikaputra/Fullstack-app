import axiosClient from "./axiosClient";

export const getProducts = async () => {
    try {
        const response = await axiosClient.get('/products');
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const getProductsId = async ({id}) => {
    try {
        const response = await axiosClient.get('/products/' + id );
        return response.data.data;
    } catch (error) {
        console.error('Error fetching products:', error);
        throw error;
    }
};

export const formatToRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 2,
    }).format(number);
  };