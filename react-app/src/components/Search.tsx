import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { Separator } from "./ui/separator";

interface SearchProps {
    tempPerson: string;
    setTempPerson: (value: string) => void;
    setPerson: (value: string) => void;
    setSuggestions: (value: string[]) => void;
    setCurrentPage: (value: number) => void;
    suggestions: string[];
    person: string;
    handleSuggestionClick: (suggestion: string) => void;
}

const Search: React.FC<SearchProps> = ({
    tempPerson,
    setTempPerson,
    setPerson,
    setSuggestions,
    setCurrentPage,
    suggestions,
    person,
    handleSuggestionClick,
}) => {
    return (
        <div className="flex flex-col">
            <div className="flex gap-3">
                <Input
                    className="mb-5"
                    type="text"
                    value={tempPerson}
                    onChange={(e) => setTempPerson(e.target.value)}
                    placeholder="Enter name"
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
            {suggestions.length > 0 && tempPerson !== person && (
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
    );
};

export default Search;
