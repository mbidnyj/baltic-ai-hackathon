import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import ModulePreview from "./components/ModulePreview";
import EditModule from "./components/EditModule";
import Login from "./components/Auth/Login";
import SignUp from "./components/Auth/SignUp";
import { UserProvider } from "./context/UserContext";
import LandingPage from "./components/LandingPage";
import ProfilePage from "./components/ProfilePage";
import QuizPage from "./components/QuizPage";
import ResultPage from "./components/ResultPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<SignUp />} />
            <Route
              path="/module/:moduleId/preview"
              element={<ModulePreview />}
            />
            <Route path="/module/:moduleId/edit" element={<EditModule />} />

            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Route>
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
