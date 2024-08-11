import axios from "axios";

const satellite = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 5000, // in millisecond
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

// Menambahkan interceptor ketika mengirim request
axios.interceptors.request.use(
  function (config) {
    // Lakukan Sesuatu sebelum request dikirimkan
    return config;
  },
  function (error) {
    // Lakukan Sesuatu ketika terjadi error
    return Promise.reject(error);
  }
);

// Menambahkan interceptor ketika menerima response
axios.interceptors.response.use(
  function (response) {
    // Semua status kode dengan rentan 2xx -an
    // akan dipanggil di sini

    // Lakukan Sesuatu ketika menerima response data
    return response;
  },
  function (error) {
    // Semua status kode dengan rentan selain 2xx
    // akan dipanggil di sini

    // Lakukan Sesuatu ketika menerima response error
    return Promise.reject(error);
  }
);

export default satellite;
