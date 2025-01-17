'use client';

import { FC, useState } from 'react';
import { FormData, JobMatch, SkillGapPlan } from './types';
import PersonalInfoStep from './components/PersonalInfoStep';
import JobMatchesStep from './components/JobMatchesStep';
import SkillGapPlanStep from './components/SkillGapPlanStep';
import { searchJobs, JobApiError } from '../services/jobApi';
import { generateSkillGapPlan } from '../services/geminiService';

const validateForm = (data: FormData): boolean => {
  return !!(
    data.personal.yearsOutOfWork &&
    data.experience.lastRole &&
    data.experience.industry &&
    data.experience.keySkills &&
    data.preferences.desiredRole &&
    data.preferences.workType &&
    data.preferences.country &&
    data.preferences.location
  );
};

const JobSearchPage: FC = () => {
  const [currentStep, setCurrentStep] = useState<'form' | 'matches' | 'plan'>('form');
  const [matchedJobs, setMatchedJobs] = useState<JobMatch[]>([]);
  const [selectedJob, setSelectedJob] = useState<JobMatch | null>(null);
  const [skillGapPlan, setSkillGapPlan] = useState<SkillGapPlan | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      yearsOutOfWork: ''
    },
    experience: {
      lastRole: '',
      industry: '',
      keySkills: '',
      reasonForBreak: ''
    },
    preferences: {
      desiredRole: '',
      workType: 'hybrid',
      salary: '',
      location: '',
      country: 'gb'
    }
  });

  const handleSubmit = async () => {
    if (!validateForm(formData)) {
      setError('Please fill in all required fields');
      return;
    }

    setError(null);
    setIsLoading(true);

    try {
      const jobs = await searchJobs({
        role: formData.preferences.desiredRole,
        location: formData.preferences.location,
        country: formData.preferences.country,
        userProfile: formData
      });
      
      setMatchedJobs(jobs);
      setCurrentStep('matches');
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof JobApiError) {
        setError(error.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
      
      // Fallback data for demo purposes
      setMatchedJobs([
        {
          title: "Return to Work Program - Project Manager",
          company: "Tech Company",
          location: "London, UK",
          salary: "£45,000 - £65,000",
          matchScore: 85,
          returnFriendly: {
            mentorship: true,
            flexibleHours: true,
            returnProgram: true
          },
          requirements: [
            "Previous project management experience",
            "Strong communication skills",
            "Team leadership experience"
          ],
          description: "Join our inclusive return-to-work program designed for experienced professionals...",
          applyUrl: "https://example.com/apply",
          postedDate: new Date().toLocaleDateString(),
          jobType: "Full-time",
          category: "Project Management"
        }
      ]);
      setCurrentStep('matches');
    } finally {
      setIsLoading(false);
    }
  };

  const handleJobSelect = async (job: JobMatch) => {
    try {
      // First set loading and move to plan view
      setIsLoading(true);
      setError(null);
      setSelectedJob(job);
      setCurrentStep('plan');

      // Then generate the plan
      const plan = await generateSkillGapPlan(job, formData);
      setSkillGapPlan(plan);
    } catch (error) {
      console.error('Error generating plan:', error);
      setError('Failed to generate career plan. Please try again.');
      setCurrentStep('matches');
      setSelectedJob(null);
      setSkillGapPlan(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    setCurrentStep('matches');
    setSkillGapPlan(null);
    setSelectedJob(null);
    setError(null);
  };

  return (
    <main className="flex-1 flex flex-col bg-[#0a0a0a]">
      <div className="relative flex-1 pt-32 pb-12">
        {/* Background effects - adding z-index to ensure they don't cover content */}
        <div className="fixed inset-0 bg-[#0a0a0a] z-0"></div>
        <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] z-0"></div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                <p className="text-red-400">{error}</p>
              </div>
            )}
            
            {currentStep === 'form' && (
              <PersonalInfoStep 
                formData={formData} 
                setFormData={setFormData}
                onSubmit={handleSubmit}
                isLoading={isLoading}
              />
            )}
            {currentStep === 'matches' && (
              <JobMatchesStep 
                matchedJobs={matchedJobs}
                onJobSelect={handleJobSelect}
                setCurrentStep={setCurrentStep}
                userLocation={formData.personal.location}
              />
            )}
            {currentStep === 'plan' && (
              <SkillGapPlanStep 
                selectedJob={selectedJob}
                skillGapPlan={skillGapPlan}
                isLoading={isLoading}
                onBack={handleBack}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default JobSearchPage; 

