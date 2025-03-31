
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

const CourseDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getCourseById, getAssignmentsByCourse } = useData();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const course = getCourseById(id || "");
  const assignments = getAssignmentsByCourse(id || "");

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">Course Not Found</h2>
            <p className="text-gray-600 mb-4">The course you're looking for doesn't exist or has been removed.</p>
            <Button onClick={() => navigate("/courses")}>Browse Courses</Button>
          </div>
        </div>
      </div>
    );
  }

  const handleEnroll = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    toast({
      title: "Enrolled Successfully",
      description: `You have enrolled in ${course.title}`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-lms-background dark:bg-gray-900 flex-1">
        {/* Course Header */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="md:w-1/3 lg:w-1/4">
                <div className="aspect-video rounded-lg overflow-hidden shadow-md">
                  <img 
                    src={course.image} 
                    alt={course.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <div className="md:w-2/3 lg:w-3/4">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge variant="outline" className="font-medium">
                    {course.category}
                  </Badge>
                  <Badge className={`
                    ${course.level === "Beginner" ? "bg-green-500" : 
                     course.level === "Intermediate" ? "bg-yellow-500" : 
                     "bg-red-500"} text-white
                  `}>
                    {course.level}
                  </Badge>
                </div>
                
                <h1 className="text-2xl md:text-3xl font-bold mb-2 text-gray-800 dark:text-white">
                  {course.title}
                </h1>
                
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
                  <span>Instructor: <span className="font-medium">{course.instructor}</span></span>
                  <span className="text-gray-400">•</span>
                  <span>Duration: {course.duration}</span>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center">
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 mr-1">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span>{course.rating}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {course.description}
                </p>
                
                <div className="flex flex-wrap gap-3">
                  <Button 
                    size="lg" 
                    onClick={handleEnroll}
                  >
                    Enroll Now
                  </Button>
                  
                  {user?.role === "teacher" && (
                    <Button variant="outline" size="lg" onClick={() => navigate(`/teacher/courses/edit/${course.id}`)}>
                      Edit Course
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Course Content */}
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="space-y-6">
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">What You'll Learn</h3>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Understand the core principles of {course.category}</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Build real-world projects from scratch</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Master industry-standard tools and techniques</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Prepare for professional certification</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <h3 className="text-xl font-bold mb-4">Course Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Students</h4>
                        <p>{course.enrolledStudents} enrolled</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Language</h4>
                        <p>English</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Duration</h4>
                        <p>{course.duration}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">Last Updated</h4>
                        <p>August 2023</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="curriculum">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Course Curriculum</h3>
                  
                  <div className="space-y-4">
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 font-medium">
                        Module 1: Getting Started
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Course Introduction</span>
                          </div>
                          <span className="text-sm text-gray-500">15 min</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <span>Course Resources</span>
                          </div>
                          <span className="text-sm text-gray-500">10 min</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                      <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 font-medium">
                        Module 2: Fundamentals
                      </div>
                      <div className="divide-y divide-gray-200 dark:divide-gray-700">
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Core Concepts</span>
                          </div>
                          <span className="text-sm text-gray-500">45 min</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>Practical Examples</span>
                          </div>
                          <span className="text-sm text-gray-500">30 min</span>
                        </div>
                        <div className="px-4 py-3 flex justify-between items-center">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                            </svg>
                            <span>Quiz: Fundamentals</span>
                          </div>
                          <span className="text-sm text-gray-500">20 min</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assignments">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Course Assignments</h3>
                  
                  {assignments.length > 0 ? (
                    <div className="space-y-4">
                      {assignments.map((assignment) => (
                        <div key={assignment.id} className="border border-gray-200 dark:border-gray-700 rounded-md p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-medium text-lg">{assignment.title}</h4>
                              <p className="text-gray-600 dark:text-gray-300 mt-1">
                                {assignment.description}
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                Due: {new Date(assignment.dueDate).toLocaleDateString()}
                              </span>
                              <span className="text-sm font-medium mt-1">
                                {assignment.points} points
                              </span>
                            </div>
                          </div>
                          <div className="mt-4">
                            <Button size="sm">View Assignment</Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-gray-500 dark:text-gray-400">No assignments available for this course yet.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="discussion">
              <Card>
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold mb-4">Course Discussion</h3>
                  <div className="text-center py-8">
                    <p className="text-gray-500 dark:text-gray-400 mb-4">
                      Join the discussion to ask questions and connect with fellow students.
                    </p>
                    <Button>Start a New Discussion</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
