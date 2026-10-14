const express = require("express");
const router = express.Router();

let members = [
  { id: 1, name: "Dev Sharma", email: "dev@example.com" },
  { id: 2, name: "Riya Shukla", email: "riya@example.com" }
];

router.get("/", (req, res) => {
  res.json(members);
});

router.get("/:id", (req, res, next) => {
  const member = members.find((item) => item.id === Number(req.params.id));

  if (!member) {
    const error = new Error("Member not found");
    error.status = 404;
    return next(error);
  }

  res.json(member);
});

router.post("/", (req, res) => {
  const member = {
    id: members.length ? members[members.length - 1].id + 1 : 1,
    ...req.body
  };

  members.push(member);
  res.status(201).json(member);
});

router.put("/:id", (req, res, next) => {
  const index = members.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    const error = new Error("Member not found");
    error.status = 404;
    return next(error);
  }

  members[index] = { ...members[index], ...req.body, id: members[index].id };
  res.json(members[index]);
});

router.delete("/:id", (req, res, next) => {
  const index = members.findIndex((item) => item.id === Number(req.params.id));

  if (index === -1) {
    const error = new Error("Member not found");
    error.status = 404;
    return next(error);
  }

  const deletedMember = members.splice(index, 1)[0];
  res.json(deletedMember);
});

module.exports = router;