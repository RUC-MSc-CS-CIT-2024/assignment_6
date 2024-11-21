import { useEffect, useState } from "react";
import { getPersonsImage } from "../api/getPersonsImage";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";

interface ImagesForProps {
    personId: number;
}

interface Profile {
    file_path: string;
}

export default function ImagesFor({ personId }: ImagesForProps) {
    const [profiles, setProfiles] = useState<Profile[]>([]);

    const { data, isLoading } = useQuery({
        queryKey: ["person", personId],
        queryFn: () => getPersonsImage(personId),
    });

    useEffect(() => {
        if (data) {
            setProfiles(data.profiles);
        }
    }, [data]);

    return (
        <div className="flex flex-wrap justify-center gap-4 mt-4">
            {isLoading
                ? Array.from({ length: 6 }).map((_, index) => (
                      <Skeleton key={index} className="w-24 h-24 rounded-lg" />
                  ))
                : profiles.map((profile, index) => (
                      <img
                          key={index}
                          src={`${import.meta.env.VITE_IMAGE_URL}${
                              profile.file_path
                          }`}
                          alt={`Profile ${index}`}
                          className="object-cover w-24 h-24 rounded-lg shadow-md"
                      />
                  ))}
        </div>
    );
}
