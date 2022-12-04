export async function csrfFetch(url, options = {}) {
  options.method ||= "GET";
  options.headers ||= {
    Accept: "application/json",
  };

  if (options.method.toUpperCase() !== "GET") {
    options.headers["Content-Type"] = "application/json";
    options.headers["X-CSRF-Token"] = sessionStorage.getItem("X-CSRF-Token");
  }

  const response = await fetch(url, options);
  if (response.status >= 400) {
    throw response;
  }

  return response;
}
