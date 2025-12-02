// app/terms/page.tsx

import React from "react";

export default function TermsPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Terms & Conditions – Gecian Hub</h1>
      <p className="text-sm opacity-80 mb-8">Last Updated: {new Date().toLocaleDateString()}</p>

      <p className="mb-6">
        Welcome to <strong>Gecian Hub</strong> (“Platform”).  
        By accessing or using this Platform, you (“User”) agree to the following Terms & Conditions.
        If you do not agree, please stop using the Platform immediately.
      </p>

      {/* 1. Nature of the Platform */}
      <h2 className="text-xl font-semibold mt-8 mb-3">1. Nature of the Platform</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Gecian Hub is a <strong>student-run, independent platform</strong> created for community activity and information sharing.</li>
        <li>The platform’s source code is developed by the <strong>CodeCompass GitHub Organization</strong>, but deployed independently by students.</li>
        <li>No college, institution, faculty member, or administration <strong>owns or endorses</strong> this Platform.</li>
      </ul>

      {/* 2. No Institutional Responsibility */}
      <h2 className="text-xl font-semibold mt-8 mb-3">2. No Institutional Responsibility</h2>
      <p>
        Colleges, universities, institutes, and staff bear <strong>zero liability</strong> for:
      </p>
      <ul className="list-disc ml-6 space-y-2 mt-2">
        <li>Platform content</li>
        <li>User actions or activity</li>
        <li>Technical issues</li>
        <li>Community communication</li>
        <li>Consequences arising from Platform use</li>
      </ul>
      <p className="mt-3">The Platform is <strong>not an official college service</strong>.</p>

      {/* 3. Developer & Maintainer Disclaimer */}
      <h2 className="text-xl font-semibold mt-8 mb-3">3. Developer & Maintainer Disclaimer</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>CodeCompass contributors do <strong>not operate</strong> this Platform.</li>
        <li>They do <strong>not moderate</strong> or control deployment, content, or actions of users.</li>
        <li>The software is provided <strong>"as-is"</strong> with no warranties.</li>
        <li>Student deployers/hosters are <strong>not legally responsible</strong> for user activity.</li>
      </ul>

      {/* 4. User Responsibility */}
      <h2 className="text-xl font-semibold mt-8 mb-3">4. User Responsibility</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Users are responsible for the accuracy of information they share.</li>
        <li>Users must follow laws, college rules, and community norms.</li>
        <li>Any misuse or misconduct is the sole responsibility of the user.</li>
        <li>The Platform is not liable for academic or disciplinary consequences.</li>
      </ul>

      {/* 5. Content & Conduct */}
      <h2 className="text-xl font-semibold mt-8 mb-3">5. Content & Conduct</h2>
      <p>Users must not share:</p>
      <ul className="list-disc ml-6 space-y-2 mt-2">
        <li>Illegal content</li>
        <li>Harassment or abusive messages</li>
        <li>Copyrighted material without permission</li>
        <li>False or misleading information</li>
        <li>Content violating institutional or national rules</li>
      </ul>

      {/* 6. Data & Privacy */}
      <h2 className="text-xl font-semibold mt-8 mb-3">6. Data & Privacy</h2>
      <ul className="list-disc ml-6 space-y-2">
        <li>Only minimal functional data may be collected.</li>
        <li>No sensitive academic or institutional data is stored.</li>
        <li>Users should avoid sharing personal or confidential information.</li>
      </ul>

      {/* 7. No Liability */}
      <h2 className="text-xl font-semibold mt-8 mb-3">7. No Liability</h2>
      <p>The Platform and its contributors shall not be liable for:</p>
      <ul className="list-disc ml-6 space-y-2 mt-2">
        <li>Loss or damage</li>
        <li>Technical errors or outages</li>
        <li>Data loss</li>
        <li>Misuse by third parties</li>
        <li>Any direct or indirect damages</li>
      </ul>

      {/* 8. Third-Party Services */}
      <h2 className="text-xl font-semibold mt-8 mb-3">8. Third-Party Services</h2>
      <p>External services linked through the Platform follow their own terms and policies.</p>

      {/* 9. Platform Modification */}
      <h2 className="text-xl font-semibold mt-8 mb-3">9. Platform Modification & Termination</h2>
      <p>We may modify features or terminate the Platform without notice.</p>

      {/* 10. Acceptance of Terms */}
      <h2 className="text-xl font-semibold mt-8 mb-3">10. Acceptance of Terms</h2>
      <p>By using Gecian Hub, you accept full responsibility for your actions and release all institutions, developers, and maintainers from any liability.</p>

      {/* 11. Governing Law */}
      <h2 className="text-xl font-semibold mt-8 mb-3">11. Governing Law</h2>
      <p>These Terms follow applicable laws in India.</p>

      {/* 12. Contact */}
      <h2 className="text-xl font-semibold mt-8 mb-3">12. Contact</h2>
      <p>
        For issues or questions, contact your campus’s student maintainers or community moderators.
        <br />
        <strong>Do not contact</strong> college administration or the CodeCompass organization.
      </p>

      <div className="h-10" />
    </div>
  );
}
