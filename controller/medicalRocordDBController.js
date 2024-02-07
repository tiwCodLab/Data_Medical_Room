import MedicalRecord from "../model/MedicalRecordsDB.js";
import Medication from "../model/MedicationsDB.js";

export const createMedicalRecord = async (req, res) => {
  let { medicalRecord_id, patient, doctor, ...otherFields } = req.body;

  if (!medicalRecord_id || !patient || !doctor) {
    return res.status(400).json({
      message: "medicalRecord_id, patient, and doctor are required",
    });
  }

  try {
<<<<<<< HEAD
    if (medications && medications?.length > 0) {
      let newMedicalRecord = new MedicalRecord({
        medicalRecord_id: req.body.medicalRecord_id,
        patient: req.body.patient,
        visittime: req.body.visittime,
        visitdate: req.body.visitdate,
        doctor: req.body.doctor,
        chief_complaint: req.body.chief_complaint,
        physical_exam: req.body.physical_exam,
        diagnosis: req.body.diagnosis,
        nursing_activities: req.body.nursing_activities,
        recommendations: req.body.recommendations,
        medication_prescription: req.body.medication_prescription, // แก้ไขตรงนี้
        dispensingItems: medications,
        total: total,
        medical_supplies: req.body.medical_supplies,
        remarks: req.body.remarks,
      });

      const result = await newMedicalRecord.save();
      console.log("save ", result);

      if (result) {
        const addedMedicalRecord = await MedicalRecord.findById(result._id)
          .populate({
            path: "dispensingItems.medicationRef",
            model: "Medication",
          })
          .exec();

        if (addedMedicalRecord) {
          console.log(JSON.stringify(addedMedicalRecord, null, "\t"));
          res.json(addedMedicalRecord);
        }
      } else {
        return res.status(400).send({
          errors: "Cannot process the order",
        });
      }
    }
  } catch (err) {
    return res.status(400).send({
      errors: "Cannot process the order" + err.name,
=======
    const newMedicalRecord = await MedicalRecord.create({
      medicalRecord_id,
      patient,
      doctor,
      ...otherFields,
    });
    return res.status(201).json(newMedicalRecord);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
>>>>>>> parent of 484fe20 (commit add medical)
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
