import React, { useContext } from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";
import { ChatContext } from "../ChatContext/ChatContext";
import { clientUrls } from "../../clientUrls";
import styles from "./InfoBar.module.css";
import messages from "./messages";

const InfoBar = () => {
  const { userName, chatRoom } = useContext(ChatContext);
  return (
    <Navbar className={styles.root} bg="dark" variant="dark">
      <Navbar.Brand>{chatRoom}</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <NavDropdown
            title={`${messages.sign_in_text.defaultMessage}${userName}`}
            id="collapsible-nav-dropdown"
          >
            <NavDropdown.Item>Invite friends</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href={clientUrls.logout}>
              {messages.logout_text.defaultMessage}
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default InfoBar;
