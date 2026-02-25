import { BrowserRouter, Routes, Route } from "react-router-dom";
import KeyboardCopyPage from "./pages/KeyboardCopyPage";
import MouseCopyPage from "./pages/MouseCopyPage";
import KeyboardSavePage from "./pages/KeyboardSavePage";
import MouseSavePage from "./pages/MouseSavePage";
import ResultsPage from "./pages/ResultsPage";
import StartPage from "./pages/StartPage";
import KeyboardSearchPage from "./pages/KeyboardSearchPage";
import MouseSearchPage from "./pages/MouseSearchPage";
import KeyboardRefreshPage from "./pages/KeyboardRefreshPage";
import MouseRefreshPage from "./pages/MouseRefreshPage";

function App() {
  return (
      <BrowserRouter>
        <Routes>
            <Route path={'/1'} element={<KeyboardCopyPage/>}/>
            <Route path={'/2'} element={<MouseCopyPage/>}/>
            <Route path={'/3'} element={<KeyboardSavePage/>}/>
            <Route path={'/4'} element={<MouseSavePage/>}/>
            <Route path={'/5'} element={<KeyboardSearchPage/>}/>
            <Route path={'/6'} element={<MouseSearchPage/>}/>
            <Route path={'/7'} element={<KeyboardRefreshPage/>}/>
            <Route path={'/8'} element={<MouseRefreshPage/>}/>
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/" element={<StartPage />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;