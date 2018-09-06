const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

function find(id) {
  for(let i = 0; i < projects.length; i++) {
    if(id == projects[i].id)
      return projects[i];
  }
}

router.param("id", (req, res, next) => {
  res.locals.project = find(req.params.id);
  next();
})

router.get("/", (req, res) => {
  res.render("index", { projects });
});

router.get("/about", (req, res) => {
  res.render("about");
});

router.get("/project/:id", (req, res) => {
  if(!res.locals.project)
    return res.redirect("/");
  res.render("project");
});

module.exports = router;
