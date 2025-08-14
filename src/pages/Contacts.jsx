import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate } from "react-router-dom";

const PHONE_ICON = "https://images.vexels.com/media/users/3/141329/isolated/preview/35dc0093417a545e8812c98fd31a98df-icono-de-telefono-redondo-1.png";

export default function Contacts() {
  const { store, dispatch } = useGlobalReducer();
  const [contactToDelete, setContactToDelete] = useState(null);
  const navigate = useNavigate();
  
   const getContacts= async () => {
    try {
      const res = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts`);
      const data = await res.json();
      dispatch({ type: "set_contacts", payload: data.contacts || [] });
    } catch (error) {
      console.error("Error fetching contacts:", error);
    }
  }

  const deleteContact= async (id) => {
    try {
      const res= await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts/${id}`, {
        method: "DELETE",
      });
      if(res.ok) {
        dispatch({ type: "delete_contact", payload: id });
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
    }
  }

 

  const confirmDelete = (id) => setContactToDelete(id);

  const handleDelete = () => {
    if (!contactToDelete) return;
    deleteContact(contactToDelete)
    setContactToDelete(null);
  };
    
 useEffect(() => {
    getContacts()
  }, []);

   

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Contacts</h2>
        <div>
          <Link to="/contacts/new" className="btn btn-success">
            <i className="fas fa-plus me-2" /> Add new contact
          </Link>
        </div>
      </div>

      <div className="list-group">
        {store.contacts.length === 0 && (
          <div className="text-center text-muted py-5">No contacts yet</div>
        )}

        {store.contacts.map((c) => (
          <div key={c.id} className="list-group-item d-flex align-items-center">
          
            <div
              className="me-3 rounded-circle d-flex align-items-center justify-content-center"
              style={{
                width: 70,
                height: 70,
                backgroundImage: `url(${PHONE_ICON})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />

            <div className="flex-grow-1">
              <h5 className="mb-1">{c.name}</h5>
              <div className="text-muted small">
                <div>
                  <i className="fas fa-map-marker-alt me-2"></i>
                  {c.address}
                </div>
                <div>
                  <i className="fas fa-phone me-2"></i>
                  {c.phone}
                </div>
                <div>
                  <i className="fas fa-envelope me-2"></i>
                  {c.email}
                </div>
              </div>
            </div>

            <div className="ms-3 d-flex flex-column align-items-center">
              <button
                className="btn btn-outline-secondary btn-sm mb-2"
                title="Edit"
                onClick={() => navigate(`/contacts/edit/${c.id}`)}
              >
                <i className="fas fa-pencil-alt"></i>
              </button>

              <button
                className="btn btn-outline-danger btn-sm"
                title="Delete"
                onClick={() => confirmDelete(c.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {contactToDelete && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Are you sure?</h5>
                <button
                  className="btn-close"
                  onClick={() => setContactToDelete(null)}
                />
              </div>
              <div className="modal-body">
                <p>If you delete this thing the entire universe will go down!</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => setContactToDelete(null)}
                >
                  Oh no!
                </button>
                <button className="btn btn-danger" onClick={handleDelete}>
                  Yes baby!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}