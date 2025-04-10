// src/components/AdminList/AdminCard.tsx
import React from "react";
import styled from "styled-components";
import { Admin } from "../../types/types";
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
  display: flex;
  gap: 0.5rem;
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 1rem;
`;

const FlexRowBigUnEdit = styled.div`
  display: flex;
  padding: 0.75rem;
  gap: 2rem;
  align-items: center;
  justify-content: space-between;
  border-bottom: 0.5px solid lightgray;
  padding-bottom: 0.5rem;
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

interface AdminCardProps {
  admin: Admin;
  searchQuery: string;
  handleDeleteAdmin: (id: string) => void;
}

export const AdminCard: React.FC<AdminCardProps> = ({
  admin,
  searchQuery,
  handleDeleteAdmin,
}) => {
  return (
    <Card>
      <ColorImage />
      <InfoContainer>
        <FlexRowBigUnEdit>
          <Paragraph>namn</Paragraph>
          <ParagraphLighter>
            {highlightMatch(admin.name, searchQuery)}
          </ParagraphLighter>
        </FlexRowBigUnEdit>
        <FlexRowBigUnEdit>
          <Paragraph>email</Paragraph>
          <ParagraphLighter>
            {highlightMatch(admin.email, searchQuery)}
          </ParagraphLighter>
        </FlexRowBigUnEdit>
        <FlexRowAbsolute>
          <DeleteButton onClick={() => handleDeleteAdmin(admin.id)}>
            Ta bort
          </DeleteButton>
        </FlexRowAbsolute>
      </InfoContainer>
    </Card>
  );
};
