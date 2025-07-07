// components/TermsOfService.tsx
'use client'; // This directive indicates that this is a client-side component in Next.js

import { useEffect, useState } from 'react';

// Main TermsOfService component
export default function TermsOfService() {
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
      {/* Head metadata for SEO */}
      <head>
        <title>Terms of Service - Ayubzai Business Solutions</title>
        <meta name="description" content="Terms of Service for Ayubzai Business Solutions, detailing project completion, payments, and support." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>

      {/* Background animation and particles for consistent styling */}
      <div className="bg-animation fixed inset-0 -z-20"></div>
      <div className="particles fixed inset-0 -z-10 pointer-events-none" id="particles"></div>

      <div className="min-h-screen text-gray-300 font-sans py-24 px-6 relative z-10">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-900/90 to-slate-800/80 backdrop-blur-3xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 shadow-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 text-center bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent leading-tight">
            Terms of Service
          </h1>
          <p className="text-center text-gray-400 text-sm mb-12">
            Last Updated: June 15, 2025
          </p>

          <div className="grid lg:grid-cols-4 gap-12">
            {/* Table of Contents / Navigation sidebar */}
            <aside className="lg:col-span-1 sticky top-28 h-fit hidden lg:block">
              <nav className="p-6 rounded-2xl border border-white/10 bg-black/30 shadow-lg">
                <h3 className="text-xl font-semibold text-white mb-4 border-b border-white/20 pb-2">Table of Contents</h3>
                <ul className="space-y-3">
                  {[
                    { id: 'introduction', title: 'Introduction' },
                    { id: 'services', title: 'Services Provided' },
                    { id: 'project-completion', title: 'Project Completion & Delivery' },
                    { id: 'payment-terms', title: 'Payment Terms' },
                    { id: 'support-services', title: 'Support Services' },
                    { id: 'intellectual-property', title: 'Intellectual Property' },
                    { id: 'client-responsibilities', title: 'Client Responsibilities' },
                    { id: 'disclaimer', title: 'Disclaimer of Warranties' },
                    { id: 'limitation-liability', title: 'Limitation of Liability' },
                    { id: 'indemnification', title: 'Indemnification' },
                    { id: 'governing-law', title: 'Governing Law & Dispute Resolution' },
                    { id: 'termination', title: 'Termination' },
                    { id: 'changes', title: 'Changes to Terms' },
                    { id: 'contact', title: 'Contact Us' },
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

            {/* Terms of Service Content */}
            <div className="lg:col-span-3 space-y-10 text-lg leading-relaxed">

              {/* Introduction */}
              <section id="introduction">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">1. Introduction</h2>
                <p>
                  Welcome to Ayubzai Business Solutions (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). These Terms of Service (&quot;Terms&quot;) govern your access to and use of our website at <a href="https://ayubzaibusinesssolutions.com/" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://ayubzaibusinesssolutions.com/</a> (the &quot;Site&quot;) and the software development services (&quot;Services&quot;) we provide.
                </p>
                <p className="mt-4">
                  By accessing or using our Site and Services, you agree to be bound by these Terms. If you disagree with any part of the Terms, then you may not access the Service.
                </p>
              </section>

              {/* Services Provided */}
              <section id="services">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">2. Services Provided</h2>
                <p>
                  Ayubzai Business Solutions offers AI-powered software development services, including but not limited to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>AI-Powered Website Development</li>
                  <li>AI-Enhanced Mobile App Development</li>
                  <li>AI-Optimized Database Solutions</li>
                  <li>Consultation and strategy sessions related to software projects.</li>
                </ul>
                <p className="mt-4">
                  The specific scope of work, deliverables, timelines, and costs for any project will be detailed in a separate Statement of Work (SOW) or project agreement, which, once signed, will become an integral part of these Terms.
                </p>
              </section>

              {/* Project Completion & Delivery */}
              <section id="project-completion">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">3. Project Completion & Delivery</h2>
                <p>
                  We are committed to efficient and timely project delivery. While actual completion times may vary based on project complexity and client responsiveness, we strive to complete most projects within an estimated timeframe of **2 to 4 months** from the project's official start date, as defined in the signed SOW.
                </p>
                <p className="mt-4">
                  This estimated timeframe is a good faith projection and is contingent upon:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>Timely provision of necessary information, feedback, and approvals from the Client.</li>
                  <li>No significant changes to the project scope after the SOW is signed.</li>
                  <li>Availability of required third-party services or integrations.</li>
                  <li>Unforeseen technical complexities or external factors outside our reasonable control.</li>
                </ul>
                <p className="mt-4">
                  Any delays caused by factors attributable to the Client may result in an adjustment to the project timeline and, potentially, the cost, as mutually agreed upon.
                </p>
              </section>

              {/* Payment Terms */}
              <section id="payment-terms">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">4. Payment Terms</h2>
                <p>
                  Our payment structure is based on a **milestone-based system**. The total project cost, as outlined in the SOW, will be divided into specific milestones.
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>**Upfront Payment:** The first payment, representing a portion of the total project cost, is due upfront upon the signing of the SOW to initiate the project.</li>
                  <li>**Subsequent Milestone Payments:** Payments for subsequent milestones will be due upon the successful completion and client approval of each defined milestone, as specified in the SOW.</li>
                  <li>**Invoicing:** Invoices will be issued according to the agreed-upon payment schedule. Payment is typically due within 7 days of the invoice date.</li>
                  <li>**Late Payments:** Late payments may be subject to a late fee of 2% per month or the maximum amount permitted by law. Services may be paused or terminated for overdue payments.</li>
                </ul>

              </section>
{/* Support Services */}
<section id="support-services">
  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">
    5. Support Services
  </h2>
  <p>
    Ayubzai Business Solutions offers support services for completed projects. The specific scope and duration of post-launch support, maintenance, and bug fixes will be outlined either in a separate support agreement or within the Statement of Work (SOW).
  </p>
  <p className="mt-4">
    Unless otherwise agreed in writing, standard project delivery includes a <span className="font-bold">30-day warranty period</span> for critical bug fixes that are directly related to the delivered code and identified after project completion. This warranty does not cover enhancements, new features, issues resulting from modifications by the Client or third parties, or changes in third-party services or APIs. After the warranty period, all ongoing support and maintenance services will require a separate support agreement.
  </p>
</section>


              {/* Intellectual Property */}
              <section id="intellectual-property">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">6. Intellectual Property</h2>
                <p>
                  Upon full and final payment for the Services, all intellectual property rights (including copyrights and other proprietary rights) in the custom software, websites, mobile applications, and database solutions developed specifically for the Client will transfer to the Client, as explicitly defined in the SOW.
                </p>
                <p className="mt-4">
                  This transfer does not include any pre-existing intellectual property, tools, libraries, or components owned by Ayubzai Business Solutions or third parties that are integrated into the final deliverables. We retain the right to use our general knowledge, skills, and experience gained during the project, and to utilize any generic code, modules, or methodologies developed by us that do not contain Client-specific intellectual property.
                </p>
              </section>

              {/* Client Responsibilities */}
              <section id="client-responsibilities">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">7. Client Responsibilities</h2>
                <p>
                  The Client agrees to:
                </p>
             <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
  <li><span className="font-bold">Upfront Payment:</span> The first payment ...</li>
  <li><span className="font-bold">Subsequent Milestone Payments:</span> ...</li>
  <li><span className="font-bold">Invoicing:</span> ...</li>
  <li><span className="font-bold">Late Payments:</span> Late payments may be subject to a late fee of 2% per month or the maximum amount permitted by law. Services may be paused or terminated for overdue payments.</li>
</ul>

              </section>

              {/* Disclaimer of Warranties */}
              <section id="disclaimer">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">8. Disclaimer of Warranties</h2>
                <p>
                  OUR SERVICES ARE PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.
                </p>
                <p className="mt-4">
                  AYUBZAI BUSINESS SOLUTIONS DOES NOT WARRANT THAT (A) THE SERVICE WILL FUNCTION UNINTERRUPTED, SECURE, OR AVAILABLE AT ANY PARTICULAR TIME OR LOCATION; (B) ANY ERRORS OR DEFECTS WILL BE CORRECTED; (C) THE SERVICE IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS; OR (D) THE RESULTS OF USING THE SERVICE WILL MEET YOUR REQUIREMENTS.
                </p>
              </section>

              {/* Limitation of Liability */}
              <section id="limitation-liability">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">9. Limitation of Liability</h2>
                <p>
                  IN NO EVENT SHALL AYUBZAI BUSINESS SOLUTIONS, NOR ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES, BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM (I) YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICE; (II) ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE SERVICE; (III) ANY CONTENT OBTAINED FROM THE SERVICE; AND (IV) UNAUTHORIZED ACCESS, USE OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE) OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE, AND EVEN IF A REMEDY SET FORTH HEREIN IS FOUND TO HAVE FAILED OF ITS ESSENTIAL PURPOSE.
                </p>
              </section>

              {/* Indemnification */}
              <section id="indemnification">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">10. Indemnification</h2>
                <p>
                  You agree to defend, indemnify and hold harmless Ayubzai Business Solutions and its licensee and licensors, and their employees, contractors, agents, officers and directors, from and against any and all claims, damages, obligations, losses, liabilities, costs or debt, and expenses (including but not limited to attorney&#39;s fees), resulting from or arising out of a) your use and access of the Service, by you or any person using your account and password; b) a breach of these Terms, or c) Content posted on the Service.
                </p>
              </section>

       {/* Governing Law & Dispute Resolution */}
<section id="governing-law">
  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">
    11. Governing Law & Dispute Resolution
  </h2>
  <p>
    These Terms shall be governed and construed in accordance with the laws of the State of Nebraska, USA, without regard to its conflict of law provisions.
  </p>
  <p className="mt-4">
    Any dispute arising from or relating to the subject matter of these Terms shall be resolved by arbitration in Lincoln, Nebraska, USA, in accordance with the rules of the American Arbitration Association (“AAA”). The prevailing party in any action or proceeding shall be entitled to receive its costs and attorneys’ fees.
  </p>
</section>


              {/* Termination */}
              <section id="termination">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">12. Termination</h2>
                <p>
                  We may terminate or suspend your access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                </p>
                <p className="mt-4">
                  All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
                </p>
              </section>

              {/* Changes to Terms */}
              <section id="changes">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">13. Changes to These Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least  30 days&#39; notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p className="mt-4">
                  By continuing to access or use our Service after any revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the Service.
                </p>
              </section>

              {/* Contact Us */}
              <section id="contact">
                <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 border-b border-white/20 pb-2">14. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                  <li>By email: <a href="mailto:contact@ayubzaibusinesssolutions.com" className="text-blue-400 hover:underline">contact@ayubzaibusinesssolutions.com</a></li>
                  <li>By visiting this page on our website: <a href="https://www.ayubzaibusinesssolutions.com/contact" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">https://www.ayubzaibusinesssolutions.com/contact
</a></li>
                  <li>By phone: <a href="tel:+1-229-326-5589" className="text-blue-400 hover:underline"> +1-229-326-5589</a></li>
                </ul>
           
              </section>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}
