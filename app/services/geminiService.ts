import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('NEXT_PUBLIC_GEMINI_API_KEY is not set in environment variables');
}

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

export async function generateSkillGapPlan(jobDetails: any, userProfile: any) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    As a career advisor, create a return-to-work plan. Follow this EXACT format with no deviations:

    SKILLS GAP:
    [First sentence about primary skill gap.] [Second sentence about secondary skill gap.]

    REQUIRED SKILLS:
    - [Skill 1]
    - [Skill 2]
    - [Skill 3]
    - [Skill 4]
    - [Skill 5]

    QUICK WINS (Next 2 weeks):
    - [Action 1]
    - [Action 2]
    - [Action 3]

    3-MONTH PLAN:
    - [Goal 1]
    - [Goal 2]
    - [Goal 3]

    RESOURCES:
    - Course 1: [Course name] ([Platform])
    - Course 2: [Course name] ([Platform])
    - Certification: [Specific certification name]
    - Network: [Specific networking action]

    TIME TO READY: [X] months

    Context:
    Role: ${jobDetails.title}
    Company: ${jobDetails.company}
    Requirements: ${jobDetails.requirements.join(', ')}
    Background: ${userProfile.experience.lastRole}
    Skills: ${userProfile.experience.keySkills}
    Gap: ${userProfile.personal.yearsOutOfWork} years

    Important:
    1. Use bullet points ONLY with single hyphens (-)
    2. Do not use asterisks (*) or other markers
    3. Keep each section separate with exactly one blank line
    4. Do not include section names in the content
    5. Do not repeat content across sections
    `;

  try {
    const result = await model.generateContent({
      contents: [{ role: 'user', parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 1024,
      }
    });

    const response = result.response;
    const aiResponse = response.text();
    
    try {
      return structureAIResponse(aiResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      return generateSmartFallbackPlan(jobDetails, userProfile);
    }
  } catch (error) {
    console.error('Gemini API Error:', error);
    return generateSmartFallbackPlan(jobDetails, userProfile);
  }
}

function structureAIResponse(aiResponse: string) {
  const getSection = (sectionName: string): string => {
    const regex = new RegExp(`${sectionName}:\\s*([\\s\\S]*?)(?=\\n\\s*[A-Z]+:|$)`, 'i');
    const match = aiResponse.match(regex);
    return match ? match[1].trim() : '';
  };

  const getBulletPoints = (text: string): string[] => {
    if (!text) return [];
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.slice(1).trim())
      .filter(Boolean);
  };

  const getResources = (text: string) => {
    if (!text) return { courses: [], certification: '', network: '' };
    
    const lines = text.split('\n').map(line => line.trim());
    
    const courses = lines
      .filter(line => line.startsWith('- Course'))
      .map(line => line.replace(/^-\s*Course \d+:\s*/, '').trim());

    const certification = lines
      .find(line => line.startsWith('- Certification:'))
      ?.replace(/^-\s*Certification:\s*/, '')
      .trim() || '';

    const network = lines
      .find(line => line.startsWith('- Network:'))
      ?.replace(/^-\s*Network:\s*/, '')
      .trim() || '';

    return { courses, certification, network };
  };

  // Extract sections
  const gapAnalysis = getSection('SKILLS GAP');
  const requiredSkills = getBulletPoints(getSection('REQUIRED SKILLS'));
  const quickWins = getBulletPoints(getSection('QUICK WINS'));
  const threeMoPlan = getBulletPoints(getSection('3-MONTH PLAN'));
  const resourcesSection = getSection('RESOURCES');
  const { courses, certification, network } = getResources(resourcesSection);
  const timeToReady = parseInt(getSection('TIME TO READY').replace(/[^0-9-]+/g, '')) || 3;

  // Validate and provide fallbacks
  const validatedGapAnalysis = gapAnalysis || 'Analysis not available';
  const validatedSkills = requiredSkills.length >= 3 ? requiredSkills : ['No skills provided'];
  const validatedQuickWins = quickWins.length >= 2 ? quickWins : ['Update resume', 'Research company', 'Network'];
  const validatedPlan = threeMoPlan.length >= 2 ? threeMoPlan : ['Complete relevant certification', 'Build portfolio', 'Apply to positions'];
  const validatedCourses = courses.length >= 2 ? courses : ['Recommended course not specified'];

  return {
    gapAnalysis: validatedGapAnalysis,
    requiredSkills: validatedSkills,
    actionPlan: {
      immediate: validatedQuickWins,
      shortTerm: validatedPlan
    },
    resources: {
      courses: validatedCourses,
      certification: certification || 'Certification not specified',
      networking: network || 'Networking suggestion not specified'
    },
    estimatedTimeframe: timeToReady
  };
}

function generateSmartFallbackPlan(jobDetails: any, userProfile: any) {
  const gapYears = parseInt(userProfile.personal.yearsOutOfWork) || 1;
  const skillsNeeded = new Set(jobDetails.requirements);
  const currentSkills = new Set(userProfile.experience.keySkills.split(',').map((s: string) => s.trim()));
  
  const missingSkills = [...skillsNeeded].filter(skill => !currentSkills.has(skill));
  const baseTime = Math.min(Math.max(gapYears, 2), 4);
  const timeForSkills = Math.ceil(missingSkills.length / 2);
  const totalTime = Math.min(baseTime + timeForSkills, 6);

  return {
    gapAnalysis: `Based on your ${gapYears} year${gapYears > 1 ? 's' : ''} career break, we've identified ${missingSkills.length} key skills to develop for the ${jobDetails.title} role. Your background in ${userProfile.experience.lastRole} provides a strong foundation, but updating industry knowledge and specific technical skills will be crucial.`,
    
    requiredSkills: [
      ...jobDetails.requirements.slice(0, 3),
      "Current Industry Best Practices",
      "Modern Tools & Technologies"
    ],

    actionPlan: {
      immediate: [
        `Update your ${jobDetails.category} skills through online courses`,
        `Revise your resume to highlight transferable skills from ${userProfile.experience.lastRole}`,
        `Join ${jobDetails.category} professional networks and communities`,
        'Start a personal project to demonstrate current skills',
        'Create a learning roadmap based on job requirements'
      ],
      shortTerm: [
        `Complete ${jobDetails.category} certification program`,
        "Build 2-3 relevant portfolio projects",
        `Attend ${jobDetails.category} industry conferences or meetups`,
        'Participate in industry workshops or bootcamps',
        'Connect with professionals in target companies'
      ]
    },

    resources: {
      courses: [
        `${jobDetails.category} Essentials (LinkedIn Learning)`,
        `Modern ${jobDetails.category} Practices (Udemy)`,
        `Advanced ${jobDetails.category} Skills (Coursera)`,
        'Industry-Specific Workshops',
        'Professional Development Seminars'
      ],
      certification: `Professional ${jobDetails.category} Certification`,
      networking: `Join ${jobDetails.category} professional groups and attend industry events`
    },

    estimatedTimeframe: totalTime
  };
} 