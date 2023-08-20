const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

router.use(bodyParser.json({ limit: 5000000 }));
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const type = req.query.type;
  if (type === "inputContent") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "insert";
      req.body.mapper_id = "inputContent";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type === "contentsList") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "select";
      req.body.mapper_id = "contentsList";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  } else if (type === "totalAmount") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "select";
      req.body.mapper_id = "totalAmount";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기머니: " + error);
    }
  } else if (type === "deleteContent") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "delete";
      req.body.mapper_id = "deleteContent";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  } else if (type === "editContent") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "update";
      req.body.mapper_id = "editContent";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기머니: " + error);
    }
  } else if (type === "deleteAll") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "delete";
      req.body.mapper_id = "deleteAll";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  } else if (type === "userCountryList") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "select";
      req.body.mapper_id = "userCountryList";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  } else if (type === "contentDetail") {
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "ContentsMapper";
      req.body.crud = "select";
      req.body.mapper_id = "contentDetail";
      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error 피기리스트: " + error);
    }
  }
});

module.exports = router;
