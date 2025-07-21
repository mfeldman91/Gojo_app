import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Navigation } from "@/components/Navigation";
import {
  Search,
  Filter,
  Star,
  Users,
  Clock,
  Play,
  Award,
  Target,
  Shield,
  Zap,
  BookOpen,
  TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { getCourseStats } from "@/lib/stats";

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");

  // Generate realistic stats for each course
  const generateCourseStats = (baseStudents: number, seed: number) => {
    const multiplier = 0.8 + (Math.sin(seed) + 1) * 0.2; // Deterministic variance
    return {
      students: Math.floor(baseStudents * multiplier),
      rating: Math.max(4.5, 4.6 + (Math.cos(seed) * 0.4)),
    };
  };

  // Mock courses data
  const courses = [
    {
      id: 1,
            title: "Boxing Fundamentals",
      instructor: "Coach Mike Rodriguez",
      price: 29,
      originalPrice: null,
      rating: generateCourseStats(1247, 1).rating,
      students: generateCourseStats(1247, 1).students,
      duration: "3.5 hours",
      lessons: 12,
      level: "Beginner",
      category: "boxing",
      description:
        "Master the fundamentals of boxing including stance, footwork, and basic combinations.",
      image: "boxing-fundamentals",
      bestseller: true,
    },
    {
      id: 2,
            title: "Wing Chun Fundamentals",
      instructor: "Master Chen Wei",
      price: 89,
      originalPrice: 129,
      rating: generateCourseStats(324, 2).rating,
      students: generateCourseStats(324, 2).students,
      duration: "6.5 hours",
      lessons: 18,
      level: "Beginner",
      category: "kung-fu",
      description:
        "Learn authentic Wing Chun techniques from a direct lineage master.",
      image: "wing-chun",
      bestseller: false,
    },
    {
      id: 3,
            title: "Muay Thai Complete Course",
      instructor: "Kru Sirimongkol",
      price: 79,
      originalPrice: null,
      rating: generateCourseStats(856, 3).rating,
      students: generateCourseStats(856, 3).students,
      duration: "8.2 hours",
      lessons: 24,
      level: "Intermediate",
      category: "muay-thai",
      description:
        "Comprehensive Muay Thai training from basics to advanced combinations.",
      image: "muay-thai",
      bestseller: true,
    },
    {
      id: 4,
            title: "Self-Defense for Everyone",
      instructor: "Sensei Maria Santos",
      price: 39,
      originalPrice: null,
      rating: generateCourseStats(1923, 4).rating,
      students: generateCourseStats(1923, 4).students,
      duration: "4.0 hours",
      lessons: 16,
      level: "Beginner",
      category: "self-defense",
      description:
        "Practical self-defense techniques for real-world situations.",
      image: "self-defense",
      bestseller: true,
    },
    {
      id: 5,
            title: "Advanced Karate Kata",
      instructor: "Sensei Takeshi Yamamoto",
      price: 69,
      originalPrice: 99,
      rating: generateCourseStats(189, 5).rating,
      students: generateCourseStats(189, 5).students,
      duration: "5.8 hours",
      lessons: 20,
      level: "Advanced",
      category: "karate",
      description:
        "Master traditional karate forms with precise technique and timing.",
      image: "karate-kata",
      bestseller: false,
    },
    {
      id: 6,
      title: "Brazilian Jiu-Jitsu Basics",
      instructor: "Professor Carlos Silva",
      price: 59,
      originalPrice: null,
      rating: 4.8,
      students: 612,
      duration: "7.1 hours",
      lessons: 22,
      level: "Beginner",
      category: "bjj",
      description: "Ground fighting fundamentals and submission techniques.",
      image: "bjj-basics",
      bestseller: false,
    },
    {
      id: 7,
      title: "MMA Training Complete",
      instructor: "Coach Alex Thompson",
      price: 99,
      originalPrice: 149,
      rating: 4.9,
      students: 445,
      duration: "12.5 hours",
      lessons: 35,
      level: "Intermediate",
      category: "mma",
      description:
        "Complete mixed martial arts training combining multiple disciplines.",
      image: "mma-complete",
      bestseller: true,
    },
    {
      id: 8,
      title: "Tai Chi for Health",
      instructor: "Master Liu Wei",
      price: 45,
      originalPrice: null,
      rating: 4.6,
      students: 298,
      duration: "3.8 hours",
      lessons: 14,
      level: "Beginner",
      category: "tai-chi",
      description:
        "Gentle martial art focusing on health, balance, and inner peace.",
      image: "tai-chi",
      bestseller: false,
    },
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "boxing", label: "Boxing" },
    { value: "muay-thai", label: "Muay Thai" },
    { value: "kung-fu", label: "Kung Fu" },
    { value: "karate", label: "Karate" },
    { value: "bjj", label: "Brazilian Jiu-Jitsu" },
    { value: "mma", label: "Mixed Martial Arts" },
    { value: "self-defense", label: "Self-Defense" },
    { value: "tai-chi", label: "Tai Chi" },
  ];

  const levels = [
    { value: "all", label: "All Levels" },
    { value: "Beginner", label: "Beginner" },
    { value: "Intermediate", label: "Intermediate" },
    { value: "Advanced", label: "Advanced" },
  ];

  // Filter courses based on search and filters
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || course.category === selectedCategory;
    const matchesLevel =
      selectedLevel === "all" || course.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Master Martial Arts
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Learn from world-class instructors. Train at your own pace. Master
            techniques from boxing to Kung Fu with our comprehensive course
            library.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-muted/30 rounded-2xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search courses, instructors, or techniques..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger>
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent>
                {levels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between mt-4">
            <p className="text-sm text-muted-foreground">
              {filteredCourses.length} courses found
            </p>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Sort by popularity
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">500+</div>
            <div className="text-sm text-muted-foreground">Video Lessons</div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-accent">50+</div>
            <div className="text-sm text-muted-foreground">
              Expert Instructors
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-secondary">8</div>
            <div className="text-sm text-muted-foreground">
              Martial Arts Styles
            </div>
          </Card>
          <Card className="text-center p-4">
            <div className="text-2xl font-bold text-primary">4.8★</div>
            <div className="text-sm text-muted-foreground">Avg Rating</div>
          </Card>
        </div>

        {/* Bestsellers Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-primary" />
            Bestseller Courses
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {courses
              .filter((course) => course.bestseller)
              .slice(0, 4)
              .map((course) => (
                <Card
                  key={course.id}
                  className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button
                        size="sm"
                        className="rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground">
                        Bestseller
                      </Badge>
                    </div>
                    <div className="absolute bottom-3 right-3 text-white text-sm">
                      <Clock className="w-4 h-4 inline mr-1" />
                      {course.duration}
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-sm">
                      by {course.instructor}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center gap-4 text-sm mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xl font-bold">${course.price}</div>
                      <Badge variant="secondary">{course.level}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        </div>

        {/* All Courses */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-accent" />
            All Courses
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card
                key={course.id}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-t-lg"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      size="sm"
                      className="rounded-full opacity-80 group-hover:opacity-100 transition-opacity"
                    >
                      <Play className="w-4 h-4" />
                    </Button>
                  </div>
                  {course.bestseller && (
                    <div className="absolute top-3 left-3">
                      <Badge className="bg-primary text-primary-foreground">
                        Bestseller
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-3 right-3">
                    <Badge variant="secondary">{course.level}</Badge>
                  </div>
                  <div className="absolute bottom-3 left-3 text-white text-sm">
                    <Clock className="w-4 h-4 inline mr-1" />
                    {course.duration}
                  </div>
                  <div className="absolute bottom-3 right-3 text-white text-sm">
                    {course.lessons} lessons
                  </div>
                </div>

                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    by {course.instructor}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {course.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="text-xl font-bold">${course.price}</div>
                      {course.originalPrice && (
                        <div className="text-sm text-muted-foreground line-through">
                          ${course.originalPrice}
                        </div>
                      )}
                    </div>
                    <Button size="sm" asChild>
                      <Link to={`/course/${course.id}`}>View Course</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Categories Preview */}
        <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 mb-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">
            Explore Martial Arts Categories
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                name: "Boxing",
                icon: <Target className="w-8 h-8" />,
                count: "45 courses",
                color: "text-primary",
              },
              {
                name: "Muay Thai",
                icon: <Zap className="w-8 h-8" />,
                count: "38 courses",
                color: "text-accent",
              },
              {
                name: "Kung Fu",
                icon: <Award className="w-8 h-8" />,
                count: "52 courses",
                color: "text-secondary",
              },
              {
                name: "Self-Defense",
                icon: <Shield className="w-8 h-8" />,
                count: "28 courses",
                color: "text-primary",
              },
            ].map((category, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-lg transition-shadow cursor-pointer"
              >
                <CardContent className="p-6">
                  <div className={`${category.color} mb-4 flex justify-center`}>
                    {category.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.count}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Start Training?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students learning martial arts from world-class
            instructors. Start your journey today with our beginner-friendly
            courses.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/signup">
                <Play className="w-5 h-5 mr-2" />
                Start Learning Now
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              asChild
            >
              <Link to="/pricing">View Pricing Plans</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
                alt="Gojo Martial Arts Logo"
                className="w-10 h-10 object-contain"
                style={{
                  mixBlendMode: "screen",
                  filter: "contrast(1.2) brightness(1.1)",
                }}
              />
              <span className="font-bold text-xl">Gojo</span>
            </div>
            <p className="text-secondary-foreground/80">
              Master martial arts with the world's leading online training
              platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
