"use client"
import { useState } from "react"
import {
    AppBar,
    Toolbar,
    IconButton,
    Menu,
    MenuItem,
    Drawer,
    List,
    ListItem,
    Box
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"

const MyComponent = () => {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState(null)

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen)
    }

    const handleMenuItemClick = (item) => {
        setSelectedItem(item)
        setMobileOpen(false)
    }

    return (
        <div>
            {/* Mobile Menu */}
            <AppBar position="static" className="md:invisible">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Menu open={mobileOpen} onClose={handleDrawerToggle}>
                <MenuItem onClick={() => handleMenuItemClick("Item1")}>
                    Item 1
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Item2")}>
                    Item 2
                </MenuItem>
                <MenuItem onClick={() => handleMenuItemClick("Item3")}>
                    Item 3
                </MenuItem>
            </Menu>

            {/* Sidebar for iPad and above */}
            <Drawer variant="permanent" open className="md:block invisible">
                <List>
                    <ListItem
                        button
                        onClick={() => handleMenuItemClick("Item1")}
                    >
                        Item 1
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => handleMenuItemClick("Item2")}
                    >
                        Item 2
                    </ListItem>
                    <ListItem
                        button
                        onClick={() => handleMenuItemClick("Item3")}
                    >
                        Item 3
                    </ListItem>
                </List>
            </Drawer>

            {/* Content Area */}
            {/* <Box>
                {selectedItem === "Item1" && <Component1 />}
                {selectedItem === "Item2" && <Component2 />}
                {selectedItem === "Item3" && <Component3 />}
            </Box> */}
        </div>
    )
}

export default MyComponent

// "use client"
// import React, { useState } from "react"
// import Menu from "./components/Menu"
// import Dashboard from "./components/Dashboard"
// import ManageJobs from "./components/ManageJobs"
// import PostJob from "./components/PostJob"

// const App = () => {
//     const [currentView, setCurrentView] = useState("Dashboard")

//     return (
//         <div>
//             <Menu setCurrentView={setCurrentView} />
//             {currentView === "Dashboard" && <Dashboard />}
//             {currentView === "ManageJobs" && <ManageJobs />}
//             {currentView === "PostJob" && <PostJob />}
//         </div>
//     )
// }

// export default App
