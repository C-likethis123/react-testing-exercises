import useApi from "../hooks/useApi";
import axios from "axios";
import { useEffect } from "react";

const getData = () => axios.get("https://jsonplaceholder.typicode.com/posts");
const Loading = () => {
  const getPostsApi = useApi(getData);
  useEffect(() => {
    getPostsApi.request();
  }, []);

  return (<div className="App">
    <div>
      <h1>Posts</h1>
      {getPostsApi.loading && <p>Posts are loading!</p>}
      {getPostsApi.error && <p>{getPostsApi.error}</p>}
      <ul>
        {getPostsApi.data?.map((post) => (
          <li data-testid={`post-${post.id}`} key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  </div>);
}

export default Loading;
