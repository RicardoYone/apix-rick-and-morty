import Pagination from "./components/Pagination";
import Characters from "./components/Characters";
import React,{ useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
  const [characters, setCharacters] = useState([]);
  const [info, setInfo] = useState({});

  const initialUrl = "https://rickandmortyapi.com/api/character";

  const fetchCharacters = (url) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCharacters(data.results);
        setInfo(data.info);
      })
      .catch((error) => console.log(error));
  };
  
  const onNext = () => {
    fetchCharacters(info.next);
  };

  const onPrevius = () => {
    fetchCharacters(info.prev);
  };

  useEffect(() => {
    fetchCharacters(initialUrl);
  }, []);

  return (
    <>
      <Navbar brand={"Rick and Morty APP"} />

      <div className="container mt-5">
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevius}
          onNext={onNext}
        />

        <Characters characters={characters} />
        
        <Pagination
          prev={info.prev}
          next={info.next}
          onPrevious={onPrevius}
          onNext={onNext}
        />
      </div>
    </>
  );
}

export default App;
