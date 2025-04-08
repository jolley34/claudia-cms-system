import React, { useState } from "react";
import styled from "styled-components";

const SearchContainer = styled.div`
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
`;

interface SearchProps {
  items: string[]; // Lista med de objekt som du vill söka i
}

const Search: React.FC<SearchProps> = ({ items }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value); // Uppdatera query varje gång användaren skriver något
  };

  // Filtrera items baserat på query och gör den case-insensitiv
  const filteredItems = items.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SearchContainer>
      <SearchInput
        type="text"
        placeholder="Sök efter namn, e-post, etc."
        value={query}
        onChange={handleChange}
      />
      <ul>
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => <li key={index}>{item}</li>)
        ) : (
          <li>Inga resultat</li> // Visa när inga resultat finns
        )}
      </ul>
    </SearchContainer>
  );
};

export default Search;
