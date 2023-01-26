export const IPC_HANDLERS = {
  AUTH: "auth",
  DATABASE: "database",
  FILE_SYSTEM: "fileSystem",
};

export const IPC_FUNCTIONS = {
  SIGN_IN: "signIn",
  INITIAL: "initial",
  GET_PROFILE: "getProfile",
  GET_SCOOTER_LIST: "getScooterList",
  ADD_SCOOTER: "addScooter",
  UPDATE_SCOOTER: "updateScooter",
  DELETE_SCOOTER: "deleteScooter",
  PRINT_PDF: "printPDF",
};

export const STATUSES = {
  SUCCESS: "success",
  ERROR: "error",
  WARNING: "warning",
};

export const ACTIONS = {
  ADD: "add",
  EDIT: "edit",
  DELETE: "delete",
};

export const USER_ROLE = ["admin", "leader", "member"];
export const SCOOTER_STATUS = ["IN LUCRU", "FINALIZAT", "IESIT"];
