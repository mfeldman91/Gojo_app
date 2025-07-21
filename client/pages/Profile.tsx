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
import { Textarea } from "@/components/ui/textarea";
import { Navigation } from "@/components/Navigation";
import {
  Camera,
  Trophy,
  Calendar,
  MessageCircle,
  Heart,
  Share2,
  Plus,
  Target,
  Clock,
  Award,
  BookOpen,
  CreditCard,
  DollarSign,
  Edit,
} from "lucide-react";
import { useState } from "react";

export default function Profile() {
  const [newPost, setNewPost] = useState("");

  // Mock data for user profile
  const userStats = {
    coursesCompleted: 8,
    daysTraining: 45,
    totalHours: 87,
    currentStreak: 12,
  };

  const progressPosts = [
    {
      id: 1,
      date: "2024-01-15",
      content:
        "Just finished my first boxing combination sequence! The 1-2-3 combo is finally feeling natural. Took me 3 weeks but the muscle memory is starting to kick in 🥊",
      likes: 12,
      comments: 3,
      course: "Boxing Fundamentals",
    },
    {
      id: 2,
      date: "2024-01-12",
      content:
        "Attempted my first proper Muay Thai roundhouse kick today. Still working on the hip rotation but getting better balance. My shin conditioning is also improving!",
      likes: 8,
      comments: 5,
      course: "Muay Thai Basics",
    },
    {
      id: 3,
      date: "2024-01-10",
      content:
        "30 days into my martial arts journey! Started with zero experience and now I can see real progress. The Gojo instructors make everything so clear and easy to follow.",
      likes: 24,
      comments: 7,
      course: "General Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-primary text-primary-foreground text-2xl">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">
                      John Smith
                    </h1>
                    <p className="text-muted-foreground">
                      Martial Arts Enthusiast
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Member since December 2023
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {userStats.coursesCompleted}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Courses Completed
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {userStats.daysTraining}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Days Training
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-primary">
                        {userStats.totalHours}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Total Hours
                      </div>
                    </div>
                    <div className="text-center p-3 bg-muted/50 rounded-lg">
                      <div className="text-2xl font-bold text-accent">
                        {userStats.currentStreak}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Day Streak
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Progress Posts */}
          <div className="lg:col-span-2 space-y-6">
            {/* New Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Share Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="How did your training go today? Share your progress, achievements, or challenges..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Add Photo/Video
                  </Button>
                  <Button disabled={!newPost.trim()}>Post Update</Button>
                </div>
              </CardContent>
            </Card>

            {/* Progress Posts Feed */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Your Training Journey
              </h2>

              {progressPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary text-primary-foreground text-sm">
                          JS
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">John Smith</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.course}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {new Date(post.date).toLocaleDateString()}
                          </span>
                        </div>

                        <p className="text-foreground">{post.content}</p>

                        <div className="flex items-center gap-4 pt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Heart className="w-4 h-4 mr-1" />
                            {post.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <MessageCircle className="w-4 h-4 mr-1" />
                            {post.comments}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2"
                          >
                            <Share2 className="w-4 h-4 mr-1" />
                            Share
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Courses */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Current Courses
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  { name: "Boxing Fundamentals", progress: 85 },
                  { name: "Muay Thai Basics", progress: 60 },
                  { name: "Self-Defense Essentials", progress: 30 },
                ].map((course, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{course.name}</span>
                      <span className="text-muted-foreground">
                        {course.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/courses">Browse More Courses</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Recent Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-primary/10 rounded-lg">
                  <Trophy className="w-8 h-8 text-primary" />
                  <div>
                    <div className="font-semibold text-sm">
                      First Course Complete!
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Boxing Fundamentals
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-accent/10 rounded-lg">
                  <Target className="w-8 h-8 text-accent" />
                  <div>
                    <div className="font-semibold text-sm">30-Day Streak</div>
                    <div className="text-xs text-muted-foreground">
                      Consistent training
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-secondary/10 rounded-lg">
                  <Clock className="w-8 h-8 text-secondary" />
                  <div>
                    <div className="font-semibold text-sm">
                      50 Hours Trained
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Time dedication
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Training Goals */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Training Goals
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Weekly Training Hours</span>
                    <span className="text-muted-foreground">8/10</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-accent h-2 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Monthly Course Completion</span>
                    <span className="text-muted-foreground">2/3</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full"
                      style={{ width: "67%" }}
                    ></div>
                  </div>
                </div>
                                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => alert("Goals setting feature coming soon! 🎯")}
                >
                  Set New Goals
                </Button>
              </CardContent>
            </Card>

            {/* Account Management */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full" asChild>
                  <Link to="/billing">
                    <DollarSign className="w-4 h-4 mr-2" />
                    Billing & Payments
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/instructor/dashboard">
                    <Award className="w-4 h-4 mr-2" />
                    Become Instructor
                  </Link>
                </Button>
                <Button variant="outline" className="w-full">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
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
