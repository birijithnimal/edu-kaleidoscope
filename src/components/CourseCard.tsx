
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Course } from "@/contexts/DataContext";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="block">
      <Card className="h-full overflow-hidden card-hover-effect">
        <div className="aspect-video w-full overflow-hidden">
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardHeader className="p-4">
          <div className="flex justify-between items-start">
            <Badge variant="outline" className="mb-2">
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
          <CardTitle className="text-lg font-bold line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="flex items-center justify-between mt-1">
            <span>{course.instructor}</span>
            <span className="text-sm">{course.duration}</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{course.description}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-yellow-500 mr-1">
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
            </svg>
            <span className="text-sm font-medium">{course.rating}</span>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-300">
            {course.enrolledStudents} students
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default CourseCard;
