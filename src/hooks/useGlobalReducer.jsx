
import { useContext } from "react";
import { Context } from "../store/appContext";


export default function useGlobalReducer() {
  const ctx = useContext(Context);
  if (!ctx) {
    throw new Error("useGlobalReducer debe usarse dentro de StoreProvider (verifica que envolviste la app).");
  }
  return ctx;
}
