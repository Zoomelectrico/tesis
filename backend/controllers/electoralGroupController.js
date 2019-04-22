const mongoose = require("mongoose");

const ElectoralGroup = mongoose.model("ElectoralGroup");
const User = mongoose.model("User");

exports.createElectoralGroup = async (req, res) => {
  try {
    const { denomination, number, colorName, colorHex, logo } = req.body;
    const user = await User.findById(req.params.id);
    user.privilege = 2;

    if (user.electoralGroups.length > 0) {
      const year = new Date().getFullYear();
      for (let i = 0; i < user.electoralGroups.length; i++) {
        if (user.electoralGroups[i].electionYear === year) {
          return res.json({
            success: true,
            msg: "Ya ha registrado un grupo electoral"
          });
        }
      }
    }
    const electoralGroup = await ElectoralGroup.create({
      denomination,
      number,
      colorHex,
      logo,
      color: colorName,
      representative: user._id
    });
    if (electoralGroup) {
      user.electoralGroups.push(electoralGroup._id);
      await user.save();
      res.json({ success: true, electoralGroup });
    } else {
      res.json({ success: false, msg: "Problemas al registrar" });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

exports.getElectoralGroupByCreatorId = async (req, res) => {
  try {
    const { id } = req.params;
    const electoralGroup = await ElectoralGroup.findOne({ representative: id });
    if (electoralGroup) {
      res.json({ success: true, electoralGroup });
    } else {
      res.json({ success: true, electoralGroup: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};
