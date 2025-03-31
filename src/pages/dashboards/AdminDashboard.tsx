
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const { user } = useAuth();
  const { courses } = useData();
  const navigate = useNavigate();

  // Mock data for admin dashboard
  const stats = {
    totalUsers: 856,
    totalCourses: courses.length,
    totalRevenue: 45600,
    activeStudents: 654,
    teacherCount: 24,
    completionRate: 73
  };

  // Mock recent users
  const recentUsers = [
    { id: "u1", name: "John Student", email: "student@example.com", role: "student", date: "2023-12-01", avatar: "https://ui-avatars.com/api/?name=John+Student&background=4a6cf7&color=fff" },
    { id: "u2", name: "Jane Teacher", email: "teacher@example.com", role: "teacher", date: "2023-11-28", avatar: "https://ui-avatars.com/api/?name=Jane+Teacher&background=8b5cf6&color=fff" },
    { id: "u3", name: "Mike Smith", email: "mike@example.com", role: "student", date: "2023-11-27", avatar: "https://ui-avatars.com/api/?name=Mike+Smith&background=4a6cf7&color=fff" }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-lms-background dark:bg-gray-900 flex-1">
        <div className="lms-page-container">
          <div className="flex items-center justify-between mb-8">
            <h1 className="lms-section-title">Admin Dashboard</h1>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => navigate("/admin/users")}>
                Manage Users
              </Button>
              <Button onClick={() => navigate("/admin/settings")}>
                Platform Settings
              </Button>
            </div>
          </div>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Users</CardTitle>
                <CardDescription>Students, teachers, and admins</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stats.totalUsers}</span>
                  <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    +12% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Courses</CardTitle>
                <CardDescription>Published courses on platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stats.totalCourses}</span>
                  <div className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100">
                    +3 this week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Total Revenue</CardTitle>
                <CardDescription>All time platform earnings</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">${stats.totalRevenue.toLocaleString()}</span>
                  <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    +8% this month
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Active Students</CardTitle>
                <CardDescription>Students who logged in this month</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stats.activeStudents}</span>
                  <div className="text-xs px-2 py-1 rounded bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100">
                    -2% this week
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Teachers</CardTitle>
                <CardDescription>Active instructors on platform</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stats.teacherCount}</span>
                  <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    +2 this month
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Completion Rate</CardTitle>
                <CardDescription>Average course completion</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{stats.completionRate}%</span>
                  <div className="text-xs px-2 py-1 rounded bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                    +5% this month
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Tabs for different metrics */}
          <div className="mb-8">
            <Tabs defaultValue="users">
              <TabsList className="mb-6">
                <TabsTrigger value="users">Recent Users</TabsTrigger>
                <TabsTrigger value="courses">Top Courses</TabsTrigger>
                <TabsTrigger value="revenue">Revenue</TabsTrigger>
              </TabsList>
              
              <TabsContent value="users">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent User Registrations</CardTitle>
                    <CardDescription>New users who joined the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2">User</th>
                            <th className="text-left font-medium p-2">Email</th>
                            <th className="text-left font-medium p-2">Role</th>
                            <th className="text-left font-medium p-2">Joined</th>
                            <th className="text-left font-medium p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {recentUsers.map(user => (
                            <tr key={user.id} className="border-b">
                              <td className="p-2">
                                <div className="flex items-center">
                                  <Avatar className="h-8 w-8 mr-2">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <span>{user.name}</span>
                                </div>
                              </td>
                              <td className="p-2">{user.email}</td>
                              <td className="p-2">
                                <Badge className={
                                  user.role === "admin" ? "bg-red-500" :
                                  user.role === "teacher" ? "bg-purple-500" :
                                  "bg-blue-500"
                                }>
                                  {user.role}
                                </Badge>
                              </td>
                              <td className="p-2">{new Date(user.date).toLocaleDateString()}</td>
                              <td className="p-2">
                                <Button variant="ghost" size="sm">View</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => navigate("/admin/users")}>
                        View All Users
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle>Top Performing Courses</CardTitle>
                    <CardDescription>Courses with highest enrollment and rating</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left font-medium p-2">Course</th>
                            <th className="text-left font-medium p-2">Instructor</th>
                            <th className="text-left font-medium p-2">Students</th>
                            <th className="text-left font-medium p-2">Rating</th>
                            <th className="text-left font-medium p-2">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.slice(0, 3).map(course => (
                            <tr key={course.id} className="border-b">
                              <td className="p-2">
                                <div className="flex items-center">
                                  <div className="w-10 h-10 rounded overflow-hidden mr-2">
                                    <img src={course.image} alt={course.title} className="w-full h-full object-cover" />
                                  </div>
                                  <span>{course.title}</span>
                                </div>
                              </td>
                              <td className="p-2">{course.instructor}</td>
                              <td className="p-2">{course.enrolledStudents}</td>
                              <td className="p-2 flex items-center">
                                <span className="mr-1">{course.rating}</span>
                                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500">
                                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                              </td>
                              <td className="p-2">
                                <Button variant="ghost" size="sm" onClick={() => navigate(`/course/${course.id}`)}>
                                  View
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => navigate("/admin/courses")}>
                        Manage All Courses
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="revenue">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Overview</CardTitle>
                    <CardDescription>Platform earnings and financial metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="py-8 text-center">
                      <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Revenue chart will appear here</h3>
                      <p className="text-gray-500 dark:text-gray-400 mb-4">
                        This section would display monthly revenue charts and financial analytics
                      </p>
                      <Button onClick={() => navigate("/admin/finance")}>
                        View Financial Reports
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Quick Actions */}
          <div>
            <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-lms-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-lms-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Add Course</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Publish a new course</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/admin/courses/add")}>Add</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-lms-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-lms-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Add User</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Create new user account</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/admin/users/add")}>Add</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Reports</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">View platform analytics</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/admin/reports")}>View</Button>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <h3 className="font-medium mb-1">Settings</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Configure platform</p>
                  <Button size="sm" variant="outline" className="w-full" onClick={() => navigate("/admin/settings")}>Manage</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
