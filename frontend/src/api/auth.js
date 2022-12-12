import { csrfFetch } from "./csrfFetch";

/**
 * @param {string} email
 * @returns {Promise<Response>}
 */
export const checkIfEmailExists = (email) => {
  return csrfFetch("/api/user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
};
