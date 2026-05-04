import React from 'react';
import { Link } from 'react-router-dom';

const ComplianceText = () => {
  return (
    <section id="compliance" className="py-5">
      <div className="container">
        <div className="row privacy_policy_text">
          <div className="col-lg-9 col-sm-12 faqspacing">
            <div className="mt-4">
              <h4>Our Compliance Framework</h4>
              <p className="mt-3">
                ORPECT LLC adheres to international data protection regulations and industry standards 
                to ensure the security and privacy of your data.
              </p>
            </div>

            <div className="mt-4">
              <h4>GDPR (General Data Protection Regulation)</h4>
              <p className="mt-3">
                <strong>Applicability:</strong> European Union (EU) and European Economic Area (EEA) residents
              </p>
              <p className="mt-3">
                We comply with GDPR requirements, including:
              </p>
              <ul>
                <li><strong>Consent Management:</strong> Clear consent mechanisms for data processing</li>
                <li><strong>Data Subject Rights:</strong> Access, rectification, erasure, portability, and objection rights</li>
                <li><strong>Data Protection Officer (DPO):</strong> Designated contact for data protection inquiries</li>
                <li><strong>Data Processing Agreements:</strong> Contracts with third-party processors</li>
                <li><strong>Privacy by Design:</strong> Data protection built into our systems</li>
                <li><strong>Breach Notification:</strong> Timely notification of data breaches</li>
              </ul>
              <p className="mt-3">
                <strong>Contact DPO:</strong> <a href="mailto:dpo@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>dpo@orpect.com</a>
              </p>
            </div>

            <div className="mt-4">
              <h4>CCPA (California Consumer Privacy Act)</h4>
              <p className="mt-3">
                <strong>Applicability:</strong> California, USA residents
              </p>
              <p className="mt-3">
                We comply with CCPA requirements, including:
              </p>
              <ul>
                <li><strong>Right to Know:</strong> Disclosure of data collection and usage</li>
                <li><strong>Right to Delete:</strong> Request deletion of personal information</li>
                <li><strong>Right to Opt-Out:</strong> Opt-out of sale of personal information</li>
                <li><strong>Non-Discrimination:</strong> No discrimination for exercising privacy rights</li>
                <li><strong>Privacy Notices:</strong> Clear disclosure of data practices</li>
              </ul>
              <p className="mt-3">
                <Link to="/do-not-sell" style={{color:"#134d75", textDecoration:"none"}}>
                  <strong>Click here to opt-out of data sales</strong>
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <h4>PIPEDA (Personal Information Protection and Electronic Documents Act)</h4>
              <p className="mt-3">
                <strong>Applicability:</strong> Canada residents
              </p>
              <p className="mt-3">
                We comply with PIPEDA requirements, including:
              </p>
              <ul>
                <li>Consent for collection, use, and disclosure of personal information</li>
                <li>Right to access and correct personal information</li>
                <li>Accountability and transparency in data handling</li>
                <li>Security safeguards for personal information</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>EEOC Compliance (Equal Employment Opportunity Commission)</h4>
              <p className="mt-3">
                <strong>Applicability:</strong> USA employers and employees
              </p>
              <p className="mt-3">
                We ensure compliance with EEOC regulations:
              </p>
              <ul>
                <li><strong>Non-Discrimination:</strong> Prohibition of discriminatory language in reviews</li>
                <li><strong>Content Moderation:</strong> AI-powered detection of biased content</li>
                <li><strong>Community Guidelines:</strong> Clear rules against discriminatory practices</li>
                <li><strong>Reporting Mechanism:</strong> Easy reporting of discriminatory content</li>
                <li><strong>Fair Review Process:</strong> Ensuring reviews are based on merit, not protected characteristics</li>
              </ul>
              <p className="mt-3">
                <Link to="/community-guidlines" style={{color:"#134d75", textDecoration:"none"}}>
                  View our Community Guidelines
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <h4>SOC 2 Compliance</h4>
              <p className="mt-3">
                <strong>Status:</strong> In Progress / Certified (as applicable)
              </p>
              <p className="mt-3">
                We follow SOC 2 principles for B2B SaaS:
              </p>
              <ul>
                <li><strong>Security:</strong> Protection against unauthorized access</li>
                <li><strong>Availability:</strong> System availability and performance monitoring</li>
                <li><strong>Processing Integrity:</strong> Accurate and complete data processing</li>
                <li><strong>Confidentiality:</strong> Protection of confidential information</li>
                <li><strong>Privacy:</strong> Collection, use, and disclosure of personal information</li>
              </ul>
              <p className="mt-3">
                <strong>Security Measures:</strong>
              </p>
              <ul>
                <li>SSL/TLS encryption (HTTPS)</li>
                <li>Secure cloud infrastructure (AWS/GCP)</li>
                <li>Data encryption at rest and in transit</li>
                <li>Two-factor authentication (2FA) for admin accounts</li>
                <li>Role-based access control</li>
                <li>Regular security audits and updates</li>
                <li>Daily backups and incident response procedures</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Third-Party Data Processors</h4>
              <p className="mt-3">
                We work with trusted third-party service providers who are also compliant with 
                applicable regulations:
              </p>
              <ul>
                <li><strong>Cloud Services:</strong> AWS, Google Cloud Platform</li>
                <li><strong>Analytics:</strong> Google Analytics (with privacy controls)</li>
                <li><strong>Communication:</strong> Email service providers with DPA agreements</li>
              </ul>
              <p className="mt-3">
                All third-party processors have signed Data Processing Agreements (DPAs) 
                ensuring compliance with GDPR, CCPA, and other applicable regulations.
              </p>
            </div>

            <div className="mt-4">
              <h4>Data Storage Locations</h4>
              <p className="mt-3">
                Your data is stored in secure data centers:
              </p>
              <ul>
                <li>Primary: United States (with EU Standard Contractual Clauses for EU data)</li>
                <li>Backup: Multiple geographic locations for redundancy</li>
                <li>All data centers comply with ISO 27001 and SOC 2 standards</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Regular Audits & Updates</h4>
              <p className="mt-3">
                We conduct regular:
              </p>
              <ul>
                <li>Security audits and penetration testing</li>
                <li>Compliance reviews and gap analyses</li>
                <li>Staff training on data protection and privacy</li>
                <li>Policy updates to reflect regulatory changes</li>
              </ul>
            </div>

            <div className="mt-4">
              <h4>Your Rights</h4>
              <p className="mt-3">
                Under applicable regulations, you have the right to:
              </p>
              <ul>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data</li>
                <li>Export your data</li>
                <li>Object to processing</li>
                <li>Restrict processing</li>
                <li>Opt-out of data sales (CCPA)</li>
              </ul>
              <p className="mt-3">
                <Link to="/data-request-form" style={{color:"#134d75", textDecoration:"none"}}>
                  Submit a data request
                </Link>
              </p>
            </div>

            <div className="mt-4">
              <h4>Contact Us</h4>
              <p className="mt-4">
                For compliance inquiries, please contact:
              </p>
              <ul>
                <li><strong>Data Protection Officer (DPO):</strong> <a href="mailto:dpo@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>dpo@orpect.com</a></li>
                <li><strong>General Support:</strong> <a href="mailto:support@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>support@orpect.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+1-8632168452" style={{color:"#134d75", textDecoration:"none"}}>+1-8632168452</a></li>
              </ul>
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

export default ComplianceText;

