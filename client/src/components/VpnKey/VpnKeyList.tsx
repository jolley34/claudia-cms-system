// src/components/VpnKeyList/VpnKeyList.tsx
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useVpnKeyManager } from "../../hooks/useVpnKeyManager";
import { filterVpnKeys, sortVpnKeys } from "../../utils/filterUtils";
import DeleteConfirmation from "../DeleteConfirmation";
import { VpnKeyCard } from "./VpnKeyCard";
import { VpnKeyForm } from "./VpnKeyForm";
import { ValidationCard } from "./validation/ValidationCard";

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
`;

const CountContainer = styled.h1`
  background: #f0f0f0;
  padding: 0rem 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 1.5rem;
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
`;

const Select = styled.select`
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #e0e0e0;
`;

const VpnKeyList: React.FC = () => {
  const {
    filteredVpnKeys: rawVpnKeys,
    searchQuery,
    setSearchQuery,
    message,
    isDragging,
    setIsDragging,
    handleAddVpnKeysDrop,
    handleAddVpnKeysUpload,
    handleDeleteVpnKey,
    validationResult,
  } = useVpnKeyManager();

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [keyToDelete, setKeyToDelete] = useState<string | null>(null);
  const [showValidationCard, setShowValidationCard] = useState(false);
  const [statusFilter, setStatusFilter] = useState<"all" | "unused" | "taken">(
    "all"
  );

  useEffect(() => {
    if (validationResult) {
      setShowValidationCard(true);
    }
  }, [validationResult]);

  const handleDeleteWithConfirmation = (id: string) => {
    setKeyToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    if (keyToDelete) {
      handleDeleteVpnKey(keyToDelete);
      setShowDeleteConfirmation(false);
      setKeyToDelete(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setKeyToDelete(null);
  };

  // Apply filtering and sorting
  const filteredAndSortedKeys = sortVpnKeys(
    filterVpnKeys(rawVpnKeys, searchQuery, statusFilter),
    "latest"
  );

  return (
    <FlexColumn>
      <SpaceBetween>
        <h1>VPN-nycklar</h1>
        <CountContainer>{`${filteredAndSortedKeys.length} st`}</CountContainer>
      </SpaceBetween>

      <VpnKeyForm
        isDragging={isDragging}
        setIsDragging={setIsDragging}
        handleDrop={handleAddVpnKeysDrop}
        handleFileUpload={handleAddVpnKeysUpload}
      />

      {validationResult && showValidationCard && (
        <ValidationCard
          validKeys={validationResult.validKeys}
          validationMessages={validationResult.validationMessages}
          onClose={() => setShowValidationCard(false)}
        />
      )}

      <FilterContainer>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sök VPN-nycklar"
          type="text"
        />
        <Select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value as "all" | "unused" | "taken")
          }
        >
          <option value="all">Alla</option>
          <option value="unused">Oanvända</option>
          <option value="taken">Tagna</option>
        </Select>
      </FilterContainer>

      {message && <p>{message}</p>}

      <List>
        {filteredAndSortedKeys.length === 0 ? (
          <p>Inga VPN-nycklar finns som matchar din sökning.</p>
        ) : (
          filteredAndSortedKeys.map((vpnKey) => (
            <li key={vpnKey.id}>
              <VpnKeyCard
                vpnKey={vpnKey}
                searchQuery={searchQuery}
                handleDeleteVpnKey={handleDeleteWithConfirmation}
              />
            </li>
          ))
        )}
      </List>

      {showDeleteConfirmation && (
        <DeleteConfirmation
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          entityName="VPN-nyckel"
        />
      )}
    </FlexColumn>
  );
};

export default VpnKeyList;
