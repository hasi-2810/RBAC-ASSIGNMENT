import React, { useState } from "react";
import styled from "styled-components";
import { useTheme } from "../../context/ThemeContext";

// Styled Components
const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalContainer = styled.div`
  background-color: ${(props) => (props.$isDarkMode ? "#242424" : "#f9f9f9")};
  color: ${(props) => (props.$isDarkMode ? "#e0e0e0" : "#1a1a1a")};
  border-radius: 15px;
  width: 85%;
  max-width: 450px;
  padding: 25px;
  box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.3);
  position: relative;
  font-family: Arial, sans-serif;
`;

const ModalHeader = styled.h2`
  text-align: center;
  color:red;
  margin-bottom: 15px;
  font-size: 24px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  font-size: 1.8rem;
  color: ${(props) => (props.$isDarkMode ? "#e0e0e0" : "#1a1a1a")};
  cursor: pointer;
  &:hover {
    color: ${(props) => (props.$isDarkMode ? "#ff5252" : "#d32f2f")};
    transform: scale(1.1);
  }
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 0 auto;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin: 0 15px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 14px;
  color: ${(props) => (props.$isDarkMode ? "#bdbdbd" : "#424242")};
`;

const InputField = styled.input`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid ${(props) => (props.$isDarkMode ? "#616161" : "#bdbdbd")};
  background-color: ${(props) => (props.$isDarkMode ? "#424242" : "#ffffff")};
  color: ${(props) => (props.$isDarkMode ? "#ffffff" : "#000000")};
  font-size: 14px;
  width: 100%;
`;

const Button = styled.button`
  padding: 12px 20px;
  background: green;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  width: 100%;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  margin: 0 auto;
  
`;

const ErrorMessage = styled.div`
  width: calc(100% - 30px);
  margin: auto;
  text-align: center;
  padding: 10px;
  background-color: ${(props) => (props.$isDarkMode ? "#ef9a9a" : "#ffcdd2")};
  color: ${(props) => (props.$isDarkMode ? "#b71c1c" : "#c62828")};
  font-size: 13px;
  border-radius: 8px;
`;

const AddPermissionModal = ({ isOpen, onClose, onSave }) => {
  const { isDarkMode } = useTheme();
  const [permissionName, setPermissionName] = useState("");
  const [error, setError] = useState("");

  const validateFields = () => {
    if (permissionName.length < 4) {
      setError("Permission name must be greater than 3 characters.");
      return false;
    }
    if (!/^[A-Za-z\s]+$/.test(permissionName)) {
      setError("Permission name should contain only letters and spaces.");
      return false;
    }
    setError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      onSave({ id: Date.now(), permission: permissionName });
      setPermissionName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <ModalBackground>
      <ModalContainer $isDarkMode={isDarkMode}>
        <CloseButton $isDarkMode={isDarkMode} onClick={onClose}>
          &times;
        </CloseButton>
        <ModalHeader $isDarkMode={isDarkMode}>Add New Permission</ModalHeader>
        {error && <ErrorMessage $isDarkMode={isDarkMode}>{error}</ErrorMessage>}
        <FormContainer onSubmit={handleSubmit}>
          <FormField>
            <Label $isDarkMode={isDarkMode}>Permission Name:</Label>
            <InputField
              $isDarkMode={isDarkMode}
              type="text"
              placeholder="Enter Permission Name"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
            />
          </FormField>
          <Button type="submit">Add Permission</Button>
        </FormContainer>
      </ModalContainer>
    </ModalBackground>
  );
};

export default AddPermissionModal;
