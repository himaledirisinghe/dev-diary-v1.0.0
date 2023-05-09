import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import NoteDetails from "./components/NoteDetails";
import NavBar from "./components/NavBar";

const App = () => {
  return (
    <BrowserRouter>
      <div className="container-fluid">
        <NavBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/add" element={<CreateNote />} />
          <Route path="/edit/:id" element={<EditNote />} />
          <Route path="/note/:id" element={<NoteDetails />} />
          
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
