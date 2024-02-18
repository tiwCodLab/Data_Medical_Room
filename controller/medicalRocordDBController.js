import MedicalRecord from "../model/MedicalRecordsDB.js";
import Medication from "../model/MedicationsDB.js";
import Medicalsupplies from "../model/MedicalSuppliesDB.js";

export const createMedicalRecord = async (req, res) => {
  let { total, medications, supplies, ...otherFields } = req.body;
  const messages = [];
  var sum = 0;
  var sum_supplies = 0;

  try {
    const medications_dis = []; // เตรียมอาร์เรย์สำหรับเก็บข้อมูลของแต่ละรายการยา
    const medical_supplies = [];

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
        return res.status(400).json({
          error: `Insufficient stock for medication with name "${medication_name}"`,
        });
      }

      // Reduce medication stock
      medication.stock -= quantity;

      sum += medication.price * quantity;

      // Save updated medication data
      await medication.save();

      messages.push(
        `Stock reduced successfully for medication with name "${medication_name}"`
      );

      // เพิ่มข้อมูลของแต่ละรายการยาเข้าไปในอาร์เรย์ medications_dis
      medications_dis.push({
        medical_name: medication_name,
        qty: quantity,
      });
    }

    for (const item of supplies) {
      const { medical_supplies_name, quantity } = item;

      // Check if medical supply exists
      const medicalSupply = await Medicalsupplies.findOne({
        medical_supplies_name: medical_supplies_name,
      });

      if (!medicalSupply) {
        messages.push(
          `Medical supply with name "${medical_supplies_name}" not found`
        );
        continue; // ไปตรวจสอบรายการอุปกรณ์ทางการแพทย์ถัดไป
      }

      // Check if sufficient stock is available
      if (medicalSupply.stock < quantity) {
        return res.status(400).json({
          error: `Insufficient stock for medical supply with name "${medical_supplies_name}"`,
        });
      }

      // Reduce medical supply stock
      medicalSupply.stock -= quantity;
      sum_supplies += medicalSupply.price * quantity;

      // Save updated medical supply data
      await medicalSupply.save();

      messages.push(
        `Stock reduced successfully for medical supply with name "${medical_supplies_name}"`
      );

      // เพิ่มข้อมูลของแต่ละรายการอุปกรณ์ทางการแพทย์เข้าไปในอาร์เรย์ supplies_dis
      medical_supplies.push({
        supplies_name: medical_supplies_name,
        qty: quantity,
      });
    }

    // Create Medical Record with medications_dis array
    const newMedicalRecord = await MedicalRecord.create({
      total_price_medications: sum,
      total_price_supplies: sum_supplies,
      medications_dis, // ส่ง medications_dis ที่เก็บข้อมูลของแต่ละรายการยา
      medical_supplies,
      ...otherFields,
    });
    messages.push(`Medical Record created`);
    return res.status(201).json(newMedicalRecord);
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

// Function to get summary of diagnosis
export const getDiagnosisSummaryByDateRange = async (req, res) => {
  try {
    // Extract start date and end date from request query
    const { startDate, endDate } = req.query;

    let query = {}; // Initialize an empty query object

    // Check if start date and end date are provided
    if (startDate && endDate) {
      query = {
        visitdate: {
          $gte: startDate, // Greater than or equal to start date
          $lte: endDate, // Less than or equal to end date
        },
      };
    }

    // Query MongoDB to get medical records based on the query
    const medicalRecords = await MedicalRecord.find(query);

    // Initialize an object to store diagnosis summary
    const diagnosisSummary = {};

    // Iterate through each medical record within the specified date range
    medicalRecords.forEach((record) => {
      // Get the diagnosis from each record
      const diagnosis = record.diagnosis;

      // If the diagnosis exists
      if (diagnosis) {
        // Check if the diagnosis already exists in the summary
        if (diagnosisSummary[diagnosis]) {
          // If it exists, increment the count
          diagnosisSummary[diagnosis]++;
        } else {
          // If it doesn't exist, initialize the count to 1
          diagnosisSummary[diagnosis] = 1;
        }
      }
    });

    // Return the diagnosis summary
    return res.status(200).json(diagnosisSummary);
  } catch (error) {
    // Return an error if something goes wrong
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getnursingactivitiesSummaryByDateRange = async (req, res) => {
  try {
    // Extract start date and end date from request query
    const { startDate, endDate } = req.query;

    let query = {}; // Initialize an empty query object

    // Check if start date and end date are provided
    if (startDate && endDate) {
      query = {
        visitdate: {
          $gte: startDate, // Greater than or equal to start date
          $lte: endDate, // Less than or equal to end date
        },
      };
    }

    // Query MongoDB to get medical records based on the query
    const medicalRecords = await MedicalRecord.find(query);

    // Initialize an object to store diagnosis summary
    const diagnosisSummary = {};

    // Iterate through each medical record within the specified date range
    medicalRecords.forEach((record) => {
      // Get the diagnosis from each record
      const nursing_activities = record.nursing_activities;

      // If the diagnosis exists
      if (nursing_activities) {
        // Check if the diagnosis already exists in the summary
        if (diagnosisSummary[nursing_activities]) {
          // If it exists, increment the count
          diagnosisSummary[nursing_activities]++;
        } else {
          // If it doesn't exist, initialize the count to 1
          diagnosisSummary[nursing_activities] = 1;
        }
      }
    });

    // Return the diagnosis summary
    return res.status(200).json(diagnosisSummary);
  } catch (error) {
    // Return an error if something goes wrong
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getOrganizations = async (req, res) => {
  try {
    // Extract start date and end date from request query
    const { startDate, endDate } = req.query;

    let query = {}; // Initialize an empty query object

    // Check if start date and end date are provided
    if (startDate && endDate) {
      query = {
        visitdate: {
          $gte: startDate, // Greater than or equal to start date
          $lte: endDate, // Less than or equal to end date
        },
      };
    }

    // Query MongoDB to get medical records based on the query
    const medicalRecords = await MedicalRecord.find(query)
      .populate("patient")
      .exec();

    // Initialize an object to store diagnosis summary
    const diagnosisSummary = {};

    // Iterate through each medical record within the specified date range
    medicalRecords.forEach((record) => {
      // Get the diagnosis from each record
      const patient = record.patient.organizations;

      // If the diagnosis exists
      if (patient) {
        // Check if the diagnosis already exists in the summary
        if (diagnosisSummary[patient]) {
          // If it exists, increment the count
          diagnosisSummary[patient]++;
        } else {
          // If it doesn't exist, initialize the count to 1
          diagnosisSummary[patient] = 1;
        }
      }
    });

    // Return the diagnosis summary
    return res.status(200).json(diagnosisSummary);
  } catch (error) {
    // Return an error if something goes wrong
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};