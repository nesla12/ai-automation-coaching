import { Guide } from '../../types';
import { aiTeamTrainingContent } from './content/ai-team-training';
import { buildingWorkflowsContent } from './content/building-workflows';
import { promptEngineeringContent } from './content/prompt-engineering';
import { aiImplementationContent } from './content/ai-implementation';
import { automationAnalyticsContent } from './content/automation-analytics';
import { ethicalAiContent } from './content/ethical-ai';

export const guides: Guide[] = [
  {
    id: 'ethical-ai-agents',
    title: 'The Ethics of AI Agents: Shaping Tomorrow\'s Society',
    description: 'A deep dive into the ethical implications of AI agents and their impact on societal development',
    category: 'ai-implementation',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-22',
    content: ethicalAiContent
  },
  {
    id: 'ai-team-training',
    title: 'AI Team Training: A Leadership Guide',
    description: 'How to effectively train and prepare your team for AI adoption',
    category: 'ai-implementation',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-16',
    content: aiTeamTrainingContent
  },
  {
    id: 'building-effective-workflows',
    title: 'Building Effective AI Automation Workflows',
    description: 'A comprehensive guide to creating powerful, sustainable automation solutions',
    category: 'make-automation',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-10',
    content: buildingWorkflowsContent
  },
  {
    id: 'mastering-prompt-engineering',
    title: 'The Art of Prompt Engineering',
    description: 'Master the craft of creating effective AI prompts for better results',
    category: 'prompt-engineering',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-18',
    content: promptEngineeringContent
  },
  {
    id: 'getting-started-ai',
    title: 'Getting Started with AI: A Business Guide',
    description: 'Essential steps to begin your AI journey with confidence',
    category: 'ai-implementation',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-15',
    content: aiImplementationContent
  },
  {
    id: 'automation-analytics',
    title: 'Mastering Automation Analytics',
    description: 'Learn how to track, measure, and optimize your automation ROI',
    category: 'make-automation',
    author: 'Lorenzo Nesler',
    publishDate: '2024-03-21',
    content: automationAnalyticsContent
  }
];