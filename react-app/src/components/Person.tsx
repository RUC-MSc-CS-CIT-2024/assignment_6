import { KnownFor, Person as PersonType } from "@/types";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useState } from "react";
import ImagesFor from "./ImagesFor";
import MovieCard from "./MovieCard";
import { Button } from "./ui/button";
import { Rating, ThinStar } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";

interface PersonProps {
    person: PersonType;
}

export default function Person({ person }: PersonProps) {
    const [expandedMovies, setExpandedMovies] = useState<{
        [key: string]: boolean;
    }>({});
    const [showImages, setShowImages] = useState(false);

    const toggleExpand = (id: number) => {
        setExpandedMovies((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const toggleShowImages = () => {
        setShowImages((prev) => !prev);
    };

    const popularityRating = person.popularity / 20;
    const myStyles = {
        itemShapes: ThinStar,
        activeFillColor: "#ffb700",
        inactiveFillColor: "#fbf1a9",
    };

    return (
        <div className="flex justify-center flex-col items-center">
            <Avatar>
                <AvatarImage
                    className="object-cover aspect-w-3 aspect-h-1"
                    src={`${import.meta.env.VITE_IMAGE_URL}${
                        person.profile_path
                    }`}
                />
                <AvatarFallback>
                    {person.name
                        .split(" ")
                        .map((word) => word[0])
                        .join("")}
                </AvatarFallback>
            </Avatar>
            <h2 className="scroll-m-20 border-b pb-2 text-2xl font-semibold tracking-tight first:mt-0">
                {person.name}
            </h2>

            <div className="mt-4 flex flex-col items-center">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <b>Department: </b>
                    {person.known_for_department}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <b>Gender: </b>
                    {person.gender === 2 ? "Male" : "Female"}
                </p>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    <b>Popularity: </b>
                </p>
                <Rating
                    style={{ maxWidth: 250 }}
                    value={popularityRating}
                    readOnly
                    itemStyles={myStyles}
                    className=""
                />
                {person.profile_path && (
                    <Button onClick={toggleShowImages} className="mt-4">
                        {showImages
                            ? "Hide images"
                            : `Show more images of ${person.name}`}
                    </Button>
                )}
                {showImages && <ImagesFor personId={person.id} />}
            </div>

            {person.known_for[0]?.title && (
                <div className="leading-7 [&:not(:first-child)]:mt-6">
                    <b>Known for movies: </b>
                    <div className="flex justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {person.known_for
                                .filter(
                                    (movie: {
                                        title: string;
                                        poster_path: string;
                                    }) => movie.title
                                )
                                .map((movie: KnownFor) => (
                                    <MovieCard
                                        key={movie.id}
                                        movie={movie}
                                        isExpanded={!!expandedMovies[movie.id]}
                                        onToggleExpand={toggleExpand}
                                    />
                                ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
