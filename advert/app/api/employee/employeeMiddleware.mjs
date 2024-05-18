const checkAccess = (requiredAccess) => async (req, res, next) => {
    try {
      if (!req.user || !req.user.employee) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const employeeAccess = req.user.employee.access;
  
      if (employeeAccess[requiredAccess]) {

        next();
      } else {
        res.status(403).json({ error: 'Access denied' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };
  
  export const checkCanBlockUsers = checkAccess('canBlockUsers');
  export const checkCanSuspendUsers = checkAccess('canSuspendUsers');
  export const checkCanDeleteUsers = checkAccess('canDeleteUsers');
  export const checkCanSendMessage = checkAccess('canSendMessage');
  export const checkCanManagePosts = checkAccess('canManagePosts');
  export const checkCanViewSensitiveInfo = checkAccess('canViewSensitiveInfo');
  export const checkCanUserAnalysis = checkAccess('canUserAnalysis');
  
  
  export default checkAccess;
  