import Checklist from "../model/CheklistDB.js";

export const addChecklist = async (req, res) => {
  try {
    const checklistData = req.body; // รับข้อมูลจาก HTTP Request

    // สร้าง instance ของ Checklists จากข้อมูลที่รับมา
    const newChecklist = new Checklist(checklistData);

    // บันทึกข้อมูลลงในฐานข้อมูล
    const savedChecklist = await newChecklist.save();

    res.status(201).json(savedChecklist); // ส่งข้อมูลที่บันทึกแล้วกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller สำหรับดึงข้อมูล Checklists ตาม ID
export const getChecklistById = async (req, res) => {
  const { id } = req.params; // รับ ID จาก HTTP Request
  try {
    // ใช้ Mongoose เพื่อค้นหา Checklist ตาม ID
    const checklist = await Checklist.findById(id).populate("patient").exec();

    if (!checklist) {
      return res
        .status(404)
        .json({ message: "ไม่พบ Checklist ที่มี ID ที่ระบุ" });
    }

    res.status(200).json(checklist); // ส่งข้อมูล Checklist ที่พบกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateChecklistById = async (req, res) => {
  const { id } = req.params; // รับ ID จาก HTTP Request

  try {
    // ใช้ Mongoose เพื่อค้นหา Checklist ตาม ID
    const checklist = await Checklist.findById(id);

    if (!checklist) {
      return res
        .status(404)
        .json({ message: "ไม่พบ Checklist ที่มี ID ที่ระบุ" });
    }

    // อัปเดตข้อมูล Checklist ด้วยข้อมูลใหม่ที่รับมาจาก HTTP Request
    await Checklist.findByIdAndUpdate(id, req.body, { new: true });

    // ดึงข้อมูล Checklist ที่อัปเดตแล้ว
    const updatedChecklist = await Checklist.findById(id);

    res.status(200).json(updatedChecklist); // ส่งข้อมูล Checklist ที่อัปเดตแล้วกลับไปใน HTTP Response
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
