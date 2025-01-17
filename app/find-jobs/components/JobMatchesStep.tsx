'use client';

import { FC, Fragment, useState, useEffect, useMemo } from 'react';
import { Dialog, Transition, Listbox } from '@headlessui/react';
import { JobMatch, JobFilters, SortConfig, SortOption, FilterPreset } from '../types';
import { filterJobs, sortJobs, getUniqueCategories, getSalaryRange } from '../../services/jobFilters';

type WorkType = 'remote' | 'hybrid' | 'onsite';

interface JobMatchesStepProps {
  matchedJobs: JobMatch[];
  onJobSelect: (job: JobMatch) => void;
  setCurrentStep: (step: 'form' | 'matches' | 'plan') => void;
  userLocation: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'matchScore', label: 'Match Score' },
  { value: 'postedDate', label: 'Posted Date' },
  { value: 'locationProximity', label: 'Location' },
  { value: 'salary', label: 'Salary' }
];

const filterPresets: FilterPreset[] = [
  {
    id: 'remote-friendly',
    name: 'Remote Friendly',
    description: 'Remote jobs with flexible hours',
    filters: {
      returnToWork: false,
      flexibleHours: true,
      mentorship: false,
      salaryRange: { min: null, max: null },
      workTypes: ['remote'],
      categories: []
    }
  },
  {
    id: 'return-program',
    name: 'Return Program',
    description: 'Jobs with dedicated return-to-work programs and mentorship',
    filters: {
      returnToWork: true,
      flexibleHours: false,
      mentorship: true,
      salaryRange: { min: null, max: null },
      workTypes: [],
      categories: []
    }
  },
  {
    id: 'flexible-hybrid',
    name: 'Flexible Hybrid',
    description: 'Hybrid roles with flexible hours',
    filters: {
      returnToWork: false,
      flexibleHours: true,
      mentorship: false,
      salaryRange: { min: null, max: null },
      workTypes: ['hybrid'],
      categories: []
    }
  }
];

const JobDetailModal = ({ 
  job, 
  isOpen, 
  onClose,
  onJobSelect
}: { 
  job: JobMatch | null; 
  isOpen: boolean; 
  onClose: () => void;
  onJobSelect: (job: JobMatch) => void;
}) => {
  if (!job) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm transition-all" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0 scale-95 translate-y-8"
              enterTo="opacity-100 scale-100 translate-y-0"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 scale-100 translate-y-0"
              leaveTo="opacity-0 scale-95 translate-y-8"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-[#0a0a0a] border border-white/10 p-6 shadow-xl transition-all">
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <Dialog.Title className="text-2xl font-medium text-white mb-2">
                        {job.title}
                      </Dialog.Title>
                      <p className="text-xl text-white/60">{job.company}</p>
                    </div>
                    <div className="bg-white/10 px-3 py-1 rounded-full">
                      <span className="text-white/90">{job.matchScore}% Match</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Location</h3>
                        <p className="text-white/60">{job.location}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Salary</h3>
                        <p className="text-white/60">{job.salary}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Job Type</h3>
                        <p className="text-white/60">{job.jobType}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Category</h3>
                        <p className="text-white/60">{job.category}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Posted</h3>
                        <p className="text-white/60">{job.postedDate}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Return-to-Work Benefits</h3>
                        <div className="flex gap-3 mt-2">
                          {job.returnFriendly.mentorship && (
                            <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded text-sm">
                              Mentorship
                            </span>
                          )}
                          {job.returnFriendly.flexibleHours && (
                            <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded text-sm">
                              Flexible Hours
                            </span>
                          )}
                          {job.returnFriendly.returnProgram && (
                            <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded text-sm">
                              Return Program
                            </span>
                          )}
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-white/90">Requirements</h3>
                        <ul className="mt-2 space-y-2">
                          {job.requirements.map((req, index) => (
                            <li key={index} className="text-white/60">• {req}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-white/90 mb-2">Job Description</h3>
                    <p className="text-white/60 whitespace-pre-wrap">{job.description}</p>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <a 
                      href={job.applyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-white/90 transition-colors"
                    >
                      Apply Now
                    </a>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onJobSelect(job);
                      }}
                      className="text-white/60 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <span>View Return Plan</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export const JobMatchesStep: FC<JobMatchesStepProps> = ({ 
  matchedJobs, 
  onJobSelect, 
  setCurrentStep,
  userLocation 
}) => {
  const [selectedJobForDetail, setSelectedJobForDetail] = useState<JobMatch | null>(null);
  const [filteredJobs, setFilteredJobs] = useState<JobMatch[]>(matchedJobs);
  const [filters, setFilters] = useState<JobFilters>({
    returnToWork: false,
    flexibleHours: false,
    mentorship: false,
    salaryRange: {
      min: null,
      max: null
    },
    workTypes: [],
    categories: []
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    field: 'matchScore',
    direction: 'desc'
  });
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);

  // Get unique categories and salary range
  const categories = getUniqueCategories(matchedJobs);
  const { min: minSalary, max: maxSalary } = getSalaryRange(matchedJobs);

  // Apply filters and sorting whenever filters or sort config changes
  useEffect(() => {
    let result = filterJobs(matchedJobs, filters, userLocation);
    result = sortJobs(result, sortConfig, userLocation);
    setFilteredJobs(result);
  }, [matchedJobs, filters, sortConfig, userLocation]);

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.returnToWork) count++;
    if (filters.flexibleHours) count++;
    if (filters.mentorship) count++;
    if (filters.salaryRange.min !== null || filters.salaryRange.max !== null) count++;
    count += filters.workTypes.length;
    count += filters.categories.length;
    return count;
  }, [filters]);

  // Function to apply preset
  const applyPreset = (preset: FilterPreset) => {
    setFilters({
      ...preset.filters,
      // Preserve existing category filters if they exist in the current job list
      categories: preset.filters.categories.filter(cat => categories.includes(cat))
    });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-4">Your Matched Opportunities</h2>
        <p className="text-gray-600 text-lg font-light">
          We've found these roles that align with your experience and return-to-work preferences.
        </p>
      </div>

      {/* Filters and Sort Controls */}
      <div className="flex justify-between items-center mb-6">
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <span>Filters</span>
          {activeFilterCount > 0 && (
            <span className="ml-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </button>

        <div className="flex items-center space-x-4">
          <Listbox
            value={sortConfig.field}
            onChange={(field: SortOption) => setSortConfig(prev => ({
              ...prev,
              field
            }))}
          >
            <div className="relative">
              <Listbox.Button className="bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                <span>Sort by: {sortOptions.find(opt => opt.value === sortConfig.field)?.label}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Listbox.Button>

              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Listbox.Options className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                  {sortOptions.map((option) => (
                    <Listbox.Option
                      key={option.value}
                      value={option.value}
                      className={({ active }) =>
                        `${active ? 'bg-gray-100' : ''}
                         cursor-pointer select-none relative py-2 pl-3 pr-9 text-gray-900`
                      }
                    >
                      {option.label}
                    </Listbox.Option>
                  ))}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>

          <button
            onClick={() => setSortConfig(prev => ({
              ...prev,
              direction: prev.direction === 'asc' ? 'desc' : 'asc'
            }))}
            className="text-gray-600 hover:text-gray-900"
          >
            {sortConfig.direction === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.returnToWork && (
            <span className="bg-purple-500/20 text-purple-200 px-2 py-1 rounded-full text-sm flex items-center">
              Return Program
              <button
                onClick={() => setFilters(prev => ({ ...prev, returnToWork: false }))}
                className="ml-2 hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          {filters.flexibleHours && (
            <span className="bg-green-500/20 text-green-200 px-2 py-1 rounded-full text-sm flex items-center">
              Flexible Hours
              <button
                onClick={() => setFilters(prev => ({ ...prev, flexibleHours: false }))}
                className="ml-2 hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          {filters.mentorship && (
            <span className="bg-blue-500/20 text-blue-200 px-2 py-1 rounded-full text-sm flex items-center">
              Mentorship
              <button
                onClick={() => setFilters(prev => ({ ...prev, mentorship: false }))}
                className="ml-2 hover:text-white"
              >
                ×
              </button>
            </span>
          )}
          {filters.workTypes.map(type => (
            <span key={type} className="bg-orange-500/20 text-orange-200 px-2 py-1 rounded-full text-sm flex items-center">
              {type.charAt(0).toUpperCase() + type.slice(1)}
              <button
                onClick={() => setFilters(prev => ({
                  ...prev,
                  workTypes: prev.workTypes.filter(t => t !== type)
                }))}
                className="ml-2 hover:text-white"
              >
                ×
              </button>
            </span>
          ))}
          {/* ... existing filters modal ... */}
        </div>
      )}

      {/* Filter Dialog */}
      <Transition show={isFiltersOpen} as={Fragment}>
        <Dialog onClose={() => setIsFiltersOpen(false)} className="relative z-50">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all">
                  <Dialog.Title className="text-lg font-medium text-gray-900 mb-4">
                    Filter Jobs
                  </Dialog.Title>

                  <div className="space-y-6">
                    {/* Return-to-work features */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Return-to-Work Features</h3>
                      <div className="space-y-2">
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.returnToWork}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              returnToWork: e.target.checked
                            }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Return-to-Work Program</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.flexibleHours}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              flexibleHours: e.target.checked
                            }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Flexible Hours</span>
                        </label>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={filters.mentorship}
                            onChange={(e) => setFilters(prev => ({
                              ...prev,
                              mentorship: e.target.checked
                            }))}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">Mentorship Available</span>
                        </label>
                      </div>
                    </div>

                    {/* Work Type */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Work Type</h3>
                      <div className="space-y-2">
                        {[
                          { label: 'Remote', value: 'remote' as WorkType },
                          { label: 'Hybrid', value: 'hybrid' as WorkType },
                          { label: 'On-site', value: 'onsite' as WorkType }
                        ].map(({ label, value }) => (
                          <label key={value} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={filters.workTypes.includes(value)}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                workTypes: e.target.checked
                                  ? [...prev.workTypes, value]
                                  : prev.workTypes.filter(t => t !== value)
                              }))}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{label}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Categories */}
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium text-gray-700">Categories</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {categories.map((category) => (
                          <label key={category} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={filters.categories.includes(category)}
                              onChange={(e) => setFilters(prev => ({
                                ...prev,
                                categories: e.target.checked
                                  ? [...prev.categories, category]
                                  : prev.categories.filter(c => c !== category)
                              }))}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{category}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-4">
                    <button
                      onClick={() => {
                        setFilters({
                          returnToWork: false,
                          flexibleHours: false,
                          mentorship: false,
                          salaryRange: { min: null, max: null },
                          workTypes: [],
                          categories: []
                        });
                      }}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      Reset
                    </button>
                    <button
                      onClick={() => setIsFiltersOpen(false)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                    >
                      Apply Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Job List */}
      {filteredJobs.length > 0 ? (
        <div className="space-y-6">
          {filteredJobs.map((job, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl p-6 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer shadow-sm"
              onClick={() => setSelectedJobForDetail(job)}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-medium text-gray-900">{job.title}</h3>
                  <div className="space-y-1 mt-2">
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-gray-600">{job.location}</p>
                    <p className="text-gray-600">{job.salary}</p>
                    <p className="text-gray-600">Posted: {job.postedDate}</p>
                    <p className="text-gray-600">{job.jobType} • {job.category}</p>
                  </div>
                </div>
                <div className="bg-blue-50 px-3 py-1 rounded-full">
                  <span className="text-blue-600">{job.matchScore}% Match</span>
                </div>
              </div>
              
              <div className="flex gap-3 mb-4">
                {job.returnFriendly.mentorship && (
                  <span className="bg-blue-50 text-blue-600 px-2 py-1 rounded text-sm">
                    Mentorship
                  </span>
                )}
                {job.returnFriendly.flexibleHours && (
                  <span className="bg-green-50 text-green-600 px-2 py-1 rounded text-sm">
                    Flexible Hours
                  </span>
                )}
                {job.returnFriendly.returnProgram && (
                  <span className="bg-purple-50 text-purple-600 px-2 py-1 rounded text-sm">
                    Return Program
                  </span>
                )}
              </div>

              <p className="text-gray-600 text-sm mb-6">{job.description}</p>
              
              <div className="flex gap-4">
                <a 
                  href={job.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Apply Now
                </a>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onJobSelect(job);
                  }}
                  className="text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-2"
                >
                  <span>View Return Plan</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-6">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-8 w-8 text-gray-400" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
              />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-3">No Matches Found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            We couldn't find any jobs matching your criteria. Try adjusting your filters or check back later for new opportunities.
          </p>
          <button
            onClick={() => setCurrentStep('form')}
            className="mt-6 text-gray-600 hover:text-gray-900 transition-colors"
          >
            ← Modify Search
          </button>
        </div>
      )}

      <JobDetailModal 
        job={selectedJobForDetail}
        isOpen={!!selectedJobForDetail}
        onClose={() => setSelectedJobForDetail(null)}
        onJobSelect={onJobSelect}
      />
    </div>
  );
};

export default JobMatchesStep; 