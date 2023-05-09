import React from "react";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function EditNote() {
  const navigate = useNavigate();
  const notify = () => toast.success("Note Updated Successfully!");
  const [err, setErr] = useState({
    errTopic: "",
    errQuestion: "",
    errAnswer: "",
    errNoteCategory: "",
  });
  const [input, setInput] = useState({
    topic: "",
    question: "",
    questionCode: "",
    answer: "",
    answerCode: "",
    noteCategory: "",
  });
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`/notes/${id}`)
      .then((res) => {
        if (res.data.success) {
          setInput({
            topic: res.data.note.topic,
            question: res.data.note.question,
            questionCode: res.data.note.questionCode,
            answer: res.data.note.answer,
            answerCode: res.data.note.answerCode,
            noteCategory: res.data.note.noteCategory,
          });
          console.log(res.data.note);
        }
      })
      .catch((error) => {
        // handle error
        console.error(error);
      });
  }, []);

  function handleInputChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    setErr({
      errTopic: "",
      errQuestion: "",
      errAnswer: "",
      errNoteCategory: "",
    });
  }

  function handleOnSubmit(e) {
    e.preventDefault();
    const { topic, question, questionCode, answer, answerCode, noteCategory } =
      input;
    const data = {
      topic,
      question,
      questionCode,
      answer,
      answerCode,
      noteCategory,
    };
    if (!topic) {
      setErr((prevErr) => ({
        ...prevErr,
        errTopic: "Topic is required.",
      }));
    }
    if (!question) {
      setErr((prevErr) => ({
        ...prevErr,
        errQuestion: "Question is required.",
      }));
    }
    if (!answer) {
      setErr((prevErr) => ({
        ...prevErr,
        errAnswer: "Answer is required.",
      }));
    }
    if (!noteCategory) {
      setErr((prevErr) => ({
        ...prevErr,
        errNoteCategory: "Note Category is required.",
      }));
    }
    if (topic && question && answer && noteCategory) {
      axios
        .put(`/note/update/${id}`, data)
        .then((res) => {
          if (res.data.success) {
            notify();
            setTimeout(() => {
              navigate(-1);
            }, 2000);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  return (
    <div>
      <h4>Edit Note</h4>
      <form>
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="topic" className="col-sm-2 col-form-label">
            Topic
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="topic"
              placeholder="Enter Topic"
              value={input.topic}
              onChange={handleInputChange}
            />
            {err.errTopic && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  backgroundColor: "rgba(200,20,20,0.1)",
                  borderRadius: "5px",
                  padding: "5px",
                  marginTop: "5px",
                }}
              >
                {err.errTopic}
              </p>
            )}
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="question" className="col-sm-2 col-form-label">
            Question
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="question"
              rows="3"
              placeholder="Enter question"
              value={input.question}
              onChange={handleInputChange}
            ></textarea>
            {err.errQuestion && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  backgroundColor: "rgba(200,20,20,0.1)",
                  borderRadius: "5px",
                  padding: "5px",
                  marginTop: "5px",
                }}
              >
                {err.errQuestion}
              </p>
            )}
          </div>
        </div>{" "}
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="questionCode" className="col-sm-2 col-form-label">
            Question Code
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="questionCode"
              rows="7"
              placeholder="Enter question code"
              value={input.questionCode}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="answer" className="col-sm-2 col-form-label">
            Answer
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="answer"
              rows="3"
              placeholder="Enter answer"
              value={input.answer}
              onChange={handleInputChange}
            ></textarea>
            {err.errAnswer && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  backgroundColor: "rgba(200,20,20,0.1)",
                  borderRadius: "5px",
                  padding: "5px",
                  marginTop: "5px",
                }}
              >
                {err.errAnswer}
              </p>
            )}
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="answerCode" className="col-sm-2 col-form-label">
            Answer Code
          </label>
          <div className="col-sm-10">
            <textarea
              className="form-control"
              name="answerCode"
              rows="7"
              placeholder="Enter answer code"
              value={input.answerCode}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
        <div className="form-group row" style={{ marginBottom: "15px" }}>
          <label htmlFor="noteCategory" className="col-sm-2 col-form-label">
            Note Category
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              name="noteCategory"
              placeholder="Enter Note Category"
              value={input.noteCategory}
              onChange={handleInputChange}
            />
            {err.errNoteCategory && (
              <p
                style={{
                  color: "red",
                  fontSize: "15px",
                  backgroundColor: "rgba(200,20,20,0.1)",
                  borderRadius: "5px",
                  padding: "5px",
                  marginTop: "5px",
                }}
              >
                {err.errNoteCategory}
              </p>
            )}
          </div>
        </div>
        <div className="form-group row">
          <div className="col-sm-10">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleOnSubmit}
            >
              <i className="fa fa-refresh"></i>&nbsp;Update
            </button>
          </div>
        </div>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}
