import { Button } from "@/components/ui/button";
import Person from "@/components/Person";
import { useQuery } from "@tanstack/react-query";
import { getPersons } from "./api/getPersons";
import { Person as PersonType } from "./types";

export default function App() {
    const query = useQuery({ queryKey: ["persons"], queryFn: getPersons });

    return (
        <div>
            <Button>Click me</Button>
            <h1>Persons</h1>
            <ul>
                {query.data?.results?.map((person: PersonType) => (
                    <li key={person.id}>
                        <Person person={person} />
                    </li>
                ))}
            </ul>
        </div>
    );
}
