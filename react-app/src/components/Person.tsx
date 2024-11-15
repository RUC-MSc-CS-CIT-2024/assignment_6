import { Person as PersonType } from "@/types";

interface PersonProps {
    person: PersonType;
}

export default function Person({ person }: PersonProps) {
    return (
        <div>
            <h2>{person.name}</h2>
            <p>Department: {person.known_for_department}</p>
        </div>
    );
}
