import React from "react";
import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function CreateNote() {
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
  const notify = () => toast.success("Note Created Successfully!");
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
      topic: topic,
      question: question,
      questionCode: questionCode,
      answer: answer,
      answerCode: answerCode,
      noteCategory: noteCategory,
    };

    axios
      .post("/note/save", data)
      .then((res) => {
        if (res.data.success) {
          setInput({
            topic: "",
            question: "",
            questionCode: "",
            answer: "",
            answerCode: "",
            noteCategory: "",
          });
          notify();
        
        }
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.error
        ) {
          const errors = error.response.data.error.errors;
          // Display error messages to the user

          if (errors.topic) {
            setErr((prevErr) => ({
              ...prevErr,
              errTopic: formatErrorMessage(errors.topic.message),
            }));
          }
          if (errors.question) {
            setErr((prevErr) => ({
              ...prevErr,
              errQuestion: formatErrorMessage(errors.question.message),
            }));
          }
          if (errors.answer) {
            setErr((prevErr) => ({
              ...prevErr,
              errAnswer: formatErrorMessage(errors.answer.message),
            }));
          }
          if (errors.noteCategory) {
            setErr((prevErr) => ({
              ...prevErr,
              errNoteCategory: formatErrorMessage(errors.noteCategory.message),
            }));
          }
        }
      });
  }

  function formatErrorMessage(errorMessage) {
    const fieldName = errorMessage.match(/`(.*)`/)[1];
    const formattedFieldName = fieldName
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (str) => str.toUpperCase());
    return `${formattedFieldName} is required.`;
  }

  return (
    <div>
      <h4>Create Note</h4>
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
              placeholder="Enter Question"
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
              rows="3"
              placeholder="Enter Question Code"
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
              placeholder="Enter Answer"
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
              rows="3"
              placeholder="Enter Answer Code"
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
              <i className="fa fa-save"></i>&nbsp;Save
            </button>
          </div>
        </div>
      </form>{" "}
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
