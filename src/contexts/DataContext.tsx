
import React, { createContext, useContext } from "react";

// Course type
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorId: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration: string;
  enrolledStudents: number;
  rating: number;
  image: string;
  price?: number;
  isFeatured?: boolean;
}

// Assignment type
export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: string;
  points: number;
}

// Mock data
const mockCourses: Course[] = [
  {
    id: "course-1",
    title: "Introduction to Web Development",
    description: "Learn the fundamentals of web development including HTML, CSS, and JavaScript. Build your first website and understand key concepts of modern web development.",
    instructor: "Jane Teacher",
    instructorId: "2",
    category: "Web Development",
    level: "Beginner",
    duration: "8 weeks",
    enrolledStudents: 246,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&h=400&q=80",
    isFeatured: true
  },
  {
    id: "course-2",
    title: "Python Programming: From Zero to Hero",
    description: "A comprehensive guide to Python programming language. Master Python syntax, data structures, and build real-world applications.",
    instructor: "Michael Python",
    instructorId: "4",
    category: "Programming",
    level: "Beginner",
    duration: "10 weeks",
    enrolledStudents: 352,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "course-3",
    title: "Advanced JavaScript Frameworks",
    description: "Deep dive into modern JavaScript frameworks like React, Vue, and Angular. Build complex single-page applications with industry best practices.",
    instructor: "Jane Teacher",
    instructorId: "2",
    category: "Web Development",
    level: "Advanced",
    duration: "12 weeks",
    enrolledStudents: 189,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=600&h=400&q=80",
    isFeatured: true
  },
  {
    id: "course-4",
    title: "Data Science Fundamentals",
    description: "Introduction to data science concepts, tools, and methodologies. Learn data analysis, visualization, and basic machine learning techniques.",
    instructor: "Data Doctor",
    instructorId: "5",
    category: "Data Science",
    level: "Intermediate",
    duration: "8 weeks",
    enrolledStudents: 275,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&h=400&q=80"
  },
  {
    id: "course-5",
    title: "UX/UI Design Principles",
    description: "Learn the fundamental principles of user experience and user interface design. Create beautiful, functional, and user-friendly digital products.",
    instructor: "Design Master",
    instructorId: "6",
    category: "Design",
    level: "Beginner",
    duration: "6 weeks",
    enrolledStudents: 210,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1721322800607-8c38375eef04?auto=format&fit=crop&w=600&h=400&q=80",
    isFeatured: true
  }
];

const mockAssignments: Assignment[] = [
  {
    id: "assignment-1",
    courseId: "course-1",
    title: "Build a Personal Portfolio",
    description: "Create a personal portfolio website using HTML, CSS, and basic JavaScript.",
    dueDate: "2023-12-15",
    points: 100
  },
  {
    id: "assignment-2",
    courseId: "course-1",
    title: "Responsive Design Project",
    description: "Build a fully responsive website that works well on all device sizes.",
    dueDate: "2023-12-22",
    points: 150
  },
  {
    id: "assignment-3",
    courseId: "course-2",
    title: "Python Data Analysis",
    description: "Analyze a dataset using Python and create visualizations using matplotlib and pandas.",
    dueDate: "2023-12-18",
    points: 120
  }
];

interface DataContextType {
  courses: Course[];
  assignments: Assignment[];
  getFeaturedCourses: () => Course[];
  getCourseById: (id: string) => Course | undefined;
  getCoursesByInstructor: (instructorId: string) => Course[];
  getAssignmentsByCourse: (courseId: string) => Assignment[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const courses = mockCourses;
  const assignments = mockAssignments;

  const getFeaturedCourses = () => {
    return courses.filter(course => course.isFeatured);
  };

  const getCourseById = (id: string) => {
    return courses.find(course => course.id === id);
  };

  const getCoursesByInstructor = (instructorId: string) => {
    return courses.filter(course => course.instructorId === instructorId);
  };

  const getAssignmentsByCourse = (courseId: string) => {
    return assignments.filter(assignment => assignment.courseId === courseId);
  };

  return (
    <DataContext.Provider value={{ 
      courses, 
      assignments, 
      getFeaturedCourses, 
      getCourseById, 
      getCoursesByInstructor,
      getAssignmentsByCourse
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
