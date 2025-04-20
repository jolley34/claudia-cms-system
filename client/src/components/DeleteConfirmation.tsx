// src/components/AdminList/DeleteConfirmation.tsx
import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const DeleteButton = styled.button`
  background-color: red;
  transition: background-color 0.2s ease;
  &:hover {
    background-color: #bd0000;
  }
`;

const Modal = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
`;

const Title = styled.h1`
  font-weight: lighter;
  font-size: 1.5rem;
`;

interface DeleteConfirmationProps {
  onConfirm: () => void;
  onCancel: () => void;
  entityName?: string; // Gör det möjligt att anpassa vad som tas bort (t.ex. "kunden" eller "admin")
}

export const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  onConfirm,
  onCancel,
  entityName = "objektet", // Standardvärde om ingen entitet anges
}) => {
  return (
    <Overlay>
      <Modal>
        <Title>{`Är du säker på att du vill ta bort ${entityName}?`}</Title>
        <ButtonRow>
          <button onClick={onCancel}>Avbryt</button>
          <DeleteButton onClick={onConfirm}>Ta bort</DeleteButton>
        </ButtonRow>
      </Modal>
    </Overlay>
  );
};

export default DeleteConfirmation;
