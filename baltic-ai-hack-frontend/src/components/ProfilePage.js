import React from "react";
import { useUser } from "../context/UserContext";
import SignOutButton from "./SignOutButton";

const ProfilePage = () => {
  const { userType } = useUser();

  return (
    <>
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-12">
        <div className="container mx-auto text-center">
          <div className="relative flex items-center justify-center">
            <img
              className="rounded-full border-4 border-white w-24 h-24 mx-auto"
              src={
                userType === "student"
                  ? "/student-avatar.png"
                  : userType === "teacher"
                  ? "/teacher-avatar.png"
                  : "/guest-avatar.png"
              }
              alt="Profile"
            />
          </div>
          {/* "" */}
          <h1 className="text-2xl font-semibold text-white mt-4">
            {userType === "student"
              ? "Dave Student"
              : userType === "teacher"
              ? "Mark Williams"
              : "Guest"}
          </h1>
          <p className="text-gray-200">
            {userType === "student"
              ? "@awesome_student"
              : userType === "teacher"
              ? "@awesome_teacher"
              : "@awesome_guest"}
          </p>
          {userType === "guest" ? null : (
            <div className="flex gap-4 items-center justify-center mt-4">
              <button className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded  font-bold">
                Edit Profile
              </button>
              <SignOutButton />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default ProfilePage;
