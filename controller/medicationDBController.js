import Medication from "../model/MedicationsDB.js";

export const reduceMedicationStock = async (req, res) => {
  try {
    // Extract necessary data from request body
    const items = req.body.items; // รับรายการยาทั้งหมดจาก req.body
    const messages = [];

    // Iterate through each item
    for (const item of items) {
      const { medication_id, quantity } = item;

      // Check if medication exists
      const medication = await Medication.findById(medication_id);
      if (!medication) {
        messages.push(`Medication with ID ${medication_id} not found`);
        continue; // ไปตรวจสอบรายการยาถัดไป
      }

      // Check if sufficient stock is available
      if (medication.stock < quantity) {
        messages.push(
          `Insufficient stock for medication with ID ${medication_id}`
        );
        continue; // ไปตรวจสอบรายการยาถัดไป
      }

      // Reduce medication stock
      medication.stock -= quantity;

      // Save updated medication data
      await medication.save();

      messages.push(
        `Stock reduced successfully for medication with ID ${medication_id}`
      );
    }

    // Return messages for each medication
    return res.status(200).json({ messages });
  } catch (error) {
    console.error("Error reducing medication stock:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

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
  const { medication_id, medication_name, unit, price, stock, properties } =
    req.body;

  try {
    const duplicate = await Medication.findOne({
      medication_id: medication_id,
    });
    if (duplicate) {
      return res.sendStatus(409);
    } else {
      const newMedication = await Medication.create({
        medication_id,
        medication_name,
        unit,
        price,
        stock,
        properties,
      });

      return res.status(201).json(newMedication);
    }
  } catch (error) {
    console.error("Error creating medication:", error);

    if (error.name === "ValidationError") {
      // Handle validation errors
      return res.status(400).json({
        message: "Validation Error",
        error: error.message,
      });
    }

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
