export default function ThreeBoxes() {
    return (
        <div className="w-full bg-white">
            <div className="mx-auto max-w-5xl  px-4 py-8">
                <div className="flex flex-col gap-4 md:flex-row">
                    <div className="box w-full rounded-lg border border-black p-4 pb-6 pt-6 text-center">
                        <div className="number text-2xl font-bold">1</div>
                        <h3 className="title mt-2 text-xl font-bold">
                            Create your account
                        </h3>
                        <p className="subtitle mt-2 text-base">
                            Be done in 5 minutes. Free and just email address
                            needed to register.
                        </p>
                    </div>

                    <div className="box w-full rounded-lg border border-black p-4 pb-6 pt-6 text-center">
                        <div className="number text-2xl font-bold">2</div>
                        <h3 className="title mt-2 text-xl font-bold">
                            Add your title, description, location
                        </h3>
                        <p className="subtitle mt-2 text-base">
                            Preview your post in realtime while constructing it.
                        </p>
                    </div>

                    <div className="box w-full rounded-lg border border-black p-4 pb-6 pt-6 text-center">
                        <div className="number text-2xl font-bold">3</div>
                        <h3 className="title mt-2 text-xl font-bold">
                            Receive resume on your email
                        </h3>
                        <p className="subtitle mt-2 text-base">
                            Enter your receiving email address and receive
                            applicants emails directly on it.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
