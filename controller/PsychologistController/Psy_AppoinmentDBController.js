import Appointment from "../../model/psychologist/Psy_AppointmentDB.js";

const createAppointment = async (req, res) => {
  try {
    const { patient, counseling_recordId, appointment_date, appointment_time } =
      req.body;

    // สร้าง appointment ใหม่
    const newAppointment = new Appointment({
      patient: patient,
      counseling_recordId: counseling_recordId,
      appointment_date: appointment_date,
      appointment_time: appointment_time,
      status: false, // กำหนดสถานะเริ่มต้นของการนัดหมาย
    });

    // เซฟข้อมูลลงในฐานข้อมูล
    await newAppointment.save();

    // ส่งคำตอบกลับไปยังผู้ใช้
    res.status(201).json({
      message: "Appointment created successfully",
      appointment: newAppointment,
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ message: "Failed to create appointment" });
  }
};

// ตัวอย่างการอ่านข้อมูลทั้งหมดของการนัดหมาย
const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().populate("patient").exec();
    res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    res.status(500).json({ message: "Failed to fetch appointments" });
  }
};

const deleteAppointment = async (req, res) => {
  const appointmentId = req.params.id; // รับ appointmentId จาก URL parameters

  try {
    // ค้นหา appointment ที่ต้องการลบ
    const appointment = await Appointment.findById(appointmentId);

    // ถ้าไม่พบ appointment ให้ส่งข้อความแจ้งเตือนว่าไม่พบข้อมูล
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ลบ appointment ออกจากฐานข้อมูล
    await appointment.remove();

    // ส่งคำตอบกลับไปยังผู้ใช้
    res.status(200).json({ message: "Appointment deleted successfully" });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({ message: "Failed to delete appointment" });
  }
};

const updateAppointment = async (req, res) => {
  const appointmentId = req.params.id; // รับ appointmentId จาก URL parameters
  const updates = req.body; // รับข้อมูลที่ต้องการอัปเดตจาก req.body

  try {
    // ค้นหา appointment ที่ต้องการอัปเดต
    const appointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updates,
      { new: true }
    );

    // ถ้าไม่พบ appointment ให้ส่งข้อความแจ้งเตือนว่าไม่พบข้อมูล
    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ส่งคำตอบกลับไปยังผู้ใช้
    res.status(200).json({
      message: "Appointment updated successfully",
      appointment: appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({ message: "Failed to update appointment" });
  }
};

export {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
};
