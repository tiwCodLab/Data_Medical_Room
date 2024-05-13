import Status from "../model/StatusDB.js";
import Patient from "../model/PatientsDB.js";

export const createPatient = async (req, res) => {
  const {
    student_id,
    patient_fname,
    patient_lname,
    status,
    organizations,
    age,
  } = req.body;

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



export const listStatus = async (req, res) => {
  const result = await Status.find();
  return res.json(result);
};

export const createStatus = async (req, res) => {
  const { status_id, status_name } = req.body;

  if (!status_id || !status_name) {
    return res.status(400).json({
      message: "status_id, status_name are required",
    });
  }

  try {
    // ตรวจสอบว่า status_id ซ้ำกันหรือไม่
    const existingStatus = await Status.findOne({ status_id });

    if (existingStatus) {
      return res.status(409).json({
        message: "Status with the same ID already exists",
      });
    }

    // ถ้าไม่มีข้อมูลซ้ำ, สร้างข้อมูลใหม่
    const newStatus = await Status.create({ ...req.body });
    return res.status(201).json(newStatus);
  } catch (error) {
    // หากมีข้อผิดพลาดในการสร้างข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ประกาศฟังก์ชันสำหรับการอัปเดตข้อมูลสถานะ
export const updateStatus = async (req, res) => {
  const { status_id, status_name } = req.body;

  if (!status_id || !status_name) {
    return res.status(400).json({
      message: "status_id, status_name are required",
    });
  }

  try {
    // ค้นหาข้อมูลสถานะที่ต้องการอัปเดต
    const existingStatus = await Status.findOne({ status_id });

    // ถ้าไม่พบข้อมูลสถานะ
    if (!existingStatus) {
      return res.status(404).json({
        message: "Status not found",
      });
    }

    // อัปเดตข้อมูลสถานะ
    existingStatus.status_name = status_name;
    await existingStatus.save();

    // ส่งข้อมูลสถานะที่อัปเดตกลับเป็น JSON response
    return res.json(existingStatus);
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการอัปเดตข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// ประกาศฟังก์ชันสำหรับการลบข้อมูลสถานะ
export const deleteStatus = async (req, res) => {
  const { status_id } = req.params; // รับ id จากพารามิเตอร์ URL

  try {
    // ใช้ findOneAndDelete เพื่อค้นหาและลบข้อมูลสถานะ
    const deletedStatus = await Status.findOneAndDelete({ status_id });

    // ตรวจสอบว่ามีข้อมูลสถานะที่มี id ที่ระบุหรือไม่
    if (!deletedStatus) {
      return res.status(404).json({
        message: "Status not found",
      });
    }

    // ส่งข้อความยืนยันการลบสถานะกลับไป
    return res.status(200).json({ message: "Status deleted successfully" });
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการลบข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
