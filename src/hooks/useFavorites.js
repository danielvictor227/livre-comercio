import { useState } from "react";
export function useFavorites() {
  const [error, setError] = useState("");
  const [ids, setIds] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("livre:favorites") || "[]");
      return Array.isArray(saved)
        ? saved.filter((x) => typeof x === "string")
        : [];
    } catch {
      return [];
    }
  });
  function toggle(id) {
    setIds((current) => {
      const next = current.includes(id)
        ? current.filter((x) => x !== id)
        : [...current, id];
      try {
        localStorage.setItem("livre:favorites", JSON.stringify(next));
      } catch {
        setError(
          "O navegador não permitiu salvar seus favoritos. Eles serão mantidos somente nesta sessão.",
        );
      }
      return next;
    });
  }
  return { ids, toggle, error };
}
