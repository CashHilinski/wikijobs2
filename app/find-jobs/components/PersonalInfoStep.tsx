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
      <h1 className="text-4xl font-semibold text-gray-900 mb-4">Welcome Back to Your Career</h1>
      <p className="text-gray-600 text-lg font-light max-w-2xl mx-auto">
        Let's understand your journey and help you find the perfect role for your return to work.
      </p>
    </div>

    <div className="space-y-8">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How long have you been away from work? <span className="text-red-500">*</span>
        </label>
        <select 
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.personal.yearsOutOfWork}
          onChange={(e) => setFormData({
            ...formData,
            personal: { ...formData.personal, yearsOutOfWork: e.target.value }
          })}
        >
          <option value="" className="text-gray-900">Select duration</option>
          <option value="0-1" className="text-gray-900">Less than 1 year</option>
          <option value="1-2" className="text-gray-900">1-2 years</option>
          <option value="2-5" className="text-gray-900">2-5 years</option>
          <option value="5+" className="text-gray-900">More than 5 years</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What was your last role? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Software Engineer, Project Manager"
          value={formData.experience.lastRole}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            experience: { ...prev.experience, lastRole: e.target.value }
          }))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          In which industry did you work? <span className="text-red-500">*</span>
        </label>
        <select 
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.experience.industry}
          onChange={(e) => setFormData({
            ...formData,
            experience: { ...formData.experience, industry: e.target.value }
          })}
        >
          <option value="" className="text-gray-900">Select industry</option>
          <option value="tech" className="text-gray-900">Technology</option>
          <option value="finance" className="text-gray-900">Finance</option>
          <option value="healthcare" className="text-gray-900">Healthcare</option>
          <option value="education" className="text-gray-900">Education</option>
          <option value="other" className="text-gray-900">Other</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What skills would you like to leverage in your return? <span className="text-red-500">*</span>
        </label>
        <textarea
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
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
        <label className="block text-sm font-medium text-gray-700 mb-2">
          What type of role are you looking for now? <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="e.g. Product Manager, Data Analyst"
          value={formData.preferences.desiredRole}
          onChange={(e) => setFormData({
            ...formData,
            preferences: { ...formData.preferences, desiredRole: e.target.value }
          })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferred work arrangement <span className="text-red-500">*</span>
        </label>
        <select 
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={formData.preferences.workType}
          onChange={(e) => setFormData({
            ...formData,
            preferences: { ...formData.preferences, workType: e.target.value as 'remote' | 'hybrid' | 'onsite' }
          })}
        >
          <option value="remote" className="text-gray-900">Remote</option>
          <option value="hybrid" className="text-gray-900">Hybrid</option>
          <option value="onsite" className="text-gray-900">On-site</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Any specific requirements for your return? (Optional)
        </label>
        <textarea
          className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
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
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Country <span className="text-red-500">*</span>
            </label>
            <select
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={formData.preferences.country}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                preferences: { ...prev.preferences, country: e.target.value }
              }))}
            >
              <option value="gb" className="text-gray-900">United Kingdom</option>
              <option value="us" className="text-gray-900">United States</option>
              <option value="au" className="text-gray-900">Australia</option>
              <option value="de" className="text-gray-900">Germany</option>
              <option value="ca" className="text-gray-900">Canada</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City/Region <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Expected Salary Range (Optional)
          </label>
          <select
            className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={formData.preferences.salary}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              preferences: { ...prev.preferences, salary: e.target.value }
            }))}
          >
            <option value="" className="text-gray-900">Select range (optional)</option>
            <option value="20000-30000" className="text-gray-900">£20,000 - £30,000</option>
            <option value="30000-45000" className="text-gray-900">£30,000 - £45,000</option>
            <option value="45000-60000" className="text-gray-900">£45,000 - £60,000</option>
            <option value="60000-80000" className="text-gray-900">£60,000 - £80,000</option>
            <option value="80000-100000" className="text-gray-900">£80,000 - £100,000</option>
            <option value="100000+" className="text-gray-900">£100,000+</option>
          </select>
        </div>
      </div>

      <p className="text-sm text-gray-500 mt-4">
        <span className="text-red-500">*</span> Required fields
      </p>

      <div className="pt-6">
        <button
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:hover:bg-blue-600"
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