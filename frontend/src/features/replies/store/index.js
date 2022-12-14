// import produce from "immer";
// import { RepliesApi } from "../../../api/replies";

// const FETCH_REPLIES_SUCCESS = "replies/fetchRepliesSuccess";

// const REPLY_TO_TRACK_START = "replies/replyToTrackInitiate";
// const REPLY_TO_TRACK_SUCCESS = "replies/replyToTrackSuccess";
// const REPLY_TO_TRACK_FAIL = "replies/replyToTrackFail";

// const REMOVE_REPLY = "replies/replyRemoved";

// const fetchRepliesSuccess = () => ({
//   type: FETCH_REPLIES_SUCCESS,
// });

// const replyToTrackStart = () => ({
//   type: REPLY_TO_TRACK_START,
// });
// const replyToTrackSuccess = (reply) => ({
//   type: REPLY_TO_TRACK_SUCCESS,
//   payload: reply,
// });
// const replyToTrackFail = (error) => ({
//   type: REPLY_TO_TRACK_SUCCESS,
//   payload: error,
// });

// export const fetchTrackRepliesAsync = (trackId) => async (dispatch) => {
//   try {
//     const response = await RepliesApi.fetchByTrack(trackId);
//     const data = await response.json();
//     dispatch(fetchRepliesSuccess(data));
//   } catch (error) {}
// };

// export const replyToTrackAsync = (trackId, reply) => async (dispatch) => {
//   try {
//     const response = await RepliesApi.replyToTrack(trackId, reply);
//     const data = await response.json();
//     dispatch(replyToTrackSuccess(data));
//   } catch (error) {}
// };

// const initialState = {
//   entities: {},
//   ids: [],
// };

// export const repliesReducer = produce((state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_REPLIES_SUCCESS: {
//       state.entities = action.payload;
//       state.ids = Object.keys(action.payload).map((id) => +id);
//       break;
//     }
//     case REPLY_TO_TRACK_SUCCESS: {
//       state.entities[action.payload.id] = action.payload;
//       state.ids = Object.keys(state.entities).map((id) => +id);
//       break;
//     }
//     default:
//       return state;
//   }
// });
