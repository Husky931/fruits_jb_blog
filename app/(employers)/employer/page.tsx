import Button from "@mui/material/Button"

export default function EmployerPage() {
    return (
        <main className="w-full h-full">
            <header
                className="relative w-full h-full bg-no-repeat bg-cover bg-center"
                style={{
                    backgroundImage: "url('/employers.jpg')"
                }}
            >
                <div className="z-10 text-center p-4 flex flex-col justify-center items-center h-full w-full">
                    <h1 className="text-[40px] sm:text-[45px] md:text-[60px] mb-[30px] font-bold text-yellow-100">
                        Make your new harvest hire
                    </h1>
                    <p className="text-[20px] mt-2 text-white">
                        Post a job for free and find the right candidate
                    </p>
                    <Button
                        variant="contained"
                        className="mt-24 py-3 px-6 rounded-full bg-white text-gray-800 font-bold"
                    >
                        Post a job
                    </Button>
                </div>
            </header>
        </main>
    )
}
