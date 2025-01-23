import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "./Card";
const API_KEY =
  "live_GLKchSeJnzh1lu0DPy53mSSPx5s8nfn9szR2AytAVgzsjpDTbRLAgcQFTogZQyHh";
const PAGE_BTN = [1, 2, 3, 4, 5];

export default function CatAppContent() {
  const { id } = useParams();

  const [images, setImages] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [pageBtns, setPageBtns] = useState(PAGE_BTN);

  useEffect(() => {
    const fetchCats = async () => {
      const headers = new Headers({
        "Content-Type": "application/json",
        "x-api-key": API_KEY,
      });

      var requestOptions = {
        method: "GET",
        headers: headers,
        redirect: "follow",
      };
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=ASC&page=${page}&limit=${limit}`,
          requestOptions
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setImages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCats();
  }, [id, page, limit]);

  const handleNextPage = () => {
    setPage((currentPage) => currentPage + 1);
  };

  const handleBackPage = () => {
    if (page > 1) {
      setPage((currentPage) => currentPage - 1);
    }
  };

  useEffect(() => {
    if (page === pageBtns[pageBtns.length - 1]) {
      const _pageBtns = [...pageBtns];
      _pageBtns.push(page + 1);
      _pageBtns.shift();
      setPageBtns(_pageBtns);
    }
    if (page !== 1 && page === pageBtns[0]) {
      const _pageBtns = [...pageBtns];

      _pageBtns.unshift(page - 1);
      _pageBtns.pop();
      setPageBtns(_pageBtns);
    }
  }, [page, pageBtns]);
  console.log({ pageBtns, page });
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="image-app">
      <h2>Images</h2>
      <div className="images-list">
        {loading ? (
          <p>...loading</p>
        ) : (
          images?.map((image) => <Card key={image.id} image={image} />)
        )}
      </div>
      <div className="paginate">
        <div className="button-pg" onClick={handleBackPage}>
          back
        </div>
        {pageBtns.map((el) => (
          <div
            onClick={() => setPage(el)}
            className={`button-pg ${el === page ? "selected-btn" : ""}`}
            key={el}
          >
            {el}
          </div>
        ))}
        <div className="button-pg" onClick={handleNextPage}>
          next
        </div>
      </div>
    </div>
  );
}
