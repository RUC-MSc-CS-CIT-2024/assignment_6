import React from "react";
import { IPerson } from "./Types/IPerson";

interface PersonProps {
  person: IPerson;
}

const Person: React.FC<PersonProps> = ({ person }) => {
  return (
    <div className="person-card">
      <h2>{person.name}</h2>
      <p>Department: {person.known_for_department}</p>
    </div>
  );
};

export default Person;
