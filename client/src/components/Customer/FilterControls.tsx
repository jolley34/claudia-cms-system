// src/components/CustomerList/FilterControls.tsx
import React from "react";
import styled from "styled-components";

const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const Select = styled.select`
  padding: 0.25rem;
  font-size: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
`;

interface FilterControlsProps {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  sortOption: string;
  setSortOption: React.Dispatch<React.SetStateAction<string>>;
}

export const FilterControls: React.FC<FilterControlsProps> = ({
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
}) => {
  return (
    <>
      <div>
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Sök kund"
          type="text"
        />
      </div>
      <SpaceBetween>
        <h3>Filtrering</h3>
        <Select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="latest">Senast skapad</option>
          <option value="oldest">Äldst</option>
          <option value="a-z">A till Z</option>
          <option value="z-a">Z till A</option>
        </Select>
      </SpaceBetween>
    </>
  );
};
