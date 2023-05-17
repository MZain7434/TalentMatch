import React, { createContext, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import tw from "twin.macro";
import axios from "axios";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import apiList from "../../Components/lib/apiList.js";
import { Container as ContainerBase } from "../../Components/Misc/Layouts.js";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import illustration from "../../images/signup-illustration.svg";
import logo from "../../images/logo.svg";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-10 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;

const Form = tw.form`mx-auto max-w-xs`;
const Dropdown = tw.select`w-full font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-gray-600  py-2  px-3  rounded-lg  shadow-sm  focus:outline-none  focus:border-gray-400 mt-5 first:mt-0 appearance-none`;

const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
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
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

export default ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up For TalentMatch",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "/tos",
  privacyPolicyUrl = "/privacypolicy",
  signInUrl = "/login",
}) => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accountType, setAccountType] = useState("candidate");
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !password || !accountType) {
      toast.error("Please fill out all the feilds");
      return;
    }
    const payload = {
      name: name,
      email: email,
      password: password,
      type: accountType,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(apiList.signup, payload, config)
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("TalentMatch_token", response.data.token);
          localStorage.setItem("TalentMatch_type", response.data.type);
          localStorage.setItem("TalentMatch_name", response.data.name);
          if (response.data.type === "candidate") {
            window.location.href ='/candidate';
          } else {
            window.location.href ='/recruiter';
          }
        }
      })
      .catch((err) => {
        const message = err.response.data.message;
        toast.error(message);
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
                      type="name"
                      placeholder="Name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                    />
                    <Input
                      type="email"
                      placeholder="Email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                    />
                    <Input
                      type="password"
                      placeholder="Password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                    />
                    <Dropdown
                      name="accountType"
                      id="accountTypeDropdown"
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      <option value="candidate">Candidate</option>
                      <option value="recruiter">Recruiter</option>
                    </Dropdown>
                    <SubmitButton>
                      <Link to="/login" />
                      <SubmitButtonIcon className="icon" />
                      <span className="text">{submitButtonText}</span>
                    </SubmitButton>
                    <p tw="mt-6 text-xs text-gray-600 text-center">
                      I agree to abide by TalentMatch's{" "}
                      <Link to={tosUrl}>
                        <span tw="border-b border-gray-500 border-dotted">
                          Terms of Service
                        </span>
                      </Link>{" "}
                      and its{" "}
                      <Link to={privacyPolicyUrl}>
                        <span tw="border-b border-gray-500 border-dotted">
                          Privacy Policy
                        </span>
                      </Link>
                    </p>

                    <p tw="mt-8 text-sm text-gray-600 text-center">
                      Already have an account?{" "}
                      <Link to={signInUrl}>
                        <span tw="border-b border-gray-500 border-dotted">
                          Sign In
                        </span>
                      </Link>
                    </p>
                  </Form>
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
