/**
 *
 * @param {string} url
 * @param {RequestInit} options
 * @returns {Promise<Response>}
 */
export async function csrfFetch(url, options = {}) {
  options.method = options.method || "GET";

  options.headers = {
    ...options.headers,
    Accept: "application/json",
  };

  if (options.method.toUpperCase() !== "GET") {
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }

  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw await response.json();
  }

  return response;
}
