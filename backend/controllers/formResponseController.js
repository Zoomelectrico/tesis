const mongoose = require('mongoose');

const FormResponse = mongoose.model('FormResponse');

exports.create = async (req, res) => {
  try {
    const { name, email, major, message } = req.body;
    const user = { name, email, major };
    const fr = await FormResponse.create({ user, message });
    res.json({ success: true, formResponse: fr });
  } catch (err) {
    res.json({ success: false, err: err.message });
  }
};
