import Diagnosis from "../model/DiagnosisDB.js";

export const createDiagnosis = async (req, res) => {
  const { diagnosis_id, diagnosis_name } = req.body;

  if (!diagnosis_name) {
    return res.status(400).json({
      message: "diagnosis_id and diagnosis_name are required",
    });
  }

  try {

    const duplicate = await Diagnosis.findOne({
      diagnosis_id: diagnosis_id,
    });
    if (duplicate) {
      return res.sendStatus(409);
    } else {
       const newDiagnosis = await Diagnosis.create({
         diagnosis_id,
         diagnosis_name,
       });
       return res.status(201).json(newDiagnosis);
    }
   
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const listDiagnosis = async (req, res) => {
  try {
    const diagnoses = await Diagnosis.find();
    return res.json(diagnoses);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getDiagnosis = async (req, res) => {
  const { diagnosis_id } = req.params;

  try {
    const diagnosis = await Diagnosis.findById(diagnosis_id);

    if (!diagnosis) {
      return res.status(404).json({
        message: "Diagnosis not found",
      });
    }

    return res.json(diagnosis);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateDiagnosis = async (req, res) => {
  const { diagnosis_id } = req.params;
  const updateData = req.body;

  try {
    const updatedDiagnosis = await Diagnosis.findByIdAndUpdate(
      diagnosis_id,
      updateData,
      { new: true }
    );

    if (!updatedDiagnosis) {
      return res.status(404).json({
        message: "Diagnosis not found",
      });
    }

    return res.json(updatedDiagnosis);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteDiagnosis = async (req, res) => {
  const { diagnosis_id } = req.params;

  try {
    const deletedDiagnosis = await Diagnosis.findByIdAndDelete(diagnosis_id);

    if (!deletedDiagnosis) {
      return res.status(404).json({
        message: "Diagnosis not found",
      });
    }

    return res.json({ message: "Diagnosis deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
