import axios from "axios";
import env from "./env";

const get = (url, auth = true) =>
  new Promise(async (resolve, reject) => {
    try {
      let data;
      if (auth) {
        const token = localStorage.getItem(env.KEY);
        if (!token) {
          return reject(new Error("No tiene un token disponible"));
        }
        data = await axios.get(`${env.API_URL}/${url}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        data = await axios.get(`${env.API_URL}/${url}`);
      }
      data = data.data;
      if (data && data.success) {
        return resolve(data);
      }
      console.log(data);
      console.log(data.err.message || data.err);
      reject(new Error(data.err.message));
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

const post = (url, body, auth = true) =>
  new Promise(async (resolve, reject) => {
    try {
      let data;
      if (auth) {
        const token = localStorage.getItem(env.KEY);
        if (!token) {
          return reject(new Error("No tiene un token disponible"));
        }
        data = await axios.post(
          `${env.API_URL}/${url}`,
          { ...body },
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
      } else {
        data = await axios.post(`${env.API_URL}/${url}`, { ...body });
      }
      data = data.data;
      if (data && data.success) {
        return resolve(data);
      }
      reject(new Error(data.err.message));
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export { get, post };
