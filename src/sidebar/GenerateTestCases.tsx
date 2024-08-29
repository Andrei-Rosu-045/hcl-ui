import React, { useState, useRef } from "react";
import { FaSpinner, FaCheckCircle } from "react-icons/fa";
import "./GenerateTestCases.css";

const GenerateTestCases: React.FC = () => {
  const [projectName, setProjectName] = useState<string>('');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [uploadSuccess, setUploadSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      uploadFile(droppedFiles[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      uploadFile(e.target.files[0]);
    }
  };

  const uploadFile = (file: File) => {
    setFile(file);
    setIsUploading(true);
    setUploadSuccess(false);

    // Simulate file upload process
    setTimeout(() => {
      setIsUploading(false);
      setUploadSuccess(true);
    }, 2000); // Simulate a 2-second upload
  };

  return (
    <div className="generate-form">
      <div className="mb-3">
        <label htmlFor="projectName" className="form-label">Enter your project name</label>
        <input
          type="text"
          className="form-control"
          id="projectName"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
        />
      </div>
      {projectName && (
        <div>
          <p className="displayProject">Test case generation for project:</p>
          <h4 className="projectTitle">{projectName}</h4>
        </div>
      )}
      <div className="mb-3">
        <label htmlFor="fileType" className="form-label">Select option</label>
        <select
          className="form-select"
          id="fileType"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Select an option</option>
          <option value="Image">Image</option>
          <option value="DOCX">DOCX</option>
          <option value="DOCX WITH IMAGES">DOCX WITH IMAGES</option>
          <option value="TXT">TXT</option>
          <option value="CSV">CSV</option>
          <option value="PDF">PDF</option>
        </select>
      </div>
      {selectedOption && (
        <div className="mb-3">
          <label className="drop-label-upload">Choose a file</label>
          <div
            className="drag-drop-area-generate"
            onClick={() => fileInputRef.current?.click()}
            onDrop={handleFileDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <p className="drag-drop-message-upload">
              Drag and drop file here or click to upload
              <br />
              <span className="small-text">Limit 200MB per file .CSV, XLSX</span>
            </p>
            <input
              type="file"
              className="form-control file-input"
              id="fileUpload"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: 'none' }} 
            />
          </div>
          <div className="upload-status">
            {isUploading && (
              <div className="uploading">
                <FaSpinner className="spinner-icon" />
                <span>Running...</span>
              </div>
            )}
            {uploadSuccess && file && (
              <div className="upload-success">
                <FaCheckCircle className="success-icon" />
                <span className="file-name">{file.name}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Conditional rendering of additional elements */}
      {uploadSuccess && (
        <div className="additional-elements">
          <div className="options-and-model">
            <div className="option-select">
              <label htmlFor="summarize" className="form-label">Do you want to summarize</label>
              <select className="form-select" id="summarize">
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
            <div className="model-select">
              <label htmlFor="selectModel" className="form-label">Model for Test Case Generation</label>
              <select className="form-select" id="selectModel">
                <option value="Claude v2">Claude v2</option>
                <option value="Mistral 7B Instruct">Mistral 7B Instruct</option>
                <option value="Claude Sonnet 3">Claude Sonnet 3</option>
              </select>
            </div>
          </div>

          <div className="text-area">
            <label htmlFor="notes" className="form-label">Notes</label>
            <textarea className="form-control" id="notes" rows={6}></textarea>
          </div>

          <div className="test-case-select">
            <label htmlFor="testCase" className="form-label">Choose the Test case generation method</label>
            <select className="form-select" id="testCase">
              <option value="Select">Select</option>
              <option value="Generate Test Case with Historical Test Cases">Generate Test Case with Historical Test Cases</option>
              <option value="Generate Test Case with Process Docs">Generate Test Case with Process Docs</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default GenerateTestCases;
