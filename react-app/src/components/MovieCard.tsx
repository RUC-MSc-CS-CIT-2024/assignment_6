import { KnownFor } from "@/types";
import { Skeleton } from "./ui/skeleton";
import { useState } from "react";

interface MovieCardProps {
    movie: KnownFor;
    isExpanded: boolean;
    onToggleExpand: (id: number) => void;
}
export default function MovieCard({
    movie,
    isExpanded,
    onToggleExpand,
}: MovieCardProps) {
    const [isImageLoading, setIsImageLoading] = useState(true);
    const shouldShowToggle = movie.overview.length > 100;

    return (
        <div key={movie.id} className="m-2 flex flex-col w-full max-w-xs">
            <div className="flex flex-col justify-center items-center">
            {isImageLoading && movie.poster_path && (
                    <Skeleton className="w-[150px] h-[225px] rounded-lg" />
                )}
                {movie.poster_path ? (
                    <img
                        src={`${import.meta.env.VITE_IMAGE_URL}${movie.poster_path}`}
                        alt={movie.title}
                        className={`object-cover aspect-w-2 aspect-h-3 max-w-[150px] max-h-[225px] rounded-lg shadow-md ${isImageLoading ? 'hidden' : 'block'}`}
                        onLoad={() => setIsImageLoading(false)}
                    />
                ) : (
                    <div className="bg-gray-200 flex items-center justify-center w-100 min-w-[150px] min-h-[225px] rounded-lg shadow-md">
                        <span>No Image</span>
                    </div>
                )}
                <h3 className="mt-4 text-xl font-semibold tracking-tight">
                    {movie.title}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                    Release Date:{" "}
                    {new Date(movie.release_date).toLocaleDateString()}
                </p>
            </div>
            {movie.overview && (
                <p className="mt-4 text-sm text-gray-700 text-left">
                    {isExpanded
                        ? movie.overview
                        : `${movie.overview.substring(0, 100)}...`}
                    {shouldShowToggle && (
                        <a
                            onClick={() => onToggleExpand(movie.id)}
                            className="text-black underline border-none cursor-pointer ml-1"
                        >
                            {isExpanded ? "Show Less" : "Read More"}
                        </a>
                    )}
                </p>
            )}
        </div>
    );
}
