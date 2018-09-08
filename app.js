const express = require("express");
const app = express();
const path = require("path");
const routes = require("./routes");

const port = process.env.PORT || 3000;

app.set("view engine", "pug");

app.use("/static", express.static(path.join(__dirname, "public")));

app.use(routes);

app.use((err, req, res, next) => {
  res.status(500);
  console.error(err);
  res.render('error', {status: 500, message: err.message, stack: err.stack})
});

app.use((req, res, next) => {
  console.error(`Request to url: ${req.url}, url not found`);
  res.status(404);
  res.render('error', {status: 404, message: "Could not find the page you were looking for"});

});

app.listen(port, () => console.log(`App is listening on port: ${port}`));
