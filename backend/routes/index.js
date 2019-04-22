const router = require("express").Router();
const passport = require("passport");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");
const electoralGroupController = require("../controllers/electoralGroupController");

router.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userController.getProfile
);

router.post(
  "/register-user",
  userController.validateUser,
  userController.createUser,
  passport.authenticate("signin"),
  authController.login
);

router.post("/login", passport.authenticate("signin"), authController.login);

router.post(
  "/create-electoral-group/:id",
  passport.authenticate("jwt", { session: false }),
  electoralGroupController.createElectoralGroup
);

router.get(
  "/electoral-group/:id",
  passport.authenticate("jwt", { session: false }),
  electoralGroupController.getElectoralGroupByCreatorId
);

module.exports = router;
