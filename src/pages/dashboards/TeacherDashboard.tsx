
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CourseCard from "@/components/CourseCard";

const TeacherDashboard = () => {
  const { user } = useAuth();
  const { courses, getCoursesByInstructor } = useData();
  const navigate = useNavigate();

  // Get courses taught by this teacher
  const teacherCourses = getCoursesByInstructor(user?.id || "");

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-lms-background dark:bg-gray-900 flex-1">
        <div className="lms-page-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="lms-section-title">Teacher Dashboard</h1>
            <Button onClick={() => navigate("/teacher/create-course")}>
              Create New Course
            </Button>
          </div>
          
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Your Courses</CardTitle>
                <CardDescription>Manage your course catalog</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{teacherCourses.length}</span>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/teacher/courses")}>
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Students</CardTitle>
                <CardDescription>Students enrolled in your courses</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{teacherCourses.reduce((acc, course) => acc + course.enrolledStudents, 0)}</span>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/teacher/students")}>
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Average Rating</CardTitle>
                <CardDescription>Overall course satisfaction</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-3xl font-bold mr-2">
                      {teacherCourses.length > 0 
                        ? (teacherCourses.reduce((acc, course) => acc + course.rating, 0) / teacherCourses.length).toFixed(1) 
                        : "N/A"
                      }
                    </span>
                    {teacherCourses.length > 0 && (
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-yellow-500">
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    )}
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => navigate("/teacher/reviews")}>
                    View All
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Your Courses */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Courses</h2>
              <Button variant="outline" onClick={() => navigate("/teacher/courses")}>
                Manage All Courses
              </Button>
            </div>
            
            {teacherCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {teacherCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6 text-center py-12">
                  <h3 className="text-lg font-medium mb-2">You haven't created any courses yet</h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Start creating engaging content for your students today.
                  </p>
                  <Button onClick={() => navigate("/teacher/create-course")}>Create Your First Course</Button>
                </CardContent>
              </Card>
            )}
          </div>
          
          {/* Recent Activity */}
          <div>
            <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="divide-y">
                  <div className="py-3 flex items-start">
                    <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-lms-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">New student enrolled in <span className="text-lms-primary">Introduction to Web Development</span></p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Today at 10:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="py-3 flex items-start">
                    <div className="w-9 h-9 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-lms-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">Assignment submitted by John D. in <span className="text-lms-primary">Advanced JavaScript Frameworks</span></p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Yesterday at 3:45 PM</p>
                    </div>
                  </div>
                  
                  <div className="py-3 flex items-start">
                    <div className="w-9 h-9 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center mr-3 flex-shrink-0">
                      <svg className="w-5 h-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium">New review for <span className="text-lms-primary">Introduction to Web Development</span></p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">2 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
