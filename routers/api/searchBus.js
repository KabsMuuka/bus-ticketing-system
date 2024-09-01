const express = require("express");
const auth = require("../../middleware/auth");
const Buses = require("../../models/Buses");
const { Op, literal } = require("sequelize");

const router = express.Router();

router.get("/", (req, res) => res.send("bus part "));

router.get("/:start/:end", async (req, res) => {
  const stops_ = [req.params.start, req.params.end];

  try {
    const buses = await Buses.findAll({
      where: literal(
        `JSON_CONTAINS(stops, '["${stops_[0]}"]') AND JSON_CONTAINS(stops, '["${stops_[1]}"]')`
      ),
    });

    //used Op.like is meant for string matching and won't work directly with JSON data.
    //   where: {
    //     stops: {
    //       [Op.like]: `%${stops_[0]}%`,
    //     },
    //   },

    if (buses.length === 0) {
      res.send([]);
    } else {
      const finalBus = []; //store here
      for (const bus of buses) {
        let counter = 0;
        const tempStops = [];

        const stops = bus.stops;

        for (const stop of stops) {
          if (stop === stops_[counter]) {
            tempStops.push(stop);
            counter++;
          }
        }
        if (JSON.stringify(tempStops) === JSON.stringify(stops_)) {
          finalBus.push(bus);
        }
      }
      res.send(finalBus);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
