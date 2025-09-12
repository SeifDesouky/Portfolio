const Service = require("../Models/serviceModel");

exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.createService = async (req, res) => {
  try {
    const service = new Service(req.body);
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.updateService = async (req, res) => {
  try {
    const updated = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Service not found" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.softDeleteService = async (req, res) => {
  try {
    const deleted = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service soft deleted", deleted });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.restoreService = async (req, res) => {
  try {
    const restored = await Service.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    );
    if (!restored) return res.status(404).json({ error: "Service not found" });
    res.json({ message: "Service restored", restored });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
