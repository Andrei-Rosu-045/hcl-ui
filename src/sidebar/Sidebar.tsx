import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import { Tooltip } from 'bootstrap';
import logo from '../logo_no_backgorund.png';

const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>(''); // State to track the active menu
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null); // State to track the uploaded file name
  const [uploading, setUploading] = useState<boolean>(false); // State to track if uploading

  useEffect(() => {
    const tooltipTriggerList = Array.from(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new Tooltip(tooltipTriggerEl);
    });
  }, []);

  const renderContent = () => {
    if (activeMenu === 'upload') {
      return (
        <div className="upload-form">
          <div className="mb-3">
            <label htmlFor="projectName" className="form-label">Enter project name</label>
            <input type="text" className="form-control" id="projectName" />
          </div>
          <div className="mb-3">
            <label htmlFor="fileType" className="form-label">Select file type</label>
            <select className="form-select" id="fileType">
              <option value="Test Case">Test Case</option>
              <option value="Process Documents">Process Documents</option>
            </select>
          </div>
          <div className="mb-3">
            <label className="form-label-upload">Upload and Ingest Data</label>
            <div
              className="drag-drop-area d-flex align-items-center justify-content-center flex-column"
              onDrop={(e) => handleFileDrop(e)}
              onDragOver={(e) => e.preventDefault()}
            >
              {uploading && (
                <div className="uploading-status">
                  <i className="fas fa-spinner fa-spin"></i> Running...
                </div>
              )}
              <input
                type="file"
                className="file-upload-input"
                id="fileUpload"
                onChange={(e) => handleFileChange(e)}
              />
              <div className="drag-drop-message">
                <div className="drag-drop-text-large">Drag and drop file here</div>
                <div className="drag-drop-text-small">Limit 200MB per file .CSV, XLSX</div>
              </div>
            </div>
            {uploadedFileName && (
              <div className="mt-2 text-success">
                <i className="fas fa-check-circle me-2"></i>
                {uploadedFileName}
              </div>
            )}
          </div>
        </div>
      );
    }
    return <p>Select an option from the sidebar.</p>;
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setUploadedFileName(files[0].name);
      startUploading(); // Start the uploading process
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedFileName(e.target.files[0].name);
      startUploading(); // Start the uploading process
    }
  };

  const startUploading = () => {
    setUploading(true);
    // Simulate file upload with a timeout
    setTimeout(() => {
      setUploading(false);
    }, 3000); // Simulate a 3-second upload
  };

  return (
    <div className="d-flex">
      <div className="sidebar text-center">
        <img src={logo} alt="HCL Tech Logo" className="sidebar-logo my-4" />
        <div className="menu-options d-flex flex-column align-items-center">
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none p-4 my-5 sidebar-option"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Upload File"
            onClick={() => setActiveMenu('upload')}
          >
            <span className="icon me-2">
              <i className="fas fa-upload fa-2x"></i>
            </span>
            <span className="sidebar-text">Upload File</span>
          </a>
          <a
            href="#"
            className="d-flex align-items-center text-white text-decoration-none p-4 my-5 sidebar-option"
            data-bs-toggle="tooltip"
            data-bs-placement="right"
            title="Generate Test Cases"
            onClick={() => setActiveMenu('generate')}
          >
            <span className="icon me-2">
              <i className="fas fa-file-alt fa-2x"></i>
            </span>
            <span className="sidebar-text">Generate Test Cases</span>
          </a>
        </div>
      </div>
      <div className="content p-3">
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;