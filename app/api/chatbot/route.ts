import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import studentData from '@/master-student.json';

const OPENROUTER_KEY = process.env.OPENROUTER_API_KEY || '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';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: OPENROUTER_KEY,
  defaultHeaders: {
    'HTTP-Referer': 'https://synapse-student.netlify.app',
    'X-Title': 'Synapse Student LMS',
  },
});

const SYSTEM_PROMPT = `You are an AI educational assistant for students. Your role is to:
- Help students understand concepts and subjects
- Assist with homework and assignments
- Provide study tips and learning strategies
- Create personalized study plans
- Answer academic questions clearly and patiently
- Encourage critical thinking and problem-solving

IMPORTANT FORMATTING RULES:
- DO NOT use tables or pipe-separated formats (|)
- Always use bullet points or numbered lists instead
- Keep responses clear and concise
- Use markdown formatting for emphasis (**bold**, *italic*)

You have access to the student's profile data including their courses, progress, strengths, and areas needing improvement. Use this information to provide personalized guidance.

Student Profile: ${JSON.stringify(studentData)}`;

export async function POST(request: NextRequest) {
  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history,
      { role: 'user', content: message },
    ];

    const completion = await client.chat.completions.create({
      model: 'openai/gpt-3.5-turbo',
      messages: messages as any,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error: any) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ 
      error: 'Failed to get response',
      details: error.message 
    }, { status: 500 });
  }
}
