// 
"use client";
import { useState } from "react";
import { signInWithGoogle } from "@/lib/firebase/auth";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const router = useRouter();

  const handleLoginWithGoogle = async () => {
    if (!agreed) {
      setError("Please agree to the terms and services.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const result = await signInWithGoogle();
      if (result?.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Failed to log in with Google:", err);
      setError(err instanceof Error ? err.message : "Failed to log in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white dark:bg-black px-6 py-8 relative">
      {/* Back Arrow Button */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Go back"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
      </Link>

      <div className="w-full max-w-md text-center space-y-6">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-semibold text-black dark:text-white">
          Create your account
        </h1>

        {/* Illustration */}
        <div className="flex justify-center">
          <Image
            src={"/images/FingerprintImg.png"}
            alt="Fingerprint illustration"
            width={240}
            height={240}
            className="rounded-xl w-[180px] h-[180px] md:w-[220px] md:h-[220px]"
            priority
          />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleLoginWithGoogle}
          disabled={loading}
          aria-label="Continue with Google"
          type="button"
          className="flex items-center justify-center w-full py-3 px-6 rounded-full shadow-md 
                     bg-white border border-gray-300 hover:bg-gray-100 
                     transition-all disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="text-base font-medium text-gray-600">Logging in...</span>
          ) : (
            <>
              <Image
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                alt="Google logo"
                width={24}
                height={24}
                className="w-5 h-5 md:w-6 md:h-6"
              />
              <span className="ml-3 text-base font-medium text-gray-700">
                Continue with Google
              </span>
            </>
          )}
        </button>

        {/* Terms and Services */}
        <div className="flex items-center justify-center space-x-3 text-sm md:text-base">
          <input
            type="checkbox"
            id="terms"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            className="form-checkbox text-blue-600 w-4 h-4 md:w-5 md:h-5"
          />
          <label htmlFor="terms" className="text-gray-600 dark:text-gray-400">
            I agree to my <span className="font-semibold underline">terms and services</span>
          </label>
        </div>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-sm md:text-base">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}