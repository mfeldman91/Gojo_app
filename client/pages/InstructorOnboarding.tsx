import { useState, useEffect } from 'react';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  User, 
  FileText, 
  CreditCard, 
  CheckCircle, 
  ArrowRight, 
  ArrowLeft,
  Upload,
  Award,
  DollarSign
} from 'lucide-react';
import { getCurrentUser } from '@/lib/auth';
import * as supabaseAuth from '@/lib/auth-supabase';

export default function InstructorOnboarding() {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  
  const [formData, setFormData] = useState({
    // Personal Info
    bio: '',
    experience: '',
    hourlyRate: '',
    
    // Specialties & Qualifications
    martialArtsSpecialties: [] as string[],
    qualifications: [] as string[],
    customQualification: '',
    
    // Stripe Connect
    stripeAccountId: '',
    stripeOnboardingComplete: false,
    
    // Agreements
    agreedToInstructorTerms: false,
    agreedToStripeTerms: false,
  });

  useEffect(() => {
    const loadUser = async () => {
      const user = await getCurrentUser();
      if (!user) {
        window.location.href = '/login';
        return;
      }
      setCurrentUser(user);
    };
    loadUser();
  }, []);

  const martialArtsOptions = [
    'Boxing', 'Muay Thai', 'Brazilian Jiu-Jitsu', 'Karate', 'Taekwondo',
    'Wing Chun', 'Kung Fu', 'MMA', 'Self-Defense', 'Kickboxing',
    'Judo', 'Aikido', 'Krav Maga', 'Capoeira', 'Wrestling'
  ];

  const qualificationOptions = [
    'Black Belt (1st Dan or higher)',
    'Certified Instructor',
    'Competition Winner',
    'Professional Fighter',
    'Gym Owner/Manager',
    'Sports Science Degree',
    'Personal Training Certification',
    'Youth Coaching Certification',
  ];

  const experienceOptions = [
    { value: '1-2', label: '1-2 years' },
    { value: '3-5', label: '3-5 years' },
    { value: '5-10', label: '5-10 years' },
    { value: '10-15', label: '10-15 years' },
    { value: '15+', label: '15+ years' },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSpecialtyToggle = (specialty: string) => {
    setFormData(prev => ({
      ...prev,
      martialArtsSpecialties: prev.martialArtsSpecialties.includes(specialty)
        ? prev.martialArtsSpecialties.filter(s => s !== specialty)
        : [...prev.martialArtsSpecialties, specialty]
    }));
  };

  const handleQualificationToggle = (qualification: string) => {
    setFormData(prev => ({
      ...prev,
      qualifications: prev.qualifications.includes(qualification)
        ? prev.qualifications.filter(q => q !== qualification)
        : [...prev.qualifications, qualification]
    }));
  };

  const addCustomQualification = () => {
    if (formData.customQualification.trim()) {
      setFormData(prev => ({
        ...prev,
        qualifications: [...prev.qualifications, prev.customQualification.trim()],
        customQualification: ''
      }));
    }
  };

  const handleStripeSetup = async () => {
    if (!currentUser) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await supabaseAuth.createStripeConnectAccount(
        currentUser.email,
        currentUser.firstName,
        currentUser.lastName
      );

      if (result.success) {
        setFormData(prev => ({ ...prev, stripeAccountId: result.accountId }));
        // Redirect to Stripe onboarding
        window.location.href = result.onboardingUrl;
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create Stripe account' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to set up payment account' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCompleteOnboarding = async () => {
    if (!currentUser) return;

    setIsSubmitting(true);
    setMessage(null);

    try {
      const result = await supabaseAuth.createInstructorProfile(currentUser.id, {
        bio: formData.bio,
        experience: formData.experience,
        martial_arts_specialties: formData.martialArtsSpecialties,
        qualifications: formData.qualifications,
        hourly_rate: parseFloat(formData.hourlyRate),
        stripe_account_id: formData.stripeAccountId,
        stripe_onboarding_complete: formData.stripeOnboardingComplete,
        verification_status: 'pending',
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Instructor profile created successfully!' });
        setTimeout(() => {
          window.location.href = '/instructor/dashboard';
        }, 2000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to create instructor profile' });
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to complete onboarding' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const canProceedStep1 = formData.bio.length >= 50 && formData.experience && formData.hourlyRate;
  const canProceedStep2 = formData.martialArtsSpecialties.length > 0 && formData.qualifications.length > 0;
  const canCompleteOnboarding = formData.agreedToInstructorTerms && formData.agreedToStripeTerms;

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            Become a Gojo Instructor
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our community of elite martial arts instructors and start earning by sharing your expertise.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step >= stepNumber
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 ml-4 ${
                    step > stepNumber ? "bg-primary" : "bg-muted"
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              {step === 1 && "Tell us about yourself"}
              {step === 2 && "Your expertise & qualifications"}
              {step === 3 && "Payment setup & agreements"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Help students understand your background and teaching style"}
              {step === 2 && "Show your martial arts specialties and credentials"}
              {step === 3 && "Set up payments and review terms"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio (50+ characters)</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell students about your martial arts journey, teaching philosophy, and what makes your instruction unique..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    className="min-h-[120px]"
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.bio.length}/50 characters minimum
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select onValueChange={(value) => handleInputChange('experience', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        {experienceOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="hourlyRate">Hourly Rate (USD)</Label>
                    <div className="relative">
                      <DollarSign className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        id="hourlyRate"
                        type="number"
                        placeholder="50"
                        className="pl-10"
                        value={formData.hourlyRate}
                        onChange={(e) => handleInputChange('hourlyRate', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Expertise */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <Label>Martial Arts Specialties (select all that apply)</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {martialArtsOptions.map((specialty) => (
                      <label
                        key={specialty}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.martialArtsSpecialties.includes(specialty)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          checked={formData.martialArtsSpecialties.includes(specialty)}
                          onCheckedChange={() => handleSpecialtyToggle(specialty)}
                        />
                        <span className="text-sm font-medium">{specialty}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <Label>Qualifications & Certifications</Label>
                  <div className="space-y-2">
                    {qualificationOptions.map((qualification) => (
                      <label
                        key={qualification}
                        className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.qualifications.includes(qualification)
                            ? 'border-primary bg-primary/5'
                            : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Checkbox
                          checked={formData.qualifications.includes(qualification)}
                          onCheckedChange={() => handleQualificationToggle(qualification)}
                        />
                        <span className="text-sm">{qualification}</span>
                      </label>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Add custom qualification..."
                      value={formData.customQualification}
                      onChange={(e) => handleInputChange('customQualification', e.target.value)}
                    />
                    <Button variant="outline" onClick={addCustomQualification}>
                      Add
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Payment & Agreements */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Setup
                  </h3>
                  
                  {!formData.stripeAccountId ? (
                    <div className="p-4 border rounded-lg">
                      <p className="text-sm text-muted-foreground mb-4">
                        To receive payments from students, you'll need to set up a Stripe account. 
                        This is secure and free - Stripe is used by millions of businesses worldwide.
                      </p>
                      <Button onClick={handleStripeSetup} disabled={isSubmitting}>
                        {isSubmitting ? 'Setting up...' : 'Set Up Payment Account'}
                      </Button>
                    </div>
                  ) : (
                    <div className="p-4 border border-green-200 bg-green-50 rounded-lg">
                      <div className="flex items-center gap-2 text-green-800">
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-medium">Payment account connected!</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Agreements</h3>
                  
                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <Checkbox
                      checked={formData.agreedToInstructorTerms}
                      onCheckedChange={(checked) => handleInputChange('agreedToInstructorTerms', checked)}
                    />
                    <div className="text-sm">
                      <p className="font-medium">I agree to the Instructor Terms of Service</p>
                      <p className="text-muted-foreground">
                        Including content guidelines, payment terms (80% revenue share), and platform policies.
                      </p>
                    </div>
                  </label>

                  <label className="flex items-start gap-3 p-4 border rounded-lg cursor-pointer">
                    <Checkbox
                      checked={formData.agreedToStripeTerms}
                      onCheckedChange={(checked) => handleInputChange('agreedToStripeTerms', checked)}
                    />
                    <div className="text-sm">
                      <p className="font-medium">I agree to Stripe's Terms of Service</p>
                      <p className="text-muted-foreground">
                        Required for payment processing and instructor payouts.
                      </p>
                    </div>
                  </label>
                </div>
              </div>
            )}

            {/* Message Display */}
            {message && (
              <div className={`p-3 rounded-lg text-sm ${
                message.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {message.text}
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <div>
                {step > 1 && (
                  <Button variant="outline" onClick={() => setStep(step - 1)}>
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                )}
              </div>

              <div>
                {step < 3 ? (
                  <Button
                    onClick={() => setStep(step + 1)}
                    disabled={
                      (step === 1 && !canProceedStep1) ||
                      (step === 2 && !canProceedStep2)
                    }
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Button
                    onClick={handleCompleteOnboarding}
                    disabled={!canCompleteOnboarding || isSubmitting}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Completing...
                      </div>
                    ) : (
                      <>
                        <Award className="w-4 h-4 mr-2" />
                        Complete Setup
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
