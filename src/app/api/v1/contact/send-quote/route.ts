import { apiJson } from '@/src/lib/api-response';
import { sendContactEmail } from '@/src/lib/mail';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = await sendContactEmail({
      email: body.email,
      subject: body.subject,
      message: body.message,
    });
    return apiJson({
      message: 'Message sent successfully',
      data,
    });
  } catch (error: any) {
    return apiJson({
      statusCode: 500,
      success: false,
      message: error?.message || 'Failed to send message',
    });
  }
}
