import React, { useState } from "react";
import styled from "styled-components";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const NavbarContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isDarkMode",
})`
  display: flex;
  justify-content: center; /* Center align the children */
  align-items: center; /* Center vertically */
  height: 7vh;
  width: 100%; /* Full-width navbar */
  padding: 10px 20px;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Heading = styled.div`
  font-size: 22px;
  font-weight: bold;
  font-family: 'Calibri', Arial, sans-serif;
  color: red;
  text-align: center;
  flex: 1; /* Takes up all available space */
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 18px;
  }

  &:hover {
    color: #1e6e99;
    transition: color 0.3s ease;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 19px;
  color: inherit;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: inherit;
`;

const HamburgerMenu = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  height: 24px;
  width: 30px;
  cursor: pointer;
  color: ${(props) => (props.$isDarkMode ? "#000" : "#fff")};

  @media (max-width: 768px) {
    display: flex;
  }
`;

const Line = styled.div`
  height: 3px;
  width: 100%;
  background-color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
`;

const MobileMenu = styled.div`
  position: absolute;
  top: 7vh;
  right: 0;
  width: 100%;
  background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
  display: ${(props) => (props.show ? "flex" : "none")};
  flex-direction: column;
  padding: 1rem;
  gap: 10px;

  @media (max-width: 768px) {
    position: absolute;
    top: 7vh;
    right: 0;
    width: 100%;
    background-color: ${(props) => (props.$isDarkMode ? "#333" : "#eaecee")};
    color: ${(props) => (props.$isDarkMode ? "#fff" : "#000")};
    display: ${(props) => (props.show ? "flex" : "none")};
    flex-direction: column;
    align-items: center;
    padding: 1rem;
    gap: 10px;
  }
`;

function Navbar() {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => setShowMenu(!showMenu);

  return (
    <>
      <NavbarContainer $isDarkMode={isDarkMode}>
        <Heading>VRV Security</Heading>
        <ButtonContainer>
          <ToggleButton
            $isDarkMode={isDarkMode}
            onClick={toggleDarkMode}
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
          </ToggleButton>
          <IconButton $isDarkMode={isDarkMode} aria-label="Notifications">
            <FaRegBell />
          </IconButton>
        </ButtonContainer>
        <HamburgerMenu onClick={toggleMenu}>
          <Line $isDarkMode={isDarkMode} />
          <Line $isDarkMode={isDarkMode} />
          <Line $isDarkMode={isDarkMode} />
        </HamburgerMenu>
      </NavbarContainer>
      <MobileMenu $isDarkMode={isDarkMode} show={showMenu}>
        <ToggleButton onClick={toggleDarkMode} aria-label="Toggle Dark Mode">
          {isDarkMode ? <MdOutlineDarkMode /> : <MdOutlineLightMode />}
        </ToggleButton>
        <IconButton aria-label="Notifications">
          <FaRegBell />
        </IconButton>
      </MobileMenu>
    </>
  );
}

export default Navbar;
