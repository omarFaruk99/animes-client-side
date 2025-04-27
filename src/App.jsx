import {Route, Routes} from "react-router"
import MainLayout from "./layout/MainLayout"
import Home from "./pages/Home/Home.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import Login from "./pages/Auth/Login.jsx";
import TopAnime from "./pages/Anime/TopAnime.jsx";
import AnimeDetails from "./pages/Anime/AnimeDetails.jsx";

function App() {
    return (
        <Routes>
            <Route path="/" element={<MainLayout></MainLayout>}>
                <Route index element={<Home />}/>
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/top-anime" element={<TopAnime />} />
                <Route path="/anime/:id" element={<AnimeDetails />} />
            </Route>
        </Routes>
    )
}

export default App
