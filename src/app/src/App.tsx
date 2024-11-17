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

  const apiurl = 'https://api.themoviedb.org/3/search/person';
  const key = 'cf5242e669c485673e290d7a2070224e';
  const url = `${apiurl}?query=${query}&api_key=${key}`;

  const [persons, setPersons] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevQuery, setPrevQuery] = useState(query);

  useEffect(() => {
    if (query !== prevQuery) {
      setPersons([]);
      setSelectedIndex(0);
      setPrevQuery(query);
    }

    fetch(url)
    .then(response => response.json())
    .then(data => {
      setPersons(data.results);
      console.log(data)});
  }, [query, url, prevQuery]);


  return persons.length === 0 ?(
    <div>
      <p>No person found</p>
    </div>
  ) : (
    <div>
      <h1>Persons</h1>
      <ul>
        {persons
        .filter((_:any, index: any) => index === selectedIndex)
        .map((person: any) => ( 
        <Person {...person} />
        ))}
      </ul>
      <hr />
      <div className= "button-nav">
        {selectedIndex === 0 ? null :<button onClick={() => setSelectedIndex(0)}>1</button>}
        {selectedIndex === 0 ? null : <p>...</p>}
        {selectedIndex > 2 ?<button onClick={() => setSelectedIndex(selectedIndex - 2)}>{selectedIndex - 1}</button>: null}
        {selectedIndex > 1 ?<button onClick={() => setSelectedIndex(selectedIndex - 1)}>{selectedIndex}</button>: null}
        <button disabled >{selectedIndex +1 }</button>
        {selectedIndex < persons.length - 1 ?<button onClick={() => setSelectedIndex(selectedIndex + 1)}>{selectedIndex + 2}</button>: null}
        {selectedIndex < persons.length - 3 ?<button onClick={() => setSelectedIndex(selectedIndex + 2)}>{selectedIndex + 3}</button>: null}
        {selectedIndex === persons.length - 2 || selectedIndex === persons.length - 1 ? null : <p>...</p>}
        {selectedIndex === persons.length - 2 || selectedIndex === persons.length - 1 ? null :<button onClick={() => setSelectedIndex(persons.length - 1)}>{persons.length}</button>}
      </div>
    </div>
    );
}



function Person(person: any) {
  return (
    <div>
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
