import { NextResponse } from 'next/server'
import { OpenAIStream, OpenAIStreamPayload } from '../../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export async function POST(req: Request): Promise<Response> {
  const { subject, topic, level } = (await req.json()) as {
    // prompt?: string
    subject?: string
    topic?: string
    level?: string
  }
  console.log('HEREHERE ')
  if (!subject && !topic && !level) {
    return new Response('No prompt in the request', { status: 400 })
  }

  const prompt = `You generate clear and comprehensive lesson plans for teachers to teach their class. Please generate a ${level} grade lesson plan for the following topic being taught in ${subject}: ${topic}`

  console.log(prompt)

  const payload: OpenAIStreamPayload = {
    model: 'gpt-3.5-turbo-0613',
    messages: [{ role: 'user', content: prompt }],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 1000,
    stream: true,
    n: 1,
  }

  const stream = await OpenAIStream(payload)
  console.log('STREAM')
  console.log(stream)
  console.log()
  return new Response(stream)
}
