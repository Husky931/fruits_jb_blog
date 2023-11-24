import React, { useState } from "react"

const Menu = ({ setCurrentView }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    return (
        <nav className="bg-white shadow-md p-4">
            {/* Hamburger Icon for Mobile View */}
            <div className="md:hidden">
                <button
                    onClick={toggleMobileMenu}
                    className="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white"
                >
                    <svg
                        className="fill-current h-3 w-3"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>Menu</title>
                        <path d="M0 3h20v2H0zM0 9h20v2H0zM0 15h20v2H0z"></path>
                    </svg>
                </button>
            </div>

            {/* Mobile Menu Items */}
            <div
                className={`${
                    isMobileMenuOpen === true ? "block" : "hidden"
                } md:hidden`}
            >
                <ul className="pt-4">
                    <li>
                        <button
                            onClick={() => setCurrentView("Dashboard")}
                            className="block px-4 py-2"
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentView("ManageJobs")}
                            className="block px-4 py-2"
                        >
                            Manage Jobs
                        </button>
                    </li>
                    <li>
                        <button
                            onClick={() => setCurrentView("PostJob")}
                            className="block px-4 py-2"
                        >
                            Post a Job
                        </button>
                    </li>
                </ul>
            </div>

            {/* Desktop Menu Items */}
            <ul className="hidden md:flex flex-col md:flex-row md:space-x-4">
                <li>
                    <button
                        onClick={() => setCurrentView("Dashboard")}
                        className="px-4 py-2"
                    >
                        Dashboard
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setCurrentView("ManageJobs")}
                        className="px-4 py-2"
                    >
                        Manage Jobs
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => setCurrentView("PostJob")}
                        className="px-4 py-2"
                    >
                        Post a Job
                    </button>
                </li>
            </ul>
        </nav>
    )
}

export default Menu
