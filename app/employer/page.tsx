import Button from "@mui/material/Button"

export default function EmployerPage() {
    return (
        <div className="relative w-full h-screen flex items-center justify-center">
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    zIndex: -1
                }}
            >
                <img
                    src="/employers.jpg"
                    alt="Employers"
                    className="object-cover w-full h-full"
                />
            </div>
            <div className="relative z-10 text-center md:text-left">
                <h1 className="text-4xl font-bold">
                    Make your new harvest hire
                </h1>
                <p className="text-xl mt-2">
                    Post a job for free and find the right candidate
                </p>
                <Button variant="contained" className="mt-4 rounded-full">
                    Post a job
                </Button>
            </div>
        </div>
    )
}
