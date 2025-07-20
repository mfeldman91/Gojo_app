import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Navigation } from "@/components/Navigation";
import { 
  CheckCircle, 
  X, 
  Star, 
  Users, 
  Play,
  Download,
  Award,
  Shield,
  Clock,
  Target,
  BookOpen,
  Video,
  MessageCircle,
  Zap,
  Globe,
  DollarSign
} from "lucide-react";
import { useState } from "react";

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);

  const plans = [
    {
      name: "Free Trial",
      description: "Perfect for trying out Gojo",
      monthlyPrice: 0,
      annualPrice: 0,
      popular: false,
      features: [
        { name: "3 free course previews", included: true },
        { name: "Basic community access", included: true },
        { name: "Mobile app access", included: true },
        { name: "Email support", included: true },
        { name: "Full course access", included: false },
        { name: "Download videos", included: false },
        { name: "Live Q&A sessions", included: false },
        { name: "Progress tracking", included: false },
        { name: "Certificates", included: false },
        { name: "Priority support", included: false }
      ],
      cta: "Start Free Trial",
      ctaVariant: "outline" as const
    },
    {
      name: "All-Access Pass",
      description: "Best value for serious learners",
      monthlyPrice: 39,
      annualPrice: 29, // $348/year = $29/month
      popular: true,
      features: [
        { name: "Unlimited course access", included: true },
        { name: "New courses added monthly", included: true },
        { name: "Download videos offline", included: true },
        { name: "Progress tracking & analytics", included: true },
        { name: "Community forums & challenges", included: true },
        { name: "Live Q&A with instructors", included: true },
        { name: "Course completion certificates", included: true },
        { name: "Mobile app access", included: true },
        { name: "Priority email support", included: true },
        { name: "Cancel anytime", included: true }
      ],
      cta: "Start Learning Now",
      ctaVariant: "default" as const
    },
    {
      name: "Individual Courses",
      description: "Pay per course you want",
      monthlyPrice: null,
      annualPrice: null,
      popular: false,
      features: [
        { name: "Lifetime course access", included: true },
        { name: "HD video content", included: true },
        { name: "Downloadable resources", included: true },
        { name: "Course completion certificate", included: true },
        { name: "Community access for course", included: true },
        { name: "Mobile app access", included: true },
        { name: "Email support", included: true },
        { name: "Live Q&A sessions", included: false },
        { name: "Access to all courses", included: false },
        { name: "Priority support", included: false }
      ],
      cta: "Browse Courses",
      ctaVariant: "outline" as const,
      priceRange: "$19-89 per course"
    }
  ];

  const faqs = [
    {
      question: "Can I cancel my subscription anytime?",
      answer: "Yes, you can cancel your All-Access Pass subscription at any time. You'll continue to have access until the end of your current billing period."
    },
    {
      question: "What happens if I buy individual courses and then get the All-Access Pass?",
      answer: "Your individual course purchases remain yours forever, even if you cancel the All-Access Pass. The subscription gives you access to additional courses and features."
    },
    {
      question: "Do I need special equipment to train?",
      answer: "Most courses require minimal equipment. We'll clearly list any equipment needed for each course. Many techniques can be practiced with just body weight."
    },
    {
      question: "Are the courses suitable for complete beginners?",
      answer: "Absolutely! We have courses designed specifically for beginners, with step-by-step instruction and progressive skill building."
    },
    {
      question: "Can I download videos for offline viewing?",
      answer: "Yes, All-Access Pass subscribers can download videos through our mobile app for offline viewing. Individual course purchases also include download access."
    },
    {
      question: "What's your refund policy?",
      answer: "We offer a 30-day money-back guarantee on all purchases. If you're not satisfied, contact our support team for a full refund."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Header */}
        <div className="text-center space-y-4 lg:space-y-6 mb-12 lg:mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-foreground">
            Choose Your Training Plan
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto">
            Start your martial arts journey with flexible pricing options. 
            From individual courses to unlimited access - find the perfect plan for your goals.
          </p>

          {/* Annual/Monthly Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-sm font-medium ${!isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Monthly
            </span>
            <Switch
              checked={isAnnual}
              onCheckedChange={setIsAnnual}
              className="data-[state=checked]:bg-primary"
            />
            <span className={`text-sm font-medium ${isAnnual ? 'text-foreground' : 'text-muted-foreground'}`}>
              Annual
            </span>
            {isAnnual && (
              <Badge className="bg-green-100 text-green-800 ml-2">
                Save 25%
              </Badge>
            )}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mb-16 lg:mb-20">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.popular ? 'border-primary shadow-lg scale-105' : ''} transition-all hover:shadow-xl`}>
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Most Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-xl lg:text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm lg:text-base">{plan.description}</CardDescription>
                
                <div className="pt-4">
                  {plan.monthlyPrice !== null ? (
                    <div className="space-y-2">
                      <div className="text-3xl lg:text-4xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                        <span className="text-base lg:text-lg font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                      {isAnnual && plan.monthlyPrice !== plan.annualPrice && (
                        <div className="text-sm text-muted-foreground">
                          Billed annually (${(plan.annualPrice * 12).toFixed(0)}/year)
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-2xl lg:text-3xl font-bold text-primary">
                      {plan.priceRange}
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4 lg:space-y-6">
                <div className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      {feature.included ? (
                        <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-primary mt-0.5 flex-shrink-0" />
                      ) : (
                        <X className="w-4 h-4 lg:w-5 lg:h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                      )}
                      <span className={`text-sm lg:text-base ${feature.included ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {feature.name}
                      </span>
                    </div>
                  ))}
                </div>
                
                <Button 
                  className="w-full mt-6" 
                  variant={plan.ctaVariant}
                  size="lg"
                  asChild
                >
                  <Link to={index === 1 ? "/signup" : index === 2 ? "/courses" : "/signup"}>
                    {plan.cta}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Comparison */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-12">
            What's Included
          </h2>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: <Video className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />,
                title: "HD Video Courses",
                description: "Crystal-clear 1080p+ video instruction from master teachers"
              },
              {
                icon: <Download className="w-6 h-6 lg:w-8 lg:h-8 text-accent" />,
                title: "Offline Access",
                description: "Download videos and train anywhere, even without internet"
              },
              {
                icon: <Users className="w-6 h-6 lg:w-8 lg:h-8 text-secondary" />,
                title: "Global Community",
                description: "Connect with 10,000+ martial artists worldwide"
              },
              {
                icon: <Award className="w-6 h-6 lg:w-8 lg:h-8 text-primary" />,
                title: "Certificates",
                description: "Earn official completion certificates for your progress"
              }
            ].map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-4 lg:p-6 space-y-3 lg:space-y-4">
                  <div className="flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-base lg:text-lg">{feature.title}</h3>
                  <p className="text-sm lg:text-base text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-muted/30 rounded-2xl lg:rounded-3xl p-6 lg:p-12 mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-12">
            What Our Students Say
          </h2>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                name: "Sarah Chen",
                level: "Intermediate Wing Chun",
                text: "The All-Access Pass has been incredible value. I've completed 5 courses and saved hundreds compared to local classes.",
                rating: 5
              },
              {
                name: "Miguel Rodriguez",
                level: "Boxing Beginner",
                text: "Started with individual courses, now on All-Access. The progression from beginner to intermediate has been seamless.",
                rating: 5
              },
              {
                name: "Emma Thompson",
                level: "Advanced Muay Thai",
                text: "As an instructor myself, I can say these courses rival the best in-person training. Worth every penny.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <Card key={index} className="border-0 bg-background/50">
                <CardContent className="p-4 lg:p-6 space-y-4">
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm lg:text-base text-muted-foreground italic">
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div className="font-semibold text-sm lg:text-base">{testimonial.name}</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">{testimonial.level}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Money Back Guarantee */}
        <div className="text-center mb-16 lg:mb-20">
          <Card className="max-w-2xl mx-auto border-primary/20">
            <CardContent className="p-6 lg:p-8 space-y-4">
              <Shield className="w-12 h-12 lg:w-16 lg:h-16 text-primary mx-auto" />
              <h3 className="text-xl lg:text-2xl font-bold text-foreground">30-Day Money Back Guarantee</h3>
              <p className="text-sm lg:text-base text-muted-foreground">
                Not satisfied? Get a full refund within 30 days, no questions asked. 
                We're confident you'll love training with Gojo.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mb-16 lg:mb-20">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground text-center mb-8 lg:mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-4 lg:space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-base lg:text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm lg:text-base text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-accent/10 rounded-2xl lg:rounded-3xl p-6 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
            Ready to Start Your Journey?
          </h2>
          <p className="text-base lg:text-xl text-muted-foreground mb-6 lg:mb-8 max-w-2xl mx-auto">
            Join thousands of students mastering martial arts with Gojo. 
            Start with our free trial and experience the difference.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-base lg:text-lg px-6 lg:px-8" asChild>
              <Link to="/signup">
                <Play className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Start Free Trial
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-base lg:text-lg px-6 lg:px-8" asChild>
              <Link to="/courses">
                <BookOpen className="w-4 h-4 lg:w-5 lg:h-5 mr-2" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-secondary text-secondary-foreground py-12 lg:py-16 mt-16 lg:mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <img 
                src="https://cdn.builder.io/api/v1/image/assets%2F063165da271649ceb7c8b43e87a943e7%2F24ea7adf3b8a40f39841dcd598dfcd35?format=webp&width=800" 
                alt="Gojo Martial Arts Logo"
                className="w-8 h-8 lg:w-10 lg:h-10 object-contain"
                style={{
                  mixBlendMode: 'screen',
                  filter: 'contrast(1.2) brightness(1.1)'
                }}
              />
              <span className="font-bold text-lg lg:text-xl">Gojo</span>
            </div>
            <p className="text-sm lg:text-base text-secondary-foreground/80">
              Master martial arts with the world's leading online training platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
