// Realistic user stats utility for Gojo Martial Arts platform

export interface UserStats {
  totalUsers: number;
  activeUsers: number;
  totalCourses: number;
  totalInstructors: number;
  totalRevenue: number;
  monthlyRevenue: number;
  totalPosts: number;
  totalLikes: number;
  completedChallenges: number;
  countries: number;
  averageRating: number;
  totalReviews: number;
  instructorEarnings: number;
}

export interface InstructorStats {
  totalRevenue: number;
  monthlyRevenue: number;
  totalStudents: number;
  newStudents: number;
  averageRating: number;
  totalReviews: number;
  coursesPublished: number;
  coursesInDraft: number;
  monthlyGrowthRate: number;
  studentRetentionRate: number;
}

export interface CourseStats {
  totalEnrollments: number;
  completionRate: number;
  averageRating: number;
  totalReviews: number;
  monthlyEnrollments: number;
  revenue: number;
}

// Base stats that grow over time
const BASE_STATS = {
  launchDate: new Date('2023-01-01'),
  baseUsers: 2500,
  baseInstructors: 50,
  baseCourses: 120,
  baseRevenue: 150000,
};

// Calculate time-based growth
function getGrowthMultiplier(): number {
  const now = new Date();
  const monthsSinceLaunch = (now.getTime() - BASE_STATS.launchDate.getTime()) / (1000 * 60 * 60 * 24 * 30);
  // Organic growth rate of ~15% per month with some randomness
  return Math.pow(1.15, monthsSinceLaunch) * (0.9 + Math.random() * 0.2);
}

// Get current date-based stats
export function getUserStats(): UserStats {
  const growthMultiplier = getGrowthMultiplier();
  const totalUsers = Math.floor(BASE_STATS.baseUsers * growthMultiplier);
  
  return {
    totalUsers,
    activeUsers: Math.floor(totalUsers * 0.65), // 65% active rate
    totalCourses: Math.floor(BASE_STATS.baseCourses * Math.pow(1.08, getGrowthMultiplier())),
    totalInstructors: Math.floor(BASE_STATS.baseInstructors * Math.pow(1.12, getGrowthMultiplier())),
    totalRevenue: Math.floor(BASE_STATS.baseRevenue * growthMultiplier),
    monthlyRevenue: Math.floor((BASE_STATS.baseRevenue * growthMultiplier) * 0.12), // 12% monthly
    totalPosts: Math.floor(totalUsers * 3.2), // Average 3.2 posts per user
    totalLikes: Math.floor(totalUsers * 15.7), // Average 15.7 likes given per user
    completedChallenges: Math.floor(totalUsers * 0.28), // 28% complete challenges
    countries: Math.min(95, Math.floor(42 + (totalUsers / 150))), // Cap at 95 countries
    averageRating: 4.8 + (Math.random() * 0.2), // 4.8-5.0 range
    totalReviews: Math.floor(totalUsers * 0.45), // 45% leave reviews
    instructorEarnings: Math.floor((BASE_STATS.baseRevenue * growthMultiplier) * 0.7), // 70% goes to instructors
  };
}

export function getInstructorStats(instructorId?: string): InstructorStats {
  const globalStats = getUserStats();
  const instructorMultiplier = 0.8 + (Math.random() * 0.4); // Variance between instructors
  
  const totalStudents = Math.floor((globalStats.totalUsers / globalStats.totalInstructors) * instructorMultiplier);
  const totalRevenue = Math.floor((globalStats.instructorEarnings / globalStats.totalInstructors) * instructorMultiplier);
  
  return {
    totalRevenue,
    monthlyRevenue: Math.floor(totalRevenue * 0.08), // 8% monthly
    totalStudents,
    newStudents: Math.floor(totalStudents * 0.06), // 6% new this month
    averageRating: 4.7 + (Math.random() * 0.3),
    totalReviews: Math.floor(totalStudents * 0.4),
    coursesPublished: Math.floor(3 + Math.random() * 8), // 3-11 courses
    coursesInDraft: Math.floor(Math.random() * 3), // 0-2 drafts
    monthlyGrowthRate: 8 + Math.random() * 15, // 8-23% growth
    studentRetentionRate: 75 + Math.random() * 20, // 75-95% retention
  };
}

export function getCourseStats(courseId?: string): CourseStats {
  const globalStats = getUserStats();
  const coursePopularity = 0.3 + (Math.random() * 0.7); // Variance in popularity
  
  const totalEnrollments = Math.floor((globalStats.totalUsers / globalStats.totalCourses) * coursePopularity);
  
  return {
    totalEnrollments,
    completionRate: 65 + Math.random() * 25, // 65-90% completion
    averageRating: 4.6 + Math.random() * 0.4, // 4.6-5.0
    totalReviews: Math.floor(totalEnrollments * 0.35),
    monthlyEnrollments: Math.floor(totalEnrollments * 0.1), // 10% monthly
    revenue: Math.floor(totalEnrollments * (25 + Math.random() * 40)), // $25-65 per enrollment
  };
}

// Specific stats for homepage
export function getHomepageStats() {
  const stats = getUserStats();
  return {
    totalStudents: `${Math.floor(stats.totalUsers / 1000)}K+`,
    expertInstructors: `${stats.totalInstructors}+`,
    hoursContent: `${Math.floor(stats.totalCourses * 8.5)}+`, // ~8.5 hours per course
    rating: stats.averageRating.toFixed(1),
    activeInstructors: `${Math.floor(stats.totalInstructors * 0.8)}+`, // 80% active
    instructorEarnings: `$${Math.floor(stats.instructorEarnings / 1000)}K+`,
    averageInstructorRating: (stats.averageRating - 0.1).toFixed(1), // Slightly lower than overall
  };
}

// Community specific stats
export function getCommunityStats() {
  const stats = getUserStats();
  return {
    activeMembers: `${Math.floor(stats.activeUsers / 1000)}K+`,
    postsShared: `${Math.floor(stats.totalPosts / 1000)}K+`,
    goalsAchieved: `${Math.floor(stats.completedChallenges / 100) / 10}K`, // More precise for smaller numbers
    countries: stats.countries,
  };
}

// Challenge participation stats
export function getChallengeStats() {
  const baseParticipants = [1247, 856, 543];
  const growthFactor = getGrowthMultiplier();
  
  return baseParticipants.map(base => Math.floor(base * Math.sqrt(growthFactor)));
}

// Get realistic time-based activity
export function getRecentActivity() {
  const activities = [
    'new enrollment', 'course completion', 'community post', 
    'challenge joined', 'review submitted', 'milestone achieved'
  ];
  
  const now = new Date();
  return Array.from({ length: 6 }, (_, i) => {
    const minutesAgo = Math.floor(Math.random() * 240); // Last 4 hours
    const activity = activities[Math.floor(Math.random() * activities.length)];
    
    return {
      type: activity,
      timeAgo: minutesAgo < 60 ? `${minutesAgo}m ago` : `${Math.floor(minutesAgo / 60)}h ago`,
      value: Math.floor(Math.random() * 50) + 1,
    };
  });
}

// Export individual functions for easy access
export default getUserStats;
