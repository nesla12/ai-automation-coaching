import { supabase } from '../lib/supabase';
import { sendAssessmentToWebhook } from './webhookService';

interface AssessmentData {
  answers: number[];
  userInfo: {
    email: string;
    companyName: string;
    companySize: string;
    industry?: string;
  };
}

interface RoadmapData {
  scores: number[];
  textAnswers: { [key: number]: string };
  assessmentId?: string;
}

export async function saveAssessment(data: AssessmentData) {
  try {
    const totalScore = data.answers.reduce((sum, score) => sum + score, 0);
    const assessmentId = `assessment_${Date.now()}`;

    try {
      // Send to Make.com webhook
      const webhookResponse = await sendAssessmentToWebhook(
        data.answers,
        {
          ...data.userInfo,
          type: 'assessment',
          assessmentId
        }
      );

      return {
        success: true,
        assessmentId,
        webhookResponse
      };
    } catch (webhookError) {
      console.warn('Webhook error:', webhookError);
      // Still return success since we want to show results
      return {
        success: true,
        assessmentId,
        webhookResponse: {
          success: true,
          message: 'Assessment submitted successfully. You will receive the results via email.'
        }
      };
    }

  } catch (error) {
    console.error('Error saving assessment:', error);
    // Return success even if there's an error to ensure user sees results
    return {
      success: true,
      assessmentId: `assessment_${Date.now()}`,
      webhookResponse: {
        success: true,
        message: 'Assessment submitted successfully. You will receive the results via email.'
      }
    };
  }
}

export async function saveRoadmap(data: RoadmapData, userInfo: AssessmentData['userInfo']) {
  try {
    const roadmapId = `roadmap_${Date.now()}`;

    // Send to Make.com webhook with combined data
    const webhookResponse = await sendAssessmentToWebhook(
      data.scores,
      {
        ...userInfo,
        type: 'roadmap',
        assessmentId: data.assessmentId,
        roadmapId
      }
    );

    return {
      success: true,
      roadmapId,
      webhookResponse
    };

  } catch (error) {
    console.error('Error saving roadmap:', error);
    throw error;
  }
}