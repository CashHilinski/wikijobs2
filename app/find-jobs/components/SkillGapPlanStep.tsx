'use client';

import { FC } from 'react';
import { JobMatch, SkillGapPlan } from '../types';

interface SkillGapPlanStepProps {
  selectedJob: JobMatch | null;
  skillGapPlan: SkillGapPlan | null;
  isLoading?: boolean;
}

const SkillGapPlanStep: FC<SkillGapPlanStepProps> = ({ 
  selectedJob, 
  skillGapPlan,
  isLoading = false 
}) => {
  if (!selectedJob) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white mb-4"></div>
          <p className="text-white/70">Generating your personalized return plan...</p>
        </div>
      </div>
    );
  }

  if (!skillGapPlan) return null;

  return (
    <div className="space-y-8">
      {/* Job Overview */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-white">Return Plan for {selectedJob.title}</h2>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <p className="text-white/70">Company: {selectedJob.company}</p>
          <p className="text-white/70">Location: {selectedJob.location}</p>
          <p className="text-white/70">Salary: {selectedJob.salary}</p>
        </div>
      </div>

      {/* Skills Analysis */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-white">Skills Analysis</h3>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="font-medium text-white mb-2">Gap Analysis</h4>
          <p className="text-white/70">{skillGapPlan.gapAnalysis}</p>
        </div>
        <div className="p-4 rounded-lg bg-white/5 border border-white/10">
          <h4 className="font-medium text-white mb-2">Required Skills</h4>
          <ul className="list-disc list-inside text-white/70 space-y-1">
            {skillGapPlan.requiredSkills.map((skill, index) => (
              <li key={index}>{skill}</li>
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
                <li key={index}>{action}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">3-Month Goals</h4>
            <ul className="list-disc list-inside text-white/70 space-y-1">
              {skillGapPlan.actionPlan.shortTerm.map((action, index) => (
                <li key={index}>{action}</li>
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
                <li key={index}>{course}</li>
              ))}
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Certification</h4>
            <p className="text-white/70">{skillGapPlan.resources.certification}</p>
          </div>
          <div className="p-4 rounded-lg bg-white/5 border border-white/10">
            <h4 className="font-medium text-white mb-2">Networking</h4>
            <p className="text-white/70">{skillGapPlan.resources.networking}</p>
          </div>
        </div>
      </div>

      <div className="p-4 rounded-lg bg-white/5 border border-white/10">
        <p className="text-white/70">
          Estimated time to job readiness: <span className="text-white font-medium">{skillGapPlan.estimatedTimeframe} months</span>
        </p>
      </div>
    </div>
  );
};

export default SkillGapPlanStep; 