"use server";

import {
  aiInteractiveCareerCoach as coachFlow,
  AIInteractiveCareerCoachInput,
  AIInteractiveCareerCoachOutput,
} from '@/ai/flows/ai-interactive-career-coach';
import {
  analyzeSkillGaps as analysisFlow,
  AnalyzeSkillGapsInput,
  AnalyzeSkillGapsOutput,
} from '@/ai/flows/ai-skill-gap-analysis';

export async function aiInteractiveCareerCoach(
  input: AIInteractiveCareerCoachInput
): Promise<AIInteractiveCareerCoachOutput> {
  try {
    const result = await coachFlow(input);
    return result;
  } catch (error) {
    console.error("Error in aiInteractiveCareerCoach:", error);
    return { answer: "Sorry, I encountered an error. Please try again." };
  }
}

export async function analyzeSkillGaps(
  input: AnalyzeSkillGapsInput
): Promise<AnalyzeSkillGapsOutput> {
  try {
    const result = await analysisFlow(input);
    return result;
  } catch (error) {
    console.error("Error in analyzeSkillGaps:", error);
    // Return a structured error response
    return {
      skillGaps: ["Could not analyze skill gaps due to an error."],
      recommendedLearningPaths: ["Please check your input and try again."],
      relatedSkills: [],
    };
  }
}
