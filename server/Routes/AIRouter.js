const express = require("express");
const Checker = require("../controlers/AImodel.js");
const Login = require("../controlers/Login.js");
const {authenticateToken , refreshToken} = require("../jwtUtils/authToken.js")
const GetUser = require("../controlers/GetUser.js")
const SpeechCorrection = require("../controlers/SpexhChecker.js")
const register = require("../controlers/Register.js")
const SaveController = require("../controlers/Saving.js")
const AllHistorique = require("../controlers/AllHistorique.js");
const deleteCorrection = require("../controlers/Delete.js")
const OptimizeText = require("../controlers/OptimizationText.js");
const Feedback = require("../controlers/Feedback.js");
const { Writting } = require('../controlers/Writting.js')
const Contact = require("../controlers/Contact.js")
const  downloadCorrection = require("../controlers/Telacharge.js")
const {FetchCount , EditInfo} = require("../controlers/SettingsUser.js");
const router = express.Router();


router.post("/correct" , Checker);
router.post("/SpechCorrection" , SpeechCorrection)
router.post("/Login" , Login);
router.post("/register" , register);
router.post("/profile",authenticateToken, GetUser);
router.post("/save" , SaveController)
router.post("/Historique" , AllHistorique)
router.post("/refresh" , refreshToken);
router.post('/telecharger-correction', downloadCorrection);
router.get("/CoutSaving/:user_id" , FetchCount);
router.delete("/delete/:SavedId" , deleteCorrection)
router.put("/Edit/:user_id" , EditInfo);
router.post("/AddFedback" , authenticateToken , Feedback);
router.post("/AddConatct" , Contact)
router.post('/writing', Writting);  
router.post('/OptimizeText', OptimizeText);

module.exports = router;

