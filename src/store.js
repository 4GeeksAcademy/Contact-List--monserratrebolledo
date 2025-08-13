export const initialStore = () => {
  return {
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



const API_URL = "https://playground.4geeks.com/contact";
const AGENDA_SLUG = "my_agenda"; 

export const actions = (dispatch) => ({
  getContacts: async () => {
    try {
      const res = await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`);
      const data = await res.json();
      dispatch({ type: "set_contacts", payload: data.contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  },

  addContact: async (contact) => {
    try {
      await fetch(`${API_URL}/agendas/${AGENDA_SLUG}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      actions(dispatch).getContacts();
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  },

  updateContact: async (id, updatedContact) => {
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      actions(dispatch).getContacts();
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  },

  deleteContact: async (id) => {
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "DELETE",
      });
      actions(dispatch).getContacts();
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  },
});