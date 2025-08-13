import React, { createContext, useReducer, useEffect, useMemo, useCallback } from "react";

const initialState = {
  contacts: []
};

function reducer(state, action) {
  switch (action.type) {
    case "get_contacts":
      return { ...state, contacts: action.payload };
    case "add_contact":
      return { ...state, contacts: [...state.contacts, action.payload] };
    case "delete_contact":
      return {
        ...state,
        contacts: state.contacts.filter((c) => c.id !== action.payload)
      };
    default:
      return state;
  }
}

export const Context = createContext(null);

export default function StoreProvider({ children }) {
  const [store, dispatchBase] = useReducer(reducer, initialState);


  const actions = useMemo(() => {
    return {
      getContacts: () => {
       
        const mockData = [
          {
            id: 1,
            name: "Juan Barrientos",
            email: "juan.barrientos@example.com",
            phone: "(+56) 9 1111 1111",
            address: "Av. Principal 123"
          },
          {
            id: 2,
            name: "Marcela Cares",
            email: "marcela.cares@example.com",
            phone: "(+56) 9 2222 2222",
            address: "Calle Secundaria 456"
          }
        ];
        dispatchBase({ type: "get_contacts", payload: mockData });
      },
      addContact: (contact) => {
        const newContact = { id: Date.now(), ...contact };
        dispatchBase({ type: "add_contact", payload: newContact });
      },
      deleteContact: (id) => {
        dispatchBase({ type: "delete_contact", payload: id });
      }
    };
    
  }, [dispatchBase]);


  const dispatch = useCallback(
    (fnOrAction) => {
      if (typeof fnOrAction === "function") {
      
        return fnOrAction(actions);
      }
      return dispatchBase(fnOrAction);
    },
    [actions, dispatchBase]
  );

  r
  const value = useMemo(() => ({ store, dispatch, actions }), [store, dispatch, actions]);

  useEffect(() => {
    actions.getContacts();
   
  }, []); 

  return <Context.Provider value={value}>{children}</Context.Provider>;
}