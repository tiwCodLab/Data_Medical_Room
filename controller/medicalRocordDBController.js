import MedicalRecord from "../model/MedicalRecordsDB.js";

// export const listMedicalRecords = async (req, res) => {
//   try {
//     const result = await MedicalRecord.find()
//       .populate("patient")
//       // .populate("doctor")
//       .exec();
//     return res.json(result);
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

// export const createMedicalRecord = async (req, res) => {
//   var medication = req.body.checkoutMedication; // Update the path accordingly
//   var { medications, total } = await aggregateMedication(medication);

//   let { medicalRecord_id, patient, doctor, ...otherFields } = req.body;

//   if (!medicalRecord_id || !patient || !doctor) {
//     return res.status(400).json({
//       message: "medicalRecord_id, patient, and doctor are required",
//     });
//   }

//   try {
//     const newMedicalRecord = await MedicalRecord.create({
//       medicalRecord_id,
//       patient,
//       doctor,
//       dispensingItems: medications, // Update field accordingly
//       total,
//       ...otherFields,
//     });

//     console.log("save ", newMedicalRecord); // Corrected: Log the newMedicalRecord, not result

//     const addedOrder = await MedicalRecord.findById(newMedicalRecord._id)
//       .populate({ path: "dispensingItems.medicationRef" }) // Update path accordingly
//       .exec();

//     if (addedOrder) {
//       console.log(JSON.stringify(addedOrder, null, "\t"));
//       res.status(201).json(addedOrder); // Corrected: Return addedOrder instead of newMedicalRecord
//     } else {
//       return res.status(400).send({
//         errors: "Cannot process the order",
//       });
//     }
//   } catch (error) {
//     return res.status(500).json({
//       message: "Internal Server Error",
//       error: error.message,
//     });
//   }
// };

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

export const createMedicalRecord = async (req, res) => {
  let { medicalRecord_id, patient, doctor, ...otherFields } = req.body;

  if (!medicalRecord_id || !patient || !doctor) {
    return res.status(400).json({
      message: "medicalRecord_id, patient, and doctor are required",
    });
  }

  try {
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
