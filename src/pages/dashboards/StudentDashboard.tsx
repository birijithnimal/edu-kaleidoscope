
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { courses } = useData();
  const navigate = useNavigate();

  // For demo purposes, let's assume the student is enrolled in the first 2 courses
  const enrolledCourses = courses.slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-lms-background dark:bg-gray-900 flex-1">
        <div className="lms-page-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="lms-section-title">Student Dashboard</h1>
            <Button variant="outline" onClick={() => navigate("/courses")}>
              Browse Courses
            </Button>
          </div>
          
          {/* Welcome Card */}
          <Card className="mb-8">
            <CardHeader className="pb-3">
              <CardTitle>Welcome back, {user?.name}!</CardTitle>
              <CardDescription>Track your progress and continue learning</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Your learning stats</p>
                  <div className="flex items-center gap-6">
                    <div>
                      <span className="text-2xl font-bold block">{enrolledCourses.length}</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Courses</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold block">0</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Certificates</span>
                    </div>
                    <div>
                      <span className="text-2xl font-bold block">0</span>
                      <span className="text-sm text-gray-500 dark:text-gray-400">Hours</span>
                    </div>
                  </div>
                </div>
                <Button onClick={() => navigate("/courses")}>Continue Learning</Button>
              </div>
            </CardContent>
          </Card>
          
          {/* In Progress Courses */}
          <h2 className="text-xl font-bold mb-4">Your Courses</h2>
          
          {enrolledCourses.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {enrolledCourses.map((course, index) => (
                <Card key={course.id} className="overflow-hidden">
                  <div className="aspect-video w-full relative">
                    <img 
                      src={course.image} 
                      alt={course.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <Button variant="secondary" onClick={() => navigate(`/course/${course.id}`)}>
                        Continue
                      </Button>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{course.title}</CardTitle>
                    <CardDescription>{course.instructor}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{index === 0 ? "35%" : "20%"}</span>
                      </div>
                      <Progress value={index === 0 ? 35 : 20} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="mb-8">
              <CardContent className="pt-6 text-center py-12">
                <h3 className="text-lg font-medium mb-2">You're not enrolled in any courses yet</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Explore our catalog and start your learning journey today.
                </p>
                <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
              </CardContent>
            </Card>
          )}
          
          {/* Upcoming Assignments */}
          <h2 className="text-xl font-bold mb-4">Upcoming Assignments</h2>
          <Card>
            <CardContent className="pt-6">
              {enrolledCourses.length > 0 ? (
                <div className="divide-y">
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Build a Personal Portfolio</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Introduction to Web Development
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        Due Dec 15, 2023
                      </span>
                      <Button size="sm" variant="outline" className="mt-1">
                        View
                      </Button>
                    </div>
                  </div>
                  <div className="py-3 flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Responsive Design Project</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Introduction to Web Development
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-gray-500 dark:text-gray-400 block">
                        Due Dec 22, 2023
                      </span>
                      <Button size="sm" variant="outline" className="mt-1">
                        View
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-gray-500 dark:text-gray-400">
                    No upcoming assignments
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
