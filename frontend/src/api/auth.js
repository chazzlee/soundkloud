import { csrfFetch } from "./csrfFetch";

/**
 * @param {string} email
 * @returns {Promise<Response>}
 */
export const checkIfEmailExists = (email) => {
  return csrfFetch("/api/user", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
};
