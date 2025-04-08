// src/components/AdminList/AdminForm.tsx
import React from "react";
import styled from "styled-components";

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FlexRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;

interface AdminFormProps {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  handleAddAdmin: (e: React.FormEvent) => void;
}

export const AdminForm: React.FC<AdminFormProps> = ({
  name,
  setName,
  email,
  setEmail,
  handleAddAdmin,
}) => {
  return (
    <SpaceBetween>
      <FlexRow>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Namn"
        />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </FlexRow>
      <button onClick={handleAddAdmin}>Lägg till admin</button>
    </SpaceBetween>
  );
};
