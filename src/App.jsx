/* eslint-disable no-unused-vars */
import logo from "./logo.svg";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import SummaryPage from "./components/covid_summary_page";
import SiteHeader from "./components/site_Header.jsx";
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  useEffect(() => {
    makeNavLinksSmooth();
    spyScrolling();
  });

  const makeNavLinksSmooth = () => {
    const navLinks = document.querySelectorAll(".nav-link");
    console.log(navLinks);

    for (let n in navLinks) {
      if (navLinks.hasOwnProperty(n)) {
        navLinks[n].addEventListener("click", (e) => {
          e.preventDefault();
          document.querySelector(navLinks[n].hash).scrollIntoView({
            behavior: "smooth",
          });
        });
      }
    }
  };

  const spyScrolling = () => {
    const sections = document.querySelectorAll(".hero-bg");

    window.onscroll = () => {
      const scrollPos =
        document.documentElement.scrollTop || document.body.scrollTop;

      for (let s in sections)
        if (sections.hasOwnProperty(s) && sections[s].offsetTop <= scrollPos) {
          console.log(
            sections.hasOwnProperty(s) +
              " " +
              sections[s].offsetTop +
              " " +
              scrollPos
          );
          const id = sections[s].id;
          document.querySelector(".active").classList.remove("active");
          document
            .querySelector(`a[href*=${id}]`)
            .parentNode.classList.add("active");
        }
    };
  };

  return (
    <div className="App">
      <Router>
        <SiteHeader></SiteHeader>
        <Route path="/" component={SummaryPage}></Route>
      </Router>
    </div>
  );
}
export default  App;