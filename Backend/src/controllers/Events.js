import Event from "../models/Event.model.js";

export const AddEvents = async (req, res) => {
  const {
    name,
    tag,
    description,
    coordinatorName,
    coordinatorPhone,
    mode,
    venue,
    dateTime,
  } = req.body;

  try {
    // Optional: Check if an event with the same name + date already exists
    const existingEvent = await Event.findOne({ name, dateTime });
    if (existingEvent) {
      return res.status(400).json({ message: "Event already exists" });
    }

    const newEvent = new Event({
      name,
      tag,
      description,
      coordinatorName,
      coordinatorPhone,
      mode,
      venue,
      dateTime,
    });

    await newEvent.save();
    res.status(201).json({ message: "Event added successfully!" });
  } catch (error) {
    console.error("AddEvents Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetEvents = async (req, res) => {
  try {
    const Events = await Event.find();
    res.status(200).json({
      message: "Events fetched successfully!",
      Events,
    });
  } catch (err) {
    console.error("GetEvents Error:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

