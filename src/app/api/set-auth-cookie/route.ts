// pages/api/set-auth-cookie/route.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAuth } from 'firebase-admin/auth';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { serialize } from 'cookie';

const serviceAccount = {
  // Replace these with your service account values
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as any),
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { idToken } = req.body;
  if (!idToken) return res.status(400).json({ error: 'ID token required' });

  try {
    const decodedToken = await getAuth().verifyIdToken(idToken);

    // Set secure HttpOnly cookie
    const cookie = serialize('authToken', idToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
      sameSite: 'lax',
    });

    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: 'Invalid token' });
  }
}
