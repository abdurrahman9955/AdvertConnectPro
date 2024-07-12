import { headers } from 'next/headers'
 
export async function GET(request: Request) {
  const headersList = headers()
  const referer = headersList.get('referer') as string;
 
  return new Response('well come to advertConnectPro!' 
  && 'thank you for vising an advertConnectPro we are always well coming you to our platform thank you for you support.', {
    status: 200,
    headers: { referer: referer },
  })
}
