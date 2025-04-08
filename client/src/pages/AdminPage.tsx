// src/pages/AdminPage.tsx
import { useState } from "react";
import styled from "styled-components";
import AdminList from "../components/Admin/AdminList";
import CustomerList from "../components/Customer/CustomerList";
import VpnKeyList from "../components/VpnKey/VpnKeyList";

interface AdminPageProps {
  onLogout: () => void;
}

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const AdminContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Nav = styled.nav`
  margin-bottom: 2rem;
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;
`;

const NavItem = styled.li`
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: #f0f0f0;
  border-radius: 4px;
  border: 1px solid #e0e0e0;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const AdminPage: React.FC<AdminPageProps> = ({ onLogout }) => {
  const [activeView, setActiveView] = useState<string | null>(null);

  const handleViewChange = (view: string) => {
    setActiveView(view);
  };

  return (
    <AdminContainer>
      <SpaceBetween>
        <h1>Claudia CMS</h1>
        <button onClick={onLogout}>Logga ut</button>
      </SpaceBetween>
      <Nav>
        <NavList>
          <NavItem onClick={() => handleViewChange("customers")}>
            Kundlista
          </NavItem>
          <NavItem onClick={() => handleViewChange("admins")}>
            Adminlista
          </NavItem>
          <NavItem onClick={() => handleViewChange("vpn_keys")}>
            VPN-nycklar
          </NavItem>
          {/* Fler navigeringsalternativ kan läggas till här */}
        </NavList>
      </Nav>

      {/* Rendera innehåll baserat på activeView */}
      {activeView === "customers" && <CustomerList />}
      {activeView === "admins" && <AdminList />}
      {activeView === "vpn_keys" && <VpnKeyList />}
      {activeView === null && <p>Välj en vy från menyn ovan.</p>}
    </AdminContainer>
  );
};
