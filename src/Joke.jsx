import React, {useState, useEffect} from 'react';
import { useQuery } from 'react-query';

export default function Joke() {

  const [joke, setJoke] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState(null);

  useEffect( () => {
    fetch('https://api.chucknorris.io/jokes/random')
    .then(response => response.json())
    .then(result => {
      // console.log(results);
      setIsLoading(false)
      setJoke(result.value);
    })
    .catch(error => {
      setIsLoading(false)
      setErrorMessage('There was an error.');
     })
  }, [])
  

  // const {
  //   data: joke,
  //   isLoading,
  //   isError,
  //   error,
  //   isSuccess,
  // } = useQuery('joke', fetchJoke, {
  //   // staleTime: 6000,
  //   refetchOnWindowFocus: false,
  // });

  // function fetchJoke() {
  //   return fetch('https://official-joke-api.appspot.com/jokes/random').then(
  //     response => response.json()
  //   );
  // }

  // const {
  //   data: joke,
  //   isLoading,
  //   errorMessage,
  // } = useFetch('https://official-joke-api.appspot.com/jokes/random');

  return (
    <div>
      <h2>Joke API</h2>

      {isLoading && <div>Loading...</div>}
      { joke && 
     <div>{joke}</div>
      }
      {errorMessage && <div>{errorMessage}</div>}

      {/* {isLoading && <div>Loading...</div>}
      {isSuccess && <div>{joke.setup + ' ' + joke.punchline}</div>}
      {isError && <div>{error.message}</div>} */}
    </div>
  );
}
