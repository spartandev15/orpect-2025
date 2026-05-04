import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { getFromLocalStorage } from '../../helper';

const UserDataManagement = () => {
  const [loading, setLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleExportData = async () => {
    setLoading(true);
    try {
      const token = getFromLocalStorage('token');
      if (!token) {
        toast.error('Please log in to export your data');
        return;
      }

      // TODO: Replace with actual API call
      // const response = await exportUserData();
      
      // For now, create a mock export
      const userData = {
        profile: {
          // User profile data
        },
        reviews: {
          // User reviews
        },
        activity: {
          // User activity logs
        },
        preferences: {
          // User preferences
        },
        consentLogs: JSON.parse(localStorage.getItem('consentLogs') || '[]'),
        optOutStatus: localStorage.getItem('ccpa_opt_out') === 'true',
      };

      // Create downloadable JSON file
      const dataStr = JSON.stringify(userData, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `orpect-data-export-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast.success('Your data has been exported successfully!');
    } catch (error) {
      toast.error('Failed to export data. Please try again.');
      console.error('Export error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteData = async () => {
    setLoading(true);
    try {
      const token = getFromLocalStorage('token');
      if (!token) {
        toast.error('Please log in to delete your data');
        return;
      }

      // TODO: Replace with actual API call
      // await deleteUserData();
      
      // Clear local storage
      localStorage.removeItem('consentLogs');
      localStorage.removeItem('ccpa_opt_out');
      localStorage.removeItem('ccpa_opt_out_logs');
      
      toast.success('Your data deletion request has been submitted. We will process it within 30 days.');
      setShowDeleteConfirm(false);
    } catch (error) {
      toast.error('Failed to submit deletion request. Please try again.');
      console.error('Delete error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid viewemployee main_inner_padding">
      <div className="row">
        <div className="col-lg-12">
          <h2 className="mb-4">Data Management</h2>
          <p className="mb-4">
            Manage your personal data in accordance with GDPR, CCPA, and other applicable regulations.
          </p>

          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Export Your Data</h4>
              <p className="card-text">
                Download a copy of all your personal data stored on our platform. This includes 
                your profile information, reviews, activity logs, and preferences.
              </p>
              <button
                onClick={handleExportData}
                disabled={loading}
                className="btn"
                style={{ backgroundColor: "#134D75", color: 'white' }}
              >
                {loading ? 'Exporting...' : 'Export My Data'}
              </button>
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Delete Your Data</h4>
              <p className="card-text">
                Request permanent deletion of all your personal data from our platform. 
                <strong> This action cannot be undone.</strong>
              </p>
              {!showDeleteConfirm ? (
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="btn btn-danger"
                >
                  Request Data Deletion
                </button>
              ) : (
                <div>
                  <div className="alert alert-warning">
                    <strong>Warning:</strong> This will permanently delete all your data including:
                    <ul className="mt-2">
                      <li>Your profile information</li>
                      <li>All reviews and feedback</li>
                      <li>Account settings and preferences</li>
                      <li>Activity history</li>
                    </ul>
                    <p className="mt-2 mb-0">
                      Are you sure you want to proceed? This action cannot be undone.
                    </p>
                  </div>
                  <div className="d-flex gap-2">
                    <button
                      onClick={handleDeleteData}
                      disabled={loading}
                      className="btn btn-danger"
                    >
                      {loading ? 'Processing...' : 'Yes, Delete My Data'}
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="btn btn-secondary"
                      disabled={loading}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="card mb-4">
            <div className="card-body">
              <h4 className="card-title">Your Privacy Rights</h4>
              <p className="card-text">
                Under applicable data protection laws, you have the right to:
              </p>
              <ul>
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Rectification:</strong> Correct inaccurate or incomplete data</li>
                <li><strong>Erasure:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Receive your data in a structured format</li>
                <li><strong>Objection:</strong> Object to processing of your data</li>
                <li><strong>Restriction:</strong> Request restriction of processing</li>
              </ul>
              <p className="mt-3">
                <a href="/data-request-form" style={{color:"#134d75", textDecoration:"none"}}>
                  Submit a data request
                </a>
              </p>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Contact Us</h4>
              <p className="card-text">
                For questions about your data or privacy rights, please contact:
              </p>
              <ul>
                <li><strong>Email:</strong> <a href="mailto:privacy@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>privacy@orpect.com</a></li>
                <li><strong>DPO:</strong> <a href="mailto:dpo@orpect.com" style={{color:"#134d75", textDecoration:"none"}}>dpo@orpect.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+1-8632168452" style={{color:"#134d75", textDecoration:"none"}}>+1-8632168452</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDataManagement;

