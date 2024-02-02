import Medication from "../model/MedicationsDB.js";

export const listMedications = async (req, res) => {
  try {
    const result = await Medication.find();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createMedication = async (req, res) => {
  const { medication_id, medication_name, unit, price, quantity, properties } =
    req.body;
  try {
    const newMedication = await Medication.create({
      medication_id,
      medication_name,
      unit,
      price,
      quantity,
      properties,
    });

    return res.status(201).json(newMedication);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMedication = async (req, res) => {
  const { medication_id } = req.params;

  try {
    const medication = await Medication.findById(medication_id);

    if (!medication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    return res.status(200).json(medication);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateMedication = async (req, res) => {
  const { medication_id } = req.params;
  const updateData = req.body;

  try {
    const updatedMedication = await Medication.findByIdAndUpdate(
      medication_id,
      updateData,
      { new: true }
    );

    if (!updatedMedication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    return res.status(200).json(updatedMedication);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteMedication = async (req, res) => {
  const { medication_id } = req.params;

  try {
    const deletedMedication = await Medication.findByIdAndDelete(medication_id);

    if (!deletedMedication) {
      return res.status(404).json({
        message: "Medication not found",
      });
    }

    return res.status(200).json({ message: "Medication deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
