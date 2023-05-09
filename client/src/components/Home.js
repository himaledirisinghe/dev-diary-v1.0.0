import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../home.css";
import { Modal, Button } from "react-bootstrap";

export function ConfirmDeleteDialog({ show, onHide, onConfirm }) {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure you want to delete this note?</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
function Home() {
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [dbError, setDbError] = useState(false);
  const notify = () =>
    toast.warn("Note Deleted Successfully!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  useEffect(() => {
    retrieveNotes();
  }, []);

  const retrieveNotes = async () => {
    try {
      const res = await axios.get("/notes");
      if (res.data.success) {
        setLoaded(true);
        setNotes(res.data.existingNotes);
      } else {
        console.log("Error: ", res.data);
      }
    } catch (error) {
      setDbError(true);
      console.log("Error: ", error);
    }
  };
  const handleDelete = useCallback((id) => {
    axios.delete(`/note/delete/${id}`).then((res) => {
      notify();
      retrieveNotes();
    });
  }, []);

  function filterData(notes, searchKey) {
    const result = notes.filter(({ topic, question, noteCategory }) => {
      return [topic, question, noteCategory].some((property) =>
        property.toLowerCase().includes(searchKey)
      );
    });
    setNotes(result);
  }
  function handleSearchArea(event) {
    const searchKey = event.currentTarget.value;
    axios.get("/notes").then((res) => {
      if (res.data.success) {
        filterData(res.data.existingNotes, searchKey);
      }
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "5px",
        }}
      >
        <h4>All Notes</h4>
        <input
          className="form-control"
          type="search"
          placeholder="Search"
          name="searchQuery"
          style={{ width: "200px" }}
          onChange={handleSearchArea}
        ></input>
      </div>
      {!loaded && !dbError && (
        <div>
          <i className="fas fa-circle-notch fa-spin"></i>&nbsp;Loading...
        </div>
      )}
      {dbError && <div>Somthing went wrong!</div>}
      {notes[0] && (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Topic</th>
              <th scope="col">Question</th>
              <th scope="col">Note Category</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note, index) => (
              <tr
                key={note._id}
                onClick={() => {
                  window.location.href = `/note/${note._id}`;
                }}
              >
                <th scope="row">{index + 1}</th>
                <td data-label="Topic">{note.topic}</td>
                <td data-label="question">{note.question}</td>
                <td data-label="Note Category">{note.noteCategory}</td>
                <td data-label="Action">
                  <a className="btn btn-warning" href={`/edit/${note._id}`}>
                    <i className="fa fa-edit"></i>
                  </a>
                  &nbsp;
                  <a
                    className="btn btn-danger"
                    href="#"
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowConfirmDeleteDialog(true);
                      setNoteToDelete(note._id);
                    }}
                  >
                    <i className="fa fa-trash-alt"></i>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {!notes[0] && loaded && <div>DevDiary is empty</div>}

      <ConfirmDeleteDialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(noteToDelete);
          setShowConfirmDeleteDialog(false);
        }}
      />
      <ToastContainer />
    </>
  );
}

export default Home;
