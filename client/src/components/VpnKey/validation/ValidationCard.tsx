// src/components/VpnKey/validation/ValidationCard.tsx
import { X } from "@phosphor-icons/react";
import React from "react";
import styled from "styled-components";

const ValidationCardStyled = styled.div`
  padding: 1rem;
  border-radius: 10px;
  background-color: #fff3e6;
  border: 2px solid #ff9800;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #ff9800;
  font-size: 1.2rem;
`;

const MessageList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const MessageItem = styled.li<{ isError?: boolean }>`
  color: ${({ isError }) => (isError ? "#d32f2f" : "#388e3c")};
  font-size: 0.9rem;
  margin-bottom: 0.3rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: none;
  display: flex;
  align-items: center;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #ff9800;
  &:hover {
    background-color: #ffe1c3;
  }
`;

interface ValidationCardProps {
  validKeys: string[];
  validationMessages: string[];
  onClose: () => void;
}

export const ValidationCard: React.FC<ValidationCardProps> = ({
  validKeys,
  validationMessages,
  onClose,
}) => {
  if (validKeys.length === 0 && validationMessages.length === 0) return null;

  return (
    <ValidationCardStyled>
      <CloseButton onClick={onClose}>
        <X size={32} />
      </CloseButton>
      <Title>Valideringsresultat</Title>
      <MessageList>
        {validKeys.length > 0 && (
          <MessageItem>Giltiga nycklar: {validKeys.length} st</MessageItem>
        )}
        {validationMessages.map((msg, index) => (
          <MessageItem key={index} isError>
            {msg}
          </MessageItem>
        ))}
      </MessageList>
    </ValidationCardStyled>
  );
};
