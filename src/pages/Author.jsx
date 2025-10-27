import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

function normalizeDescription(desc) {
  if (!desc) return null;
  if (typeof desc === "string") return desc;
  if (typeof desc === "object" && desc.value) return desc.value;
  return null;
}

const Author = () => {
  const { id } = useParams(); // author id like OL123A
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [bio, setBio] = useState(null);
  const [name, setName] = useState("");
  const [works, setWorks] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      setBio(null);
      setName("");
      setWorks([]);
      try {
        const [aRes, wRes] = await Promise.all([
          fetch(`https://openlibrary.org/authors/${id}.json`),
          fetch(`https://openlibrary.org/authors/${id}/works.json?limit=20`),
        ]);
        if (!aRes.ok) throw new Error("author HTTP " + aRes.status);
        if (!wRes.ok) throw new Error("works HTTP " + wRes.status);
        const aJson = await aRes.json();
        const wJson = await wRes.json();
        if (!cancelled) {
          setName(aJson.name || id);
          setBio(normalizeDescription(aJson.bio));
          const list = (wJson.entries || []).map((w) => ({
            key: w.key,
            title: w.title,
            first_publish_year: w.first_publish_date || w.first_publish_year,
            cover_i: w.covers?.[0],
          }));
          setWorks(list);
        }
      } catch (e) {
        if (!cancelled) setError("Failed to load author.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="center"><Spinner /></div>;
  if (error) return <p className="error-text" role="alert">{error}</p>;

  return (
    <div className="app-container">
      <Header />
      <h2 className="page-title">{name}</h2>
      {bio ? <p className="details-desc">{bio}</p> : <p className="empty-text">Biography not available.</p>}
      <h3 className="sub-title">Top works</h3>
      {works.length === 0 ? (
        <p className="empty-text">No works found.</p>
      ) : (
        <div className="book-grid">
          {works.map((w) => (
            <a key={w.key} className="book-card" href={`/book/${(w.key || "").split("/").pop()}`}>
              <img
                className="book-cover"
                alt={`Cover of ${w.title}`}
                src={w.cover_i ? `https://covers.openlibrary.org/b/id/${w.cover_i}-M.jpg` : "https://via.placeholder.com/200x250?text=No+Cover"}
              />
              <h4 className="book-title">{w.title}</h4>
              {w.first_publish_year && <p className="details-meta">First published: {w.first_publish_year}</p>}
            </a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Author;
