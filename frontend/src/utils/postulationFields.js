const fields = [
  {
    label: "Nombre del Presidente",
    id: "presidentName",
    type: "text"
  },
  {
    label: "Cedula del Presidente",
    id: "presidentDni",
    type: "number"
  },
  {
    label: "Escuela del Presidente",
    id: "presidentSchool",
    type: "select"
  },
  {
    label: "Nombre del Secretario General",
    id: "secretaryGeneralName",
    type: "text"
  },
  {
    label: "Cedula del Secretario General",
    id: "secretaryGeneralDni",
    type: "number"
  },
  {
    label: "Escuela del Secretario General",
    id: "secretaryGeneralSchool",
    type: "select"
  },
  {
    label: "Nombre del Secretario de Asustos Internos",
    id: "internalAffairsName",
    type: "text"
  },
  {
    label: "Cedula del Secretario de Asustos Internos",
    id: "internalAffairsDni",
    type: "number"
  },
  {
    label: "Escuela del Secretario de Asustos Internos",
    id: "internalAffairsSchool",
    type: "select"
  },
  {
    label: "Nombre del Coordinador General",
    id: "generalCoordinatorName",
    type: "text"
  },
  {
    label: "Cedula del Coordinador General",
    id: "generalCoordinatorDni",
    type: "number"
  },
  {
    label: "Escuela del Coordinador General",
    id: "generalCoordinatorSchool",
    type: "select"
  },
  {
    label: "Nombre del Tesorero",
    id: "treasurerName",
    type: "text"
  },
  {
    label: "Cedula del Tesorero",
    id: "treasurerDni",
    type: "number"
  },
  {
    label: "Escuela del Tesorero",
    id: "treasurerSchool",
    type: "select"
  }
];

const fieldsSports = [
  {
    label: "Nombre del Coordinador de Deportes #1",
    type: "text",
    id: "sportsName1"
  },
  {
    label: "Cedula del Coordinador de Deportes #1",
    type: "number",
    id: "sportsDni1"
  },
  {
    label: "Escuela del Coordinador de Deportes #1",
    type: "select",
    id: "sportsSchool1"
  },
  {
    label: "Nombre del Coordinador de Deportes #2",
    type: "text",
    id: "sportsName2"
  },
  {
    label: "Cedula del Coordinador de Deportes #2",
    type: "number",
    id: "sportsDni2"
  },
  {
    label: "Escuela del Coordinador de Deportes #2",
    type: "select",
    id: "sportsSchool2"
  }
];

const fieldsCulture = [
  {
    label: "Nombre del Coordinador de Cultura #1",
    type: "text",
    id: "cultureName1"
  },
  {
    label: "Cedula del Coordinador de Cultura #1",
    type: "number",
    id: "cultureDni1"
  },
  {
    label: "Escuela del Coordinador de Cultura #1",
    type: "select",
    id: "cultureSchool1"
  },
  {
    label: "Nombre del Coordinador de Cultura #2",
    type: "text",
    id: "cultureName2"
  },
  {
    label: "Cedula del Coordinador de Cultura #2",
    type: "number",
    id: "cultureDni2"
  },
  {
    label: "Escuela del Coordinador de Cultura #2",
    type: "select",
    id: "cultureSchool2"
  }
];

const fieldsServices = [
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #1",
    type: "text",
    id: "servicesName1"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #1",
    type: "number",
    id: "servicesDni1"
  },
  {
    label: "Escuela del Coordinador de Servicios e Infraestructura #1",
    type: "select",
    id: "servicesSchool1"
  },
  {
    label: "Nombre del Coordinador de Servicios e Infraestructura #2",
    type: "text",
    id: "servicesName2"
  },
  {
    label: "Cedula del Coordinador de Servicios e Infraestructura #2",
    type: "number",
    id: "servicesDni2"
  },
  {
    label: "Escuela del Coordinador de Servicios e Infraestructura #2",
    type: "select",
    id: "servicesSchool2"
  }
];

const fieldsAcademic = [
  {
    label: "Nombre del Coordinador de Academico #1",
    type: "text",
    id: "academicName1"
  },
  {
    label: "Cedula del Coordinador de Academico #1",
    type: "number",
    id: "academicDni1"
  },
  {
    label: "Escuela del Coordinador de Academico #1",
    type: "select",
    id: "academicSchool1"
  },
  {
    label: "Nombre del Coordinador de Academico #2",
    type: "text",
    id: "academicName2"
  },
  {
    label: "Cedula del Coordinador de Academico #2",
    type: "number",
    id: "academicDni2"
  },
  {
    label: "Escuela del Coordinador de Academico #2",
    type: "select",
    id: "academicSchool2"
  }
];

const fieldsResponsability = [
  {
    label: "Nombre del Coordinador de Responsabilidad SU #1",
    type: "text",
    id: "responsabilityName1"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #1",
    type: "number",
    id: "responsabilityDni1"
  },
  {
    label: "Escuela del Coordinador de Responsabilidad SU #1",
    type: "select",
    id: "responsabilitySchool1"
  },
  {
    label: "Nombre del Coordinador de Responsabilidad SU #2",
    type: "text",
    id: "responsabilityName2"
  },
  {
    label: "Cedula del Coordinador de Responsabilidad SU #2",
    type: "number",
    id: "responsabilityDni2"
  },
  {
    label: "Escuela del Coordinador de Responsabilidad SU #2",
    type: "select",
    id: "responsabilitySchool2"
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
    type: "text"
  },
  {
    label: "Cedula del Consejero #1",
    id: "adviserDni1",
    type: "number"
  },
  {
    label: "Escuela del Consejero #1",
    id: "adviserSchool1",
    type: "select"
  },
  {
    label: "Nombre del Consejero #2",
    id: "adviserName2",
    type: "text"
  },
  {
    label: "Cedula del Consejero #2",
    id: "adviserDni2",
    type: "number"
  },
  {
    label: "Escuela del Consejero #2",
    id: "adviserSchool2",
    type: "select"
  },
  {
    label: "Nombre del Consejero Suplente #1",
    id: "adviserName3",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #1",
    id: "adviserDni3",
    type: "number"
  },
  {
    label: "Escuela del Consejero Suplente #1",
    id: "adviserSchool3",
    type: "select"
  },
  {
    label: "Nombre del Consejero Suplente #2",
    id: "adviserName4",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #2",
    id: "adviserDni4",
    type: "number"
  },
  {
    label: "Escuela del Consejero Suplente #2",
    id: "adviserSchool4",
    type: "select"
  }
];

const school = [
  {
    label: "Nombre del Presidente",
    id: "presidentName",
    type: "text"
  },
  {
    label: "Cedula del Presidente",
    id: "presidentDni",
    type: "number"
  },
  {
    label: "Nombre del Coordinador General",
    id: "coordinatorName",
    type: "text"
  },
  {
    label: "Cedula del Coordinador General",
    id: "coordinatorDni",
    type: "number"
  },
  {
    label: "Nombre del Tesorero",
    id: "treasurerName",
    type: "text"
  },
  {
    label: "Cedula del Tesorero",
    id: "treasurerDni",
    type: "number"
  }
];

const schoolCouncil = [
  {
    label: "Nombre del Consejero #1",
    id: "adviserName1",
    type: "text"
  },
  {
    label: "Cedula del Consejero #1",
    id: "adviserDni1",
    type: "number"
  },
  {
    label: "Nombre del Consejero #2",
    id: "adviserName2",
    type: "text"
  },
  {
    label: "Cedula del Consejero #2",
    id: "adviserDni2",
    type: "number"
  },
  {
    label: "Nombre del Consejero Suplente #1",
    id: "adviserName3",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #1",
    id: "adviserDni3",
    type: "number"
  },
  {
    label: "Nombre del Consejero Suplente #2",
    id: "adviserName4",
    type: "text"
  },
  {
    label: "Cedula del Consejero Suplente #2",
    id: "adviserDni4",
    type: "number"
  }
];

export default {
  fields,
  fieldsAcademic,
  fieldsCulture,
  fieldsResponsability,
  fieldsServices,
  fieldsSports,
  academicCouncil,
  facultyCouncil,
  school,
  schoolCouncil
};
