import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const ResultPage = () => {
  const navigate = useNavigate();
  const { setQuizView } = useUser();

  const handleClick = () => {
    setQuizView(null);
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-min p-8">
      <h1 className="flex items-center text-5xl font-bold my-8">
        Results of your
        <span className="bg-green-100 text-green-700 font-semibold px-4 py-2 rounded-full text-3xl flex items-center mx-4">
          <span className="mr-2">🔗</span>
          <span>Physics</span>
        </span>
        test
      </h1>

      <section className="w-2/3 text-2xl flex flex-col gap-6">
        <p>Hey, Dave! 👋</p>
        <p>
          We noticed you learn best with hands-on activities and working with
          friends. You’re familiar with some physics concepts, but we’ll help
          you understand gravity and energy better through fun videos and
          experiments.🗜
        </p>
        <p>
          You don’t like too many tests, so we’ve kept them light and let you
          track progress at your own pace. ⏳
        </p>
        <p>
          Give our personalized study plan a try – it’s tailored just for you!
          😉
        </p>
        <Button onClick={handleClick}>Jump to study plan</Button>
      </section>
    </div>
  );
};

export default ResultPage;
