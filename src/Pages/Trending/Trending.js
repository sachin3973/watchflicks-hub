import axios from "axios";
import { useEffect, useState } from "react";
import CustomePagination from "../../components/Pagination/CustomePagination";
import SingleContent from "../../components/SingleContent/SingleContent";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import "./Trending.css";

const Trending = () => {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  const fetchTrending = async () => {
    const { data } = await axios.get(`
    https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`);

    setContent(data.results);
  };

  useEffect(() => {
    fetchTrending();
    // eslint-disable-next-line
  }, [page]);

  return (
    <div>
      <span className="pageTitle">
        <WhatshotIcon fontSize="large" />
        Trending
      </span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomePagination setPage={setPage} />
    </div>
  );
};

export default Trending;
