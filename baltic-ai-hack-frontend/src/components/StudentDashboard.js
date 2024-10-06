import React from "react";
import QuizIntro from "./QuizIntro";
import { useUser } from "../context/UserContext";
import ResultPage from "./ResultPage";

const StudentDashboard = () => {
  const { quizView } = useUser();

  return (
    <>
      {quizView === "quiz" ? (
        <QuizIntro />
      ) : quizView === "result" ? (
        <ResultPage />
      ) : null}
    </>
  );
};

export default StudentDashboard;
