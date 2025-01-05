'use client';

import { FC } from 'react';
import { JobMatch, SkillGapPlan } from '../types';

interface SkillGapPlanStepProps {
  selectedJob: JobMatch | null;
  skillGapPlan: SkillGapPlan | null;
}

export const SkillGapPlanStep: FC<SkillGapPlanStepProps> = ({ selectedJob, skillGapPlan }) => {
  if (!selectedJob || !skillGapPlan) return null;

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-white mb-4">Your Return Plan</h2>
        <p className="text-white/60 text-lg font-light">
          Here's your personalized plan to successfully transition into this role.
        </p>
      </div>

      <div className="space-y-8">
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-medium text-white mb-4">Gap Analysis</h3>
          <p className="text-white/70">{skillGapPlan.gapAnalysis}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-medium text-white mb-4">Immediate Steps</h4>
            <ul className="space-y-2">
              {skillGapPlan.actionPlan.immediate.map((step, index) => (
                <li key={index} className="text-white/70">• {step}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-medium text-white mb-4">Short-term Goals</h4>
            <ul className="space-y-2">
              {skillGapPlan.actionPlan.shortTerm.map((step, index) => (
                <li key={index} className="text-white/70">• {step}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 rounded-xl p-6 border border-white/10">
            <h4 className="text-lg font-medium text-white mb-4">Long-term Vision</h4>
            <ul className="space-y-2">
              {skillGapPlan.actionPlan.longTerm.map((step, index) => (
                <li key={index} className="text-white/70">• {step}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-medium text-white mb-6">Resources & Support</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-medium text-white mb-4">Recommended Courses</h4>
              <ul className="space-y-2">
                {skillGapPlan.resources.courses.map((course, index) => (
                  <li key={index} className="text-white/70">• {course}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Workshops</h4>
              <ul className="space-y-2">
                {skillGapPlan.resources.workshops.map((workshop, index) => (
                  <li key={index} className="text-white/70">• {workshop}</li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-medium text-white mb-4">Mentorship Programs</h4>
              <ul className="space-y-2">
                {skillGapPlan.resources.mentorship.map((program, index) => (
                  <li key={index} className="text-white/70">• {program}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-medium text-white mb-2">Estimated Timeline</h3>
              <p className="text-white/70">{skillGapPlan.estimatedTimeframe}</p>
            </div>
            <a 
              href={selectedJob.applyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillGapPlanStep; 