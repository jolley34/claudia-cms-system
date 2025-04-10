// src/components/CustomerList/CustomerCard.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { Customer } from "../../types/types";
import { highlightMatch } from "../../utils/highlightMatch";

const Card = styled.div`
  display: flex;
  gap: 1rem;
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: white;
  position: relative;
  width: 100%;
  cursor: pointer;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const ColorImage = styled.div`
  width: 200px;
  height: 200px;
  background-color: #fb8989;
  border-radius: 10px;
`;

const FlexRowAbsolute = styled.div`
  padding-top: 0.5rem;
  display: flex;
  gap: 1rem;
  justify-content: end;
`;

const FlexRowBig = styled.div`
  display: flex;
  padding: 0.75rem;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid lightgray;
  padding-bottom: 0.5rem;
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const StyledInput = styled.input`
  padding: 0.1rem;
  font-size: 0.9rem;
  color: #666;
  text-align: end;
  background-color: transparent;
  border: none;
  box-sizing: border-box;
  border: 1px solid #007bff;
  width: 50%;
`;

const Paragraph = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #666;
`;

const ParagraphLighter = styled(Paragraph)`
  font-weight: lighter;
`;

const DeleteButton = styled.button`
  background-color: red;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #bd0000;
  }
`;

const EmailButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
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

const CollapsibleContent = styled.div<{ isExpanded: boolean }>`
  display: ${({ isExpanded }) => (isExpanded ? "block" : "none")};
`;

interface CustomerCardProps {
  customer: Customer;
  editingCustomer: string | null;
  editValues: {
    customer_name: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    domain_name: string;
    status: "active" | "inactive" | undefined;
    edr_site_token: string;
    EDR: boolean;
    VPN: boolean;
    PWM: boolean;
  };
  setEditValues: React.Dispatch<
    React.SetStateAction<{
      customer_name: string;
      contact_name: string;
      contact_email: string;
      contact_phone: string;
      domain_name: string;
      status: "active" | "inactive" | undefined;
      edr_site_token: string;
      EDR: boolean;
      VPN: boolean;
      PWM: boolean;
    }>
  >;
  searchQuery: string;
  handleUpdateCustomer: (id: string, values: Partial<Customer>) => void;
  handleDeleteCustomerWithConfirmation: (id: string) => void;
  startEditing: (customer: Customer) => void;
  setEditingCustomer: React.Dispatch<React.SetStateAction<string | null>>;
}

export const CustomerCard: React.FC<CustomerCardProps> = ({
  customer,
  editingCustomer,
  editValues,
  setEditValues,
  searchQuery,
  handleUpdateCustomer,
  handleDeleteCustomerWithConfirmation,
  startEditing,
  setEditingCustomer,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const handleEmailClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.location.href = `mailto:${customer.contact_email}`;
  };

  const handleCardClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    startEditing(customer);
    setIsExpanded(true);
  };

  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleUpdateCustomer(customer.id, editValues);
  };

  const handleCancelClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEditingCustomer(null);
    setIsExpanded(false);
  };

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleDeleteCustomerWithConfirmation(customer.id);
  };

  return (
    <Card onClick={handleCardClick}>
      <ColorImage />
      <InfoContainer>
        {/* Alltid synliga fält */}
        <FlexRowBig>
          <Paragraph>kundnamn</Paragraph>
          <ParagraphLighter>
            {highlightMatch(customer.customer_name, searchQuery)}
          </ParagraphLighter>
        </FlexRowBig>
        <FlexRowBig>
          <Paragraph>kontaktnamn</Paragraph>
          <ParagraphLighter>
            {highlightMatch(customer.contact_name || "", searchQuery)}
          </ParagraphLighter>
        </FlexRowBig>
        <FlexRowBig>
          <Paragraph>email</Paragraph>
          <ParagraphLighter>
            {highlightMatch(customer.contact_email, searchQuery)}
          </ParagraphLighter>
        </FlexRowBig>
        <FlexRowBig>
          <Paragraph>telefonnummer</Paragraph>
          <ParagraphLighter>
            {highlightMatch(customer.contact_phone, searchQuery)}
          </ParagraphLighter>
        </FlexRowBig>

        {/* Kollapsbart innehåll */}
        <CollapsibleContent
          isExpanded={isExpanded || editingCustomer === customer.id}
        >
          {editingCustomer === customer.id ? (
            <FlexColumn>
              <FlexRowBig>
                <Paragraph>namn</Paragraph>
                <StyledInput
                  value={editValues.customer_name}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      customer_name: e.target.value,
                    })
                  }
                />
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>email</Paragraph>
                <StyledInput
                  value={editValues.contact_email}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      contact_email: e.target.value,
                    })
                  }
                />
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>telefonnummer</Paragraph>
                <StyledInput
                  value={editValues.contact_phone}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      contact_phone: e.target.value,
                    })
                  }
                />
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>kontaktnamn</Paragraph>
                <StyledInput
                  value={editValues.contact_name}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      contact_name: e.target.value,
                    })
                  }
                />
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>EDR site token</Paragraph>
                <StyledInput
                  value={editValues.edr_site_token}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      edr_site_token: e.target.value,
                    })
                  }
                />
              </FlexRowBig>
              <FlexRowBig>
                <ToggleSwitch>
                  EDR
                  <ToggleInput
                    type="checkbox"
                    checked={editValues.EDR}
                    onChange={(e) =>
                      setEditValues({ ...editValues, EDR: e.target.checked })
                    }
                  />
                  <Slider className="slider" />
                </ToggleSwitch>
                <ToggleSwitch>
                  VPN
                  <ToggleInput
                    type="checkbox"
                    checked={editValues.VPN}
                    onChange={(e) =>
                      setEditValues({ ...editValues, VPN: e.target.checked })
                    }
                  />
                  <Slider className="slider" />
                </ToggleSwitch>
                <ToggleSwitch>
                  PWM
                  <ToggleInput
                    type="checkbox"
                    checked={editValues.PWM}
                    onChange={(e) =>
                      setEditValues({ ...editValues, PWM: e.target.checked })
                    }
                  />
                  <Slider className="slider" />
                </ToggleSwitch>
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>Status</Paragraph>
                <select
                  value={editValues.status || ""}
                  onChange={(e) =>
                    setEditValues({
                      ...editValues,
                      status:
                        e.target.value === ""
                          ? undefined
                          : (e.target.value as "active" | "inactive"),
                    })
                  }
                >
                  <option value="">Välj status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </FlexRowBig>
            </FlexColumn>
          ) : (
            <>
              {customer.edr_site_token && (
                <FlexRowBig>
                  <Paragraph>EDR site token</Paragraph>
                  <ParagraphLighter>
                    {highlightMatch(customer.edr_site_token, searchQuery)}
                  </ParagraphLighter>
                </FlexRowBig>
              )}
              <FlexRowBig>
                <Paragraph>EDR</Paragraph>
                <ParagraphLighter>
                  {customer.EDR ? "Ja" : "Nej"}
                </ParagraphLighter>
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>VPN</Paragraph>
                <ParagraphLighter>
                  {customer.VPN ? "Ja" : "Nej"}
                </ParagraphLighter>
              </FlexRowBig>
              <FlexRowBig>
                <Paragraph>PWM</Paragraph>
                <ParagraphLighter>
                  {customer.PWM ? "Ja" : "Nej"}
                </ParagraphLighter>
              </FlexRowBig>
              {customer.status && (
                <FlexRowBig>
                  <Paragraph>Status</Paragraph>
                  <ParagraphLighter>{customer.status}</ParagraphLighter>
                </FlexRowBig>
              )}
            </>
          )}
        </CollapsibleContent>

        {/* Knappar alltid synliga */}
        <FlexRowAbsolute>
          {editingCustomer === customer.id ? (
            <>
              <button onClick={handleSaveClick}>Spara</button>
              <button onClick={handleCancelClick}>Avbryt</button>
              <DeleteButton onClick={handleDeleteClick}>Ta bort</DeleteButton>
            </>
          ) : (
            <>
              <EmailButton onClick={handleEmailClick}>
                Skicka e-post
              </EmailButton>
              <button onClick={handleEditClick}>Editera</button>
            </>
          )}
        </FlexRowAbsolute>
      </InfoContainer>
    </Card>
  );
};
