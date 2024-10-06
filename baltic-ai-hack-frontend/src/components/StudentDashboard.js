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
      ) : (
        <div className="container mx-auto py-10">
          <h1 className="font-bold text-5xl">Welcome to your dashboard!</h1>
        </div>
      )}
    </>
  );
};

export default StudentDashboard;
