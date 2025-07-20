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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/Navigation";
import {
  Upload,
  Plus,
  Trash2,
  Eye,
  Save,
  ArrowLeft,
  Video,
  Image,
  File,
  Clock,
  Target,
  DollarSign,
  Globe,
} from "lucide-react";
import { useState } from "react";

export default function CreateCourse() {
  const [courseData, setCourseData] = useState({
    title: "",
    description: "",
    price: "",
    level: "",
    category: "",
    duration: "",
    whatYouLearn: [""],
    requirements: [""],
    lessons: [{ title: "", duration: "", videoFile: null, resources: [] }],
  });

  const addLearningPoint = () => {
    setCourseData((prev) => ({
      ...prev,
      whatYouLearn: [...prev.whatYouLearn, ""],
    }));
  };

  const addRequirement = () => {
    setCourseData((prev) => ({
      ...prev,
      requirements: [...prev.requirements, ""],
    }));
  };

  const addLesson = () => {
    setCourseData((prev) => ({
      ...prev,
      lessons: [
        ...prev.lessons,
        { title: "", duration: "", videoFile: null, resources: [] },
      ],
    }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="outline" size="sm" asChild>
              <Link to="/instructor/dashboard">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <h1 className="text-3xl font-bold text-foreground">
              Create New Course
            </h1>
          </div>
          <p className="text-muted-foreground">
            Share your martial arts expertise with students around the world.
            Create engaging video courses that help others master your
            techniques.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Course Information</CardTitle>
                <CardDescription>
                  Basic details about your martial arts course
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="title">Course Title *</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Wing Chun Fundamentals for Beginners"
                    value={courseData.title}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="category">Martial Arts Style *</Label>
                    <Select
                      value={courseData.category}
                      onValueChange={(value) =>
                        setCourseData((prev) => ({ ...prev, category: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select martial art" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="boxing">Boxing</SelectItem>
                        <SelectItem value="muay-thai">Muay Thai</SelectItem>
                        <SelectItem value="kung-fu">Kung Fu</SelectItem>
                        <SelectItem value="karate">Karate</SelectItem>
                        <SelectItem value="taekwondo">Taekwondo</SelectItem>
                        <SelectItem value="bjj">Brazilian Jiu-Jitsu</SelectItem>
                        <SelectItem value="mma">Mixed Martial Arts</SelectItem>
                        <SelectItem value="self-defense">
                          Self-Defense
                        </SelectItem>
                        <SelectItem value="weapons">
                          Weapons Training
                        </SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="level">Difficulty Level *</Label>
                    <Select
                      value={courseData.level}
                      onValueChange={(value) =>
                        setCourseData((prev) => ({ ...prev, level: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                        <SelectItem value="all-levels">All Levels</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Course Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what students will learn in this course. Be specific about techniques, benefits, and outcomes."
                    className="min-h-[120px]"
                    value={courseData.description}
                    onChange={(e) =>
                      setCourseData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Course Price (USD) *</Label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="price"
                        type="number"
                        placeholder="29"
                        className="pl-10"
                        value={courseData.price}
                        onChange={(e) =>
                          setCourseData((prev) => ({
                            ...prev,
                            price: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Total Duration</Label>
                    <div className="relative">
                      <Clock className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="duration"
                        placeholder="3.5 hours"
                        className="pl-10"
                        value={courseData.duration}
                        onChange={(e) =>
                          setCourseData((prev) => ({
                            ...prev,
                            duration: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Course Content</CardTitle>
                <CardDescription>
                  Add lessons and structure your course curriculum
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {courseData.lessons.map((lesson, index) => (
                  <div key={index} className="p-4 border rounded-lg space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">Lesson {index + 1}</h4>
                      {courseData.lessons.length > 1 && (
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Lesson Title *</Label>
                        <Input placeholder="e.g., Basic Stance and Footwork" />
                      </div>
                      <div className="space-y-2">
                        <Label>Duration</Label>
                        <Input placeholder="e.g., 15:30" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Video Upload *</Label>
                      <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
                        <Video className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                        <div className="space-y-2">
                          <p className="text-sm font-medium">
                            Upload lesson video
                          </p>
                          <p className="text-xs text-muted-foreground">
                            MP4, MOV up to 2GB. Recommended: 1080p, 30fps
                          </p>
                          <Button variant="outline" size="sm">
                            <Upload className="w-4 h-4 mr-2" />
                            Choose File
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>Additional Resources (Optional)</Label>
                      <div className="border border-muted rounded-lg p-4">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                          <File className="w-4 h-4" />
                          <span>
                            Upload PDFs, images, or other learning materials
                          </span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Plus className="w-4 h-4 mr-2" />
                          Add Resources
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Button
                  variant="outline"
                  onClick={addLesson}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Another Lesson
                </Button>
              </CardContent>
            </Card>

            {/* Learning Objectives */}
            <Card>
              <CardHeader>
                <CardTitle>What Students Will Learn</CardTitle>
                <CardDescription>
                  List the key skills and knowledge students will gain
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {courseData.whatYouLearn.map((point, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Target className="w-5 h-5 text-primary flex-shrink-0" />
                    <Input
                      placeholder="e.g., Master the basic boxing stance and guard position"
                      value={point}
                      onChange={(e) => {
                        const newPoints = [...courseData.whatYouLearn];
                        newPoints[index] = e.target.value;
                        setCourseData((prev) => ({
                          ...prev,
                          whatYouLearn: newPoints,
                        }));
                      }}
                    />
                    {courseData.whatYouLearn.length > 1 && (
                      <Button variant="outline" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" onClick={addLearningPoint}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Learning Objective
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle>Course Preview</CardTitle>
                <CardDescription>
                  How your course will appear to students
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <Image className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Course Thumbnail
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">
                    {courseData.title || "Course Title"}
                  </h3>
                  {courseData.level && (
                    <Badge variant="secondary">{courseData.level}</Badge>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {courseData.description ||
                      "Course description will appear here..."}
                  </p>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Price:</span>
                    <span className="font-bold">
                      ${courseData.price || "0"}
                    </span>
                  </div>
                </div>

                <Button variant="outline" className="w-full">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Course
                </Button>
              </CardContent>
            </Card>

            {/* Publishing Options */}
            <Card>
              <CardHeader>
                <CardTitle>Publishing Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Course Visibility</Label>
                  <Select defaultValue="public">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">
                        <div className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Public - Anyone can find and enroll
                        </div>
                      </SelectItem>
                      <SelectItem value="unlisted">
                        Unlisted - Only with direct link
                      </SelectItem>
                      <SelectItem value="private">
                        Private - Invite only
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Button className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save as Draft
                  </Button>
                  <Button variant="outline" className="w-full">
                    Submit for Review
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground p-3 bg-muted/50 rounded-lg">
                  <strong>Note:</strong> All courses must be reviewed by our
                  team before being published. This typically takes 24-48 hours.
                </div>
              </CardContent>
            </Card>

            {/* Instructor Tips */}
            <Card>
              <CardHeader>
                <CardTitle>Success Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <Target className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Use clear, descriptive titles that include the martial art
                    and skill level
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Video className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Record in good lighting with clear audio. Show techniques
                    from multiple angles
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Break lessons into 10-20 minute segments for better
                    engagement
                  </span>
                </div>
                <div className="flex items-start gap-2">
                  <DollarSign className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <span>
                    Research similar courses to price competitively. Beginner
                    courses: $19-39
                  </span>
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
