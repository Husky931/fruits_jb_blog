import Button from "@mui/material/Button"

export default function EmployerPage() {
    return (
        <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-x-hidden">
            <img
                src="/employers.jpg"
                alt="Employers"
                className="absolute inset-0 w-full h-full object-cover object-right md:object-center lg:object-none"
            />
            <div className="relative z-10 text-center text-white p-4 flex flex-col justify-center items-center h-full w-full">
                <h1 className="text-4xl font-bold">
                    Make your new harvest hire
                </h1>
                <p className="text-xl mt-2">
                    Post a job for free and find the right candidate
                </p>
                <Button
                    variant="contained"
                    className="mt-4 rounded-full bg-white text-gray-800"
                >
                    Post a job
                </Button>
            </div>
        </div>
    )
}
