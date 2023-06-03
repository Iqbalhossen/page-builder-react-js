import React, { useState, useReducer } from "react";
import { useDispatch } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import { createPage } from "../redux/actions/pageAction";
import PageDetail from "./PageDetail";

export default function PageSection({ pages }) {
  const [show, setShow] = useReducer((show) => !show, false);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async () => {
    if (!name) {
      setIsValid(false);
      return;
    } else {
      createPage(name)(dispatch);
      closeModal();
    }
  };

  const closeModal = () => {
    setName("");
    setError("");
    setShow();
  };
  return (
    <div className="my-2 d-flex flex-column">
    </div>
  );
}
