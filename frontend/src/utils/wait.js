/**
 * @param {number} ms
 * @returns {Promise<any>}
 */
export const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
