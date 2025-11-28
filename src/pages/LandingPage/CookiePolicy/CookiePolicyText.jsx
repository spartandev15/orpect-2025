import React from 'react';

const CookiePolicyText = () => {
  return (
    <section id="cookie_policy" className="py-5">
      <div className="container">
        <div className="row privacy_policy_text">
          <div className="col-lg-9 col-sm-12 faqspacing">
            <div className="mt-4">
              <h4>What Are Cookies?</h4>
              <p className="mt-3">
                Cookies are small text files that are placed on your device when you visit a website. 
                They are widely used to make websites work more efficiently and provide information to 
                the website owners.
              </p>
            </div>

            <div className="mt-4">
              <h4>Types of Cookies We Use</h4>
              
              <div className="mt-3">
                <h5>1. Necessary Cookies</h5>
                <p>
                  These cookies are essential for the website to function properly. They enable core 
                  functionality such as security, network management, and accessibility. You cannot 
                  opt-out of these cookies.
                </p>
                <ul>
                  <li>Session management</li>
                  <li>Authentication</li>
                  <li>Security features</li>
                </ul>
              </div>

              <div className="mt-3">
                <h5>2. Analytics Cookies</h5>
                <p>
                  These cookies help us understand how visitors interact with our website by collecting 
                  and reporting information anonymously.
                </p>
                <ul>
                  <li>Google Analytics</li>
                  <li>Page views and navigation patterns</li>
                  <li>User behavior analysis</li>
                </ul>
              </div>

              <div className="mt-3">
                <h5>3. Functional Cookies</h5>
                <p>
                  These cookies enable enhanced functionality and personalization, such as remembering 
                  your preferences and settings.
                </p>
                <ul>
                  <li>Language preferences</li>
                  <li>User interface customization</li>
                  <li>Remembering your login status</li>
                </ul>
              </div>

              <div className="mt-3">
                <h5>4. Marketing Cookies</h5>
                <p>
                  These cookies are used to track visitors across websites to display relevant 
                  advertisements and measure campaign effectiveness.
                </p>
                <ul>
                  <li>Advertising networks</li>
                  <li>Social media integration</li>
                  <li>Retargeting campaigns</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <h4>How We Use Cookies</h4>
              <p className="mt-3">
                We use cookies to:
              </p>
              <ul>
                <li>Ensure the website functions correctly</li>
                <li>Remember your preferences and settings</li>
                <li>Analyze website traffic and user behavior</li>
                <li>Improve our services and user experience</li>
                <li>Provide personalized content and advertisements</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Third-Party Cookies</h4>
              <p className="mt-3">
                Some cookies are placed by third-party services that appear on our pages. We use 
                services such as:
              </p>
              <ul>
                <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
                <li><strong>Social Media Platforms:</strong> For social sharing and integration</li>
                <li><strong>Advertising Partners:</strong> For targeted advertising (if applicable)</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Managing Your Cookie Preferences</h4>
              <p className="mt-3">
                You can manage your cookie preferences at any time by:
              </p>
              <ul>
                <li>Using our cookie consent banner when you first visit the site</li>
                <li>Adjusting your browser settings to block or delete cookies</li>
                <li>Using browser extensions that manage cookies</li>
              </ul>
              <p className="mt-3">
                <strong>Note:</strong> Blocking certain cookies may impact your experience on our website 
                and some features may not function properly.
              </p>
            </div>

            <div className="mt-4">
              <h4>Browser Settings</h4>
              <p className="mt-3">
                Most browsers allow you to control cookies through their settings. You can:
              </p>
              <ul>
                <li>View and delete cookies</li>
                <li>Block cookies from specific sites</li>
                <li>Block all cookies</li>
                <li>Set notifications when cookies are set</li>
              </ul>
              <p className="mt-3">
                For instructions on managing cookies in your browser, visit:
              </p>
              <ul>
                <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
                <li><a href="https://support.mozilla.org/en-US/kb/cookies-information-websites-store-on-your-computer" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
                <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
                <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Do Not Track Signals</h4>
              <p className="mt-3">
                Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit 
                that you do not want to have your online activity tracked. Currently, there is no 
                standard for how DNT signals should be interpreted. Our website does not currently 
                respond to DNT signals.
              </p>
            </div>

            <div className="mt-4">
              <h4>Updates to This Policy</h4>
              <p className="mt-3">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons. We will notify you of any 
                material changes by posting the new Cookie Policy on this page and updating the 
                "Last Updated" date.
              </p>
            </div>

            <div className="mt-4">
              <h4>Contact Us</h4>
              <p className="mt-4">
                If you have any questions about our use of cookies, please contact us at{' '}
                <a href="mailto:support@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>support@orpect.com</a>.
              </p>
              <p className="mt-4">
                <i>Last Updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CookiePolicyText;

