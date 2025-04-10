// src/components/CustomerList/CustomerForm.tsx
import React from "react";
import styled from "styled-components";
import { Customer } from "../../types/types";

const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  width: 100%;
`;

const FlexRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
`;

const ToggleSwitch = styled.label`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
`;

const ToggleInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .slider {
    background-color: #4caf50;
  }

  &:checked + .slider:before {
    transform: translateX(26px);
  }
`;

const ActiveToggle = styled.select`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
`;

const Slider = styled.span`
  position: relative;
  cursor: pointer;
  width: 50px;
  height: 24px;
  background-color: #f44336;
  border-radius: 12px;
  transition: 0.4s;

  &:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 2px;
    top: 2px;
    background-color: white;
    border-radius: 50%;
    transition: 0.4s;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  padding-top: 0.5rem;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

interface CustomerFormProps {
  newCustomer: Customer;
  setNewCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  handleAddCustomer: () => void;
}

export const CustomerForm: React.FC<CustomerFormProps> = ({
  newCustomer,
  setNewCustomer,
  handleAddCustomer,
}) => {
  return (
    <Card>
      <h2>Lägg till kund</h2>
      <FlexRow>
        <input
          value={newCustomer.customer_name}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, customer_name: e.target.value })
          }
          placeholder="Kundnamn"
        />
        <input
          value={newCustomer.contact_name || ""}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, contact_name: e.target.value })
          }
          placeholder="Kontaktperson"
        />
        <input
          value={newCustomer.contact_email}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, contact_email: e.target.value })
          }
          placeholder="Email"
        />
        <input
          value={newCustomer.contact_phone}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, contact_phone: e.target.value })
          }
          placeholder="Kontakt telefon"
        />
        <input
          value={newCustomer.edr_site_token || ""}
          onChange={(e) =>
            setNewCustomer({ ...newCustomer, edr_site_token: e.target.value })
          }
          placeholder="EDR site token"
        />
        <ToggleContainer>
          <ToggleSwitch>
            <Paragraph>EDR</Paragraph>
            <ToggleInput
              type="checkbox"
              checked={newCustomer.EDR}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, EDR: e.target.checked })
              }
            />
            <Slider className="slider" />
          </ToggleSwitch>
          <ToggleSwitch>
            <Paragraph>VPN</Paragraph>
            <ToggleInput
              type="checkbox"
              checked={newCustomer.VPN}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, VPN: e.target.checked })
              }
            />
            <Slider className="slider" />
          </ToggleSwitch>
          <ToggleSwitch>
            <Paragraph>PWM</Paragraph>
            <ToggleInput
              type="checkbox"
              checked={newCustomer.PWM}
              onChange={(e) =>
                setNewCustomer({ ...newCustomer, PWM: e.target.checked })
              }
            />
            <Slider className="slider" />
          </ToggleSwitch>
        </ToggleContainer>
        <ActiveToggle
          value={newCustomer.status || ""}
          onChange={(e) =>
            setNewCustomer({
              ...newCustomer,
              status: e.target.value as "active" | "inactive" | undefined,
            })
          }
        >
          <option value="">Välj status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </ActiveToggle>
        <ButtonContainer>
          <button onClick={handleAddCustomer}>Spara</button>
        </ButtonContainer>
      </FlexRow>
    </Card>
  );
};
