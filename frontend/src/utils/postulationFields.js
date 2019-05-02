const fields = [
  {
    label: "Nombre del Presidente",
    id: "presidentName",
    type: "text",
    idx: 0,
    charge: "Presidente"
  },
  {
    label: "Cedula del Presidente",
    id: "presidentDni",
    type: "number",
    idx: 0,
    charge: "Presidente"
  },
  {
    label: "Escuela del Presidente",
    id: "presidentSchool",
    type: "select",
    idx: 0,
    charge: "Presidente"
  },
  {
    label: "Nombre del Secretario General",
    id: "secretaryGeneralName",
    type: "text",
    idx: 1,
    charge: "Secretario General"
  },
  {
    label: "Cedula del Secretario General",
    id: "secretaryGeneralDni",
    type: "number",
    idx: 1,
    charge: "Secretario General"
  },
  {
    label: "Escuela del Secretario General",
    id: "secretaryGeneralSchool",
    type: "select",
    idx: 1,
    charge: "Secretario General"
  },
  {
    label: "Nombre del Secretario de Asustos Internos",
    id: "internalAffairsName",
    type: "text",
    idx: 2,
    charge: "Secretario de Asustos Internos"
  },
  {
    label: "Cedula del Secretario de Asustos Internos",
    id: "internalAffairsDni",
    type: "number",
    idx: 2,
    charge: "Secretario de Asustos Internos"
  },
  {
    label: "Escuela del Secretario de Asustos Internos",
    id: "internalAffairsSchool",
    type: "select",
    idx: 2,
    charge: "Secretario de Asustos Internos"
  },
  {
    label: "Nombre del Coordinador General",
    id: "generalCoordinatorName",
    type: "text",
    idx: 3,
    charge: "Coordinador General"
  },
  {
    label: "Cedula del Coordinador General",
    id: "generalCoordinatorDni",
    type: "number",
    idx: 3,
    charge: "Coordinador General"
  },
  {
    label: "Escuela del Coordinador General",
    id: "generalCoordinatorSchool",
    type: "select",
    idx: 3,
    charge: "Coordinador General"
  },
  {
    label: "Nombre del Tesorero",
    id: "treasurerName",
    type: "text",
    idx: 4,
    charge: "Tesorero"
  },
  {
    label: "Cedula del Tesorero",
    id: "treasurerDni",
    type: "number",
    idx: 4,
    charge: "Tesorero"
  },
  {
    label: "Escuela del Tesorero",
    id: "treasurerSchool",
    type: "select",
    idx: 4,
    charge: "Tesorero"
  }
];

const fieldsSports = [
  {
    label: "Nombre del Coordinador de Deportes #1",
    type: "text",
    id: "sportsName1",
    idx: 0,
    charge: "Coordinador de Deportes"
  },
  {
    label: "Cedula del Coordinador de Deportes #1",
    type: "number",
    id: "sportsDni1",
    idx: 0,
    charge: "Coordinador de Deportes"
  },
  {
    label: "Escuela del Coordinador de Deportes #1",
    type: "select",
    id: "sportsSchool1",
    idx: 0,
    charge: "Coordinador de Deportes"
  },
  {
    label: "Nombre del Coordinador de Deportes #2",
    type: "text",
    id: "sportsName2",
    idx: 1,
    charge: "Coordinador de Deportes"
  },
  {
    label: "Cedula del Coordinador de Deportes #2",
    type: "number",
    id: "sportsDni2",
    idx: 1,
    charge: "Coordinador de Deportes"
  },
  {
    label: "Escuela del Coordinador de Deportes #2",
    type: "select",
    id: "sportsSchool2",
    idx: 1,
    charge: "Coordinador de Deportes"
  }
];

const fieldsCulture = [
  {
    label: "Nombre del Coordinador de Cultura #1",
    type: "text",
    id: "cultureName1",
    idx: 0,
    charge: "Coordinador de Cultura"
  },
  {
    label: "Cedula del Coordinador de Cultura #1",
    type: "number",
    id: "cultureDni1",
    idx: 0,
    charge: "Coordinador de Cultura"
  },
  {
    label: "Escuela del Coordinador de Cultura #1",
    type: "select",
    id: "cultureSchool1",
    idx: 0,
    charge: "Coordinador de Cultura"
  },
  {
    label: "Nombre del Coordinador de Cultura #2",
    type: "text",
    id: "cultureName2",
    idx: 1,
    charge: "Coordinador de Cultura"
  },
  {
    label: "Cedula del Coordinador de Cultura #2",
    type: "number",
    id: "cultureDni2",
    idx: 1,
    charge: "Coordinador de Cultura"
  },
  {
    label: "Escuela del Coordinador de Cultura #2",
    type: "select",
    id: "cultureSchool2",
    idx: 1,
    charge: "Coordinador de Cultura"
  }
];

const fieldsServices = [
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #1",
    type: "text",
    id: "servicesName1",
    idx: 0,
    charge: "Coordinador de Servicios e Infraestructura"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #1",
    type: "number",
    id: "servicesDni1",
    idx: 0,
    charge: "Coordinador de Servicios e Infraestructura"
  },
  {
    label: "Escuela del Coordinador de Servicios e Infraestructura #1",
    type: "select",
    id: "servicesSchool1",
    idx: 0,
    charge: "Coordinador de Servicios e Infraestructura"
  },
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #2",
    type: "text",
    id: "servicesName2",
    idx: 1,
    charge: "Coordinador de Servicios e Infraestructura"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #2",
    type: "number",
    id: "servicesDni2",
    idx: 1,
    charge: "Coordinador de Servicios e Infraestructura"
  },
  {
    label: "Escuela del Coordinador de Servicios e Infraestructura #2",
    type: "select",
    id: "servicesSchool2",
    idx: 1,
    charge: "Coordinador de Servicios e Infraestructura"
  }
];

const fieldsAcademic = [
  {
    label: "Nombre del Coordinador de Academico #1",
    type: "text",
    id: "academicName1",
    idx: 0,
    charge: "Coordinador Academico"
  },
  {
    label: "Cedula del Coordinador de Academico #1",
    type: "number",
    id: "academicDni1",
    idx: 0,
    charge: "Coordinador Academico"
  },
  {
    label: "Escuela del Coordinador de Academico #1",
    type: "select",
    id: "academicSchool1",
    idx: 0,
    charge: "Coordinador Academico"
  },
  {
    label: "Nombre del Coordinador de Academico #2",
    type: "text",
    id: "academicName2",
    idx: 1,
    charge: "Coordinador Academico"
  },
  {
    label: "Cedula del Coordinador de Academico #2",
    type: "number",
    id: "academicDni2",
    idx: 1,
    charge: "Coordinador Academico"
  },
  {
    label: "Escuela del Coordinador de Academico #2",
    type: "select",
    id: "academicSchool2",
    idx: 1,
    charge: "Coordinador Academico"
  }
];

const fieldsResponsibility = [
  {
    label: "Nombre del Coordinador de Responsabilidad SU #1",
    type: "text",
    id: "responsabilityName1",
    idx: 0,
    charge: "Coordinador de Responsabilidad SU"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #1",
    type: "number",
    id: "responsabilityDni1",
    idx: 0,
    charge: "Coordinador de Responsabilidad SU"
  },
  {
    label: "Escuela del Coordinador de Responsabilidad SU #1",
    type: "select",
    id: "responsabilitySchool1",
    idx: 0,
    charge: "Coordinador de Responsabilidad SU"
  },
  {
    label: "Nombre del Coordinador de Responsabilidad SU #2",
    type: "text",
    id: "responsabilityName2",
    idx: 1,
    charge: "Coordinador de Responsabilidad SU"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #2",
    type: "number",
    id: "responsabilityDni2",
    idx: 1,
    charge: "Coordinador de Responsabilidad SU"
  },
  {
    label: "Escuela del Coordinador de Responsabilidad SU #2",
    type: "select",
    id: "responsabilitySchool2",
    idx: 1,
    charge: "Coordinador de Responsabilidad SU"
  }
];

const academicCouncil = [
  {
    label: "Nombre del Consejero",
    id: "adviserName",
    type: "text"
  },
  {
    label: "Correo Electronico del Consejero",
    id: "adviserEmail",
    type: "email"
  },
  {
    label: "Cedula del Consejero",
    id: "adviserDni",
    type: "number"
  },
  {
    label: "Telefono del Consejero",
    id: "adviserPhone",
    type: "tel"
  },
  {
    label: "Escuela del Consejero",
    id: "adviserSchool",
    type: "select"
  }
];

const facultyCouncil = [
  {
    label: "Nombre del Consejero #1",
    id: "adviserName1",
    type: "text",
    idx: 0,
    substitute: false
  },
  {
    label: "Cedula del Consejero #1",
    id: "adviserDni1",
    type: "number",
    idx: 0,
    substitute: false
  },
  {
    label: "Escuela del Consejero #1",
    id: "adviserSchool1",
    type: "select",
    idx: 0,
    substitute: false
  },
  {
    label: "Nombre del Consejero #2",
    id: "adviserName2",
    type: "text",
    idx: 1,
    substitute: false
  },
  {
    label: "Cedula del Consejero #2",
    id: "adviserDni2",
    type: "number",
    idx: 1,
    substitute: false
  },
  {
    label: "Escuela del Consejero #2",
    id: "adviserSchool2",
    type: "select",
    idx: 1,
    substitute: false
  },
  {
    label: "Nombre del Consejero Suplente #1",
    id: "adviserName3",
    type: "text",
    idx: 2,
    substitute: true
  },
  {
    label: "Cedula del Consejero Suplente #1",
    id: "adviserDni3",
    type: "number",
    idx: 2,
    substitute: true
  },
  {
    label: "Escuela del Consejero Suplente #1",
    id: "adviserSchool3",
    type: "select",
    idx: 2,
    substitute: true
  },
  {
    label: "Nombre del Consejero Suplente #2",
    id: "adviserName4",
    type: "text",
    idx: 3,
    substitute: true
  },
  {
    label: "Cedula del Consejero Suplente #2",
    id: "adviserDni4",
    type: "number",
    idx: 3,
    substitute: true
  },
  {
    label: "Escuela del Consejero Suplente #2",
    id: "adviserSchool4",
    type: "select",
    idx: 3,
    substitute: true
  }
];

const school = [
  {
    label: "Nombre del Presidente",
    id: "presidentName",
    type: "text",
    idx: 0,
    charge: "Presidente"
  },
  {
    label: "Cedula del Presidente",
    id: "presidentDni",
    type: "number",
    idx: 0,
    charge: "Presidente"
  },
  {
    label: "Nombre del Coordinador General",
    id: "coordinatorName",
    type: "text",
    idx: 1,
    charge: "Coordinador General"
  },
  {
    label: "Cedula del Coordinador General",
    id: "coordinatorDni",
    type: "number",
    idx: 1,
    charge: "Coordinador General"
  },
  {
    label: "Nombre del Tesorero",
    id: "treasurerName",
    type: "text",
    idx: 2,
    charge: "Tesorero"
  },
  {
    label: "Cedula del Tesorero",
    id: "treasurerDni",
    type: "number",
    idx: 2,
    charge: "Tesorero"
  }
];

const schoolCouncil = [
  {
    label: "Nombre del Consejero #1",
    id: "adviserName1",
    type: "text",
    idx: 0,
    substitute: false
  },
  {
    label: "Cedula del Consejero #1",
    id: "adviserDni1",
    type: "number",
    idx: 0,
    substitute: false
  },
  {
    label: "Nombre del Consejero #2",
    id: "adviserName2",
    type: "text",
    idx: 1,
    substitute: false
  },
  {
    label: "Cedula del Consejero #2",
    id: "adviserDni2",
    type: "number",
    idx: 1,
    substitute: false
  },
  {
    label: "Nombre del Consejero Suplente #1",
    id: "adviserName3",
    type: "text",
    idx: 2,
    substitute: true
  },
  {
    label: "Cedula del Consejero Suplente #1",
    id: "adviserDni3",
    type: "number",
    idx: 2,
    substitute: true
  },
  {
    label: "Nombre del Consejero Suplente #2",
    id: "adviserName4",
    type: "text",
    idx: 3,
    substitute: true
  },
  {
    label: "Cedula del Consejero Suplente #2",
    id: "adviserDni4",
    type: "number",
    idx: 3,
    substitute: true
  }
];

export default {
  fields,
  fieldsAcademic,
  fieldsCulture,
  fieldsResponsibility,
  fieldsServices,
  fieldsSports,
  academicCouncil,
  facultyCouncil,
  school,
  schoolCouncil
};
