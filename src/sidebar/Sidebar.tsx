import React, { useState } from 'react';
import './Sidebar.css';
import logo from '../logo_no_backgorund.png';
import UploadFile from './UploadFile';
import GenerateTestCases from './GenerateTestCases';


const Sidebar: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>(''); // State to track the active menu
  const renderContent = () => {
    if (activeMenu === 'upload') {
      return (
        <UploadFile/>
      );
    }
    else if (activeMenu === 'generate') {
      return (<GenerateTestCases/>)
    }
    else
      return <p id='simple-message'>Select an option from the sidebar.</p>;
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