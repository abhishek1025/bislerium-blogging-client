import { Button, Typography } from "@material-tailwind/react";

const PaginationButton = ({ length, page, limit, setPage }) => {
    const handlePageChange = (action) => {
        // Decrease page on prev
        if (action === "prev") {
            setPage((prevPage) => prevPage - 1);
            return;
        }

        // Increase page on next
        setPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            {/* Pagination buttons */}
            {(page !== 1 || (page === 1 && length === limit)) && (
                <div className="flex items-center justify-between py-8">
                    <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="font-semibold"
                    >
                        Page {page}
                    </Typography>

                    <div className="flex gap-2">
                        <Button
                            variant="outlined"
                            type="button"
                            size="sm"
                            onClick={() => page !== 1 && handlePageChange("prev")}
                            disabled={page === 1}
                        >
                            Previous
                        </Button>

                        <Button
                            type="button"
                            variant="outlined"
                            size="sm"
                            onClick={() => length === limit && handlePageChange("next")}
                            disabled={length !== limit}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PaginationButton;
