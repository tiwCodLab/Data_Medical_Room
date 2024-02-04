import Medicalsupplies from "../model/MedicalSuppliesDB.js";

// Get all medical supplies
export const listMedicalsupplies = async (req, res) => {
  try {
    const result = await Medicalsupplies.find();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Create a new medical supply
export const createMedicalsupply = async (req, res) => {
  const {
    medical_supplies_id,
    medical_supplies_name,
    unit,
    price,
    quantity,
    properties,
  } = req.body;

  try {
    const duplicate = await Medicalsupplies.findOne({
      medical_supplies_id: medical_supplies_id,
    });
    if (duplicate) {
      return res.sendStatus(409);
    } else {
      const newMedicalsupply = await Medicalsupplies.create({ ...req.body });
      return res.status(201).json(newMedicalsupply);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get a specific medical supply by ID
export const getMedicalsupply = async (req, res) => {
  const { medical_supplies_id } = req.params;

  try {
    // Find the medical supply in the database by ID
    const medicalsupply = await Medicalsupplies.findById(medical_supplies_id);

    // Check if the medical supply was found
    if (!medicalsupply) {
      return res.status(404).json({
        message: "Medical supply not found",
      });
    }

    // Return the medical supply as a JSON response
    return res.status(200).json(medicalsupply);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Update a medical supply by ID
export const updateMedicalsupply = async (req, res) => {
  const { medical_supplies_id } = req.params;
  const updateData = req.body;

  try {
    // Find and update the medical supply in the database by ID
    const updatedMedicalsupply = await Medicalsupplies.findByIdAndUpdate(
      medical_supplies_id,
      updateData,
      { new: true }
    );

    // Check if the medical supply was found and updated
    if (!updatedMedicalsupply) {
      return res.status(404).json({
        message: "Medical supply not found",
      });
    }

    // Return the updated medical supply as a JSON response
    return res.status(200).json(updatedMedicalsupply);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a medical supply by ID
export const deleteMedicalsupply = async (req, res) => {
  const { medical_supplies_id } = req.params;

  try {
    // Find and delete the medical supply in the database by ID
    const deletedMedicalsupply = await Medicalsupplies.findByIdAndDelete(
      medical_supplies_id
    );

    // Check if the medical supply was found and deleted
    if (!deletedMedicalsupply) {
      return res.status(404).json({
        message: "Medical supply not found",
      });
    }

    // Return a success message as a JSON response
    return res
      .status(200)
      .json({ message: "Medical supply deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
