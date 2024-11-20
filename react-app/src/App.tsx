import { useQuery } from "@tanstack/react-query";
import { getPersons } from "./api/getPersons";
import { Person as PersonType } from "./types";
import { useEffect, useState } from "react";
import "./App.css";
import Person from "@/components/Person";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";
import { getPersonsImage } from "./api/getPersonsImage";
import { Button } from "./components/ui/button";
import { ScrollArea } from "./components/ui/scroll-area";
import { Separator } from "./components/ui/separator";

export default function App() {
    const [person, setPerson] = useState("spielberg");
    const [tempPerson, setTempPerson] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    const { data: personsData, isLoading: personsDataIsLoading } = useQuery({
        queryKey: ["person", person],
        queryFn: () => getPersons(person, currentPage),
    });

    const { data: personsImageData } = useQuery({
        queryKey: ["personsImage", person],
        queryFn: () => getPersonsImage(personsData?.results[0].id),
    });

    console.log(personsImageData);

    console.log(personsData);

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
        if (newPage > 0 && newPage <= (personsData?.results?.length || 1)) {
            setCurrentPage(newPage);
        }
    };

    const handleSuggestionClick = (suggestion: string) => {
        setTempPerson(suggestion);
        setPerson(suggestion);
        setSuggestions([]);
        setCurrentPage(1);
    };

    return (
        <div>
            <h1 className="scroll-m-20 text-xl font-extrabold tracking-tight lg:text-3xl mb-6">
                Search for a person in the movie database
            </h1>
            <div className="flex flex-col">
                <div className="flex gap-3">
                    <Input
                        className="mb-5"
                        type="text"
                        value={tempPerson}
                        onChange={(e) => setTempPerson(e.target.value)}
                        placeholder="Enter director name"
                    />
                    <Button
                        onClick={() => {
                            setPerson(tempPerson);
                            setSuggestions([]);
                            setCurrentPage(1);
                        }}
                    >
                        Search
                    </Button>
                </div>
                {suggestions.length > 0 && (
                    <ScrollArea className="h-40 w-full rounded-md border mb-5">
                        <div className="p-4">
                            {suggestions.map((suggestion, index) => (
                                <div key={index} className="text-left">
                                    <div
                                        className="cursor-pointer"
                                        onClick={() =>
                                            handleSuggestionClick(suggestion)
                                        }
                                    >
                                        {suggestion}
                                    </div>
                                    <Separator className="my-2" />
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                )}
            </div>
            <div className="mb-20 flex flex-col justify-center items-center">
                {personsDataIsLoading ? (
                    <>
                        <Skeleton className="w-[40px] h-[40px] rounded-full mb-5" />
                        <Skeleton className="w-[400px] h-[60px] " />
                    </>
                ) : (
                    personsData?.results
                        ?.slice((currentPage - 1) * 1, currentPage * 1)
                        .map((person: PersonType) => (
                            <Person person={person} key={person.id} />
                        ))
                )}
            </div>

            <Pagination>
                <PaginationContent>
                    <PaginationItem className="pr-5">
                        {currentPage !== 1 && (
                            <PaginationPrevious
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                            />
                        )}
                    </PaginationItem>
                    <PaginationItem>
                        {currentPage > 2 && (
                            <PaginationLink
                                className="mx-1"
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage - 2)
                                }
                            >
                                {currentPage - 2}
                            </PaginationLink>
                        )}
                        {currentPage > 1 && (
                            <PaginationLink
                                className="mx-1"
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                            >
                                {currentPage - 1}
                            </PaginationLink>
                        )}

                        <PaginationLink
                            className="bg-[#646cff] text-white mx-1"
                            href="#"
                            onClick={() => handlePageChange(currentPage)}
                        >
                            {currentPage}
                        </PaginationLink>

                        {currentPage < (personsData?.results?.length || 0) && (
                            <PaginationLink
                                className="mx-1"
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                            >
                                {currentPage + 1}
                            </PaginationLink>
                        )}
                        {currentPage <
                            (personsData?.results?.length || 0) - 1 && (
                            <PaginationLink
                                className="mx-1"
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage + 2)
                                }
                            >
                                {currentPage + 2}
                            </PaginationLink>
                        )}
                    </PaginationItem>
                    <PaginationItem className="pl-5">
                        {currentPage !== personsData?.results?.length && (
                            <PaginationNext
                                href="#"
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                            />
                        )}
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}
