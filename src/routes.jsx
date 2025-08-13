import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import { Layout } from "./pages/Layout";
import { Home } from "./pages/Home";
import { Single } from "./pages/Single";
import { Demo } from "./pages/Demo";
import Contacts from "./pages/Contacts";
import NewContact from "./pages/NewContact"; 

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<h1>Not found!</h1>}>
    
      <Route index element={<Contacts />} />

      
      <Route path="/home" element={<Home />} />

     
      <Route path="/single/:theId" element={<Single />} />
      <Route path="/demo" element={<Demo />} />

      
      <Route path="/contacts" element={<Contacts />} />
      <Route path="/contacts/new" element={<NewContact />} />
      <Route path="/contacts/edit/:id" element={<NewContact />} />
    </Route>
  )
);
