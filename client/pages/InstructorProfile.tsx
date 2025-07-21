import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/Navigation";
import {
  Star,
  Users,
  Award,
  Play,
  Clock,
  Globe,
  MapPin,
  Calendar,
  Trophy,
  Target,
  MessageCircle,
  Share2,
  Edit,
  Plus,
  CheckCircle,
} from "lucide-react";
import { getInstructorStats, getCourseStats } from "@/lib/stats";

export default function InstructorProfile() {
  const instructorStats = getInstructorStats();

  // Mock instructor data with realistic stats
  const instructor = {
    name: "Master Chen Wei",
    title: "Kung Fu & Wing Chun Specialist",
    location: "San Francisco, CA",
    experience: "25+ Years Teaching",
    students: instructorStats.totalStudents,
    courses: instructorStats.coursesPublished,
    rating: instructorStats.averageRating,
    reviews: instructorStats.totalReviews,
    bio: "Master Chen Wei has been practicing martial arts for over 30 years and teaching for 25 years. He specializes in traditional Kung Fu forms and Wing Chun, having trained directly under Grandmaster Ip Ching. He believes in making ancient martial arts accessible to modern students through structured, progressive training.",
    specialties: ["Kung Fu", "Wing Chun", "Traditional Forms", "Self-Defense"],
    achievements: [
      "Certified Wing Chun Instructor under Ip Ching lineage",
      "3rd Dan Black Belt in Karate",
      "Former competitive martial artist",
      "Featured in Martial Arts Magazine",
    ],
        socialProof: {
      website: "masterchen-kungfu.com",
      yearsOnGojo: 3,
      totalEarnings: `$${instructorStats.totalRevenue.toLocaleString()}`,
    },
  };

    const instructorCourses = [
    {
      id: 1,
      title: "Wing Chun Fundamentals",
      price: 89,
      students: Math.floor(instructorStats.totalStudents * 0.38),
      rating: 4.8 + Math.random() * 0.2,
      duration: "6.5 hours",
      level: "Beginner",
      revenue: `$${Math.floor(instructorStats.totalRevenue * 0.32).toLocaleString()}`,
      image: "wing-chun-basics",
    },
    {
      id: 2,
      title: "Advanced Kung Fu Forms",
      price: 129,
      students: Math.floor(instructorStats.totalStudents * 0.22),
      rating: 4.7 + Math.random() * 0.2,
      duration: "8.2 hours",
      level: "Advanced",
      revenue: `$${Math.floor(instructorStats.totalRevenue * 0.28).toLocaleString()}`,
      image: "kung-fu-advanced",
    },
    {
      id: 3,
      title: "Traditional Weapons Training",
      price: 149,
      students: Math.floor(instructorStats.totalStudents * 0.18),
      rating: 4.8 + Math.random() * 0.2,
      duration: "5.8 hours",
      level: "Intermediate",
      revenue: `$${Math.floor(instructorStats.totalRevenue * 0.22).toLocaleString()}`,
      image: "weapons-training",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Instructor Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col lg:flex-row items-start gap-8">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                      CW
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Instructor
                  </Button>
                </div>

                <div className="flex-1 space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-2">
                      <h1 className="text-3xl font-bold text-foreground">
                        {instructor.name}
                      </h1>
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Verified Instructor
                      </Badge>
                    </div>
                    <p className="text-xl text-muted-foreground mb-2">
                      {instructor.title}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{instructor.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{instructor.experience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        <span>{instructor.socialProof.website}</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {instructor.rating}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Instructor Rating
                      </div>
                      <div className="flex items-center justify-center gap-1 mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className="w-3 h-3 fill-yellow-400 text-yellow-400"
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-center p-4 bg-accent/10 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {instructor.students}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Students
                      </div>
                    </div>
                    <div className="text-center p-4 bg-secondary/10 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">
                        {instructor.courses}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Courses Created
                      </div>
                    </div>
                    <div className="text-center p-4 bg-primary/10 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {instructor.reviews}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Reviews
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">About Master Chen</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {instructor.bio}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 flex-wrap">
                    {instructor.specialties.map((specialty, index) => (
                      <Badge key={index} variant="secondary">
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <Button className="flex-1 sm:flex-none">
                      Follow Instructor
                    </Button>
                    <Button variant="outline">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Instructor Courses */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">
                  Courses by Master Chen
                </h2>
                <div className="text-sm text-muted-foreground">
                  {instructorCourses.length} courses • {instructor.students}{" "}
                  total students
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {instructorCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="group hover:shadow-lg transition-shadow cursor-pointer"
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
                        <Badge variant="secondary">{course.level}</Badge>
                      </div>
                      <div className="absolute bottom-3 right-3 text-white text-sm">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {course.duration}
                      </div>
                    </div>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {course.title}
                        </CardTitle>
                        <div className="text-xl font-bold">${course.price}</div>
                      </div>
                      <CardDescription>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{course.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{course.students}</span>
                          </div>
                        </div>
                      </CardDescription>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>

            {/* Student Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Student Reviews</CardTitle>
                <CardDescription>
                  What students say about Master Chen's teaching
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    student: "Sarah Johnson",
                    rating: 5,
                    course: "Wing Chun Fundamentals",
                    review:
                      "Master Chen's teaching style is incredible. He breaks down complex movements into easy-to-understand steps. I've learned more in 3 months than I did in a year elsewhere.",
                    date: "2 weeks ago",
                  },
                  {
                    student: "Mike Rodriguez",
                    rating: 5,
                    course: "Advanced Kung Fu Forms",
                    review:
                      "The traditional forms course is amazing. Master Chen's attention to detail and historical context makes every lesson fascinating. Highly recommend!",
                    date: "1 month ago",
                  },
                ].map((review, index) => (
                  <div key={index} className="space-y-3 p-4 border rounded-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback>
                            {review.student
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold">{review.student}</div>
                          <div className="text-sm text-muted-foreground">
                            {review.course}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {review.date}
                        </div>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.review}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Instructor Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor Achievements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructor.achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Trophy className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{achievement}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Course Revenue (For the instructor's view) */}
            <Card>
              <CardHeader>
                <CardTitle>Course Performance</CardTitle>
                <CardDescription>
                  Revenue from published courses
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {instructorCourses.map((course) => (
                  <div
                    key={course.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-sm">{course.title}</div>
                      <div className="text-xs text-muted-foreground">
                        {course.students} students
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-sm">{course.revenue}</div>
                      <div className="text-xs text-muted-foreground">
                        Revenue
                      </div>
                    </div>
                  </div>
                ))}
                <div className="pt-2 border-t">
                  <div className="flex justify-between font-bold">
                    <span>Total Earnings</span>
                    <span className="text-primary">
                      {instructor.socialProof.totalEarnings}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Instructor Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Instructor Tools</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/instructor/create-course">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Course
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/instructor/dashboard">
                    <Target className="w-4 h-4 mr-2" />
                    Instructor Dashboard
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Platform Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Impact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Years on Gojo
                  </span>
                  <span className="font-semibold">
                    {instructor.socialProof.yearsOnGojo}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Course Completion Rate
                  </span>
                  <span className="font-semibold">87%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Response Time
                  </span>
                  <span className="font-semibold">&lt; 2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">
                    Gojo Ranking
                  </span>
                  <span className="font-semibold text-primary">Top 5%</span>
                </div>
              </CardContent>
            </Card>
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
