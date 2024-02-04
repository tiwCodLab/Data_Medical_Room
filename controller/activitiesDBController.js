import Activities from "../model/ActivitiesDB.js";

export const listActivities = async (req, res) => {
  try {
    const result = await Activities.find();
    return res.json(result);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const createActivity = async (req, res) => {
  const { activities_id, activities_name } = req.body;

  if (!activities_id || !activities_name) {
    return res.status(400).json({
      message: "activities_id and activities_name are required",
    });
  }

  try {
    const duplicate = await Activities.findOne({
      activities_id: activities_id,
    });
    if (duplicate) {
      return res.sendStatus(409);
    } else {
      const newActivity = await Activities.create({ ...req.body });
      return res.status(201).json(newActivity);
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const getActivity = async (req, res) => {
  const { activities_id } = req.params;

  try {
    const activity = await Activities.findById(activities_id);

    if (!activity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    return res.status(200).json(activity);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const updateActivity = async (req, res) => {
  const { activities_id } = req.params;
  const updateData = req.body;

  try {
    const updatedActivity = await Activities.findByIdAndUpdate(
      activities_id,
      updateData,
      { new: true }
    );

    if (!updatedActivity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    return res.status(200).json(updatedActivity);
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export const deleteActivity = async (req, res) => {
  const { activities_id } = req.params;

  try {
    const deletedActivity = await Activities.findByIdAndDelete(activities_id);

    if (!deletedActivity) {
      return res.status(404).json({
        message: "Activity not found",
      });
    }

    return res.status(200).json({ message: "Activity deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
