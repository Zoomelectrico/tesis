import axios from "axios";
import env from "./env";

const get = url =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem(env.KEY);
      if (!token) {
        return reject(new Error("No tiene un token disponible"));
      }
      const { data } = await axios.get(`${env.API_URL}/${url}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (data && data.success) {
        return resolve(data);
      }
      reject(new Error("La peticion no fue exitosa"));
    } catch (err) {
      reject(err);
    }
  });

const post = (url, body) =>
  new Promise(async (resolve, reject) => {
    try {
      const token = localStorage.getItem(env.KEY);
      if (!token) {
        return reject(new Error("No tiene un token disponible"));
      }
      const { data } = await axios.post(
        `${env.API_URL}/${url}`,
        { ...body },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      if (data && data.success) {
        return resolve(data);
      }
      reject(new Error("La peticion no fue exitosa"));
    } catch (err) {
      reject(err);
    }
  });

export { get, post };
