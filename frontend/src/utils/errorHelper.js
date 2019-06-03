const errorString = (err = '') => {
  switch (err) {
    case `Cannot read property '1' of null`:
      return 'Ya se ha creado un usuario con ese correo';
    default:
      return err;
  }
};

export default errorString;
