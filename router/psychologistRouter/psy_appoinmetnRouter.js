import expres from "express";

import {
  createAppointment,
  getAllAppointments,
  deleteAppointment,
  updateAppointment,
} from "../../controller/PsychologistController/Psy_AppoinmentDBController.js";

let AppoinmentRouter = expres.Router();
AppoinmentRouter.post("/", createAppointment);
AppoinmentRouter.get("/", getAllAppointments);
AppoinmentRouter.put("/:id", updateAppointment);
AppoinmentRouter.delete("/:id", deleteAppointment);

export default AppoinmentRouter;
