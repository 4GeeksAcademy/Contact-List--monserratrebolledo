import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function NewContact() {
  const {store, dispatch } = useGlobalReducer();
  const {id} = useParams()
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const  addContact= async (contact) => {
    try {
      const res = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contact),
      });
      if(res.ok) {
        const data = await res.json()
        dispatch({ type: "add_contact", payload: data });
      }
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  }

  const updateContact= async (id, updatedContact) => {
    try {
      const res = await fetch(`${store.apiUrl}/agendas/${store.agendaSlug}/contacts/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedContact),
      });
      if(res.ok) {
        const data = await res.json()
        dispatch({ type: "update_contact", payload: data });
      }
    } catch (error) {
      console.error("Error updating contact:", error);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      alert("Name and email required");
      return;
    }
    if(!id) {
      addContact(form)
    } else {
      updateContact( id,form)
    }
    
   
    navigate("/");
  };

  useEffect(() => {
    if(store.contacts){
      if(store.contacts.length > 0 && id){
        const result = store.contacts.find(c => c.id == id)
        if(result) setForm(result)
      }
    }
  }, [id, store.contacts]);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add a new contact</h2>

      <form onSubmit={handleSubmit} style={{ maxWidth: 720, margin: "0 auto" }}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input name="name" value={form.name} onChange={handleChange} className="form-control" placeholder="Full Name" />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input name="email" value={form.email} onChange={handleChange} className="form-control" placeholder="Enter email" />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input name="phone" value={form.phone} onChange={handleChange} className="form-control" placeholder="Enter phone" />
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input name="address" value={form.address} onChange={handleChange} className="form-control" placeholder="Enter address" />
        </div>

        <div className="d-grid gap-2">
          <button type="submit" className="btn btn-primary btn-lg">save</button>
          <Link to="/contacts" className="text-decoration-none text-center mt-2">or get back to contacts</Link>
        </div>
      </form>
    </div>
  );
}