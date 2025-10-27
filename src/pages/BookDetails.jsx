import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import Header from "../components/Header";

function normalizeDescription(desc) {
  if (!desc) return "No description available.";
  if (typeof desc === "string") return desc;
  if (typeof desc === "object" && desc.value) return desc.value;
  return "No description available.";
}

const BookDetails = () => {
  const { id } = useParams(); // works id like OL12345W
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      setLoading(true);
      setError("");
      setData(null);
      try {
        const res = await fetch(`https://openlibrary.org/works/${id}.json`);
        if (!res.ok) throw new Error("HTTP " + res.status);
        const json = await res.json();
        if (!cancelled) setData(json);
      } catch (e) {
        if (!cancelled) setError("Failed to load book details.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    run();
    return () => { cancelled = true; };
  }, [id]);

  if (loading) return <div className="center"><Spinner /></div>;
  if (error) return <p className="error-text" role="alert">{error}</p>;
  if (!data) return <p className="empty-text">Not available.</p>;

  const title = data.title;
  const description = normalizeDescription(data.description);
  const subjects = data.subjects || [];
  const firstPublished = data.first_publish_date || data.first_publish_year;

  return (
    <div className="details-page">
      <Header />
      <h2 className="page-title">{title}</h2>
      {firstPublished ? <p className="details-meta">First published: {firstPublished}</p> : null}
      <p className="details-desc">{description}</p>
      {subjects.length ? (
        <div className="details-subjects">
          <strong>Subjects:</strong>
          <ul>
            {subjects.slice(0, 16).map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default BookDetails;
