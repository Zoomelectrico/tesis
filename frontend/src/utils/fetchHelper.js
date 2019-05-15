import axios from 'axios';
import env from './env';

/**
 * @function get
 * @description Una funcion que abstrae una peticion AJAX para manejar errores correctamente y utilizacion del Token
 * @author Jose Roberto Quevedo
 * @param {String} url La ruta a la cual se hara la peticion
 * @param {Boolean} auth Una bandera para identificar si es necesario utilizar token o no
 * @returns {Promise<Object>} El metodo retorna una promesa nativa.
 */
const get = (url, auth = true) =>
  new Promise(async (resolve, reject) => {
    try {
      let data;
      if (auth) {
        const token = localStorage.getItem(env.KEY);
        if (!token) {
          return reject(new Error('No tiene un token disponible'));
        }
        data = await axios.get(`${env.API_URL}/${url}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        data = await axios.get(`${env.API_URL}/${url}`);
      }
      // eslint-disable-next-line prefer-destructuring
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

/**
 * @function post
 * @description Una funcion que abstrae una peticion AJAX para manejar errores correctamente y utilizacion del Token
 * @author Jose Roberto Quevedo
 * @param {String} url La ruta a la cual se hara la peticion
 * @param {Object} body El cuerpo de la peticion
 * @param {Boolean} auth Una bandera para identificar si es necesario utilizar token o no
 * @returns {Promise<Object>} El metodo retorna una promesa nativa.
 */
const post = (url, body, auth = true) =>
  new Promise(async (resolve, reject) => {
    try {
      let data;
      if (auth) {
        const token = localStorage.getItem(env.KEY);
        if (!token) {
          return reject(new Error('No tiene un token disponible'));
        }
        data = await axios.post(
          `${env.API_URL}/${url}`,
          { ...body },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
      } else {
        data = await axios.post(`${env.API_URL}/${url}`, { ...body });
      }
      // eslint-disable-next-line prefer-destructuring
      data = data.data;
      if (data && data.success) {
        return resolve(data);
      }
      reject(new Error(data.err));
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export { get, post };
