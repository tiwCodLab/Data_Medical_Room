import Genaral from "../model/GeneralDB.js";

// สร้าง Genaral
const createGenaral = async (req, res) => {
  try {
    const genaral = new Genaral(req.body);
    await genaral.save();
    res.status(201).json(genaral);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// อ่าน Genaral ทั้งหมด
const getAllGenarals = async (req, res) => {
  try {
    const genarals = await Genaral.find();
    res.json(genarals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// อ่าน Genaral ตาม ID
const getGenaralById = async (req, res) => {
  const { genaral_id } = req.params;
  try {
    const genaral = await Genaral.findById(genaral_id)
      .populate("patient")
      .exec();
    if (!genaral) {
      return res.status(404).json({ message: "Genaral not found" });
    }
    res.json(genaral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// อัปเดต Genaral
const updateGenaral = async (req, res) => {
  const { genaral_id } = req.params;
  try {
    const genaral = await Genaral.findByIdAndUpdate(genaral_id, req.body, {
      new: true,
    });
    if (!genaral) {
      return res.status(404).json({ message: "Genaral not found" });
    }
    res.json(genaral);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ลบ Genaral
const deleteGenaral = async (req, res) => {
  const { genaral_id } = req.params;
  try {
    const genaral = await Genaral.findByIdAndDelete(genaral_id);
    if (!genaral) {
      return res.status(404).json({ message: "Genaral not found" });
    }
    res.json({ message: "Genaral deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getGeneralByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const medicalRecords = await Genaral.find({
      patient: patientId,
    })
      .populate("patient")
      .exec();
    res.json(medicalRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createGenaral,
  getAllGenarals,
  getGenaralById,
  updateGenaral,
  deleteGenaral,
};
