const normalize = string =>
  string
    .normalize("NFD")
    .replace(
      /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
      "$1"
    )
    .normalize()
    .replace(/[ ]/g, "-")
    .toLowerCase();

const normalizeInputs = string =>
  string
    .replace(/[0-9]/g, "")
    .replace(
      /(sports|culture|president|secretaryGeneral|internalAffairs|generalCoordinator|treasurer|services|academic|responsability|adviser|coordinator)/gi,
      ""
    )
    .toLowerCase();

export { normalize, normalizeInputs };
