'use server';

export async function submitContact(data: any) {
  const { email, subject, message, turnstileToken } = data;

  if (!turnstileToken) {
    return { success: false, error: 'Verification required' };
  }

  // Verify the Turnstile token with Cloudflare
  const formData = new URLSearchParams();
  formData.append('secret', process.env.SECRET_KEY || '');
  formData.append('response', turnstileToken);

  try {
    const turnstileRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });
    
    const outcome = await turnstileRes.json();

    if (!outcome.success) {
      return { success: false, error: 'Security verification failed.' };
    }

    // If verification is successful, forward the request to the external API
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api/v1';
    
    const backendResponse = await fetch(`${backendUrl}/contact/send-quote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        email, 
        subject, 
        message, 
        'cf-turnstile-response': turnstileToken 
      }),
    });

    if (!backendResponse.ok) {
      return { success: false, error: 'Failed to send communication payload.' };
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message || 'Internal server error.' };
  }
}
