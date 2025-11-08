'use server';

import { analyzeSkillGap, CareerFitInput, getCareerFit, getProjectIdeas, getTrendingSkills, generateLearningPath, LearningPathInput, ProjectIdeasInput } from './aiHelper';

// In the future, integrate Firebase (mentor/user) here
// export async function fetchUserProfile(userId: string) { ... }
// export async function matchMentors(skills: string[]) { ... }

export const AIService = {
  skillGap: analyzeSkillGap,
  learningPath: (input: LearningPathInput) => generateLearningPath(input),
  projectIdeas: (input: ProjectIdeasInput) => getProjectIdeas(input),
  careerFit: (input: CareerFitInput) => getCareerFit(input),
  trendingSkills: () => getTrendingSkills(),
};
