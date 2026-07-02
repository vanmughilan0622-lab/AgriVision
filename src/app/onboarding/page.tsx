'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/lib/language-context";

export default function OnboardingPage() {
  const { t } = useLanguage();
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const router = useRouter();

  const handleSendOtp = async () => {
    // Call the /api/auth/otp endpoint here
    setStep(2);
  };

  const handleVerifyOtp = async () => {
    // Call the /api/auth/verify-otp endpoint here
    setStep(3);
  };

  const handleConsent = async () => {
    // Call compliance endpoint here
    setStep(4);
  };

  const handleComplete = () => {
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-xl p-6">
        <h1 className="text-2xl font-bold text-white mb-6 text-center">{t("onboard.title")}</h1>

        {step === 1 && (
          <div className="space-y-4">
            <h2 className="text-lg text-neutral-200">{t("onboard.step1")}</h2>
            <input 
              type="tel" 
              placeholder="+91 XXXXXXXXXX" 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button 
              onClick={handleSendOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
            >{t("onboard.sendOtp")}</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h2 className="text-lg text-neutral-200">{t("onboard.step2")}</h2>
            <input 
              type="text" 
              placeholder="XXXXXX" 
              className="w-full bg-neutral-800 border border-neutral-700 rounded-lg p-3 text-white tracking-widest text-center text-xl"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button 
              onClick={handleVerifyOtp}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
            >{t("onboard.verify")}</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h2 className="text-lg text-neutral-200">{t("onboard.step3")}</h2>
            <div className="bg-neutral-800 p-4 rounded-lg text-sm text-neutral-400 h-40 overflow-y-auto">
              <p>{t("onboard.consentText")}</p>
              <p className="mt-2 text-red-400">{t("onboard.consentNote")}</p>
            </div>
            <button 
              onClick={handleConsent}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors"
            >{t("onboard.agree")}</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-4 text-center">
            <div className="text-5xl mb-4">🌾</div>
            <h2 className="text-xl font-medium text-white">{t("onboard.completeTitle")}</h2>
            <p className="text-neutral-400">{t("onboard.completeDesc")}</p>
            <button 
              onClick={handleComplete}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition-colors mt-6"
            >{t("onboard.goDash")}</button>
          </div>
        )}
      </div>
    </div>
  );
}
