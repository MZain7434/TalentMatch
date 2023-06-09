import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as LoginIcon } from "feather-icons/dist/icons/log-in.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "../../Components/Misc/Layouts.js";
import illustration from "../../images/login-illustration.svg";
import logo from "../../images/logo.svg";
import apiList from "../../Components/lib/apiList.js";
import Header from "../../Components/headers/light.js";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500! text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-sm bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign In To TalentMatch",
  submitButtonText = "Sign In",
  SubmitButtonIcon = LoginIcon,
  forgotPasswordUrl = "/forgotpassword",
  signupUrl = "/signup",
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleFormSubmit = (e) => {
    e.preventDefault();

    axios
      .post(apiList.login, { email, password })
      .then((response) => {
        localStorage.setItem("TalentMatch_token", response.data.token);
        localStorage.setItem("TalentMatch_type", response.data.type);
        localStorage.setItem("Talent_Match_name", response.data.name);
        
        if (response.data.type === "candidate") {
          window.location.href ='/candidate';
        } else {
          window.location.href ='/recruiter';
        }
      })
      .catch((err) => {
        if (err.response.data.message === "User does not exist") {
          toast.error("Incorrect Email");
        } else {
          toast.error("Incorrect Password");
        }
      });
    };
    return (
      <>
      <ToastContainer />
      <AnimationRevealPage>


        <Container>
          <Content>
            <MainContainer>
              <LogoLink>
                <Link to={logoLinkUrl}>
                  <LogoImage src={logo} />
                </Link>
              </LogoLink>
              <MainContent>
                <Heading>{headingText}</Heading>
                <FormContainer>
                  <Form onSubmit={handleFormSubmit}>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <SubmitButton type="submit">
                      <SubmitButtonIcon className="icon" />
                      <span className="text">{submitButtonText}</span>
                    </SubmitButton>
                  </Form>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    <Link to={forgotPasswordUrl}>
                      <span tw="border-b border-gray-500 border-dotted">
                        Forgot Password ?
                      </span>
                    </Link>
                  </p>
                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Don't have an account?{" "}
                    <Link to={signupUrl}>
                      <span tw="border-b border-gray-500 border-dotted">
                        Sign Up
                      </span>
                    </Link>
                  </p>
                </FormContainer>
              </MainContent>
            </MainContainer>
            <IllustrationContainer>
              <IllustrationImage imageSrc={illustrationImageSrc} />
            </IllustrationContainer>
          </Content>
        </Container>
      </AnimationRevealPage>
    </>
  );
};
