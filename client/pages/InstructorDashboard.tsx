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
  Plus,
  TrendingUp,
  Users,
  DollarSign,
  Star,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  Target,
  Award,
  MessageCircle,
  BarChart3,
  Clock,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { getInstructorStats, getCourseStats } from "@/lib/stats";

export default function InstructorDashboard() {
  const instructorStats = getInstructorStats();
  const courseStats = getCourseStats();

    const courses = [
    {
      id: 1,
      title: "Wing Chun Fundamentals",
      status: "published",
      students: Math.floor(instructorStats.totalStudents * 0.38),
      revenue: Math.floor(instructorStats.totalRevenue * 0.32),
      rating: 4.8 + Math.random() * 0.2,
      reviews: Math.floor(instructorStats.totalReviews * 0.37),
      lastUpdated: "2024-01-15",
      thumbnail: "wing-chun-thumb",
    },
    {
      id: 2,
      title: "Advanced Kung Fu Forms",
      status: "published",
      students: Math.floor(instructorStats.totalStudents * 0.22),
      revenue: Math.floor(instructorStats.totalRevenue * 0.28),
      rating: 4.7 + Math.random() * 0.2,
      reviews: Math.floor(instructorStats.totalReviews * 0.25),
      lastUpdated: "2024-01-10",
      thumbnail: "kung-fu-thumb",
    },
    {
      id: 3,
      title: "Traditional Weapons Training",
      status: "published",
      students: Math.floor(instructorStats.totalStudents * 0.18),
      revenue: Math.floor(instructorStats.totalRevenue * 0.22),
      rating: 4.8 + Math.random() * 0.2,
      reviews: Math.floor(instructorStats.totalReviews * 0.20),
      lastUpdated: "2024-01-08",
      thumbnail: "weapons-thumb",
    },
    {
      id: 4,
      title: "Meditation in Martial Arts",
      status: "review",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-16",
      thumbnail: "meditation-thumb",
    },
    {
      id: 5,
      title: "Self-Defense Essentials",
      status: "draft",
      students: 0,
      revenue: 0,
      rating: 0,
      reviews: 0,
      lastUpdated: "2024-01-14",
      thumbnail: "self-defense-thumb",
    },
  ];

    const studentNames = ["Sarah Johnson", "Mike Chen", "Emma Rodriguez", "David Park", "Lisa Thompson", "Alex Kim", "Maria Santos", "John Wilson"];
  const courseNames = ["Wing Chun Fundamentals", "Advanced Kung Fu Forms", "Traditional Weapons Training"];

  const recentActivity = [
    {
      type: "new_student",
      message: `${studentNames[Math.floor(Math.random() * studentNames.length)]} enrolled in ${courseNames[Math.floor(Math.random() * courseNames.length)]}`,
      time: "2 hours ago",
    },
    {
      type: "review",
      message: `New ${4 + Math.floor(Math.random() * 2)}-star review on ${courseNames[Math.floor(Math.random() * courseNames.length)]}`,
      time: "4 hours ago",
    },
    {
      type: "revenue",
      message: `Earned $${Math.floor(50 + Math.random() * 200)} from course sales today`,
      time: "6 hours ago",
    },
    {
      type: "message",
      message: `New message from student ${studentNames[Math.floor(Math.random() * studentNames.length)]}`,
      time: "1 day ago",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-green-100 text-green-800">Published</Badge>;
      case "review":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Under Review</Badge>
        );
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-foreground">
              Instructor Dashboard
            </h1>
            <Button asChild>
              <Link to="/instructor/create-course">
                <Plus className="w-4 h-4 mr-2" />
                Create New Course
              </Link>
            </Button>
          </div>
          <p className="text-muted-foreground">
            Welcome back, Master Chen! Here's how your courses are performing.
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ${instructorStats.totalRevenue.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
                            <div className="flex items-center pt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">
                  +{instructorStats.monthlyGrowthRate.toFixed(1)}% from last month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Total Students
                  </p>
                  <p className="text-2xl font-bold">
                    {instructorStats.totalStudents}
                  </p>
                </div>
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="flex items-center pt-2">
                <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">
                  +{instructorStats.newStudents} this month
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold">
                    {instructorStats.averageRating}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
              <div className="flex items-center pt-2">
                <span className="text-sm text-muted-foreground">
                  {instructorStats.totalReviews} reviews
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Published Courses
                  </p>
                  <p className="text-2xl font-bold">
                    {instructorStats.coursesPublished}
                  </p>
                </div>
                <Award className="h-8 w-8 text-secondary" />
              </div>
              <div className="flex items-center pt-2">
                <span className="text-sm text-muted-foreground">
                  {instructorStats.coursesInDraft} in progress
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Course Management */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Your Courses</CardTitle>
                  <Button variant="outline" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
                <CardDescription>
                  Manage your published courses and track their performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {courses.map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="w-16 h-12 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                        <Award className="w-6 h-6 text-primary" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold truncate">
                            {course.title}
                          </h3>
                          {getStatusBadge(course.status)}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {course.students} students
                          </span>
                          {course.status === "published" && (
                            <>
                              <span className="flex items-center gap-1">
                                <Star className="w-4 h-4" />
                                {course.rating} ({course.reviews})
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />$
                                {course.revenue.toLocaleString()}
                              </span>
                            </>
                          )}
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(course.lastUpdated).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {course.status === "published" && (
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4" />
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Chart Placeholder */}
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Your earnings over the last 6 months
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">
                      Revenue chart will be displayed here
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/instructor/create-course">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Course
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/instructor/profile">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Student Messages
                </Button>
                <Button variant="outline" className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Analytics
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        {activity.type === "new_student" && (
                          <Users className="w-4 h-4 text-primary" />
                        )}
                        {activity.type === "review" && (
                          <Star className="w-4 h-4 text-yellow-500" />
                        )}
                        {activity.type === "revenue" && (
                          <DollarSign className="w-4 h-4 text-green-500" />
                        )}
                        {activity.type === "message" && (
                          <MessageCircle className="w-4 h-4 text-blue-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {activity.message}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {activity.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Goals */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Goals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Revenue Target</span>
                    <span>${instructorStats.monthlyRevenue.toLocaleString()} / ${Math.floor(instructorStats.monthlyRevenue * 1.3).toLocaleString()}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: `${Math.min(100, (instructorStats.monthlyRevenue / (instructorStats.monthlyRevenue * 1.3)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>New Students</span>
                    <span>{instructorStats.newStudents} / {Math.floor(instructorStats.newStudents * 1.5)}</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: `${Math.min(100, (instructorStats.newStudents / (instructorStats.newStudents * 1.5)) * 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Course Completion</span>
                    <span>1 / 2</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-secondary h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Status Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Course Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Published</span>
                  </div>
                                    <span className="font-semibold">{instructorStats.coursesPublished}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Under Review</span>
                  </div>
                                    <span className="font-semibold">1</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Edit className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Draft</span>
                  </div>
                                    <span className="font-semibold">{instructorStats.coursesInDraft}</span>
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
