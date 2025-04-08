export const highlightMatch = (text: string, query: string) => {
  if (!query) return text;

  // Korrigera och skapa ett korrekt reguljärt uttryck
  const regex = new RegExp(`(${query})`, "gi"); // 'g' för global och 'i' för case-insensitive

  return text.split(regex).map((part, index) =>
    regex.test(part) ? ( // Kontrollera om regex matchar
      <span
        key={index}
        style={{
          backgroundColor: "#fb8989", // Svagare färg (ljusblå med opacitet)
          textDecoration: "none",
        }}
      >
        {part}
      </span>
    ) : (
      part
    )
  );
};
