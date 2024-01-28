import ROLES_LIST from "../config/rolesList.js";
const verifyRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.roles) return res.sendStatus(401);
    const rolesArray = [...allowedRoles];
    // check for the owner role
    // and the request's username is the owner of the resource
    if (
      rolesArray.findIndex((e) => e === ROLES_LIST.Owner) >= 0 &&
      /* beware that this work only if username is used as request's 
parameter */
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
