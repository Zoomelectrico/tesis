import React from 'react';

const Loading = () => (
  <div className="p-5">
    <div className="d-flex justify-content-center">
      <img
        style={{ height: '125px', width: '125px' }}
        alt="uvote logo"
        // eslint-disable-next-line global-require
        src={require('../assets/img/logo-color.svg')}
        className="mb-3"
      />
    </div>
    <h2 className="text-center" id="loading-text">
      Cargando...
    </h2>
  </div>
);

export default Loading;
