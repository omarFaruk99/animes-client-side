import {Route, Routes} from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home/Home.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home></Home>}>

                </Route>
                {/* Add more routes here as needed */}
            </Route>
        </Routes>
    )
}

export default App
