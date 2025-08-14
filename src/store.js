export const initialStore = () => {
  return {
    apiUrl: "https://playground.4geeks.com/contact",
    agendaSlug: "monserrat",
    message: null,
    contacts: [], 
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_contacts":
      return {
        ...store,
        contacts: action.payload,
      };

    case "add_contact":
      return {
        ...store,
        contacts: [...store.contacts, action.payload],
      };

    case "update_contact":
      return {
        ...store,
        contacts: store.contacts.map((c) =>
          c.id === action.payload.id ? action.payload : c
        ),
      };

    case "delete_contact":
      return {
        ...store,
        contacts: store.contacts.filter((c) => c.id !== action.payload),
      };

    default:
      throw Error("Unknown action.");
  }
}