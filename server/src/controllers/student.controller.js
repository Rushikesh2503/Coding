const express = require("express");
const router = express.Router();

const Student = require("../models/student.model");

router.get("/", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const offset = (page - 1) * limit;

    let totalstud = await Student.find().lean().exec();

    const students = await Student.find()
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
    res.status(200).json({ students, len: totalstud.length });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

router.get("/male", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const offset = (page - 1) * limit;

    let totalstud = await Student.find().lean().exec();

    const students = await Student.find({ gender: "male" })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
    res.status(200).json({ students, len: totalstud.length });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});
router.get("/female", async (req, res) => {
  try {
    const page = +req.query.page || 1;
    const limit = +req.query.limit || 10;

    const offset = (page - 1) * limit;

    let totalstud = await Student.find().lean().exec();

    const students = await Student.find({ gender: "female" })
      .skip(offset)
      .limit(limit)
      .lean()
      .exec();
    res.status(200).json({ students, len: totalstud.length });
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
});

router.post("/", async function (req, res) {
  const student = await Student.create(req.body);

  return res.status(201).json({ student });
});

router.get("/:id", async function (req, res) {
  const users = await Student.findById(req.params.id).lean().exec();

  return res.status(200).json({ users });
});

router.patch("/:id", async function (req, res) {
  const user = await Student.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json({ user });
});

router.delete("/:id", async function (req, res) {
  const user = await Student.findByIdAndDelete(req.params.id);
  return res.status(203).json({ user });
});

module.exports = router;
