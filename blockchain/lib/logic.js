const NAME_SPACE = "ve.edu.unimet.ceu";

// <-- Contructores -->
/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.buildElectoralGroup} tx The sample transaction instance.
 * @transaction
 */
async function buildElectoralGroup(tx) {
  try {
    const {
      uuid,
      name,
      colorHex,
      colorName,
      logo,
      number,
      electionYear,
      electoralRepresentative,
      electoralPresident
    } = tx;
    const factory = getFactory();
    const electoralGroup = factory.newResource(
      `${NAME_SPACE}`,
      "GrupoElectoral",
      uuid
    );
    const registry = await getAssetRegistry(`${NAME_SPACE}.GrupoElectoral`);
    electoralGroup.name = name;
    electoralGroup.colorHex = colorHex;
    electoralGroup.colorName = colorName;
    electoralGroup.logo = logo;
    electoralGroup.number = number;
    electoralGroup.electionYear = electionYear;
    electoralGroup.electoralRepresentative = factory.newRelationship(
      `${NAME_SPACE}`,
      "RepresentanteElectoral",
      electoralRepresentative
    );
    electoralGroup.electoralPresident = factory.newRelationship(
      `${NAME_SPACE}`,
      "PresidenteElectoral",
      electoralPresident
    );
    await registry.add(electoralGroup);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.buildPostulation} tx The sample transaction instance.
 * @transaction
 */
async function buildPostulation(tx) {
  try {
    const {
      uuid,
      fce,
      sports,
      services,
      culture,
      academic,
      responsibility,
      academicCouncil,
      schoolsCouncil,
      facultyCouncil,
      studentsCenters,
      electoralGroup
    } = tx;

    const factory = getFactory();
    const registry = await getAssetRegistry(`${NAME_SPACE}.Postulacion`);

    // Generating the reference
    const egRef = factory.newRelationship(
      `${NAME_SPACE}`,
      "GrupoElectoral",
      electoralGroup
    );

    // Looping for adding ref to fce
    Object.keys(fce).forEach(key => {
      if (key !== "$class") {
        fce[key].electoralGroup = egRef;
      }
    });

    // Looping over coordinations to add ref
    [sports, services, culture, academic, responsibility].forEach(cor => {
      cor.coordinators.forEach(c => {
        c.electoralGroup = egRef;
      });
    });

    // Looping over the student centers to add ref
    studentsCenters.forEach((sc, i) => {
      Object.keys(sc).forEach(key => {
        if (key !== "$class") {
          studentsCenters[i][key].electoralGroup = egRef;
        }
      });
    });

    const postulation = factory.newResource(NAME_SPACE, "Postulacion", uuid);

    postulation.fce = fce;
    postulation.sports = sports;
    postulation.services = services;
    postulation.culture = culture;
    postulation.academic = academic;
    postulation.responsibility = responsibility;
    postulation.academicCouncil = academicCouncil;
    postulation.schoolsCouncil = schoolsCouncil;
    postulation.facultyCouncil = facultyCouncil;
    postulation.studentsCenters = studentsCenters;
    postulation.electoralGroup = egRef;

    await registry.add(postulation);
  } catch (err) {
    throw new Error(err);
  }
}

/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.buildElectoralRepresentative} tx The sample transaction instance.
 * @transaction
 */
async function buildElectoralRepresentative(tx) {
  const { uuid, name, email, dni } = tx;
  const registry = await getParticipantRegistry(
    `${NAME_SPACE}.RepresentanteElectoral`
  );
  const factory = getFactory();
  const electoralRepresentative = factory.newResource(
    NAME_SPACE,
    "RepresentanteElectoral",
    uuid
  );
  electoralRepresentative.name = name;
  electoralRepresentative.email = email;
  electoralRepresentative.dni = dni;
  await registry.add(electoralRepresentative);
}

/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.buildVoter} tx The sample transaction instance.
 * @transaction
 */
async function buildVoter(tx) {
  try {
    const { uuid, name, email } = tx;
    const factory = getFactory();
    const voter = factory.newResource(`${NAME_SPACE}`, "Votante", uuid);
    voter.name = name;
    voter.email = email;
    voter.canVote = true;
    voter.electionsYears = [];
    const registry = await getParticipantRegistry(`${NAME_SPACE}.Votante`);
    await registry.add(voter);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sample transaction
 * @param {ve.edu.unimet.ceu.buildPresident} tx The sample transaction instances
 * @transaction
 */
async function buildPresident(tx) {
  const { uuid, name, email } = tx;
  const factory = getFactory();
  const registry = await getParticipantRegistry(
    `${NAME_SPACE}.PresidenteElectoral`
  );
  const president = factory.newResource(
    NAME_SPACE,
    "PresidenteElectoral",
    uuid
  );
  president.name = name;
  president.email = email;
  president.startDate = new Date(Date.now());
  await registry.add(president);
}

// <-- Updater -->
/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.updatePresident} tx The sample transaction instance.
 * @transaction
 */
async function updatePresident(tx) {
  try {
    const { uuid, name, email, startDate } = tx;
    const registry = await getParticipantRegistry(
      `${NAME_SPACE}.PresidenteElectoral`
    );
    const president = await registry.get(uuid);
    president.name = name;
    president.email = email;
    president.startDate = startDate;
    await registry.update(president);
  } catch (err) {
    console.log(err);
  }
}

/**
 * Sample transaction processor function.
 * @param {ve.edu.unimet.ceu.updateVoter} tx The sample transaction instance.
 * @transaction
 */
async function updateVoter(tx) {
  try {
    const { uuid, electionsYear, canVote } = tx;
    const registry = await getParticipantRegistry(`${NAME_SPACE}.Votante`);
    const voter = await registry.get(uuid);
    voter.electionsYears.push(electionsYear);
    voter.canVote = canVote;
    await registry.update(voter);
  } catch (err) {}
}
