import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container as ContainerBase } from "../../Components/Misc/Layouts.js";
import { SectionHeading } from "../../Components/Misc/Headings.js";
import tw from "twin.macro";
import styled from "styled-components";
import axios from "axios";
import apiList from "../../Components/lib/apiList.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Container = tw(
  ContainerBase
)`h-full! bg-primary-500 text-white font-medium flex justify-center items-center m-8 rounded-lg`;

const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`xl:w-5/12 p-6 sm:p-12`;
const Heading = tw(SectionHeading)``;
const Input = tw.input`w-full mb-5 px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline text-gray-700 border border-gray-300`;

const SubmitButton = styled.button`
  ${tw`mt-5 font-semibold bg-primary-500! text-gray-100 w-1/6 py-4 rounded-lg hover:bg-primary-900! flex items-center justify-center focus:shadow-outline focus:outline-none`}
`;

export default () => {
  const navigate = useNavigate("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const emailParam = queryParams.get("email");
    const tokenParam = queryParams.get("token");
    setEmail(emailParam);
    setToken(tokenParam);
  }, []);

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = () => {
    if (!password) {
      toast.error("Fill Password");
      return;
    }
    if (!confirmPassword) {
      toast.error("Fill Confirm Password");
      return;
    }
    if (password === confirmPassword) {
      setError("");
      axios
        .post(apiList.resetpassword, { email, token, password })
        .then((response) => {
          if (response.data.message == "Not verified!") {
            toast.error("Not Verified. Try Again.");
          } else {
            toast.success(response.data.message);
            setTimeout(() => {
              navigate("/login");
            }, 2000);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    } else {
      setError("Passwords do not match");
    }
  };

  return (
    <Container>
      <ToastContainer />
      <Content>
        <MainContainer>
          <Input
            required
            type="password"
            name="password"
            placeholder="Password"
            onChange={handlePasswordChange}
            value={password}
          />
          <Input
            required
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleConfirmPasswordChange}
            value={confirmPassword}
          />
          {error && <div>{error}</div>}
          <SubmitButton type="submit" onClick={handleSubmit}>
            <span className="text">Submit</span>
          </SubmitButton>
        </MainContainer>
      </Content>
    </Container>
  );
};
