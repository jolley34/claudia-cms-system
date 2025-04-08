// src/components/VpnKeyList/VpnKeyForm.tsx
import React from "react";
import styled from "styled-components";

const DropZone = styled.div<{ isDragging: boolean }>`
  border: 2px dashed ${({ isDragging }) => (isDragging ? "#00f" : "#ccc")};
  padding: 2rem;
  text-align: center;
  border-radius: 10px;
  background-color: ${({ isDragging }) => (isDragging ? "#e6f0ff" : "#f9f9f9")};
`;

interface VpnKeyFormProps {
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const VpnKeyForm: React.FC<VpnKeyFormProps> = ({
  isDragging,
  setIsDragging,
  handleDrop,
  handleFileUpload,
}) => {
  return (
    <div>
      <DropZone
        isDragging={isDragging}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          handleDrop(e);
          setIsDragging(false);
        }}
      >
        <p>Drag & drop .txt-fil här eller</p>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileUpload}
          style={{ display: "block", margin: "1rem auto" }}
        />
      </DropZone>
    </div>
  );
};
