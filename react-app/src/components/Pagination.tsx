import {
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "./ui/pagination";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

export default function Pagination({
    currentPage,
    totalPages,
    onPageChange,
}: PaginationProps) {
    return (
        <div>
            <PaginationContent>
                <PaginationItem className="pr-5">
                    {currentPage !== 1 && (
                        <PaginationPrevious
                            className="cursor-pointer"
                            onClick={() => onPageChange(currentPage - 1)}
                        />
                    )}
                </PaginationItem>
                <PaginationItem>
                    {currentPage > 2 && (
                        <PaginationLink
                            className="mx-1 cursor-pointer"
                            onClick={() => onPageChange(currentPage - 2)}
                        >
                            {currentPage - 2}
                        </PaginationLink>
                    )}
                    {currentPage > 1 && (
                        <PaginationLink
                            className="mx-1 cursor-pointer"
                            onClick={() => onPageChange(currentPage - 1)}
                        >
                            {currentPage - 1}
                        </PaginationLink>
                    )}

                    <PaginationLink
                        className="bg-[#242424] text-white mx-1 cursor-pointer"
                        onClick={() => onPageChange(currentPage)}
                    >
                        {currentPage}
                    </PaginationLink>

                    {currentPage < totalPages && (
                        <PaginationLink
                            className="mx-1 cursor-pointer"
                            onClick={() => onPageChange(currentPage + 1)}
                        >
                            {currentPage + 1}
                        </PaginationLink>
                    )}
                    {currentPage < totalPages - 1 && (
                        <PaginationLink
                            className="mx-1 cursor-pointer"
                            onClick={() => onPageChange(currentPage + 2)}
                        >
                            {currentPage + 2}
                        </PaginationLink>
                    )}
                </PaginationItem>
                <PaginationItem className="pl-5">
                    {currentPage !== totalPages && (
                        <PaginationNext
                            className="cursor-pointer"
                            onClick={() => onPageChange(currentPage + 1)}
                        />
                    )}
                </PaginationItem>
            </PaginationContent>
        </div>
    );
}
