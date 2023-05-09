import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FormattedDate from "./formattedDate";
import { ConfirmDeleteDialog } from "./Home";
import { useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function NoteDetails() {
  const navigate = useNavigate();
  const [showConfirmDeleteDialog, setShowConfirmDeleteDialog] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [note, setNote] = useState({});

  // Destructure the note object
  const {
    topic,
    question,
    questionCode,
    answer,
    answerCode,
    noteCategory,
    dateCreated,
    dateModified,
  } = note;

  const { id } = useParams();
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
    axios
      .get(`/notes/${id}`)
      .then((res) => {
        if (res.data.success) {
          setNote(res.data.note);
          console.log(res.data.note);
        }
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  }, []);
  const handleDelete = useCallback((id) => {
    axios.delete(`/note/delete/${id}`).then((res) => {
      notify();
      navigate("/");
    });
  }, []);
  return (
    <div>
      <h4>Note Details</h4>
      <a className="btn btn-warning" href={`/edit/${note._id}`}>
        <i className="fa fa-edit"></i>&nbsp;Edit
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
        <i className="fa fa-trash-alt"></i>&nbsp;Delete
      </a>
      <h5 style={{ marginTop: "15px" }}>{topic}</h5>
      <hr />
      <dl className="row">
        <dt className="col-sm-3">Question</dt>
        <dd className="col-sm-9">{question}</dd>

        {questionCode && (
          <>
            <dt className="col-sm-3">Question Code</dt>
            <dd className="col-sm-9">
              <SyntaxHighlighter language="javascript" style={dark}>
                {questionCode}
              </SyntaxHighlighter>
            </dd>
          </>
        )}
        <dt className="col-sm-3">Answer</dt>
        {answer && (
          <dd className="col-sm-9">
            {answer.split("\n").map((line, index) => (
              <React.Fragment key={index}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </dd>
        )}
        {answerCode && (
          <>
           
            <dt className="col-sm-3">Answer Code</dt>
            <dd className="col-sm-9">
              <SyntaxHighlighter language="javascript" style={dark}>
                {answerCode}
              </SyntaxHighlighter>
            </dd>
          </>
        )}
        <dt className="col-sm-3">Note Category</dt>
        <dd className="col-sm-9">{noteCategory}</dd>
        <dt className="col-sm-3">Date Created</dt>
        <dd className="col-sm-9">
          {dateCreated && FormattedDate(dateCreated)}
        </dd>
        {dateModified && (
          <>
            <dt className="col-sm-3">Date Modified</dt>
            <dd className="col-sm-9">{FormattedDate(dateModified)} </dd>
          </>
        )}
      </dl>
      <ConfirmDeleteDialog
        show={showConfirmDeleteDialog}
        onHide={() => setShowConfirmDeleteDialog(false)}
        onConfirm={() => {
          handleDelete(noteToDelete);
          setShowConfirmDeleteDialog(false);
        }}
      />
      <ToastContainer />
    </div>
  );
}
