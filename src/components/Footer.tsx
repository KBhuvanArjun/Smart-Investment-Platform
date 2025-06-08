import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ModalType = 'privacy' | 'terms' | 'faq' | null;

const Footer = () => {
  const [openModal, setOpenModal] = useState<ModalType>(null);

  const openPrivacyModal = () => setOpenModal('privacy');
  const openTermsModal = () => setOpenModal('terms');
  const openFaqModal = () => setOpenModal('faq');
  const closeModal = () => setOpenModal(null);

  return (
    <>
      <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-700 text-white shadow-lg text-white py-4">
        <div
          className="relative overflow-hidden whitespace-nowrap bg-gradient-to-r from-gray-900 via-blue-800 to-teal-700 text-white shadow-lg py-3"
        >
          <div
            className="inline-block text-white"
            style={{
              animation: 'ticker 20s linear infinite',
              whiteSpace: 'nowrap',
            }}
          >
            Enabling next-gen content investment with intelligent funding workflows and
            AI-powered project insights. Fostering creator empowerment, secure investor
            onboarding, and dynamic profit models.
          </div>

          {/* Inline keyframes style */}
          <style>
            {`
      @keyframes ticker {
        0% { transform: translateX(100%); }
        100% { transform: translateX(-100%); }
      }
    `}
          </style>
        </div>


        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-4 md:mb-0"
            >
              <p className="text-center md:text-left text-sm">
                &copy; {new Date().getFullYear()} Smart Investment Platform. All rights reserved.
              </p>
            </motion.div>

            <div className="flex space-x-6">
              <button
                onClick={openPrivacyModal}
                className="text-black-300 hover:text-secondary-500 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                aria-label="Open Privacy Policy"
                type="button"
              >
                Privacy Policy
              </button>
              <button
                onClick={openTermsModal}
                className="text-black-300 hover:text-secondary-500 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                aria-label="Open Terms and Conditions"
                type="button"
              >
                Terms of Service
              </button>
              <button
                onClick={openFaqModal}
                className="text-black-300 hover:text-secondary-500 transition-colors duration-200 cursor-pointer bg-transparent border-none p-0"
                aria-label="Open FAQ"
                type="button"
              >
                FAQ
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Overlay */}
      {openModal && (
        <div
          role="dialog"
          aria-modal="true"
          style={{
            position: 'fixed',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={closeModal} // clicking outside modal closes it
        >
          <div
            onClick={(e) => e.stopPropagation()} // prevent modal close on inside click
            style={{
              backgroundColor: 'white',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '100%',
              maxHeight: '80vh',
              overflowY: 'auto',
              padding: '2rem',
              boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            {/* Privacy Policy Modal */}
            {openModal === 'privacy' && (
              <>
                <h2 id="privacy-policy-title" className="text-xl font-semibold mb-4">Privacy Policy</h2>
                <p>We respect your privacy and are committed to protecting your personal data.</p>

                <h3 className="mt-4 font-semibold">Information We Collect:</h3>
                <ul className="list-disc list-inside">
                  <li>Name, email, username, and password during account registration.</li>
                  <li>Project details from creators.</li>
                  <li>Investment and funding activity from investors.</li>
                </ul>

                <h3 className="mt-4 font-semibold">Data Sharing:</h3>
                <ul className="list-disc list-inside">
                  <li>We do not sell or rent your data.</li>
                  <li>Your data may be shared only with legal authorities or in compliance with law.</li>
                </ul>

                <h3 className="mt-4 font-semibold">Security Measures:</h3>
                <ul className="list-disc list-inside">
                  <li>We use encryption, access control, and secure storage protocols.</li>
                  <li>Users are responsible for keeping their login credentials safe.</li>
                </ul>

                <h3 className="mt-4 font-semibold">User Rights:</h3>
                <ul className="list-disc list-inside">
                  <li>You can request to update or delete your account data by contacting support.</li>
                </ul>

                <p className="mt-4">
                  For any concerns, contact us at:{' '}
                  <a href="mailto:projectsync.team26@gmail.com" className="text-blue-600 underline">
                    projectsync.team26@gmail.com
                  </a>
                </p>
              </>
            )}

            {/* Terms & Conditions Modal */}
            {openModal === 'terms' && (
              <>
                <h2 id="terms-title" className="text-xl font-semibold mb-4">Terms & Conditions</h2>
                <p><strong>User Roles:</strong> Creators may submit only original projects with complete documentation. Investors are responsible for assessing project risk using the tools provided.</p>
                <p><strong>Profit Distribution:</strong> Revenue sharing is proportional to the investment made, based on actual project performance. The platform does not guarantee returns; investments carry inherent risk.</p>
                <p><strong>AI Features:</strong> With built-in AI features for project evaluation, fraud detection, and revenue forecasting, the platform ensures a secure, transparent, and scalable model for media financing.</p>
                <p><strong>Legal Compliance:</strong> Users must comply with applicable IP, copyright, and funding laws. The platform holds no liability for legal disputes arising from uploaded content or investments.</p>
              </>
            )}

            {/* FAQ Modal */}
            {openModal === 'faq' && (
              <>
                <h2 id="faq-title" className="text-xl font-semibold mb-4">Frequently Asked Questions (FAQ)</h2>
                <div className="space-y-4">
                  <div>
                    <strong>Q1: What is this platform for?</strong>
                    <p>A: It connects content creators and public investors to fund and profit from digital media projects like films, songs, and web series.</p>
                  </div>
                  <div>
                    <strong>Q2: Who can use the platform?</strong>
                    <p>A: Both content creators and investors can sign up. Creators must submit original projects. Investors fund those projects in exchange for a share of the profits.</p>
                  </div>
                  <div>
                    <strong>Q3: Are investments guaranteed to generate returns?</strong>
                    <p>A: No. Like stock markets, investments carry inherent risks. The platform provides AI-based tools to assess project risks.</p>
                  </div>
                  <div>
                    <strong>Q4: Is my data safe on this platform?</strong>
                    <p>A: Yes. We use encryption and security protocols to protect user data.</p>
                  </div>
                  <div>
                    <strong>Q5: Can I delete my account?</strong>
                    <p>A: Yes, just contact support to remove your account and personal data.</p>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={closeModal}
              className="mt-6 px-4 py-2 bg-primary-700 hover:bg-primary-600 text-white rounded focus:outline-none"
              aria-label="Close Modal"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
