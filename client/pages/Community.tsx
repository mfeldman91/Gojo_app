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
  Users,
  MessageCircle,
  Heart,
  Share2,
  Trophy,
  Target,
  Calendar,
  Camera,
  Plus,
  TrendingUp,
  Award,
  Globe,
  Clock,
  Star,
  CheckCircle,
  Zap,
} from "lucide-react";
import { useState } from "react";

export default function Community() {
  const [newPost, setNewPost] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock community data
  const featuredPosts = [
    {
      id: 1,
      user: "Sarah Chen",
      avatar: "SC",
      level: "Intermediate",
      style: "Wing Chun",
      content:
        "Just hit my 100-day training streak! 🥋 The consistency has really paid off - my chi sau sensitivity has improved dramatically. Thanks to Master Chen's course for the incredible instruction!",
      likes: 47,
      comments: 12,
      timeAgo: "2 hours ago",
      image: true,
      featured: true,
    },
    {
      id: 2,
      user: "Miguel Rodriguez",
      avatar: "MR",
      level: "Beginner",
      style: "Boxing",
      content:
        "First time landing a clean 1-2-3 combo during sparring practice! My coach says my footwork has improved so much since starting the Boxing Fundamentals course. Feeling motivated! 💪",
      likes: 33,
      comments: 8,
      timeAgo: "4 hours ago",
      image: false,
      featured: true,
    },
    {
      id: 3,
      user: "Emma Thompson",
      avatar: "ET",
      level: "Advanced",
      style: "Muay Thai",
      content:
        "Teaching my first class tomorrow! From student to instructor thanks to the confidence I built through Gojo's comprehensive Muay Thai program. Never thought I'd be here 2 years ago.",
      likes: 89,
      comments: 23,
      timeAgo: "6 hours ago",
      image: true,
      featured: true,
    },
  ];

  const recentPosts = [
    {
      id: 4,
      user: "David Park",
      avatar: "DP",
      level: "Beginner",
      style: "Karate",
      content:
        "Week 3 of karate training. Still struggling with balance in my kicks but getting better every day. Any tips for improving stability?",
      likes: 15,
      comments: 6,
      timeAgo: "1 day ago",
      image: false,
    },
    {
      id: 5,
      user: "Lisa Johnson",
      avatar: "LJ",
      level: "Intermediate",
      style: "BJJ",
      content:
        "Finally got my first submission in rolling today! The armbar technique from Professor Silva's course worked perfectly. So grateful for this community's support! 🙏",
      likes: 52,
      comments: 14,
      timeAgo: "1 day ago",
      image: false,
    },
    {
      id: 6,
      user: "Alex Kim",
      avatar: "AK",
      level: "Advanced",
      style: "MMA",
      content:
        "Competed in my first amateur MMA fight and won by submission! All those hours of training through Gojo paid off. Thank you to everyone who supported me!",
      likes: 127,
      comments: 31,
      timeAgo: "2 days ago",
      image: true,
    },
  ];

  const challenges = [
    {
      id: 1,
      title: "30-Day Technique Challenge",
      description: "Practice one new technique every day for 30 days",
      participants: 1247,
      daysLeft: 12,
      difficulty: "Beginner",
    },
    {
      id: 2,
      title: "Flexibility Master",
      description: "Improve your flexibility with daily stretching routines",
      participants: 856,
      daysLeft: 18,
      difficulty: "All Levels",
    },
    {
      id: 3,
      title: "Forms Perfection",
      description: "Master traditional martial arts forms and kata",
      participants: 543,
      daysLeft: 25,
      difficulty: "Intermediate",
    },
  ];

  const topInstructors = [
    {
      name: "Master Chen Wei",
      style: "Wing Chun",
      rating: 4.9,
      students: 2847,
      avatar: "CW",
    },
    {
      name: "Coach Mike Rodriguez",
      style: "Boxing",
      rating: 4.8,
      students: 3241,
      avatar: "MR",
    },
    {
      name: "Sensei Maria Santos",
      style: "Self-Defense",
      rating: 4.9,
      students: 4521,
      avatar: "MS",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Join the Gojo Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with fellow martial artists, share your progress, get
            motivated, and learn from each other. Over 10,000 students training
            together worldwide.
          </p>
        </div>

        {/* Community Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="text-center p-4">
            <Users className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">10K+</div>
            <div className="text-sm text-muted-foreground">Active Members</div>
          </Card>
          <Card className="text-center p-4">
            <MessageCircle className="w-8 h-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-accent">50K+</div>
            <div className="text-sm text-muted-foreground">Posts Shared</div>
          </Card>
          <Card className="text-center p-4">
            <Trophy className="w-8 h-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-secondary">1.2K</div>
            <div className="text-sm text-muted-foreground">Goals Achieved</div>
          </Card>
          <Card className="text-center p-4">
            <Globe className="w-8 h-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-primary">67</div>
            <div className="text-sm text-muted-foreground">Countries</div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Feed */}
          <div className="lg:col-span-2 space-y-6">
            {/* Create Post */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="w-5 h-5" />
                  Share Your Progress
                </CardTitle>
                <CardDescription>
                  Tell the community about your training, achievements, or
                  challenges
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="What did you train today? Share your progress, achievements, or ask for advice..."
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="min-h-[100px]"
                />
                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="w-4 h-4 mr-2" />
                      Add Photo
                    </Button>
                    <Button variant="outline" size="sm">
                      <Target className="w-4 h-4 mr-2" />
                      Tag Technique
                    </Button>
                  </div>
                  <Button disabled={!newPost.trim()}>Share Post</Button>
                </div>
              </CardContent>
            </Card>

            {/* Featured Posts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <TrendingUp className="w-6 h-6 text-primary" />
                Featured Community Posts
              </h2>

              {featuredPosts.map((post) => (
                <Card key={post.id} className="relative">
                  {post.featured && (
                    <div className="absolute -top-2 -right-2">
                      <Badge className="bg-primary text-primary-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.user}</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {post.style}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {post.timeAgo}
                          </span>
                        </div>

                        <p className="text-foreground leading-relaxed">
                          {post.content}
                        </p>

                        {post.image && (
                          <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                            <Camera className="w-12 h-12 text-muted-foreground" />
                          </div>
                        )}

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

            {/* Recent Posts */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                <Clock className="w-6 h-6 text-accent" />
                Recent Activity
              </h2>

              {recentPosts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-gradient-to-br from-accent to-secondary text-white">
                          {post.avatar}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold">{post.user}</span>
                          <Badge variant="secondary" className="text-xs">
                            {post.level}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {post.style}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {post.timeAgo}
                          </span>
                        </div>

                        <p className="text-foreground">{post.content}</p>

                        {post.image && (
                          <div className="aspect-video bg-gradient-to-br from-accent/20 to-secondary/20 rounded-lg flex items-center justify-center">
                            <Camera className="w-8 h-8 text-muted-foreground" />
                          </div>
                        )}

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
            {/* Community Challenges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5" />
                  Active Challenges
                </CardTitle>
                <CardDescription>
                  Join community challenges and achieve your goals
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {challenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="p-4 border rounded-lg space-y-3"
                  >
                    <div>
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {challenge.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>
                        {challenge.participants.toLocaleString()} participants
                      </span>
                      <Badge variant="secondary">{challenge.difficulty}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {challenge.daysLeft} days left
                    </div>
                    <Button size="sm" className="w-full">
                      <Zap className="w-4 h-4 mr-2" />
                      Join Challenge
                    </Button>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Challenges
                </Button>
              </CardContent>
            </Card>

            {/* Top Instructors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Featured Instructors
                </CardTitle>
                <CardDescription>
                  Connect with our top-rated instructors
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {topInstructors.map((instructor, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <Avatar className="w-12 h-12">
                      <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                        {instructor.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-semibold">{instructor.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {instructor.style}
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{instructor.rating}</span>
                        <span>•</span>
                        <span>
                          {instructor.students.toLocaleString()} students
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/instructor/profile">View All Instructors</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Be Respectful</div>
                    <div className="text-muted-foreground text-xs">
                      Treat all members with respect and kindness
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Share Progress</div>
                    <div className="text-muted-foreground text-xs">
                      Celebrate achievements and support others
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <div className="font-medium">Ask Questions</div>
                    <div className="text-muted-foreground text-xs">
                      Help each other learn and improve
                    </div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  View Full Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* Join Community CTA */}
            <Card className="bg-gradient-to-br from-primary/10 to-accent/10">
              <CardContent className="p-6 text-center space-y-4">
                <Users className="w-12 h-12 text-primary mx-auto" />
                <div>
                  <h3 className="font-bold text-lg">Ready to Connect?</h3>
                  <p className="text-sm text-muted-foreground">
                    Join our supportive community and accelerate your martial
                    arts journey
                  </p>
                </div>
                <Button className="w-full" asChild>
                  <Link to="/signup">Join Community</Link>
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
