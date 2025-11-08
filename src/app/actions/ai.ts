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
    const msg = error instanceof Error ? error.message : String(error);
    // Provide a friendly, actionable message without leaking secrets
    return { answer: `AI is temporarily unavailable. Please try again in a moment. If this persists, ensure GOOGLE_API_KEY is set and your network allows outgoing requests. Details: ${msg}` };
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
    // Return empty arrays so UI can hide these sections gracefully
    return {
      skillGaps: [],
      recommendedLearningPaths: [],
      relatedSkills: [],
    };
  }
}
