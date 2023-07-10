import React from "react";
import { observer } from "mobx-react-lite";
import "./header.css";

const LoadingModal: React.FC = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default observer(LoadingModal);
