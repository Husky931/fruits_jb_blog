import Button from "@mui/material/Button"

export default function HeroImage() {
    return (
        <header className="relative w-full h-[400px] md:h-[400px] xl:h-[500px] 2xl:h-[700px] bg-no-repeat bg-cover bg-top bg-[url('/employers-mob.jpg')] md:bg-[url('/employers.jpg')]">
            <div className="z-10 text-center p-4 flex flex-col justify-center items-center w-auto h-full md:items-start md:justify-center md:ml-4">
                <h1 className="text-[40px] lg:text-[60px] font-bold !text-yellow-300">
                    Make your New harvest hire
                </h1>
                <p className="text-[20px] mt-2 text-white">
                    Post a job for free and find the right candidate
                </p>
                <Button
                    variant="contained"
                    className="mt-12 md:ml-4 lg:mt-18 py-3 px-20 rounded bg-[#2557A7] text-white font-bold"
                >
                    Post a job
                </Button>
            </div>
        </header>
    )
}
