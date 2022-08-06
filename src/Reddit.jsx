import { toHaveErrorMessage } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useState} from 'react';
import { useQuery } from 'react-query';

export default function Reddit() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);

  useEffect( () => {
    fetch('https://www.reddit.com/r/aww.json')
    .then(response => response.json())
    .then(results => {
      // console.log(results);
      setIsLoading(false)
      setPosts(results.data.children)
    })
    .catch(error => {
      setIsLoading(false)
      setErrorMessage('There was an error.');
     })
  }, [])
  
  // const {
  //   data: posts,
  //   isLoading,
  //   errorMessage,
  // } = useFetch('https://www.reddit.com/r/aww.json');

  // const {
  //   data: posts,
  //   isLoading,
  //   isError,
  //   error,
  //   isSuccess,
  // } = useQuery('posts', fetchPosts, {
  //   retry: false,
  // });

  // function fetchPosts() {
  //   return fetch('https://www.reddit.com/r/aww.json').then(response =>
  //     response.json()
  //   );
  // }

  return (
    <div>
      <h2>Reddit API</h2>
      {isLoading && <div>Loading...</div>}
      { posts && 
      <ul>
      {posts.map(post => (
        <li key={post.data.id}>
          <a href={`https://reddit.com${post.data.permalink}`}>
{post.data.title}
{post.data.thumbnail}
          </a>
        </li>
        ))}
      </ul>      
      }
      {errorMessage && <div>{errorMessage}</div>}
      
      {/* {isLoading && <div>Loading...</div>}
      {isSuccess && (
        <ul>
          {posts.data.children.map(post => (
            <li key={post.data.id}>
              <a href={`https://reddit.com${post.data.permalink}`}>
                {post.data.title}
              </a>
            </li>
          ))}
        </ul>
      )}
      {isError && <div>{error.message}</div>} */}
    </div>
  );
}
