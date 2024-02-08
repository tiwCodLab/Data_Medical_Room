import MedicalRecord from "../model/MedicalRecordsDB.js";
import Medication from "../model/MedicationsDB.js";

export const createMedicalRecord = async (req, res) => {
  let { medicalRecord_id, patient, doctor, medications, ...otherFields } =
    req.body;
  const messages = [];

  try {
    const medications_dis = []; // เตรียมอาร์เรย์สำหรับเก็บข้อมูลของแต่ละรายการยา

    for (const item of medications) {
      const { medication_name, quantity } = item;

      // Check if medication exists
      const medication = await Medication.findOne({
        medication_name: medication_name,
      });

      if (!medication) {
        messages.push(`Medication with name "${medication_name}" not found`);
        continue; // ไปตรวจสอบรายการยาถัดไป
      }

      // Check if sufficient stock is available
      if (medication.stock < quantity) {
        messages.push(
          `Insufficient stock for medication with name "${medication_name}"`
        );
        continue; // ไปตรวจสอบรายการยาถัดไป
      }

      // Reduce medication stock
      medication.stock -= quantity;

      // Save updated medication data
      await medication.save();

      messages.push(
        `Stock reduced successfully for medication with name "${medication_name}"`
      );

      // เพิ่มข้อมูลของแต่ละรายการยาเข้าไปในอาร์เรย์ medications_dis
      medications_dis.push({ medical_name: medication_name, qty: quantity });
    }

    // Create Medical Record with medications_dis array
    const newMedicalRecord = await MedicalRecord.create({
      medicalRecord_id,
      patient,
      doctor,
      medications_dis, // ส่ง medications_dis ที่เก็บข้อมูลของแต่ละรายการยา
      ...otherFields,
    });

    messages.push(`Medical Record created`);

    return res.status(201).json({ messages });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


export const listMedicalRecords = async (req, res) => {
  try {
    // Extracting query parameters
    const { page = 1, pageSize = 15 } = req.query;

    // Parsing the page and pageSize to integers
    const pageNumber = parseInt(page);
    const recordsPerPage = parseInt(pageSize);
    // Calculate the skip value based on the page number and page size
    const skip = (pageNumber - 1) * recordsPerPage;

    // Query the database with pagination
    const result = await MedicalRecord.find()
      .populate("patient")
      // .populate("doctor")
      .skip(skip)
      .limit(recordsPerPage)
      .exec();

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMedicalRecord = async (req, res) => {
  const { medicalRecord_id } = req.params;

  try {
    const medicalRecord = await MedicalRecord.findById(medicalRecord_id)
      .populate("patient")
      // .populate("medicalion_dipensing")
      // .populate("doctor")
      .exec();

    if (!medicalRecord) {
      return res.status(404).json({
        message: "Medical Record not found",
      });
    }

    return res.status(200).json(medicalRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateMedicalRecord = async (req, res) => {
  const { medicalRecord_id } = req.params;
  const updateData = req.body;

  try {
    const updatedMedicalRecord = await MedicalRecord.findByIdAndUpdate(
      medicalRecord_id,
      updateData,
      { new: true }
    )
      .populate("patient")
      // .populate("doctor")
      .exec();

    if (!updatedMedicalRecord) {
      return res.status(404).json({
        message: "Medical Record not found",
      });
    }

    return res.status(200).json(updatedMedicalRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteMedicalRecord = async (req, res) => {
  const { medicalRecord_id } = req.params;

  try {
    const deletedMedicalRecord = await MedicalRecord.findByIdAndDelete(
      medicalRecord_id
    );

    if (!deletedMedicalRecord) {
      return res.status(404).json({
        message: "Medical Record not found",
      });
    }

    return res
      .status(200)
      .json({ message: "Medical Record deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getMedicalRecordsByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const medicalRecords = await MedicalRecord.find({
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
