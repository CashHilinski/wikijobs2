'use client';

import { FC, useState, useEffect } from 'react';
import { JobMatch, SkillGapPlan } from '../types';
import { motion, AnimatePresence } from 'framer-motion';

// Utility function to parse markdown-style text
const parseMarkdownText = (text: string) => {
  // Replace **text** with bold spans
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>');
};

// Utility component to render HTML content safely
const MarkdownText: FC<{ content: string; className?: string }> = ({ content, className = "" }) => {
  return (
    <span 
      className={className}
      dangerouslySetInnerHTML={{ 
        __html: parseMarkdownText(content) 
      }} 
    />
  );
};

interface SkillGapPlanStepProps {
  selectedJob: JobMatch | null;
  skillGapPlan: SkillGapPlan | null;
  isLoading?: boolean;
  onBack?: () => void;
}

const loadingMessages = [
  "Analyzing your career background...",
  "Identifying skill gaps...",
  "Creating your return plan..."
];

const LoadingOverlay = () => {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 2000);
    
    return () => {
      clearInterval(messageInterval);
    };
  }, []);

  return (
    <div 
      className="absolute inset-0 z-[9999] flex items-center justify-center"
    >
      <div className="w-full max-w-lg mx-auto px-6 py-12 mt-[28rem]">
        <div className="space-y-12 text-center">
          {/* Animated Logo/Icon */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.div
              className="absolute inset-0 rounded-full border-t-4 border-t-blue-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-4 rounded-full border-t-4 border-t-purple-500"
              animate={{ rotate: -360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute inset-8 rounded-full border-t-4 border-t-green-500"
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Loading Message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={messageIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <h3 className="text-3xl font-medium text-white">
                {loadingMessages[messageIndex]}
              </h3>
              <p className="text-xl text-white/60">
                Creating your personalized return-to-work plan
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-3">
            {loadingMessages.map((_, index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === messageIndex ? 'bg-blue-500' : 'bg-white/20'
                }`}
                animate={index === messageIndex ? { 
                  scale: [1, 1.2, 1],
                  boxShadow: ['0 0 0 0 rgba(59, 130, 246, 0)', '0 0 0 8px rgba(59, 130, 246, 0.3)', '0 0 0 0 rgba(59, 130, 246, 0)']
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const SkillGapPlanStep: FC<SkillGapPlanStepProps> = ({ 
  selectedJob, 
  skillGapPlan,
  isLoading = false,
  onBack
}) => {
  if (!selectedJob) return null;

  return (
    <>
      {!isLoading && skillGapPlan && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-8"
        >
          {/* Header with Back Button */}
          <div className="flex items-center justify-between mb-8">
            <button
              onClick={onBack}
              className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
            >
              <span>←</span>
              <span>Back to Jobs</span>
            </button>
          </div>

          {/* Job Overview */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Return Plan for {selectedJob.title}</h2>
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <p className="text-white/70">Company: {selectedJob.company}</p>
              <p className="text-white/70">Location: {selectedJob.location}</p>
              <p className="text-white/70">Salary: {selectedJob.salary}</p>
            </div>
          </div>

          {skillGapPlan && (
            <>
              {/* Skills Analysis */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Skills Analysis</h3>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2">Gap Analysis</h4>
                  <MarkdownText 
                    content={skillGapPlan.gapAnalysis}
                    className="text-white/70"
                  />
                </div>
                <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                  <h4 className="font-medium text-white mb-2">Required Skills</h4>
                  <ul className="list-disc list-inside text-white/70 space-y-1">
                    {skillGapPlan.requiredSkills.map((skill, index) => (
                      <li key={index}>
                        <MarkdownText content={skill} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Action Plan */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Action Plan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Quick Wins (2 Weeks)</h4>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      {skillGapPlan.actionPlan.immediate.map((action, index) => (
                        <li key={index}>
                          <MarkdownText content={action} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">3-Month Goals</h4>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      {skillGapPlan.actionPlan.shortTerm.map((action, index) => (
                        <li key={index}>
                          <MarkdownText content={action} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Resources */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Recommended Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Courses</h4>
                    <ul className="list-disc list-inside text-white/70 space-y-1">
                      {skillGapPlan.resources.courses.map((course, index) => (
                        <li key={index}>
                          <MarkdownText content={course} />
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Certification</h4>
                    <MarkdownText 
                      content={skillGapPlan.resources.certification}
                      className="text-white/70"
                    />
                  </div>
                  <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                    <h4 className="font-medium text-white mb-2">Networking</h4>
                    <MarkdownText 
                      content={skillGapPlan.resources.networking}
                      className="text-white/70"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-white/5 border border-white/10">
                <p className="text-white/70">
                  Estimated time to job readiness: <span className="text-white font-medium">{skillGapPlan.estimatedTimeframe} months</span>
                </p>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between items-center mt-8 pt-8 border-t border-white/10">
            <div className="flex gap-4">
              <a
                href={selectedJob.applyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-black px-6 py-3 rounded-lg font-medium hover:bg-white/90 transition-colors"
              >
                Apply Now
              </a>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 rounded-lg font-medium border border-white/10 text-white hover:bg-white/5 transition-colors"
              >
                Save Plan as PDF
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {isLoading && (
        <div className="absolute inset-0 bg-[#0a0a0a]">
          <LoadingOverlay />
        </div>
      )}
    </>
  );
};

export default SkillGapPlanStep; 