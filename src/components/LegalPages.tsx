import React, { useEffect } from 'react';

export const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy Policy | LootSplitter 2026";
  }, []);

  return (
    <div className="relative">
      <div className="atmosphere"></div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-20">
        <div className="glass-card p-10 md:p-16 prose prose-slate max-w-none">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-8 tracking-tight">Privacy Policy</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-12">Last Updated: March 22, 2026</p>
          
          <div className="space-y-12 text-slate-600 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">1. Introduction</h2>
              <p>
                Welcome to LootSplitter. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy will inform you as to how we look after your personal data when you visit our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">2. Cookies and Tracking</h2>
              <p>
                We use cookies to improve your experience on our site. Cookies are small files that a site or its service 
                provider transfers to your computer's hard drive through your web browser.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">3. Google AdSense</h2>
              <p>
                We use Google AdSense to serve ads on our website. Google, as a third-party vendor, uses cookies to serve ads on our site. 
                Google's use of the DART cookie enables it to serve ads to our users based on their visit to our site and other sites on the Internet.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms of Service | LootSplitter 2026";
  }, []);

  return (
    <div className="relative">
      <div className="atmosphere"></div>
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-48 pb-20">
        <div className="glass-card p-10 md:p-16 prose prose-slate max-w-none">
          <h1 className="text-4xl font-display font-bold text-slate-900 mb-8 tracking-tight">Terms of Service</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest mb-12">Last Updated: March 22, 2026</p>

          <div className="space-y-12 text-slate-600 font-light leading-relaxed">
            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using LootSplitter, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">2. Use of the Tool</h2>
              <p>
                The Loot Splitter Calculator is provided for entertainment and gaming purposes. While we strive for mathematical 
                accuracy, we are not responsible for any in-game disputes or errors resulting from the use of this tool.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-display font-bold text-slate-900 mb-4">3. Intellectual Property</h2>
              <p>
                The content, organization, graphics, design, and other matters related to the site are protected under applicable 
                copyrights and trademarks. Dungeons & Dragons and its related properties are trademarks of Wizards of the Coast.
              </p>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};


