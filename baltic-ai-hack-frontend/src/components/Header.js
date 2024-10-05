import React from 'react';

const Header = ({ userType = 'teacher' }) => {
  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center space-x-8">
      {/* Logo Section */}
      <div className="flex items-center space-x-6">
        <span className="text-xl font-semibold text-blue-600">preline</span>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 flex justify-center items-center space-x-8">
        <a href="#" className="text-blue-600 hover:text-blue-800">
          Landing
        </a>
        <a href="#" className="hover:text-gray-700">
          Create Module
        </a>
        {userType === 'teacher' && (
          <a href="#" className="hover:text-gray-700">
            Student Performance
          </a>
        )}
        {userType === 'student' && (
          <a href="#" className="hover:text-gray-700">
            Self-evaluation
          </a>
        )}
        {userType === 'student' && (
          <a href="#" className="hover:text-gray-700">
            Progress
          </a>
        )}
        <a href="#" className="hover:text-gray-700">
          Notifications
        </a>
      </nav>

      {/* User Section */}
      <div className="flex items-center space-x-6">
        {userType === 'guest' && (
          <>
            <button className="px-4 py-2 text-gray-800 border rounded-md hover:bg-gray-100">
              Log in
            </button>
            <button className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700">
              Sign up
            </button>
          </>
        )}
        {(userType === 'teacher' || userType === 'student') && (
          <div className="flex items-center space-x-4">
            <img
              src={
                userType === 'teacher'
                  ? '/path/to/teacher-avatar.png' // Replace with the teacher avatar path
                  : '/path/to/student-avatar.png' // Replace with the student avatar path
              }
              alt={userType === 'teacher' ? 'Teacher Avatar' : 'Student Avatar'}
              className="h-8 w-8 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900">
                {userType === 'teacher' ? 'Mark Williams' : 'Dave Student'}
              </p>
              <p className="text-sm text-gray-500">
                {userType === 'teacher' ? 'Teacher' : 'Student'}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
