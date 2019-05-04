const mongoose = require("mongoose");
const Demand = mongoose.model("Demand");
const User = mongoose.model("User");
const ElectoralGroup = mongoose.model("ElectoralGroup");
const Postulation = mongoose.model("Postulation");

exports.creteDemand = async (req, res) => {
  try {
    const { text, type, user } = req.body;
    const demand = await Demand.create({ text, type, user });
    res.json({ success: true, demand });
  } catch (err) {
    res.json({ success: false, err });
    console.log(err);
  }
};

exports.getAll = async (req, res) => {
  try {
    const [representative, group, postulation, complain] = await Promise.all([
      Demand.find({ completed: 0, type: "REPRESENTANTE" })
        .populate("user")
        .populate("representative"),
      Demand.find({ completed: 0, type: "GRUPO" })
        .populate("user")
        .populate("electoralGroup"),
      Demand.find({ completed: 0, type: "POSTULACION" })
        .populate("user")
        .populate("postulation")
        .populate({
          path: "postulation",
          populate: {
            path: "electoralGroup"
          }
        }),
      Demand.find({ completed: 0, type: "QUEJA" }).populate("user")
    ]);
    const demands = {
      representative,
      group,
      postulation,
      complain
    };
    res.json({ success: true, demands });
  } catch (err) {
    console.log(err);
    res.json({ success: false, err });
  }
};

exports.getDemand = async (req, res) => {
  try {
    const demand = await Demand.findById(req.params.id);
    if (demand) {
      res.json({ success: true, demand });
    } else {
      res.json({
        success: false,
        err: new Error("No se ha encontrado una Solicitud con ese codigo")
      });
    }
  } catch (err) {
    res.json({ err, success: false });
  }
};

exports.markComplete = async (req, res) => {
  try {
    const demand = await Demand.findById(req.params.id);
    if (demand) {
      demand.completed = 1;
      await demand.save();
      res.json({ success: true, demand });
    } else {
      res.json({
        success: false,
        err: new Error("No se ha encontrado una Solicitud con ese codigo")
      });
    }
  } catch (err) {
    res.json({ err, success: false });
  }
};

exports.makeRepresentative = async (req, res) => {
  try {
    const { userId, id } = req.body;
    const [user, demand] = await Promise.all([
      User.findById(userId),
      Demand.findById(id)
    ]);
    if (user && demand) {
      user.privilege = 2; // representante;
      demand.completed = 1;
      await Promise.all([user.save(), demand.save()]);
      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o el Usuario")
    });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.includeElectoralGroup = async (req, res) => {
  try {
    const { egId, id } = req.body;
    const [electoralGroup, demand] = await Promise.all([
      ElectoralGroup.findById(egId),
      Demand.findById(id)
    ]);
    if (electoralGroup && demand) {
      electoralGroup.accepted = 1;
      demand.completed = 1;
      await Promise.all([electoralGroup.save(), demand.save()]);
      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o el Grupo Electoral")
    });
  } catch (err) {
    res.json({ success: false, err });
  }
};

exports.includePostulation = async (req, res) => {
  try {
    const { pId, id } = req.body;
    const [postulation, demand] = await Promise.all([
      Postulation.findById(pId),
      Demand.findById(id)
    ]);
    if (postulation && demand) {
      postulation.passed = 1;
      demand.completed = 1;
      await Promise.all([postulation.save(), demand.save()]);
      return res.json({ success: true, demand });
    }
    res.json({
      success: false,
      err: new Error("No se ha encontrado la Solicitud o la Postulacion")
    });
  } catch (err) {
    res.json({ success: false, err });
  }
};
