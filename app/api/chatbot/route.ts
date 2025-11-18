import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import studentData from '@/master-student.json';

const client = new OpenAI({
  baseURL: 'https://openrouter.ai/api/v1',
  apiKey: process.env.OPENROUTER_API_KEY || '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',
});

const SYSTEM_PROMPT = `You are an AI educational assistant for students. Your role is to:
- Help students understand concepts and subjects
- Assist with homework and assignments
- Provide study tips and learning strategies
- Create personalized study plans
- Answer academic questions clearly and patiently
- Encourage critical thinking and problem-solving

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
      model: 'moonshotai/kimi-k2-0905',
      messages: messages as any,
    });

    const response = completion.choices[0].message.content;

    return NextResponse.json({ response });
  } catch (error) {
    console.error('Chatbot error:', error);
    return NextResponse.json({ error: 'Failed to get response' }, { status: 500 });
  }
}
