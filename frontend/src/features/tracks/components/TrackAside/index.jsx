import { useDispatch, useSelector } from "react-redux";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { fetchAllTracksByUserAsync, selectUserTracksBySlug } from "../../store";
import { ShowAside } from "../../../../components/Layouts/ShowLayout";
import { useEffect } from "react";

export function TrackAside({ user }) {
  const dispatch = useDispatch();

  const asideItems = useSelector((state) =>
    selectUserTracksBySlug(state, user.slug)
  ).map((item) => ({
    id: item.id,
    user: { displayName: item.uploader.displayName, slug: item.uploader.slug },
    title: item.title,
    permalink: item.permalink,
    coverUrl: item.cover,
  }));

  useEffect(() => {
    dispatch(fetchAllTracksByUserAsync(user?.id));
  }, [dispatch, user?.id]);

  return (
    <ShowAside
      headingIcon={<MdOutlineLibraryMusic />}
      heading="Tracks from this user"
      asideItems={asideItems.slice(0, 4)}
      viewUrl={`/${user.slug}/tracks`}
    />
  );
}
