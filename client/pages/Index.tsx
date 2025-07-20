import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import { 
  Play, 
  Users, 
  Trophy, 
  Shield, 
  Target, 
  Clock, 
  Star,
  CheckCircle,
  Zap,
  Video,
  BookOpen,
  Award
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-accent/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                                <div className="flex items-center gap-4">
                                    <img
                    src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
                    alt="Gojo Martial Arts Logo"
                    className="w-16 h-16 lg:w-20 lg:h-20 object-contain"
                    style={{
                      mixBlendMode: 'screen',
                      filter: 'contrast(1.2) brightness(1.1)'
                    }}
                  />
                  <Badge variant="secondary" className="w-fit">
                    <Trophy className="w-4 h-4 mr-2" />
                    #1 Martial Arts Training Platform
                  </Badge>
                </div>
                <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                  Master Martial Arts with 
                  <span className="text-primary"> Gojo</span>
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Buy individual courses or get unlimited access with our monthly subscription. 
                  Access premium video courses and train at your own pace.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link to="/signup">
                    <Play className="w-5 h-5 mr-2" />
                    Start Training Now
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                  <Link to="/courses">
                    <Video className="w-5 h-5 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-background"></div>
                    ))}
                  </div>
                  <div className="text-sm">
                    <div className="font-semibold text-foreground">5,000+ Students</div>
                    <div className="text-muted-foreground">Training worldwide</div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-accent text-accent" />
                  ))}
                  <span className="text-sm font-semibold ml-2">4.9/5 Rating</span>
                </div>
              </div>
            </div>

            {/* Hero Image/Video Placeholder */}
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl shadow-2xl flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <Button size="lg" className="relative z-10 rounded-full w-20 h-20">
                  <Play className="w-8 h-8 ml-1" />
                </Button>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="font-semibold">Introduction to Gojo</div>
                  <div className="text-sm opacity-90">2:30 preview</div>
                </div>
              </div>
              
              {/* Floating Stats */}
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">50+</div>
                    <div className="text-sm text-muted-foreground">Expert Instructors</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-6 -right-6 bg-card border border-border rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Clock className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">1000+</div>
                    <div className="text-sm text-muted-foreground">Hours Content</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Why Choose Gojo?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive platform combines expert instruction, structured learning, 
              and community support to accelerate your martial arts journey.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <Video className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>HD Video Courses</CardTitle>
                <CardDescription>
                  Learn with crystal-clear 4K video courses from world-class martial arts masters.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Personalized Training</CardTitle>
                <CardDescription>
                  Get customized training plans based on your skill level and martial arts goals.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Expert Instructors</CardTitle>
                <CardDescription>
                  Train with certified black belts and champions across multiple martial arts disciplines.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Structured Curriculum</CardTitle>
                <CardDescription>
                  Progress through belt levels with our comprehensive, time-tested training methodology.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Train Anywhere</CardTitle>
                <CardDescription>
                  Access your training on any device, anytime. Perfect for home workouts or on-the-go learning.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                  <Award className="w-6 h-6 text-secondary" />
                </div>
                <CardTitle>Certification Programs</CardTitle>
                <CardDescription>
                  Earn official certifications and track your progress through our ranking system.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Martial Arts Styles */}
      <section className="py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Master Every Style
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From striking to grappling, traditional to modern. Develop a complete martial arts foundation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Boxing",
                description: "Master the sweet science with footwork, combinations, and defensive techniques.",
                level: "All Levels",
                lessons: "45 Lessons"
              },
              {
                name: "Muay Thai",
                description: "The art of eight limbs - kicks, punches, knees, and elbows in perfect harmony.",
                level: "Beginner to Advanced",
                lessons: "38 Lessons"
              },
              {
                name: "Brazilian Jujutsu",
                description: "Ground fighting mastery with submissions, escapes, and positional control.",
                level: "White to Black Belt",
                lessons: "52 Lessons"
              },
              {
                name: "Karate",
                description: "Traditional techniques, kata forms, and discipline of this ancient art.",
                level: "Kyu to Dan",
                lessons: "41 Lessons"
              },
              {
                name: "Self-Defense",
                description: "Practical techniques for real-world situations and personal protection.",
                level: "Essential Skills",
                lessons: "28 Lessons"
              },
              {
                name: "Mixed Martial Arts",
                description: "Combine all disciplines for the ultimate fighting and fitness experience.",
                level: "Intermediate+",
                lessons: "60 Lessons"
              }
            ].map((style, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <CardTitle className="text-xl">{style.name}</CardTitle>
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <CardDescription className="text-base">
                    {style.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <span>{style.level}</span>
                    <span>{style.lessons}</span>
                  </div>
                  <Button className="w-full group-hover:bg-primary group-hover:text-primary-foreground" variant="outline">
                    Start Learning
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

            {/* Pricing Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground">
              Simple, Flexible Training
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Buy individual courses or get unlimited access with a monthly subscription.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="relative">
              <CardHeader>
                <CardTitle className="text-2xl">Individual Courses</CardTitle>
                <div className="text-3xl font-bold">$19-49<span className="text-lg font-normal text-muted-foreground"> per course</span></div>
                <CardDescription>Perfect for focused learning on specific techniques</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    "Lifetime access to purchased courses",
                    "HD video content",
                    "Downloadable resources",
                    "Course completion certificates",
                    "Community access for that course"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="outline" asChild>
                  <Link to="/courses">Browse Courses</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="relative border-primary shadow-lg">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Best Value</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">All-Access Pass</CardTitle>
                <div className="text-3xl font-bold">$39<span className="text-lg font-normal text-muted-foreground">/month</span></div>
                <CardDescription>Unlimited access to all courses and features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {[
                    "Access to ALL martial arts courses",
                    "New courses added monthly",
                    "Progress tracking & analytics",
                    "Community forums & challenges",
                    "Live Q&A sessions with instructors",
                    "Mobile app access"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-primary" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full" asChild>
                  <Link to="/signup">Start Free Trial</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
                        <div className="space-y-4">
              <div className="flex items-center space-x-3">
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
            
            <div>
              <h3 className="font-semibold mb-4">Training</h3>
              <div className="space-y-2 text-sm">
                <Link to="/courses" className="block hover:text-primary transition-colors">All Courses</Link>
                <Link to="/styles" className="block hover:text-primary transition-colors">Martial Arts</Link>
                <Link to="/instructors" className="block hover:text-primary transition-colors">Instructors</Link>
                <Link to="/certification" className="block hover:text-primary transition-colors">Certification</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-sm">
                <Link to="/about" className="block hover:text-primary transition-colors">About Us</Link>
                <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
                <Link to="/careers" className="block hover:text-primary transition-colors">Careers</Link>
                <Link to="/blog" className="block hover:text-primary transition-colors">Blog</Link>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-sm">
                <Link to="/help" className="block hover:text-primary transition-colors">Help Center</Link>
                <Link to="/privacy" className="block hover:text-primary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="block hover:text-primary transition-colors">Terms of Service</Link>
                <Link to="/community" className="block hover:text-primary transition-colors">Community</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-secondary-foreground/20 mt-12 pt-8 text-center text-sm text-secondary-foreground/60">
            <p>&copy; 2024 Gojo Martial Arts. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
