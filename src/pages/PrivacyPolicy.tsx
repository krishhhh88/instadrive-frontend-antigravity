import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="min-h-screen bg-[#0a0a0a] text-neutral-200">
            <div className="max-w-4xl mx-auto px-6 py-12">
                <Link to="/" className="inline-flex items-center text-indigo-400 hover:text-indigo-300 mb-8">
                    ← Back to Home
                </Link>

                <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

                <p className="text-neutral-400 mb-8">
                    <strong>Effective Date:</strong> December 6, 2025
                </p>

                <div className="space-y-8 text-neutral-300">
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
                        <p>
                            Welcome to InstaDrive ("we," "our," or "us"). We are committed to protecting your privacy.
                            This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                            when you use our service that automates posting videos from Google Drive to Instagram.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
                        <h3 className="text-xl font-medium mb-2 text-neutral-200">2.1 Personal Information</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li>Email address (for account creation and authentication)</li>
                            <li>Name (from your Google or Instagram account)</li>
                            <li>Profile information from connected accounts</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 text-neutral-200">2.2 Service Data</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Google Drive access tokens (to read your video files)</li>
                            <li>Instagram access tokens (to post content on your behalf)</li>
                            <li>Video metadata and scheduling information</li>
                            <li>Usage data and analytics</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
                        <p className="mb-2">We use the information we collect to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Provide and maintain our service</li>
                            <li>Access your Google Drive videos for scheduled posting</li>
                            <li>Post content to your Instagram account as per your schedule</li>
                            <li>Send you service-related notifications</li>
                            <li>Improve and optimize our service</li>
                            <li>Ensure security and prevent fraud</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">4. Third-Party Services</h2>
                        <p className="mb-2">Our service integrates with:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li><strong>Google Drive:</strong> To access and retrieve your video files</li>
                            <li><strong>Instagram/Meta:</strong> To post content on your behalf</li>
                            <li><strong>Supabase:</strong> For secure database hosting</li>
                        </ul>
                        <p className="mt-4">
                            These services have their own privacy policies. We encourage you to review them:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Google Privacy Policy</a></li>
                            <li><a href="https://www.facebook.com/privacy/policy" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Meta Privacy Policy</a></li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
                        <p>
                            We implement industry-standard security measures to protect your information, including:
                        </p>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>Encrypted data transmission (HTTPS/SSL)</li>
                            <li>Secure token storage with encryption</li>
                            <li>Regular security audits</li>
                            <li>Access controls and authentication</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
                        <p className="mb-2">You have the right to:</p>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Access your personal information</li>
                            <li>Correct or update your information</li>
                            <li>Delete your account and associated data</li>
                            <li>Revoke access to Google Drive and Instagram at any time</li>
                            <li>Export your data</li>
                            <li>Opt-out of non-essential communications</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">7. Data Retention</h2>
                        <p>
                            We retain your information only as long as necessary to provide our services.
                            When you delete your account, we permanently delete your personal information
                            and revoke all access tokens within 30 days.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
                        <p>
                            Our service is not intended for users under 13 years of age. We do not knowingly
                            collect information from children under 13. If you believe we have collected
                            information from a child under 13, please contact us immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">9. Changes to This Policy</h2>
                        <p>
                            We may update this Privacy Policy from time to time. We will notify you of any
                            changes by posting the new policy on this page and updating the "Effective Date"
                            at the top. You are advised to review this Privacy Policy periodically.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
                        <p>
                            If you have questions about this Privacy Policy or our practices, please contact us at:
                        </p>
                        <div className="mt-4 p-4 bg-neutral-900 rounded-lg border border-neutral-800">
                            <p><strong>Email:</strong> carryboss60@gmail.com</p>
                            <p><strong>Website:</strong> https://instadeiv.netlify.app</p>
                        </div>
                    </section>

                    <section>
                        <h2 className="text-2xl font-semibold mb-4">11. Permissions We Request</h2>
                        <h3 className="text-xl font-medium mb-2 text-neutral-200">Google Drive Permissions:</h3>
                        <ul className="list-disc list-inside space-y-2 mb-4">
                            <li>Read access to your video files</li>
                            <li>View metadata of files</li>
                        </ul>

                        <h3 className="text-xl font-medium mb-2 text-neutral-200">Instagram Permissions:</h3>
                        <ul className="list-disc list-inside space-y-2">
                            <li>Post content on your behalf</li>
                            <li>Access basic profile information</li>
                        </ul>

                        <p className="mt-4 text-neutral-400">
                            You can revoke these permissions at any time through your Google or Instagram account settings.
                        </p>
                    </section>
                </div>

                <div className="mt-12 pt-8 border-t border-neutral-800 text-center text-neutral-500">
                    <p>© 2025 InstaDrive. All rights reserved.</p>
                </div>
            </div>
        </div>
    );
}
