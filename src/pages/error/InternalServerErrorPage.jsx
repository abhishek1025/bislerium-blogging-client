const ErrorPage = ({ error }) => {
    console.log(error);
    return (
        <div className="grid h-screen px-4 bg-white place-content-center">
            <div className="text-center">
                <h1 className="font-black text-gray-200 text-9xl">500</h1>
                <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Uh-oh! <br /> Something went wrong
                </p>
                {/* <p className="mt-4 text-red-500">{error.message}</p> */}
                <p className="mt-1 text-red-500">
                    An unexpected error occured. Please try again later !!!
                </p>
                <button
                    onClick={() => window.location.replace("/")}
                    className="inline-block px-5 py-3 mt-6 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default ErrorPage;
