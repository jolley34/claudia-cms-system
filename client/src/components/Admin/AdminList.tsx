// src/components/AdminList/AdminList.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useAdminManager } from "../../hooks/useAdminManager";
import DeleteConfirmation from "../DeleteConfirmation";
import { AdminCard } from "./AdminCard";
import { AdminForm } from "./AdminForm";

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

const AdminList: React.FC = () => {
  const {
    name,
    setName,
    email,
    setEmail,
    filteredAdmins,
    searchQuery,
    setSearchQuery,
    handleAddAdmin,
    handleDeleteAdmin,
  } = useAdminManager();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [adminToDelete, setAdminToDelete] = useState<string | null>(null);

  const handleDeleteWithConfirmation = (id: string) => {
    setAdminToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (adminToDelete) {
      handleDeleteAdmin(adminToDelete);
      setShowDeleteConfirmation(false);
      setAdminToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setAdminToDelete(null);
  };

  return (
    <FlexColumn>
      <SpaceBetween>
        <h1>Administratörer</h1>
        <CountContainer>{`${filteredAdmins.length} st`}</CountContainer>
      </SpaceBetween>

      <AdminForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        handleAddAdmin={handleAddAdmin}
      />

      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sök administratörer"
          type="text"
        />
      </div>

      <List>
        {filteredAdmins.length === 0 ? (
          <p>Inga administratörer finns som matchar din sökning.</p>
        ) : (
          filteredAdmins.map((admin) => (
            <li key={admin.id}>
              <AdminCard
                admin={admin}
                searchQuery={searchQuery}
                handleDeleteAdmin={handleDeleteWithConfirmation}
              />
            </li>
          ))
        )}
      </List>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          entityName="admin"
        />
      )}
    </FlexColumn>
  );
};

export default AdminList;
