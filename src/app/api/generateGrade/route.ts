import { OpenAIStream, OpenAIStreamPayload } from '../../../utils/OpenAIStream'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export async function POST(req: Request): Promise<Response> {
  const { studentName, questionContent, studentResp } = (await req.json()) as {
    studentName: string
    questionContent: string
    studentResp: string
  }
  console.log('HEREHERE ')
  if (!studentName && !questionContent && !studentResp) {
    return new Response('No prompt in the request', { status: 400 })
  }

  const prompt = `please grade the following answer to the question (double space your output appropriately): \n\nQuestion: ${questionContent}'\n\nStudent Submission:\n ${studentResp}`

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
  return new Response()
}
