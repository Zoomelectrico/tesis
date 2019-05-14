const mongoose = require('mongoose');

const ElectoralGroup = mongoose.model('ElectoralGroup');
const Demand = mongoose.model('Demand');
const User = mongoose.model('User');

exports.createElectoralGroup = async (req, res) => {
  try {
    const { denomination, number, colorName, colorHex, logo } = req.body;
    const user = await User.findById(req.params.id);
    user.privilege = 2;

    if (user.electoralGroups.length > 0) {
      const year = new Date().getFullYear();
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < user.electoralGroups.length; i++) {
        if (user.electoralGroups[i].electionYear === year) {
          return res.json({
            success: true,
            msg: 'Ya ha registrado un grupo electoral',
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
      representative: user._id,
    });

    if (electoralGroup) {
      user.electoralGroups.push(electoralGroup._id);
      await Promise.all([
        Demand.create({
          user: user._id,
          type: 'GRUPO',
          electoralGroup: electoralGroup._id,
        }),
        user.save(),
      ]);
      res.json({ success: true, electoralGroup });
    } else {
      res.json({ success: false, msg: 'Problemas al registrar' });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.getElectoralGroupByCreatorId = async (req, res) => {
  try {
    const { id } = req.params;
    const electoralGroup = await ElectoralGroup.findOne({
      representative: id,
      electionYear: new Date().getFullYear(),
    }).populate('postulation');
    if (electoralGroup) {
      res.json({ success: true, electoralGroup });
    } else {
      res.json({ success: true, electoralGroup: false });
    }
  } catch (err) {
    console.log(err);
    res.json({ success: false, err: new Error(err.message) });
  }
};

exports.getElectoralGroups = async (req, res) => {
  try {
    let electoralGroups = await ElectoralGroup.find({
      electionYear: new Date().getFullYear(),
      accepted: 1,
    }).populate('representative');
    electoralGroups = electoralGroups.map(({ denomination, number, color }) => [
      denomination,
      number,
      color,
    ]);
    res.json({ success: true, electoralGroups });
  } catch (err) {
    res.json({
      err: new Error('Ocurrio un Error en la Base de Datos'),
      success: false,
    });
  }
};
