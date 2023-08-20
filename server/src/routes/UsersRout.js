const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let jwt = require("jsonwebtoken");
let secretObj = require("../ignorefile/jwt");

const bcrypt = require("bcrypt");
const saltRounds = 10;

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", (req, res, next) => {
  const type = req.query.type;
  if (type == "signin") {
    //로그인 조회
    try {
      var dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "UserMapper";
      req.body.crud = "select";
      req.body.mapper_id = "selectLoginCheck";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type == "testSignIn") {
    //로그인 조회
    try {
      var dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "UserMapper";
      req.body.crud = "select";
      req.body.mapper_id = "testUserLoginCheck";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type === "SessionState") {
    var useremail = req.body.is_Useremail;
    var username = req.body.is_Username;
    var userflag = req.body.is_Userflag;

    try {
      let token1 = jwt.sign({ useremail }, secretObj.secret, {
        expiresIn: "12h",
      });
      let token2 = jwt.sign({ username }, secretObj.secret, {
        expiresIn: "12h",
      });
      let token3 = jwt.sign({ userflag }, secretObj.secret, {
        expiresIn: "12h",
      });

      res.send({ token1: token1, token2: token2, token3: token3 });
    } catch (error) {
      res.send("error :" + error);
    }
  } else if (type == "SessionConfirm") {
    try {
      let token1 = req.body.token1;
      let token2 = req.body.token2;
      let token3 = req.body.token3;

      if (
        (token1 != "") & (token1 != undefined) &&
        (token2 != "") & (token2 != undefined) &&
        (token3 != "") & (token3 != undefined)
      ) {
        let decoded1 = jwt.verify(token1, secretObj.secret);
        let decoded2 = jwt.verify(token2, secretObj.secret);
        let decoded3 = jwt.verify(token3, secretObj.secret);

        res.send({
          token1: decoded1.useremail,
          token2: decoded2.username,
          token3: decoded3.userflag,
        });
      } else {
        res.send({ token1: "", token2: "", token3: "" });
      }
    } catch (error) {
      res.send("error :" + error);
    }
  } else if (type === "deleteUser") {
    //회원가입 정보 삭제
    try {
      const dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "UserMapper";
      req.body.crud = "delete";
      req.body.mapper_id = "deleteUser";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type == "pwdmodify") {
    //비밀번호 재설정
    try {
      var dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "UserMapper";
      req.body.crud = "update";
      req.body.mapper_id = "updatePwdUser";

      var myPlaintextPassword = req.body.is_Password;
      if (myPlaintextPassword != "" && myPlaintextPassword != undefined) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash(myPlaintextPassword, salt, function (err, hash) {
            req.body.is_Password = hash;
            router.use("/", dbconnect_Module);
            next("route");
          });
        });
      } else {
        router.use("/", dbconnect_Module);
        next("route");
      }
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  } else if (type == "userNameModify") {
    try {
      var dbconnect_Module = require("./dbconnect_Module");

      req.body.mapper = "UserMapper";
      req.body.crud = "update";
      req.body.mapper_id = "updateUserName";

      router.use("/", dbconnect_Module);
      next("route");
    } catch (error) {
      console.log("Module > dbconnect error : " + error);
    }
  }
});

module.exports = router;
