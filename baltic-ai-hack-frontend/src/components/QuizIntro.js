import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const QuizIntro = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="bg-green-100 text-green-700 font-semibold px-8 py-3 rounded-full flex items-center mb-8 mt-40 text-2xl">
        <span className="mr-2">🔗</span>
        <span>Physics</span>
      </div>

      <h1 className="text-2xl md:text-5xl text-center font-semibold text-black mb-8">
        Let’s take a quiz, so we can find the <br />
        <span className="underline">best learning methods</span> for you.
      </h1>

      <Button onClick={() => navigate("/quiz")}>Take a quiz</Button>
    </div>
  );
};

export default QuizIntro;
