const GEMINI_API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

export async function generateSkillGapPlan(jobDetails: any, userProfile: any) {
  const prompt = `
    As a career advisor, create a return-to-work plan using EXACTLY this format:

    SKILLS GAP:
    [Write exactly 2 sentences about key skill gaps]

    REQUIRED SKILLS:
    - [Most important skill]
    - [Second most important skill]
    - [Third most important skill]
    - [Fourth most important skill]
    - [Fifth most important skill]

    QUICK WINS (Next 2 weeks):
    - [Specific action 1]
    - [Specific action 2]
    - [Specific action 3]

    3-MONTH PLAN:
    - [Measurable goal 1]
    - [Measurable goal 2]
    - [Measurable goal 3]

    RESOURCES:
    - Course 1: [Specific course name and platform]
    - Course 2: [Specific course name and platform]
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

    Keep responses concise and specific. No additional text or explanations.
  `;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }]
        }]
      })
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate plan');
    }

    // Parse the AI response and structure it
    const aiResponse = data.candidates[0].content.parts[0].text;
    
    // Parse and structure the AI response into the required format
    return structureAIResponse(aiResponse);
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw error;
  }
}

function structureAIResponse(aiResponse: string): any {
  // Helper function to extract section content
  const getSection = (sectionName: string): string => {
    const regex = new RegExp(`${sectionName}:\\s*([\\s\\S]*?)(?=\\n\\s*[A-Z]+:|$)`, 'i');
    return (aiResponse.match(regex)?.[1] || '').trim();
  };

  // Helper function to extract bullet points
  const getBulletPoints = (text: string): string[] => {
    return text
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.startsWith('-'))
      .map(line => line.replace(/^-\s*/, ''))
      .filter(Boolean);
  };

  // Extract resources with specific prefixes
  const getResources = (text: string) => {
    const courses = text
      .split('\n')
      .filter(line => line.includes('Course'))
      .map(line => line.replace(/^-\s*Course \d+:\s*/, ''))
      .filter(Boolean);

    const certification = text
      .split('\n')
      .find(line => line.includes('Certification:'))
      ?.replace(/^-\s*Certification:\s*/, '');

    const network = text
      .split('\n')
      .find(line => line.includes('Network:'))
      ?.replace(/^-\s*Network:\s*/, '');

    return {
      courses,
      certification,
      network
    };
  };

  // Extract sections
  const gapAnalysis = getSection('SKILLS GAP');
  const requiredSkills = getBulletPoints(getSection('REQUIRED SKILLS'));
  const quickWins = getBulletPoints(getSection('QUICK WINS'));
  const threeMoPlan = getBulletPoints(getSection('3-MONTH PLAN'));
  const resourcesSection = getSection('RESOURCES');
  const { courses, certification, network } = getResources(resourcesSection);
  const timeToReady = getSection('TIME TO READY').replace(/[^0-9-]+/g, '');

  return {
    requiredSkills: requiredSkills.length ? requiredSkills : ['No skills provided'],
    gapAnalysis: gapAnalysis || 'Analysis not available',
    actionPlan: {
      immediate: quickWins.length ? quickWins : ['Update resume', 'Research company', 'Network'],
      shortTerm: threeMoPlan.length ? threeMoPlan : ['Complete relevant certification', 'Build portfolio', 'Apply to positions']
    },
    resources: {
      courses: courses.length ? courses : ['Recommended course not specified'],
      certification: certification || 'Certification not specified',
      networking: network || 'Networking suggestion not specified'
    },
    estimatedTimeframe: timeToReady || "3"
  };
} 