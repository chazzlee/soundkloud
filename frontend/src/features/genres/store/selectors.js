export const selectGenres = (state) =>
  state.genres?.entities ? Object.values(state.genres.entities) : [];

export const selectGenresLoaded = (state) => state.genres?.loaded;
export const selectGenreLabelById = (state, id) =>
  state.genres?.entities?.[id]?.label;
