import { log } from 'console';
import './App.css';
import { useEffect, useState } from 'react';


function App() {

  const [query, setQuery] = useState('');

  return (
    <div className="App">
    <h1>Welcome to assignment 6</h1>
    <h2>Persons</h2>
    <input 
      type="text" 
      placeholder="Search for persons" 
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <Main query={query} />
    </div>
  );
}


function Main({ query }: { query: string }) {


  const [persons, setPersons] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevQuery, setPrevQuery] = useState(query);
  const [page, setPage] = useState(1);
  const [prevPage, setPrevPage] = useState(page);
  const [totalPages, setTotalPages] = useState();
  const [index, setIndex] = useState(0);

  const apiurl = 'https://api.themoviedb.org/3/search/person';
  const key = 'cf5242e669c485673e290d7a2070224e';
  const url = `${apiurl}?query=${query}&page=${page}&api_key=${key}`;
  console.log(url);

  useEffect(() => {
    if (query !== prevQuery) {
      setPersons([]);
      setSelectedIndex(0);
      setPrevQuery(query);
      setPage(1);
      setIndex(0);
    }

    if (page !== prevPage && page !== 1) {
      setSelectedIndex(0);
      setPrevPage(page);
      setIndex(page * 20 -20)
    }

    if (page === 1) {
      setIndex(0);
      setPrevPage(page);
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setPersons(data.results);
      setTotalPages(data.total_pages);
      console.log(data)});
  }, [query, url, prevQuery]);


  return persons.length === 0 ?(
    <div>
      <p>No person found</p>
      <img src="https://www.reactiongifs.us/wp-content/uploads/2014/08/somethings_fucky_trailer_park_boys.gif" alt="No person found" />
    </div>
  ) : (
    <div>
      <div className= "button-nav">
        {selectedIndex === 0 ? null :<button onClick={() => setSelectedIndex(0)}>{1 + index}</button>}
        {selectedIndex === 0 ? null : <p>...</p>}
        {selectedIndex > 2 ?<button onClick={() => setSelectedIndex(selectedIndex - 2)}>{selectedIndex - 1 + index}</button>: null}
        {selectedIndex > 1 ?<button onClick={() => setSelectedIndex(selectedIndex - 1)}>{selectedIndex + index}</button>: null}
        <button disabled >{selectedIndex +1 + index}</button>
        {selectedIndex < persons.length - 1 ?<button onClick={() => setSelectedIndex(selectedIndex + 1)}>{selectedIndex + 2 + index}</button>: null}
        {selectedIndex < persons.length - 3 ?<button onClick={() => setSelectedIndex(selectedIndex + 2)}>{selectedIndex + 3 + index}</button>: null}
        {selectedIndex === persons.length - 2 || selectedIndex === persons.length - 1 ? null : <p>...</p>}
        {selectedIndex === persons.length - 2 || selectedIndex === persons.length - 1 ? null :<button onClick={() => setSelectedIndex(persons.length - 1)}>{persons.length + index}</button>}
      </div>
      <div className= "button-nav">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous Page</button>
        <p>Page {page} of {totalPages}</p>
        <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next Page</button>
      </div>
      <ul>
        {persons
        .filter((_:any, index: any) => index === selectedIndex)
        .map((person: any) => ( 
        <Person key={person.id} {...person} />
        ))}
      </ul>
    </div>
    );
}



function Person(person: any) {
  return (
    <div>
      <hr />
      <h1>Person</h1>
      <p>Person's name: {person.name}</p>
      <p>Department: {person.known_for_department}</p>
      < KnownForPerson {...person} />
      <ImagesPerson {...person} />
    </div>
  );
}

function ImagesPerson(person: any) {

  const apiurl = 'https://api.themoviedb.org/3/person';
  const key = 'cf5242e669c485673e290d7a2070224e';
  const url = `${apiurl}/${person.id}/images?api_key=${key}`;

  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setImages(data.profiles);
    });
  }, [url]);

  return (
  <div>
      <hr />
      <ul className="image-list">
        {images.map((image: any) => (
          <li key={image.file_path}>
            <img src={`https://image.tmdb.org/t/p/w154${image.file_path}`} alt={image.file_path} />
          </li>
        ))}
      </ul>
  </div>
  )
}

function KnownForPerson(person: any) {
  return (
    <div>
      <p>Known for:</p>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Release date</th>
            <th>Overwiev</th>
          </tr>
        </thead>
        <tbody>
          {person.known_for.map((movie: any) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
              <td>{movie.release_date}</td>
              <td>{movie.overview}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
