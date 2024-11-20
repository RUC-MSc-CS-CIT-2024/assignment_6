interface KnownFor {
    backdrop_path: string;
    id: number;
    title: string;
    original_title: string;
    overview: string;
    poster_path: string;
    media_type: string;
    adult: boolean;
    original_language: string;
}

export interface Person {
    id: number;
    name: string;
    known_for_department: string;
    gender: number;
    profile_path: string;
    known_for: KnownFor[];
}
