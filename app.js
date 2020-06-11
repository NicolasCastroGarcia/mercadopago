var express = require("express");
var exphbs = require("express-handlebars");

var app = express();

const PaymentController = require("./controllers/PaymentController");
const PaymentService = require("./services/PaymentService");
const PaymentInstance = new PaymentController(new PaymentService());

app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/detail", (req, res) => {
  res.render("detail", req.query);
});

app.get("/success", (req, res) => {
  res.render("success", req.query);
});

app.get("/error", (req, res) => {
  res.render("error");
});

app.get("/pending", (req, res) => {
  res.render("pending");
});

app.post("/payment/new", (req, res) =>
  PaymentInstance.getMercadoPagoLink(req, res)
);

app.post("/webhook", (req, res) => PaymentInstance.webhook(req, res));

app.use(express.static("assets"));

app.use("/assets", express.static(__dirname + "/assets"));

app.listen(process.env.PORT || 3000);
