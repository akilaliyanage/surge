const express = require("express");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} = require("./messages.service");
const { checkJwt } = require("../middleware/check-jwt.middleware");
const {
  checkPermissions,
} = require("../middleware/check-permissions.middleware");
const { AdminMessagesPermissions } = require("./messages-permissions");
const messagesRouter = express.Router();
const Todo = require("../model/todo")



messagesRouter.post("/create", checkJwt, async(req, res) => {


  const data = new Todo({
    name: req.body.name,
    description: req.body.description,
    createdUser: req.body.createdBy,
    createdDate: req.body.date,
    file: "",
    status: req.body.status
  })

  try {
    
    const isdatasaved = await data.save()

    console.log(isdatasaved);
    res.status(200).send(isdatasaved)
  } catch (error) {
    res.status(500).send(error) 
  }
});


module.exports = { messagesRouter };
