import { BASE_CALL } from "./baseCall";




export const API_CALL = {
  SIGNUP: {
    post: async (payload) => await BASE_CALL.post("/user/createWithEmail", payload),
  },
  LOGIN: {
    post: async (payload) => await BASE_CALL.post("/user/login", payload),
  },
  LOGOUT: {
    get: async (payload) => await BASE_CALL.get('/user/logout', payload)
  },
  UPDATE: {
    put: async (payload) => await BASE_CALL.put("/user/update", payload),
  },

  GET_LOGGEDIN_USER: async (token) => await BASE_CALL.get(`/user/me`, { token }),

  INFO: {
    get: async () => await BASE_CALL.get("/user/me"),
  },
  PLAN: {
    get: async () => await BASE_CALL.get("/plans"),
  },
  AVATAR: {
    put: async (payload) => await BASE_CALL.put("/user/addAvatar", payload),
    delete: async () => await BASE_CALL.delete("/user/avatar"),
  },
  FORGOT: {
    post: async (payload) => await BASE_CALL.post("/user/forgot-password", payload),
  },
  RESET: {
    post: async (payload, token) => await BASE_CALL.post("/user/reset-password?token=" + token, payload),
  },
  MagicEidenData: {
    get: async () => await BASE_CALL.get('/ordinals/popular-collections')
  },
  MagicEidenCollection: {
    get: async () => await BASE_CALL.get('/ordinals/collections')
  },
  GetSingleMagicEden: {
    get: async (seacrchSymbol) => await BASE_CALL.get(`/ordinals/charts-data/${seacrchSymbol}`)
  },
  SavePaymentTx: {
    post: async (payload) => await BASE_CALL.post("/user/subscription/hash", payload),
  }
};
