import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Navigation } from "@/components/Navigation";
import { 
  Play, 
  Clock, 
  Users, 
  Star, 
  CheckCircle, 
  Download,
  Share2,
  Bookmark,
  ChevronRight,
  Shield,
  Award,
  Target
} from "lucide-react";

export default function CourseDetail() {
  // Mock course data
  const course = {
    title: "Boxing Fundamentals",
    instructor: "Mike Chen",
    price: 29,
    rating: 4.8,
    students: 1247,
    duration: "3.5 hours",
    level: "Beginner",
    description: "Master the fundamental techniques of boxing with this comprehensive course. Learn proper stance, footwork, and basic combinations that form the foundation of boxing.",
    whatYouLearn: [
      "Proper boxing stance and guard position",
      "Basic footwork and movement patterns", 
      "Fundamental punches: jab, cross, hook, uppercut",
      "Essential defensive techniques",
      "Basic combinations and timing",
      "Shadow boxing fundamentals"
    ],
    lessons: [
      { title: "Introduction to Boxing", duration: "12:34", isPreview: true },
      { title: "Boxing Stance and Guard", duration: "15:20", isPreview: false },
      { title: "Basic Footwork", duration: "18:45", isPreview: false },
      { title: "The Jab", duration: "14:12", isPreview: true },
      { title: "Cross and Hook Punches", duration: "16:30", isPreview: false },
      { title: "Uppercut Technique", duration: "13:20", isPreview: false },
      { title: "Basic Combinations", duration: "22:15", isPreview: false },
      { title: "Defensive Fundamentals", duration: "19:40", isPreview: false },
      { title: "Shadow Boxing Practice", duration: "25:30", isPreview: false },
      { title: "Final Assessment", duration: "8:15", isPreview: false }
    ]
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Link to="/courses" className="hover:text-foreground">Courses</Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/courses/boxing" className="hover:text-foreground">Boxing</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-foreground">Fundamentals</span>
            </div>

            {/* Video Preview */}
            <div className="aspect-video bg-secondary rounded-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Button size="lg" className="rounded-full w-16 h-16">
                  <Play className="w-6 h-6 ml-1" />
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 text-white">
                <Badge className="bg-black/50 text-white border-0 mb-2">Preview Available</Badge>
                <h1 className="text-2xl font-bold">{course.title}</h1>
                <p className="text-sm opacity-90">Learn the foundations of boxing</p>
              </div>
            </div>

            {/* Course Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-4 flex-wrap">
                <Badge variant="secondary">{course.level}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{course.rating}</span>
                  <span className="text-muted-foreground">({course.students} students)</span>
                </div>
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>

              <p className="text-lg text-muted-foreground">{course.description}</p>

              {/* Instructor */}
              <div className="flex items-center gap-3 p-4 bg-muted/50 rounded-lg">
                <Avatar className="w-12 h-12">
                  <AvatarFallback className="bg-primary text-primary-foreground">MC</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">Instructor: {course.instructor}</div>
                  <div className="text-sm text-muted-foreground">Professional Boxing Coach • 15+ years experience</div>
                </div>
              </div>
            </div>
          </div>

          {/* Purchase Card */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <div className="text-3xl font-bold">${course.price}</div>
                <CardDescription>One-time purchase • Lifetime access</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full" size="lg">
                  Buy Course Now
                </Button>
                <Button variant="outline" className="w-full">
                  Add to Cart
                </Button>
                
                <div className="text-center text-sm text-muted-foreground">
                  Or get this course included with{" "}
                  <Link to="/signup" className="text-primary hover:underline">
                    All-Access Pass ($39/month)
                  </Link>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Lifetime access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Download className="w-4 h-4 text-primary" />
                    <span>Downloadable resources</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Certificate of completion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-primary" />
                    <span>30-day money back guarantee</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Bookmark className="w-4 h-4 mr-2" />
                    Save
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            {/* What You'll Learn */}
            <Card>
              <CardHeader>
                <CardTitle>What You'll Learn</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-3">
                  {course.whatYouLearn.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>{course.lessons.length} lessons • {course.duration} total length</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {course.lessons.map((lesson, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-semibold">
                          {index + 1}
                        </div>
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          {lesson.isPreview && (
                            <Badge variant="secondary" className="text-xs">Preview</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{lesson.duration}</span>
                        {lesson.isPreview ? (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4" />
                          </Button>
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Related Courses */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Related Courses</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { title: "Advanced Boxing Techniques", price: 39, rating: 4.9 },
                  { title: "Boxing Conditioning", price: 24, rating: 4.7 },
                  { title: "Competition Boxing", price: 49, rating: 4.8 }
                ].map((related, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                    <div className="w-12 h-8 bg-gradient-to-br from-primary to-accent rounded"></div>
                    <div className="flex-1">
                      <div className="font-medium text-sm">{related.title}</div>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span>{related.rating}</span>
                        <span>•</span>
                        <span>${related.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Boxing Courses
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
                  mixBlendMode: 'screen',
                  filter: 'contrast(1.2) brightness(1.1)'
                }}
              />
              <span className="font-bold text-xl">Gojo</span>
            </div>
            <p className="text-secondary-foreground/80">
              Master martial arts with the world's leading online training platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
