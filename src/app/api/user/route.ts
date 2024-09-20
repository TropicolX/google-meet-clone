import { StreamClient } from '@stream-io/node-sdk';

const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY!;
const SECRET = process.env.STREAM_API_SECRET!;

export async function POST(request: Request) {
  const client = new StreamClient(API_KEY, SECRET);

  const body = await request.json();

  const user = body?.user;

  if (!user) {
    return Response.error();
  }

  const response = await client.updateUsersPartial({
    users: [
      {
        id: user.id,
        set: {
          name: user.name,
          role: 'user',
        },
      },
    ],
  });

  return Response.json(response);
}
