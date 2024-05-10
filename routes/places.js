var express = require("express");
var router = express.Router();
const Place = require("../models/places");

router.post("/", (req, res) => {
  const newPlace = new Place({
    nickname: req.body.nickname,
    name: req.body.name,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  });

  newPlace.save().then((newPlace) => {
    res.json({ result: true });
  });
});

router.get("/:nickname", (req, res) => {
  Place.find({ nickname: req.params.nickname }).then((data) =>
    res.json({ result: true, places: [data] })
  );
});

router.delete("/deletePlace", (req, res) => {
  Place.deleteOne({ nickname: req.body.nickname, name: req.body.name }).then(
    () => {
      Place.find().then((data) => {
        res.json({ result: true });
      });
    }
  );
});

module.exports = router;
