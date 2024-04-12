import Patient from "../model/PatientsDB.js";
import jwt from "jsonwebtoken";

//ค้นหา
export const searchPatient = async (req, res) => {
  try {
    const { student_id } = req.query;
    // Build a query object based on search parameters
    const query = {};
    if (student_id) {
      query.student_id = { $regex: new RegExp(student_id, "i") }; // เพิ่มการใช้ Regular Expression เพื่อค้นหาอักษรที่ตรงกับที่ระบุโดยไม่สนใจตัวพิมพ์เล็กหรือตัวพิมพ์ใหญ่
    }

    const result = await Patient.find(query)
      .populate("status")
      .populate("organizations")
      .exec();

    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const listPatient = async (req, res) => {
  try {
    const { page = 1, pageSize = 500 } = req.query;

    // Calculate skip value based on page and page size
    const skip = (page - 1) * pageSize;

    const patients = await Patient.find()
      .populate("status")
      .populate("organizations")
      .skip(skip)
      .limit(parseInt(pageSize))
      .exec();

    return res.json(patients); // แก้ result เป็น patients
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

function generateStudentID() {
  let studentID = "63025"; // นำค่าเริ่มต้นของรหัสนักศึกษาเข้ามาก่อน
  for (let i = 0; i < 5; i++) {
    // เพิ่มตัวเลขสุ่ม 5 ตัวเข้าไปในรหัสนักศึกษา
    studentID += Math.floor(Math.random() * 10); // สุ่มตัวเลขจาก 0 ถึง 9
  }
  return studentID;
}

export const createPatient = async (req, res) => {
  const { student_id, patient_fname, patient_lname, status, organizations } =
    req.body;

  try {
    // สร้างข้อมูลผู้ป่วยในฐานข้อมูล

    const duplicate = await Patient.findOne({
      student_id: student_id,
    });
    if (duplicate) {
      return res.sendStatus(409);
    } else {
      const newPatient = await Patient.create({ ...req.body });
      return res.status(201).json(newPatient);
    }
  } catch (error) {
    // หากมีข้อผิดพลาดในการสร้างข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getPatient = async (req, res) => {
  let { patient_id } = req.params;

  try {
    const patient = await Patient.findById(patient_id)
      .populate("status") // Populate the status field
      .populate("organizations") // Populate the organizations field
      .exec();

    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    return res.status(200).json(patient);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePatient = async (req, res) => {
  const { patient_id } = req.params; // รับ id จากพารามิเตอร์ URL
  const updateData = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก request body

  try {
    // ใช้ findByIdAndUpdate เพื่อค้นหาและอัปเดตข้อมูลผู้ป่วย
    const updatedPatient = await Patient.findByIdAndUpdate(
      patient_id,
      updateData,
      { new: true }
    );

    // ตรวจสอบว่ามีผู้ป่วยที่มี id ที่ระบุหรือไม่
    if (!updatedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // ส่งข้อมูลผู้ป่วยที่อัปเดตแล้วกลับไปเป็น JSON response
    return res.status(200).json(updatedPatient);
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการอัปเดตข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a patient identified by the student_id in the request
export const deletePatient = async (req, res) => {
  const { patient_id } = req.params; // รับ id จากพารามิเตอร์ URL

  try {
    // ใช้ findByIdAndDelete เพื่อค้นหาและลบข้อมูลผู้ป่วย
    const deletedPatient = await Patient.findByIdAndDelete(patient_id);

    // ตรวจสอบว่ามีผู้ป่วยที่มี id ที่ระบุหรือไม่
    if (!deletedPatient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // ส่งข้อความยืนยันการลบผู้ป่วยกลับไป
    return res.status(200).json({ message: "Patient deleted successfully" });
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการลบข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
