import { useQuery } from "@tanstack/react-query";
import { getPersons } from "./api/getPersons";
import { Person as PersonType } from "./types";
import { useEffect, useState } from "react";
import "./App.css";
import Person from "@/components/Person";
import { Skeleton } from "@/components/ui/skeleton";
import Pagination from "./components/Pagination";
import Search from "./components/Search";

export default function App() {
    const [person, setPerson] = useState("");
    const [tempPerson, setTempPerson] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, isLoading } = useQuery({
        queryKey: ["person", person],
        queryFn: () => getPersons(person, currentPage),
    });

    console.log(data);

    useEffect(() => {
        if (tempPerson) {
            getPersons(tempPerson, 1).then((results) => {
                setSuggestions(
                    results.results.map((person: PersonType) => person.name)
                );
            });
        } else {
            setSuggestions([]);
        }
    }, [tempPerson]);

    const handlePageChange = (newPage: number) => {
        if (newPage > 0 && newPage <= (data?.results?.length || 1)) {
            setCurrentPage(newPage);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setTempPerson(suggestion);
        setPerson(suggestion);
        setCurrentPage(1);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-6">
                Search for a person in the movie database
            </h1>
            <Search
                tempPerson={tempPerson}
                setTempPerson={setTempPerson}
                setPerson={setPerson}
                setSuggestions={setSuggestions}
                setCurrentPage={setCurrentPage}
                suggestions={suggestions}
                person={person}
                handleSuggestionClick={handleSuggestionClick}
            />
            <div className="mb-20 flex flex-col justify-center items-center">
                {isLoading && tempPerson !== "" ? (
                    <>
                        <Skeleton className="w-[40px] h-[40px] rounded-full mb-5" />
                        <Skeleton className="w-[400px] h-[60px] " />
                    </>
                ) : (
                    data?.results
                        ?.slice((currentPage - 1) * 1, currentPage * 1)
                        .map((person: PersonType) => (
                            <Person person={person} key={person.id} />
                        ))
                )}
            </div>

            {person && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={data?.results?.length || 0}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
