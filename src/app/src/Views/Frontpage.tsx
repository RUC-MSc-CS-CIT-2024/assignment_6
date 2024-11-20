import React, { useEffect, useState } from "react";
import Person from "../Components/Person/Person";
import { IPerson } from "../Components/Person/Types/IPerson";
import api from "../Utils/ApiUtils";

const QUERY = "spielberg";

const FrontPage: React.FC = () => {
  const [persons, setPersons] = useState<IPerson[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersons = async () => {
      try {
        const response = await api.getWithParams<any>(`/search/person`, {
          query: QUERY,
        });
  
        console.log("API Response:", response); // Log the entire response
  
        const personResults: IPerson[] = response.data.results.map((result: any) => ({
          name: result.name,
          known_for_department: result.known_for_department,
        }));
  
        console.log("Mapped Results:", personResults); // Log the mapped results
  
        setPersons(personResults);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchPersons();
  }, []);
  

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Person Search Results</h1>
      <div>
        {persons.map((person, index) => (
          <Person key={index} person={person} />
        ))}
      </div>
    </div>
  );
};

export default FrontPage;
