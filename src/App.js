import axios from "axios";
import React from "react";

import { createContext, useState } from "react";
import GlobalStyles from "./styles/GlobalStyles.js";
import { Route, Routes, Switch } from "react-router-dom";

import LandingPage from "../src/Pages/Landing/LandingPage.js";

import { css } from "styled-components/macro"; //eslint-disable-line
import Login from "./Pages/login/Login.js";
import ForgotPassword from "./Pages/login/ForgotPassword.js";
import ResetPassword from "./Pages/login/ResetPassword.js";
import Signup from "./Pages/Signup/Signup.js";
import PrivacyPolicy from "./Pages/TOS_PrivacyPolicy/PrivacyPolicy.js";
import TermsOfService from "./Pages/TOS_PrivacyPolicy/TermsOfService.js";
import Jobs from "./Pages/Jobs/Jobs.js";
import Candidate from "./Pages/Candidate/Candidate.js";
import Recruiter from "./Pages/Recruiter/Recruiter.js";
import Profile from "./Pages/Candidate/Profile.js";


export const SetPopupContext = createContext();

const App = () => {
  return (
    <>
        <GlobalStyles />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/candidate" element={<Candidate />} />
          <Route path="/recruiter" element={<Recruiter />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/tos" element={<TermsOfService />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
    </>
  );
};

export default App;
