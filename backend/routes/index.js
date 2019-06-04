const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const userController = require('../controllers/userController');
const electoralGroupController = require('../controllers/electoralGroupController');
const demandController = require('../controllers/demandController');
const postulationController = require('../controllers/postulationController');
const voteController = require('../controllers/voteController');
const formResponseController = require('../controllers/formResponseController');

router.post('/login', passport.authenticate('signin'), authController.login);

router.get(
  '/profile/:id',
  passport.authenticate('jwt', { session: false }),
  userController.getProfile
);

router.post('/home-form', formResponseController.create);

router.post(
  '/register-user',
  userController.validateUser,
  userController.createUser,
  passport.authenticate('signin'),
  authController.login
);

router.post(
  '/user-update/:id',
  passport.authenticate('jwt', { session: false }),
  userController.updateUser
);

router.post(
  '/create-electoral-group/:id',
  passport.authenticate('jwt', { session: false }),
  electoralGroupController.createElectoralGroup
);

router.get(
  '/electoral-group/:id',
  passport.authenticate('jwt', { session: false }),
  electoralGroupController.getElectoralGroupByCreatorId
);

router.get(
  '/electoral-groups',
  passport.authenticate('jwt', { session: false }),
  electoralGroupController.getElectoralGroups
);

router.post(
  '/demand-create',
  passport.authenticate('jwt', { session: false }),
  demandController.creteDemand
);

router.get(
  '/demands',
  passport.authenticate('jwt', { session: true }),
  demandController.getAll
);

router.get(
  '/demand/:id',
  passport.authenticate('jwt', { session: false }),
  demandController.getDemand
);

router.get(
  '/demand-complete/:id',
  passport.authenticate('jwt', { session: false }),
  demandController.markComplete
);

router.post(
  '/demand-accept-eg/',
  passport.authenticate('jwt', { session: false }),
  demandController.includeElectoralGroup
);

router.post(
  '/demand-accept-rep/',
  passport.authenticate('jwt', { session: false }),
  demandController.makeRepresentative
);

router.post(
  '/demand-accept-pos/',
  passport.authenticate('jwt', { session: false }),
  demandController.includePostulation
);

router.post(
  '/postulation-create',
  passport.authenticate('jwt', { session: false }),
  postulationController.createPostulation
);

router.get(
  '/postulation/:id',
  passport.authenticate('jwt', { session: false }),
  postulationController.getPostulation
);

router.get(
  '/postulations',
  passport.authenticate('jwt', { session: false }),
  postulationController.getPostulations
);

router.get(
  '/voter-can-vote/:id',
  passport.authenticate('jwt', { session: false }),
  voteController.canVote
);

router.get(
  '/vote-postulation/:id/:major/:faculty',
  passport.authenticate('jwt', { session: false }),
  voteController.canVoteMw,
  voteController.getPostulation
);

router.post(
  '/vote/:id',
  passport.authenticate('jwt', { session: false }),
  voteController.canVoteMw,
  voteController.vote
);

router.post(
  '/save-results/:year',
  // passport.authenticate("jwt", { session: false }),
  voteController.saveResults
);

router.get(
  '/preliminary-results',
  // passport.authenticate("jwt", { session: false }),
  voteController.computeResults
);

router.get(
  '/results',
  // passport.authenticate("jwt", { session: false }),
  voteController.getResults
);

module.exports = router;
