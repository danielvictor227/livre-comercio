import { products, stores } from "../data/catalog";
// Contrato assíncrono: substituir a implementação por consultas Firestore.
export const catalogService = {
  async getCatalog() {
    return { products, stores };
  },
};
