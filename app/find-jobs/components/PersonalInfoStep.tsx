'use client';

import { FC } from 'react';
import { FormData } from '../types';

interface PersonalInfoStepProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  onSubmit: () => Promise<void>;
  isLoading: boolean;
}

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

export const PersonalInfoStep: FC<PersonalInfoStepProps> = ({ 
  formData, 
  setFormData, 
  onSubmit, 
  isLoading 
}) => (
  <div className="space-y-8">
    <div className="text-center mb-12">
      <h1 className="text-4xl font-semibold text-white mb-4">Welcome Back to Your Career</h1>
      <p className="text-white/60 text-lg font-light max-w-2xl mx-auto">
        Let's understand your journey and help you find the perfect role for your return to work.
      </p>
    </div>

    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          How long have you been away from work? <span className="text-red-400">*</span>
        </label>
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          value={formData.personal.yearsOutOfWork}
          onChange={(e) => setFormData({
            ...formData,
            personal: { ...formData.personal, yearsOutOfWork: e.target.value }
          })}
        >
          <option value="" className="bg-[#1a1a1a] text-white">Select duration</option>
          <option value="0-1" className="bg-[#1a1a1a] text-white">Less than 1 year</option>
          <option value="1-2" className="bg-[#1a1a1a] text-white">1-2 years</option>
          <option value="2-5" className="bg-[#1a1a1a] text-white">2-5 years</option>
          <option value="5+" className="bg-[#1a1a1a] text-white">More than 5 years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          What was your last role? <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder="e.g. Software Engineer, Project Manager"
          value={formData.experience.lastRole}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            experience: { ...prev.experience, lastRole: e.target.value }
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          In which industry did you work? <span className="text-red-400">*</span>
        </label>
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          value={formData.experience.industry}
          onChange={(e) => setFormData({
            ...formData,
            experience: { ...formData.experience, industry: e.target.value }
          })}
        >
          <option value="" className="bg-[#1a1a1a] text-white">Select industry</option>
          <option value="tech" className="bg-[#1a1a1a] text-white">Technology</option>
          <option value="finance" className="bg-[#1a1a1a] text-white">Finance</option>
          <option value="healthcare" className="bg-[#1a1a1a] text-white">Healthcare</option>
          <option value="education" className="bg-[#1a1a1a] text-white">Education</option>
          <option value="other" className="bg-[#1a1a1a] text-white">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          What skills would you like to leverage in your return? <span className="text-red-400">*</span>
        </label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[100px]"
          placeholder="e.g. Project Management, Team Leadership, Technical Analysis"
          value={formData.experience.keySkills}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            experience: { 
              ...prev.experience, 
              keySkills: e.target.value 
            }
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          What type of role are you looking for now? <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          placeholder="e.g. Product Manager, Data Analyst"
          value={formData.preferences.desiredRole}
          onChange={(e) => setFormData({
            ...formData,
            preferences: { ...formData.preferences, desiredRole: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Preferred work arrangement <span className="text-red-400">*</span>
        </label>
        <select 
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
          value={formData.preferences.workType}
          onChange={(e) => setFormData({
            ...formData,
            preferences: { ...formData.preferences, workType: e.target.value as 'remote' | 'hybrid' | 'onsite' }
          })}
        >
          <option value="remote" className="bg-[#1a1a1a] text-white">Remote</option>
          <option value="hybrid" className="bg-[#1a1a1a] text-white">Hybrid</option>
          <option value="onsite" className="bg-[#1a1a1a] text-white">On-site</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-white/90 mb-2">
          Any specific requirements for your return? (Optional)
        </label>
        <textarea
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20 min-h-[100px]"
          placeholder="e.g. Flexible hours, Return-to-work program, Mentorship opportunities"
          value={formData.experience.reasonForBreak}
          onChange={(e) => setFormData({
            ...formData,
            experience: { ...formData.experience, reasonForBreak: e.target.value }
          })}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              Country <span className="text-red-400">*</span>
            </label>
            <select
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
              value={formData.preferences.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, country: e.target.value }
              }))}
            >
              <option value="gb" className="bg-[#1a1a1a] text-white">United Kingdom</option>
              <option value="us" className="bg-[#1a1a1a] text-white">United States</option>
              <option value="au" className="bg-[#1a1a1a] text-white">Australia</option>
              <option value="de" className="bg-[#1a1a1a] text-white">Germany</option>
              <option value="ca" className="bg-[#1a1a1a] text-white">Canada</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-white/90 mb-2">
              City/Region <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="e.g. London, New York"
              value={formData.preferences.location}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, location: e.target.value }
              }))}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-white/90 mb-2">
            Expected Salary Range (Optional)
          </label>
          <select
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-white/20"
            value={formData.preferences.salary}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              preferences: { ...prev.preferences, salary: e.target.value }
            }))}
          >
            <option value="" className="bg-[#1a1a1a] text-white">Select range (optional)</option>
            <option value="20000-30000" className="bg-[#1a1a1a] text-white">£20,000 - £30,000</option>
            <option value="30000-45000" className="bg-[#1a1a1a] text-white">£30,000 - £45,000</option>
            <option value="45000-60000" className="bg-[#1a1a1a] text-white">£45,000 - £60,000</option>
            <option value="60000-80000" className="bg-[#1a1a1a] text-white">£60,000 - £80,000</option>
            <option value="80000-100000" className="bg-[#1a1a1a] text-white">£80,000 - £100,000</option>
            <option value="100000+" className="bg-[#1a1a1a] text-white">£100,000+</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-white/40 mt-4">
        <span className="text-red-400">*</span> Required fields
      </p>

      <div className="pt-6">
        <button
          className="w-full bg-white text-black py-3 rounded-lg font-medium hover:bg-white/90 transition-colors disabled:opacity-50"
          onClick={onSubmit}
          disabled={isLoading || !validateForm(formData)}
        >
          {isLoading ? "Searching..." : "Find Matching Opportunities"}
        </button>
      </div>
    </div>
  </div>
);

export default PersonalInfoStep; 