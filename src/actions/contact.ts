'use server';

import { sendContactEmail } from '@/src/lib/mail';

export async function submitContact(data: any) {
  const { email, subject, message, turnstileToken } = data;

  if (!turnstileToken) {
    return { success: false, error: 'Verification required' };
  }

  const formData = new URLSearchParams();
  formData.append(
    'secret',
    process.env.TURNSTILE_SECRET_KEY || process.env.SECRET_KEY || '',
  );
  formData.append('response', turnstileToken);

  try {
    const turnstileRes = await fetch(
      'https://challenges.cloudflare.com/turnstile/v0/siteverify',
      {
        method: 'POST',
        body: formData,
      },
    );

    const outcome = await turnstileRes.json();

    if (!outcome.success) {
      return { success: false, error: 'Security verification failed.' };
    }

    await sendContactEmail({ email, subject, message });
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Internal server error.' };
  }
}
