import Diagnosis from "../model/DiagnosisDB.js";

export const createDiagnosis = async (req, res) => {
  const { diagnosis_id, diagnosis_name } = req.body;

  if (!diagnosis_id || !diagnosis_name) {
    return res.status(400).json({
      message: "diagnosis_id and diagnosis_name are required",
    });
  }

  try {
    const newDiagnosis = await Diagnosis.create({
      diagnosis_id,
      diagnosis_name,
    });
    return res.status(201).json(newDiagnosis);
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
    const diagnosis = await Diagnosis.findOne({ diagnosis_id });

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
    const updatedDiagnosis = await Diagnosis.findOneAndUpdate(
      { diagnosis_id },
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
    const deletedDiagnosis = await Diagnosis.findOneAndDelete({ diagnosis_id });

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
