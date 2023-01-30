import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import slug from "slug";
import { PlaylistsApi } from "../../../../../api/playlists";
import { TrackRow } from "../../../../tracks/components/TrackRow";
import { playlistReceived } from "../../../store";

export function CreatePlaylistTab({ track, onSuccess }) {
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isValid, isSubmitting },
  } = useForm({
    defaultValues: { title: "", privacy: "public" },
  });

  const onSubmit = useCallback(
    async (data) => {
      const newPlaylist = {
        title: data.title,
        privacy: data.privacy,
        tracks: [track.id],
        permalink: slug(data.title),
      };

      try {
        const response = await PlaylistsApi.createNewPlaylist(newPlaylist);
        if (response.ok) {
          const data = await response.json();
          dispatch(playlistReceived(data));
          onSuccess(data.permalink);
        }
      } catch (ex) {
        console.error(ex.message);
      }
    },
    [track.id, dispatch, onSuccess]
  );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control sm">
          <label htmlFor="title">
            Playlist title <span className="required">*</span>
          </label>
          <input
            type="text"
            name="title"
            autoFocus
            className="input-full"
            {...register("title", {
              required: { value: true, message: "Enter a title." },
            })}
          />
        </div>
        <div className="form-control sm privacy-container">
          <div className="radio-labels">
            <label htmlFor="privacy" className="mr-label">
              Privacy:
            </label>
            <div className="inline-radio">
              <input
                type="radio"
                id="public"
                value="public"
                className="mt-radio"
                {...register("privacy", { required: true })}
              />
              <label htmlFor="public">Public</label>
            </div>
            <div className="inline-radio">
              <input
                type="radio"
                id="private"
                className="mt-radio"
                value="private"
                {...register("privacy")}
              />
              <label htmlFor="private">Private</label>
            </div>
          </div>
          <button
            className="submit-btn"
            type="submit"
            disabled={isSubmitting || !isValid}
          >
            Save
          </button>
        </div>
      </form>
      <div className="track-list">
        <TrackRow
          track={track}
          onRemove={() => {
            console.log("TODO: MUST IMPLEMENT");
          }}
        />
        <TrackRow />
        <TrackRow />
        <TrackRow />
      </div>
    </>
  );
}
