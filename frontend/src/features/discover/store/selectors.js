import { createSelector } from "reselect";

export const selectDiscoverLoading = (state) => state.discover?.loading;
export const selectDiscoverLoaded = (state) => state.discover?.loaded;

export const selectDiscoverListByType = (state, type) =>
  Object.values(state.discover?.entities?.[type] || {});

export const selectDiscoverGroupedByGenres = createSelector(
  [
    (state) => Object.values(state.genres?.entities),
    (state) => state.discover?.entities,
  ],
  (genres, tracks) =>
    genres
      .filter((genre) => !["none", "custom"].includes(genre.name))
      .map((genre) => ({
        genreName: genre.name,
        genreLabel: genre.label,
        tracks: Object.values(tracks[genre.name] ?? {}),
      }))
);
