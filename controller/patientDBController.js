import Patient from "../model/PatientsDB.js";

export const listPatient = async (req, res) => {
  const result = await Patient.find();
  return res.json(result);
};

export const createPatient = async (req, res) => {
  const {
    patient_id,
    student_id,
    patient_fname,
    patient_lname,
    status,
    organezations,
    age,
  } = req.body;

  // ตรวจสอบว่าข้อมูลที่จำเป็นสำหรับการสร้างผู้ป่วยถูกส่งมาหรือไม่
  if (
    !patient_id ||
    !student_id ||
    !patient_fname ||
    !patient_lname ||
    !status ||
    !organezations ||
    !age
  ) {
    return res.status(400).json({
      message:
        "patient_fname, patient_lname, status, organezations, age are required",
    });
  }

  try {
    // สร้างข้อมูลผู้ป่วยในฐานข้อมูล
    const newPatient = await Patient.create({ ...req.body });
    // ส่งข้อมูลผู้ป่วยที่สร้างกลับไปเป็น JSON response
    return res.status(201).json(newPatient);
  } catch (error) {
    // หากมีข้อผิดพลาดในการสร้างข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getPatient = async (req, res) => {
  const { student_id } = req.params; // รับ id จากพารามิเตอร์ URL

  try {
    // ดึงข้อมูลผู้ป่วยจากฐานข้อมูลโดยใช้ id
    const patient = await Patient.findById(student_id);

    // ตรวจสอบว่ามีผู้ป่วยที่มี id ที่ระบุหรือไม่
    if (!patient) {
      return res.status(404).json({
        message: "Patient not found",
      });
    }

    // ส่งข้อมูลผู้ป่วยกลับไปเป็น JSON response
    return res.status(200).json(patient);
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการดึงข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updatePatient = async (req, res) => {
  const { student_id } = req.params; // รับ id จากพารามิเตอร์ URL
  const updateData = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก request body

  try {
    // ใช้ findByIdAndUpdate เพื่อค้นหาและอัปเดตข้อมูลผู้ป่วย
    const updatedPatient = await Patient.findByIdAndUpdate(
      student_id,
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
  const { student_id } = req.params; // รับ id จากพารามิเตอร์ URL

  try {
    // ใช้ findByIdAndDelete เพื่อค้นหาและลบข้อมูลผู้ป่วย
    const deletedPatient = await Patient.findByIdAndDelete(student_id);

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
