import SystemReview from "../model/SystemreviewDB.js";

// Controller สำหรับเพิ่ม System Review
const addSystemReview = async (req, res) => {
  try {
    const systemReviewData = req.body; // รับข้อมูลจาก HTTP Request

    // สร้าง instance ของ System Review จากข้อมูลที่รับมา
    const newSystemReview = new SystemReview(systemReviewData);

    // บันทึกข้อมูลลงในฐานข้อมูล
    const savedSystemReview = await newSystemReview.save();

    res.status(201).json(savedSystemReview); // ส่งข้อมูลที่บันทึกแล้วกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller สำหรับดึงข้อมูล System Review ทั้งหมด
const getAllSystemReviews = async (req, res) => {
  try {
    // ดึงข้อมูล System Review ทั้งหมดจากฐานข้อมูล
    const systemReviews = await SystemReview.find();

    res.status(200).json(systemReviews); // ส่งข้อมูลทั้งหมดกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller สำหรับดึงข้อมูล System Review ตาม ID
const getSystemReviewById = async (req, res) => {
  const { id } = req.params; // รับ ID จาก HTTP Request
  try {
    // ใช้ Mongoose เพื่อค้นหา System Review ตาม ID
    const systemReview = await SystemReview.findById(id);

    if (!systemReview) {
      return res
        .status(404)
        .json({ message: "ไม่พบ System Review ที่มี ID ที่ระบุ" });
    }

    res.status(200).json(systemReview); // ส่งข้อมูล System Review ที่พบกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller สำหรับอัปเดตข้อมูล System Review ตาม ID
const updateSystemReviewById = async (req, res) => {
  const { id } = req.params; // รับ ID จาก HTTP Request

  try {
    // ใช้ Mongoose เพื่อค้นหา System Review ตาม ID
    const systemReview = await SystemReview.findById(id);

    if (!systemReview) {
      return res
        .status(404)
        .json({ message: "ไม่พบ System Review ที่มี ID ที่ระบุ" });
    }

    // อัปเดตข้อมูล System Review ด้วยข้อมูลใหม่ที่รับมาจาก HTTP Request
    await SystemReview.findByIdAndUpdate(id, req.body, { new: true });

    // ดึงข้อมูล System Review ที่อัปเดตแล้ว
    const updatedSystemReview = await SystemReview.findById(id);

    res.status(200).json(updatedSystemReview); // ส่งข้อมูล System Review ที่อัปเดตแล้วกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller สำหรับลบ System Review ตาม ID
const deleteSystemReviewById = async (req, res) => {
  const { id } = req.params; // รับ ID จาก HTTP Request

  try {
    // ใช้ Mongoose เพื่อค้นหาและลบ System Review ตาม ID
    const deletedSystemReview = await SystemReview.findByIdAndDelete(id);

    if (!deletedSystemReview) {
      return res
        .status(404)
        .json({ message: "ไม่พบ System Review ที่มี ID ที่ระบุ" });
    }

    res.status(200).json({ message: "ลบ System Review เรียบร้อยแล้ว" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// คุณสามารถเพิ่ม controllers อื่น ๆ ตามความต้องการ

export {
  addSystemReview,
  getAllSystemReviews,
  getSystemReviewById,
  updateSystemReviewById,
  deleteSystemReviewById,
};
