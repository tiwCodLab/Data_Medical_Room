import Organizations from "../model/OrganizationsDB.js";

export const listOrganization = async (req, res) => {
  let result = await Organizations.find();
  return res.json(result);
};

export const getOrganizationById = async (req, res) => {
  const { organizations_id } = req.params; // Retrieve the organization_id from URL parameters

  try {
    // Use findOne to find an organization by its ID
    const organization = await Organizations.findById(organizations_id);

    // Check if the organization with the specified ID exists
    if (!organization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // Return the organization as a JSON response
    return res.json(organization);
  } catch (error) {
    // Handle errors that may occur during the retrieval process
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createOrganizations = async (req, res) => {
  const { organizations_id, organizations_name } = req.body;

  if (!organizations_id || !organizations_name) {
    return res.status(400).json({
      message: "organization_name is required",
    });
  }

  try {
    // ตรวจสอบว่า organizations_id ซ้ำกันหรือไม่
    const existingOrganization = await Organizations.findOne({
      organizations_id,
    });

    // ถ้ามีข้อมูลองค์กรที่มี organizations_id ที่ระบุ
    if (existingOrganization) {
      return res.status(409).json({
        message: "Organization with the same ID already exists",
      });
    }

    // ถ้าไม่มีข้อมูลซ้ำ, สร้างข้อมูลใหม่
    const newOrganization = await Organizations.create({
      organizations_id,
      organizations_name,
    });

    return res.status(201).json(newOrganization);
  } catch (error) {
    // หากมีข้อผิดพลาดในการสร้างข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateOrganization = async (req, res) => {
  const { organizations_id, organizations_name } = req.body;

  if (!organizations_id || !organizations_name) {
    return res.status(400).json({
      message: "organizations_id, organizations_name are required",
    });
  }

  try {
    // ค้นหาข้อมูลองค์กรที่ต้องการอัปเดต
    const existingOrganization = await Organizations.findOne({
      organizations_id,
    });

    // ถ้าไม่พบข้อมูลองค์กร
    if (!existingOrganization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // อัปเดตข้อมูลองค์กร
    existingOrganization.organizations_name = organizations_name;
    await existingOrganization.save();
    // ส่งข้อมูลองค์กรที่อัปเดตกลับเป็น JSON response
    return res.json(existingOrganization);
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการอัปเดตข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteOrganization = async (req, res) => {
  const { organizations_id } = req.params; // รับ id จากพารามิเตอร์ URL

  // Check if organizations_id is provided
  if (!organizations_id) {
    return res.status(400).json({
      message: "Organization ID is required",
    });
  }

  try {
    // ใช้ findOneAndDelete เพื่อค้นหาและลบข้อมูลองค์กร
    const deletedOrganization = await Organizations.findByIdAndDelete(
      organizations_id
    );

    // ตรวจสอบว่ามีข้อมูลองค์กรที่มี id ที่ระบุหรือไม่
    if (!deletedOrganization) {
      return res.status(404).json({
        message: "Organization not found",
      });
    }

    // ส่งข้อความยืนยันการลบองค์กรกลับไป
    return res
      .status(200)
      .json({ message: "Organization deleted successfully" });
  } catch (error) {
    // หากเกิดข้อผิดพลาดในการลบข้อมูล
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
