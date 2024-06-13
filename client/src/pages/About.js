import React, { useEffect, useState, useRef } from "react";
import "bulma/css/bulma.min.css";
import styles from "./BookPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link, useParams, useNavigate } from "react-router-dom";
import parse from "html-react-parser";
import Header from "../components/Header";

function About() {
  let params = useParams();
  let navigate = useNavigate();
  const handleBack = () => navigate(-1);
  const [content, setContent] = useState("retrieving content...");
  const [bookName, setBookName] = useState("");
  const [nextBook, setNextBook] = useState("");
  const [nextApiName, setNextApiName] = useState("");
  const shouldMount = useRef(true);

  useEffect(() => {

  }, []);

  return (
    <div>
      <Header></Header>
    </div>
  );
}

export default About;
