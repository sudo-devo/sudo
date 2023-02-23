const express = require("express");
const flightRouter = express.Router();
const { FlightModel } = require("../model/flight.model");
require("dotenv").config();

flightRouter.get("/flights", async (req, res) => {
  const query = req.query;
  const flights = await FlightModel.find(query);
  res.send(flights);
});

flightRouter.get("/flights/:id", async (req, res) => {
  const query = req.query;
  const id = req.params.id;
  const flights = await FlightModel.find({ _id: id });
  res.send(flights);
});

flightRouter.post("/flights", async (req, res) => {
  const payload = req.body;
  try {
    const new_flight = new FlightModel(payload);
    await new_flight.save();
    res.send("New flight created");
  } catch (err) {
    console.log(err);
    res.send("Unable to create flight");
  }
});

flightRouter.patch("/flights/:id", async (req, res) => {
  const payload = req.body;
  const id = req.params.id;
  try {
    await FlightModel.findByIdAndUpdate({ _id: id }, payload);
    res.send("Flight updated");
  } catch (err) {
    res.send("Unable to update the flight");
  }
});

flightRouter.delete("/flights/:id", async (req, res) => {
  const id = req.params.id;

  try {
    await FlightModel.findByIdAndDelete({ _id: id });
    res.send("Delete the  flight");
  } catch (err) {
    res.send("Unable to delete the flight");
  }
});

module.exports = {
  flightRouter,
};
