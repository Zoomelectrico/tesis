# UVOTE

![UVOTE Logo](https://raw.githubusercontent.com/Zoomelectrico/tesis/master/frontend/src/assets/img/logo-color.svg?sanitize=true)

Es una plataforma electoral realizada como trabajo especial de grado por [Jose Roberto Quevedo Gabizon](https://twitter.com/quevedodev) y tutoriado por el Ing. [Nicolas Araque](https://medium.com/@nicolas_araque) para obtar al titulo de Ingeniero de Sistemas en al [Universidad Metropolitana](http://unimet.edu.ve). Esta plataforma se basa en la utilizacion del Blockchain como mecanisco generador de confianza.
Para desarollar esta aplicacion, se utilizo Hyperledger [Composer](https://hyperledger.github.io/composer/latest/) y [Fabric](https://hyperledger-fabric.readthedocs.io/en/release-1.4/) como herramientas de Blockchain, adicionalmente se realizar un API REST con [Express](https://expressjs.org) y [Mongo DB](https://mongodb.com) como herramienta de autenticacion, y validacion de datos, con la itencion de que el blockchain se mantuviera con la menor cantidad de alteraciones. Por ultimo, se realizado un aplicacion web utilizando [React](https://reactjs.org) para que funcionara como cliente grafico a esta plataforma.

A continuacion, encontraran las instrucciones de instalacion (para Ubuntu 16.04) y un reconocimiento a algunas librerias que hicieron mi trabajo mas facil, un gran abrazo para sus creadores.

## Instrucciones de Instalacion

En primer lugar deberan descargar las herramientas de composer para una guia revisen los siguientes links [Prerequisitos](https://hyperledger.github.io/composer/latest/installing/installing-prereqs.html#ubuntu) [Developer tools](https://hyperledger.github.io/composer/latest/installing/development-tools.html). Una vez, instalado deberan clonar este repositorio e instalar sus dependencias

```console
$ cd ~
$ git clone https://github.com/Zoomelectrico/tesis.git
$ cd ~/tesis/frontend && npm install && cd ~/tesis/backend && npm install && cd ~/
```

Despues deberan abrir 3 ventanas de terminal en la primera venta se ejecutara la red blockchain

```console
$ cd ~/tesis/blockchain
$ cd ~/fabric-dev-servers && ./startFabric.sh && cd ~/tesis/blockchain && npm run createNet && npm run startComposer
```

En la segunda ventada de la terminarl ejecutarmos este comando para Iniciar el Frontend

```console
$ cd ~/tesis/frontend && npm start
```

En la tercera ventada de la terminarl ejecutarmos este comando para Iniciar el Frontend

```console
$ cd ~/tesis/frontend && mv variables.env.example variablee.nv && npm start
```

**IMPORTANTE**: Cambiar en el archivo variables.env el string de coneccion a la DB.

## Librerías Utilizadas

Esta sección es un fuerte agradecimiento todas aquellas librerías que facilitaron mi trabajo.

1.  [React](https://reactjs.org)
2.  [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
3.  [Argon Dashboard Design System](https://demos.creative-tim.com/argon-dashboard-react/#/admin/index)
4.  [Reactstrap](https://reactstrap.github.io/)
5.  [axios](https://github.com/axios/axios)
6.  [universal-cookie](https://github.com/reactivestack/cookies/tree/master/packages/universal-cookie#readme)
7.  [bcrypt.js](https://www.npmjs.com/package/bcryptjs)
8.  [create-react-app](https://github.com/facebook/create-react-app)
9.  [Composer](https://hyperledger.github.io/composer/latest/)
10. [Express](https://expressjs.com/es/)
11. [Mongooser](https://mongoosejs.com)
12. [Passport](http://www.passportjs.org/)
13. [React Toastify](https://fkhadra.github.io/react-toastify/)
14. [Crypto-js](https://www.npmjs.com/package/crypto-js)
15. [Cypress](https://www.cypress.io/)

#### Alguna Duda?

[Tweet me](https://twitter.com/quevedodev)
