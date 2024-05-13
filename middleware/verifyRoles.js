import ROLES_LIST from "../config/rolesList.js";
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    if (
      rolesArray.findIndex((e) => e === ROLES_LIST.Owner) >= 0 &&
      req.username === req.params.username
    ) {
      console.log("passing owner checking");
      next();
    } else {
      const userRoles = Object.values(req.roles);
      const result = userRoles
        .map((role) => rolesArray.includes(role))
        .find((val) => val === true);
      if (!result) return res.sendStatus(401);
      next();
    }
  };
};
export default verifyRoles;
