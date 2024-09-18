import { StreamClient } from '@stream-io/node-sdk';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const SECRET = process.env.STREAM_API_SECRET!;

export async function POST(request: Request) {
  const client = new StreamClient(API_KEY, SECRET);

  const body = await request.json();

  const userId = body?.userId;

  if (!userId) {
    return Response.error();
  }

  const token = client.generateUserToken({ user_id: userId });

  const response = {
    userId: userId,
    token: token,
  };

  return Response.json(response);
}
