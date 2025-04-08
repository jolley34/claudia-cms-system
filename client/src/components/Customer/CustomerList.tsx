// src/components/CustomerList/CustomerList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useCustomerManager } from "../../hooks/useCustomerManager";
import DeleteConfirmation from "../DeleteConfirmation";
import { CustomerCard } from "./CustomerCard";
import { CustomerForm } from "./CustomerForm";
import { FilterControls } from "./FilterControls";

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0;
  width: 100%;
  height: 100%;
  flex-grow: 1;
`;

const CountContainer = styled.h1`
  background: #f0f0f0;
  padding: 0rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const AddButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #0056b3;
  }
`;

const CloseButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #6c757d;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #5a6268;
  }
`;

const CustomerList: React.FC = () => {
  const {
    filteredCustomers,
    newCustomer,
    setNewCustomer,
    editingCustomer,
    editValues,
    setEditValues,
    showDeleteConfirmation,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    handleAddCustomer,
    handleUpdateCustomer,
    handleDeleteCustomerWithConfirmation,
    confirmDeleteCustomer,
    cancelDeleteCustomer,
    startEditing,
    setEditingCustomer,
  } = useCustomerManager();

  const [showForm, setShowForm] = useState(false);

  const handleClose = () => {
    setShowForm(false);
    setNewCustomer({
      id: "",
      customer_name: "",
      contact_name: "",
      contact_email: "",
      contact_phone: "",
      domain_name: "",
      status: undefined,
      edr_site_token: "",
      EDR: false,
      VPN: false,
      PWM: false,
      createdAt: "",
    });
  };

  return (
    <FlexColumn>
      <SpaceBetween>
        <h1>Kunder</h1>
        <SpaceBetween>
          <CountContainer>{`${filteredCustomers.length} st`}</CountContainer>
          {showForm ? (
            <CloseButton onClick={handleClose}>Stäng</CloseButton>
          ) : (
            <AddButton onClick={() => setShowForm(true)}>
              Lägg till kund
            </AddButton>
          )}
        </SpaceBetween>
      </SpaceBetween>

      {showForm && (
        <CustomerForm
          newCustomer={newCustomer}
          setNewCustomer={setNewCustomer}
          handleAddCustomer={() => {
            handleAddCustomer();
            setShowForm(false);
          }}
        />
      )}

      {editingCustomer === null && !showForm && (
        <FilterControls
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortOption={sortOption}
          setSortOption={setSortOption}
        />
      )}

      <List>
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map((customer) => (
            <li key={customer.id}>
              <CustomerCard
                customer={customer}
                editingCustomer={editingCustomer}
                editValues={editValues}
                setEditValues={setEditValues}
                searchQuery={searchQuery}
                handleUpdateCustomer={handleUpdateCustomer}
                handleDeleteCustomerWithConfirmation={
                  handleDeleteCustomerWithConfirmation
                }
                startEditing={startEditing}
                setEditingCustomer={setEditingCustomer}
              />
            </li>
          ))
        ) : (
          <li>Inga kunder matchar sökningen</li>
        )}
      </List>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDeleteCustomer}
          onCancel={cancelDeleteCustomer}
          entityName="Kund"
        />
      )}
    </FlexColumn>
  );
};

export default CustomerList;
