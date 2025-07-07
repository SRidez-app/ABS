// components/PrivacyPolicy.tsx
'use client'; // This directive indicates that this is a client-side component in Next.js

import { useEffect, useState } from 'react';

// Main PrivacyPolicy component
export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState(''); // State to highlight the active section in the sidebar

  // Effect to handle scroll and update active section for navigation highlighting
  useEffect(() => {
    const handleScroll = () => {
      // Get all section elements that have an ID
      const sections = document.querySelectorAll('section[id]');
      let currentActive = '';

      // Iterate through sections to find which one is currently in view
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        // If the section is within the viewport (top part of the section visible)
        if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
          currentActive = section.id;
        }
      });
      // Update the active section state
      setActiveSection(currentActive);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    // Call once on mount to set initial active section
    handleScroll();

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Function to smoothly scroll to a section when a navigation link is clicked
  const smoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault(); // Prevent default anchor link behavior
    const target = document.querySelector(targetId); // Get the target element by its ID
    if (target) {
      // Scroll into view with smooth behavior
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      {/* Replaced next/head with direct HTML head elements for compatibility */}
      <head>
        <title>Privacy Policy - Ayubzai Business Solutions</title>
        <meta name="description" content="Privacy Policy for Ayubzai Business Solutions, outlining data collection, use, and user rights." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* Background animation and particles from your existing Home component */}
      <div className="bg-animation fixed inset-0 -z-20"></div>
      <div className="particles fixed inset-0 -z-10 pointer-events-none" id="particles"></div>

      <div className="min-h-screen text-gray-300 font-sans py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-3xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent leading-tight">
            Privacy Policy
          </h1>
          <p className="text-center text-gray-400 text-sm mb-12">
            Last Updated: June 15, 2025
          </p>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents / Navigation */}
            <aside className="lg:col-span-1 sticky top-28 h-fit hidden lg:block">
              <nav className="p-6 rounded-2xl border border-white/10 bg-black/30 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">Table of Contents</h3>
                <ul className="space-y-3">
                  {[
                    { id: 'introduction', title: 'Introduction' },
                    { id: 'data-collected', title: 'Information We Collect' },
                    { id: 'how-we-use-data', title: 'How We Use Your Information' },
                    { id: 'legal-basis', title: 'Legal Basis for Processing (GDPR)' },
                    { id: 'data-sharing', title: 'Sharing Your Information' },
                    { id: 'data-security', title: 'Data Security' },
                    { id: 'data-retention', title: 'Data Retention' },
                    { id: 'user-rights', title: 'Your Data Protection Rights' },
                    { id: 'cookies', title: 'Cookies and Tracking' },
                    { id: 'children-privacy', title: 'Children\'s Privacy' },
                    { id: 'third-party-links', title: 'Third-Party Links' },
                    { id: 'policy-changes', title: 'Changes to This Policy' },
                    { id: 'contact-us', title: 'Contact Us' },
                  ].map(item => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => smoothScroll(e, `#${item.id}`)}
                        className={`block py-2 px-3 rounded-lg text-lg transition-colors duration-200 hover:bg-blue-600 hover:text-white ${
                          activeSection === item.id ? 'bg-blue-700 text-white font-bold' : 'text-gray-300'
                        }`}
                      >
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>

            {/* Policy Content */}
            <div className="lg:col-span-3 space-y-10 text-lg leading-relaxed">

              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">1. Introduction</h2>
                <p>
                  Welcome to Ayubzai Business Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website <a href="https://yourwebsite.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://yourwebsite.com</a> (the &quot;Site&quot;), use our services, or interact with us.
                </p>
                <p className="mt-4">
                  By using our Site and services, you consent to the data practices described in this policy. If you do not agree with the terms of this Privacy Policy, please do not access the Site or use our services.
                </p>
              </section>

              {/* Information We Collect */}
              <section id="data-collected">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">2. Information We Collect</h2>
                <p>We collect various types of information from and about you, including:</p>
                <h3 className="text-2xl font-semibold text-white mt-6 mb-3">2.1. Personal Information</h3>
                <p>
                  This refers to information that can be used to identify you directly or indirectly. We may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Contact Data:** Name, email address, phone number, postal address.</li>
                  <li>**Identity Data:** Such as your business name and role.</li>
                  <li>**Usage Data:** Information about how you use our website, services, and interact with our content (e.g., pages visited, features used, time spent).</li>
                  <li>**Communication Data:** Records of your correspondence with us, including emails and chat messages.</li>
                  <li>**Payment Data:** If you make a purchase, we may collect billing address and payment card details (processed securely via third-party payment processors). We do not store full payment card numbers.</li>
                  <li>**Any other information you choose to provide directly to us.**</li>
                </ul>

                <h3 className="text-2xl font-semibold text-white mt-6 mb-3">2.2. Non-Personal Information</h3>
                <p>
                  This refers to data that does not directly identify you. We may collect:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Device Data:** IP address, browser type, operating system, device type, screen resolution.</li>
                  <li>**Log Data:** Server logs, referring/exit pages, timestamps.</li>
                  <li>**Aggregated Data:** Statistical or demographic data for any purpose. Aggregated data may be derived from your personal information but is not considered personal information in law as this data will not directly or indirectly reveal your identity.</li>
                </ul>
              </section>

              {/* How We Use Your Information */}
              <section id="how-we-use-data">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">3. How We Use Your Information</h2>
                <p>We use the information we collect for various purposes, including:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>To provide, operate, and maintain our Site and services.</li>
                  <li>To improve, personalize, and expand our Site and services.</li>
                  <li>To understand and analyze how you use our Site and services.</li>
                  <li>To develop new products, services, features, and functionality.</li>
                  <li>To communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the Site, and for marketing and promotional purposes.</li>
                  <li>To process your transactions and manage your orders.</li>
                  <li>To send you emails, newsletters, and promotional communications.</li>
                  <li>To find and prevent fraud.</li>
                  <li>For compliance with legal obligations.</li>
                </ul>
              </section>

              {/* Legal Basis for Processing (GDPR) */}
              <section id="legal-basis">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">4. Legal Basis for Processing Personal Data (for GDPR Compliance)</h2>
                <p>
                  If you are from the European Economic Area (EEA) or the UK, our legal basis for collecting and using the personal information described in this Privacy Policy depends on the Personal Data we collect and the specific context in which we collect it.
                </p>
                <p className="mt-4">We may process your Personal Data because:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>We need to perform a contract with you.</li>
                  <li>You have given us permission to do so.</li>
                  <li>The processing is in our legitimate interests and it is not overridden by your rights.</li>
                  <li>For payment processing purposes.</li>
                  <li>To comply with the law.</li>
                </ul>
              </section>

              {/* Sharing Your Information */}
              <section id="data-sharing">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">5. Sharing Your Information</h2>
                <p>We may share your information with third parties in the following situations:</p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Service Providers:** We may share your data with third-party vendors, consultants, and other service providers who perform services for us or on our behalf (e.g., payment processing, website hosting, data analysis, email delivery, marketing services, customer service).</li>
                  <li>**Business Transfers:** We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                  <li>**Affiliates:** We may share your information with our affiliates, in which case we will require those affiliates to honor this Privacy Policy.</li>
                  <li>**Legal Requirements:** We may disclose your information where we are legally required to do so in order to comply with applicable law, governmental requests, a judicial proceeding, court order, or legal process, such as in response to a court order or a subpoena.</li>
                  <li>**Vital Interests and Legal Rights:** We may disclose your information where we believe it is necessary to investigate, prevent, or take action regarding potential violations of our policies, suspected fraud, situations involving potential threats to the safety of any person, and illegal activities, or as evidence in litigation in which we are involved.</li>
                  <li>**With Your Consent:** We may disclose your personal information for any other purpose with your consent.</li>
                </ul>
                <p className="mt-4 font-bold text-red-300">
                    NOTE FOR CALIFORNIA RESIDENTS (CCPA/CPRA): We DO NOT sell or share your personal information for cross-context behavioral advertising purposes.
                    If this changes in the future, a &quot;Do Not Sell or Share My Personal Information&quot; link will be prominently displayed.
                </p>
              </section>

              {/* Data Security */}
              <section id="data-security">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">6. Data Security</h2>
                <p>
                  We implement appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, please also remember that we cannot guarantee that the internet itself is 100% secure. Although we will do our best to protect your personal information, transmission of personal information to and from our Site is at your own risk. You should only access the services within a secure environment.
                </p>
              </section>

              {/* Data Retention */}
              <section id="data-retention">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">7. Data Retention</h2>
                <p>
                  We will only retain your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements).
                </p>
                <p className="mt-4">
                  When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize it, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                </p>
              </section>

              {/* User Rights */}
              <section id="user-rights">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">8. Your Data Protection Rights</h2>
                <p>
                  Depending on your location, you may have the following rights regarding your personal data:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Right to Access:** You have the right to request copies of your personal data.</li>
                  <li>**Right to Rectification:** You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.</li>
                  <li>**Right to Erasure (Right to be Forgotten):** You have the right to request that we erase your personal data, under certain conditions.</li>
                  <li>**Right to Restrict Processing:** You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
                  <li>**Right to Object to Processing:** You have the right to object to our processing of your personal data, under certain conditions.</li>
                  <li>**Right to Data Portability:** You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
                  <li>**Right to Withdraw Consent:** Where processing is based on your consent, you have the right to withdraw your consent at any time.</li>
                  <li>**Right to Non-Discrimination (CCPA/CPRA):** We will not discriminate against you for exercising any of your CCPA/CPRA rights.</li>
                  <li>**Right to Lodge a Complaint:** You have the right to lodge a complaint with a supervisory authority regarding our processing of your personal data.</li>
                </ul>
                <p className="mt-4">
                  To exercise any of these rights, please contact us using the details provided in the &quot;Contact Us&quot; section below. We will respond to your request within the timeframes required by applicable law.
                </p>
              </section>

              {/* Cookies and Tracking */}
              <section id="cookies">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">9. Cookies and Other Tracking Technologies</h2>
                <p>
                  We use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policy [Link to Cookie Policy if you have one, otherwise integrate here].
                </p>
                <p className="mt-4">
                  **What are Cookies?** Cookies are small data files placed on your device when you visit a website. They are widely used to make websites work, or work more efficiently, as well as to provide reporting information.
                </p>
                <p className="mt-4">
                  **How We Use Cookies:** We use cookies for:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Essential Website Functionality:** To enable core features and ensure security.</li>
                  <li>**Performance and Analytics:** To analyze Site usage, identify popular content, and improve user experience.</li>
                  <li>**Marketing and Personalization:** To deliver relevant content and advertisements.</li>
                </ul>
                <p className="mt-4">
                  **Managing Cookies:** Most web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Site.
                </p>
              </section>

              {/* Children's Privacy */}
              <section id="children-privacy">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">10. Children&apos;s Privacy</h2>
                <p>
                  Our Site and services are not intended for children under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If you become aware that a child has provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from children without verification of parental consent, we take steps to remove that information from our servers.
                </p>
              </section>

              {/* Third-Party Links */}
              <section id="third-party-links">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">11. Links to Other Websites</h2>
                <p>
                  Our Site may contain links to third-party websites or services that are not owned or controlled by Ayubzai Business Solutions.
                </p>
                <p className="mt-4">
                  We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. We strongly advise you to review the Privacy Policy of every site you visit.
                </p>
              </section>

              {/* Changes to This Policy */}
              <section id="policy-changes">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">12. Changes to This Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date at the top of this Privacy Policy.
                </p>
                <p className="mt-4">
                  You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact-us">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">13. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>By email: <a href="mailto:privacy@ayubzaibusinesssolutions.com" className="text-blue-400 hover:underline">privacy@ayubzaibusinesssolutions.com</a></li>
                  <li>By visiting this page on our website: <a href="https://yourwebsite.com/contact" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://yourwebsite.com/contact</a></li>
                  <li>By phone: <a href="tel:+1-555-555-5555" className="text-blue-400 hover:underline">Your Phone Number (e.g., +1-555-555-5555)</a></li>
                </ul>
                <p className="mt-4 font-bold text-yellow-300">
                    Remember to replace the placeholder email, website, and phone number with your actual contact details.
                </p>
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
