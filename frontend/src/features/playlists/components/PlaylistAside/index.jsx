import { useSelector } from "react-redux";
import { MdPlaylistPlay } from "react-icons/md";
import { selectPlaylists } from "../../store";
import { ShowAside } from "../../../../components/Layouts/ShowLayout";

export function PlaylistAside({ user }) {
  const asideItems = useSelector(selectPlaylists).map((item) => ({
    id: item.id,
    user: { displayName: item.uploader.displayName, slug: item.uploader.slug },
    title: item.title,
    permalink: `/${item.uploader.slug}/sets/${item.slug}`,
    coverUrl: item.cover,
  }));

  return (
    <ShowAside
      headingIcon={<MdPlaylistPlay />}
      heading="Playlists from this user"
      viewUrl={`/${user.slug}/sets`}
      asideItems={asideItems}
    />
  );
}
