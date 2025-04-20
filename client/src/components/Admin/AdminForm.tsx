import React from "react";
import styled from "styled-components";

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
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;
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
    <Card>
      <SpaceBetween>
        <FlexRow>
          <div style={{ width: "100%" }}>
            <label htmlFor="name">Namn</label>
            <input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Namn"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
          </div>
        </FlexRow>
        <button onClick={handleAddAdmin}>Lägg till admin</button>
      </SpaceBetween>
    </Card>
  );
};
