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
import { Navigation } from "@/components/Navigation";
import {
  Target,
  Users,
  Globe,
  Heart,
  Award,
  TrendingUp,
  Clock,
  DollarSign,
  Play,
  BookOpen,
  Shield,
  Star,
  CheckCircle,
} from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <div className="space-y-4">
            <Badge variant="secondary" className="text-sm px-4 py-2">
              About Gojo Martial Arts
            </Badge>
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground">
              Revolutionizing Martial Arts Education
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              We're transforming how martial arts knowledge is shared, learned,
              and monetized. No longer do instructors have to sacrifice time for
              money—now they can teach their skills online and build thriving
              businesses.
            </p>
          </div>

          <div className="flex justify-center">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800"
              alt="Gojo Martial Arts Logo"
              className="w-20 h-20 lg:w-24 lg:h-24 object-contain"
              style={{
                mixBlendMode: "screen",
                filter: "contrast(1.2) brightness(1.1)",
              }}
            />
          </div>
        </div>

        {/* Mission Statement */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-foreground">Our Mission</h2>
            <div className="space-y-4 text-lg text-muted-foreground">
              <p>
                Traditional martial arts instruction has always been bound by
                physical location and limited class sizes. Master instructors
                could only teach as many students as their dojo could hold,
                forcing them to choose between their passion for teaching and
                financial stability.
              </p>
              <p>
                <strong className="text-foreground">
                  Gojo changes everything.
                </strong>{" "}
                We've created the world's first comprehensive martial arts
                marketplace where expert instructors can digitize their
                knowledge, reach global audiences, and build sustainable income
                streams—all while maintaining the quality and authenticity of
                traditional training.
              </p>
              <p>
                Every technique, every philosophy, every hard-earned skill can
                now be preserved, shared, and monetized. This is how martial
                arts education evolves for the digital age.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-primary/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Target className="w-8 h-8 text-primary" />
                  <h3 className="text-xl font-semibold">For Instructors</h3>
                </div>
                <p className="text-muted-foreground">
                  Transform your expertise into scalable income. Teach thousands
                  while you sleep. Build your brand beyond your local community.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/20">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Users className="w-8 h-8 text-accent" />
                  <h3 className="text-xl font-semibold">For Students</h3>
                </div>
                <p className="text-muted-foreground">
                  Learn from world-class masters regardless of location. Train
                  at your pace, on your schedule, with unlimited access to
                  expert instruction.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* The Problem We Solve */}
        <div className="bg-muted/30 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              The Problem We Solve
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The martial arts industry has been stuck in the past, limiting
              both instructors and students
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                Before Gojo
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Time for Money Trade-off</div>
                    <div className="text-sm text-muted-foreground">
                      Instructors limited by hours in the day and students in
                      the room
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Globe className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Geographic Limitations</div>
                    <div className="text-sm text-muted-foreground">
                      Students couldn't access the best instructors if they
                      lived elsewhere
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <DollarSign className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Income Ceiling</div>
                    <div className="text-sm text-muted-foreground">
                      Revenue capped by physical class capacity and local market
                      rates
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <BookOpen className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Knowledge Loss</div>
                    <div className="text-sm text-muted-foreground">
                      Master techniques often died with their creators
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-foreground">
                With Gojo
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Scalable Income</div>
                    <div className="text-sm text-muted-foreground">
                      Create once, sell forever. Earn while you sleep
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Global Reach</div>
                    <div className="text-sm text-muted-foreground">
                      Teach students from around the world, 24/7
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Unlimited Potential</div>
                    <div className="text-sm text-muted-foreground">
                      No caps on student count or revenue growth
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                  <div>
                    <div className="font-medium">Legacy Preservation</div>
                    <div className="text-sm text-muted-foreground">
                      Ancient knowledge preserved and shared for generations
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Affordability & Convenience */}
        <div className="bg-gradient-to-r from-accent/10 to-primary/10 rounded-3xl p-8 lg:p-12 mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Affordable. Convenient. Effective.
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get in shape and master martial arts without breaking the bank or
              your schedule
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <Card className="text-center border-0 bg-background/50">
              <CardContent className="p-8">
                <DollarSign className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-4">
                  Incredibly Affordable
                </h3>
                <div className="space-y-3 text-muted-foreground">
                  <p>
                    Traditional martial arts classes:{" "}
                    <span className="line-through">$150-300/month</span>
                  </p>
                  <p>
                    Personal trainer:{" "}
                    <span className="line-through">$80-150/session</span>
                  </p>
                  <p className="text-primary font-bold text-lg">
                    Gojo All-Access: $39/month
                  </p>
                  <p className="text-sm">Or individual courses from just $19</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-background/50">
              <CardContent className="p-8">
                <Clock className="w-12 h-12 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-4">Ultimate Convenience</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Train anytime, anywhere</p>
                  <p>• No commute to the gym</p>
                  <p>• Learn at your own pace</p>
                  <p>• Pause and replay techniques</p>
                  <p>• Available on all devices</p>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-0 bg-background/50">
              <CardContent className="p-8">
                <Target className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-xl mb-4">Get in Amazing Shape</h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>• Full-body workouts</p>
                  <p>• Improve flexibility & coordination</p>
                  <p>• Build strength & endurance</p>
                  <p>• Burn calories while learning</p>
                  <p>• Stress relief & mental focus</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Platform Features */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <BookOpen className="w-6 h-6 text-primary" />
                Comprehensive Courses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our course library features structured learning paths for every
                martial art, from complete beginner fundamentals to advanced
                master techniques.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">500+ HD video lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Beginner to advanced levels</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Downloadable resources</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  <span className="text-sm">Progress tracking</span>
                </div>
              </div>
              <Button className="w-full" asChild>
                <Link to="/courses">Explore All Courses</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Users className="w-6 h-6 text-accent" />
                Vibrant Community
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Connect with fellow martial artists, share your progress, get
                motivated, and learn from others on the same journey.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Progress sharing & challenges</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Expert instructor feedback</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Live Q&A sessions</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  <span className="text-sm">Global martial arts network</span>
                </div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/community">Join the Community</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Platform Impact */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-8">
            Platform Impact
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">200+</div>
              <div className="text-muted-foreground">Expert Instructors</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">10K+</div>
              <div className="text-muted-foreground">Active Students</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">$500K+</div>
              <div className="text-muted-foreground">Instructor Earnings</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">4.9★</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
          </div>
        </div>

        {/* Success Stories */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Success Stories
          </h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Master Chen Wei</h3>
                    <p className="text-muted-foreground">
                      Wing Chun Specialist
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic mb-4">
                  "In my dojo, I could teach maybe 50 students. On Gojo, I've
                  reached over 800 students from 15 countries. I've more than
                  tripled my income while preserving authentic Wing Chun
                  techniques for future generations."
                </blockquote>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>$47K+ earned</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span>847 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-accent to-secondary rounded-full flex items-center justify-center">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">Sensei Maria Santos</h3>
                    <p className="text-muted-foreground">
                      Karate & Self-Defense
                    </p>
                  </div>
                </div>
                <blockquote className="text-muted-foreground italic mb-4">
                  "Gojo gave me financial freedom I never thought possible. I
                  was struggling to make ends meet with my small dojo. Now I
                  teach women's self-defense to thousands while maintaining my
                  authentic teaching style."
                </blockquote>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-4 h-4 text-primary" />
                    <span>$32K+ earned</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4 text-accent" />
                    <span>1,200 students</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="text-center">
            <CardContent className="p-8">
              <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-4">Authentic Teaching</h3>
              <p className="text-muted-foreground">
                We preserve the integrity and tradition of martial arts while
                embracing modern technology for delivery.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Shield className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-4">Instructor Success</h3>
              <p className="text-muted-foreground">
                We're committed to helping martial arts instructors build
                sustainable, profitable online businesses.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-8">
              <Globe className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h3 className="font-bold text-xl mb-4">Global Community</h3>
              <p className="text-muted-foreground">
                Connecting martial artists worldwide to learn, grow, and
                preserve ancient wisdom for future generations.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-3xl p-8 lg:p-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Transform Your Teaching?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of martial arts instructors who have already
            discovered the freedom of teaching online. Your expertise deserves
            to reach the world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8" asChild>
              <Link to="/instructor/dashboard">
                <Play className="w-5 h-5 mr-2" />
                Start Teaching Today
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              asChild
            >
              <Link to="/signup">
                <BookOpen className="w-5 h-5 mr-2" />
                Learn as a Student
              </Link>
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
              Revolutionizing martial arts education for the digital age.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
