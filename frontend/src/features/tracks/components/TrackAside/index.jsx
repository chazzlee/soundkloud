import { useSelector } from "react-redux";
import { MdOutlineLibraryMusic } from "react-icons/md";
import { selectUserTracksBySlug } from "../../store";
import { ShowAside } from "../../../../components/Layouts/ShowLayout";

export function TrackAside({ user }) {
  // TODO: FIX -- just sample data for now (also need to fetch all user tracks)
  const asideItems = useSelector((state) =>
    selectUserTracksBySlug(state, user.slug)
  ).map((item) => ({
    id: item.id,
    user: { displayName: item.uploader.displayName, slug: item.uploader.slug },
    title: item.title,
    permalink: item.permalink,
    coverUrl: item.cover,
  }));

  return (
    <ShowAside
      headingIcon={<MdOutlineLibraryMusic />}
      heading="Tracks from this user"
      asideItems={asideItems}
      viewUrl={`/${user.slug}/tracks`}
    />
  );
}
