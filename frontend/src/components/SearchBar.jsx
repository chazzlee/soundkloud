import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoSearch } from "react-icons/io5";
import { TracksApi } from "../api/tracks";
import useOnClickOutside from "use-onclickoutside";
import styles from "./TopNavigation.module.css";
import { useRef } from "react";

// TODO: debounce search
function parseLink(link) {
  // eslint-disable-next-line no-unused-vars
  const [_proto, _empty, _domain, user, title] = link.split("/");
  return `/${user}/${title}`;
}

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useOnClickOutside(searchRef, () => setSearchQuery(""));

  useEffect(() => {
    if (searchQuery) {
      TracksApi.search(searchQuery).then(async (response) => {
        if (response.ok) {
          const data = await response.json();
          setResults(data.data);
        }
      });
    }
  }, [searchQuery]);

  return (
    <>
      <input
        id="search"
        type="text"
        name="search"
        className={styles.searchBar}
        placeholder="Search for tracks"
        autoComplete="off"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <span
        style={{
          position: "absolute",
          fontSize: "20px",
          top: 2,
          right: 6,
          color: "darkgray",
          cursor: "pointer",
        }}
      >
        <IoSearch />
      </span>
      {searchQuery.length > 0 && (
        <div className={styles.searchContainer} ref={searchRef}>
          <li className={styles.searchItem}>Search for "{searchQuery}"</li>
          {results.length > 0 ? (
            results.map((result) => (
              <li
                key={result?.id}
                className={styles.searchItem}
                onClick={() => {
                  setResults([]);
                  setSearchQuery("");
                  navigate(parseLink(result.permalink));
                }}
              >
                <span style={{ fontWeight: 600 }}>{result.title}</span> -{" "}
                <span style={{ fontSize: 13 }}>{result.artist}</span>
              </li>
            ))
          ) : (
            <li key={"No-result"} className={styles.searchItem}>
              No results found
            </li>
          )}
        </div>
      )}
    </>
  );
}
