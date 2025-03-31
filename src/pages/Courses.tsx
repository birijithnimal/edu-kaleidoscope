
import React, { useState } from "react";
import { useData } from "@/contexts/DataContext";
import CourseCard from "@/components/CourseCard";
import Navbar from "@/components/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Courses = () => {
  const { courses } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState("");

  // Extract unique categories
  const categories = Array.from(new Set(courses.map(course => course.category)));
  const levels = ["Beginner", "Intermediate", "Advanced"];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter ? course.category === categoryFilter : true;
    const matchesLevel = levelFilter ? course.level === levelFilter : true;
    
    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="bg-lms-background dark:bg-gray-900 flex-1">
        <div className="lms-page-container">
          <h1 className="lms-section-title">Explore Courses</h1>
          
          {/* Filters and Search */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2">
                <Input
                  type="search"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Levels</SelectItem>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {(searchTerm || categoryFilter || levelFilter) && (
              <div className="mt-4 flex justify-between items-center">
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  Found {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"}
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => {
                    setSearchTerm("");
                    setCategoryFilter("");
                    setLevelFilter("");
                  }}
                >
                  Clear filters
                </Button>
              </div>
            )}
          </div>
          
          {/* Course Grid */}
          {filteredCourses.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 dark:text-gray-300 mb-2">No courses found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters to find what you're looking for.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
