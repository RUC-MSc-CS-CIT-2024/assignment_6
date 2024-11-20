import { Person as PersonType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

interface PersonProps {
    person: PersonType;
}

export default function Person({ person }: PersonProps) {
    return (
        <div className="flex justify-center flex-col items-center">
            <Avatar>
                <AvatarImage
                    className="object-cover aspect-w-3 aspect-h-1"
                    src={`${import.meta.env.VITE_BASE_URL_IMAGE}${
                        person.profile_path
                    }`}
                />
                <AvatarFallback>
                    {" "}
                    {person.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                {person.name}
            </h2>

            <p className="leading-7 [&:not(:first-child)]:mt-6">
                <b>Department: </b>
                {person.known_for_department}
            </p>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                <b>Gender: </b>
                {person.gender === 2 ? "Male" : "Female"}
            </p>
            {person.known_for[0].title && (
                <div className="leading-7 [&:not(:first-child)]:mt-6">
                    <b>Known for movies: </b>
                    <div className="flex justify-center">
                        {person.known_for
                            .filter((movie: { title: string; poster_path: string }) => movie.title)
                            .map((movie: { title: string; poster_path: string }) => (
                                <div key={movie.poster_path} className="m-2 flex flex-col h-full min-h-[10px] max-w-[150px] max-h-[225px]">
                                    {movie.poster_path ? (
                                        <img
                                            src={`${import.meta.env.VITE_BASE_URL_IMAGE}${movie.poster_path}`}
                                            alt={movie.title}
                                            className="object-cover aspect-w-2 aspect-h-3 max-w-[150px] max-h-[225px]"
                                        />
                                    ) : (
                                        <div className="bg-gray-200 flex items-center justify-center w-full h-full min-w-[150px] min-h-[225px]">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                    <p className="text-center">{movie.title}</p>
                                </div>
                            ))}
                    </div>
                </div>
            )}
            
            </div>
    );
}
