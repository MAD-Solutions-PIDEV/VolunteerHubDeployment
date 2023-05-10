const controller = require("../controllers/event.controller");

module.exports = function (app) {
  app.post("/event", controller.upload.single("image"), controller.create);
  app.get("/events", controller.findall);
  app.get("/event/:id", controller.findById);
  app.put("/event", controller.update);
  app.delete("/event", controller.delete);
  app.put("/follow", controller.follow);
  app.get("/checkFollow/:userId/:eventId", controller.check);
  app.put("/unfollow", controller.unfollow);
  app.put("/approveEvent", controller.approval);
  app.put("/cancelEvent", controller.approval);
  app.get("/org/:userId", controller.org);
  app.post("/event/sdg", controller.sdg);
  app.post("/comment", controller.createComment);
  app.get("/comment/:eventId", controller.findComments);
  // app.get("/gallery", controller.findallPosts);
  app.post("/create-post", controller.createPost);
  // app.post("/genrate-img", controller.genImg);
  app.get("/getWinner", controller.getWinner);
  app.get("/checkGame", controller.checkGame);
  app.post("/postNFT", controller.postNFT);
  app.get("/shuffle", controller.shuffle);
  app.get("/getNFT/:userId", controller.getNFT);
};
