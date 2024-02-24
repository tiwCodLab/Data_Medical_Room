import CounselingRecord from "../../model/psychologist/Psy_CounselingRecorcdDB.js"; // ต้องแก้ไข path ให้เป็นที่ถูกต้องตามโครงสร้างโปรเจค

// Controller function เพื่อสร้าง counseling record ใหม่
const createCounselingRecord = async (req, res) => {
  try {
    const counselingRecord = new CounselingRecord(req.body);
    await counselingRecord.save();
    res.status(201).json(counselingRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function เพื่อดึงข้อมูล counseling record ทั้งหมด
const getAllCounselingRecords = async (req, res) => {
  try {
    const counselingRecords = await CounselingRecord.find()
      .populate("patient")
      .exec();
    res.status(200).json(counselingRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function เพื่อดึงข้อมูล counseling record ตาม ID
const getCounselingRecordById = async (req, res) => {
  try {
    const counselingRecord = await CounselingRecord.findById(req.params.id);
    if (!counselingRecord) {
      return res.status(404).json({ message: "Counseling record not found" });
    }
    res.status(200).json(counselingRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller function เพื่ออัปเดต counseling record ตาม ID
const updateCounselingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCounselingRecord = await CounselingRecord.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedCounselingRecord);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller function เพื่อลบ counseling record ตาม ID
const deleteCounselingRecord = async (req, res) => {
  try {
    const { id } = req.params;
    await CounselingRecord.findByIdAndDelete(id);
    res.status(200).json({ message: "Counseling record deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getCounselingByPatientId = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const counselingRecord = await CounselingRecord.find({
      patient: patientId,
    })
      .populate("patient")
      .exec();
    res.json(counselingRecord);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export {
  createCounselingRecord,
  getAllCounselingRecords,
  getCounselingRecordById,
  updateCounselingRecord,
  deleteCounselingRecord,
  getCounselingByPatientId,
};
