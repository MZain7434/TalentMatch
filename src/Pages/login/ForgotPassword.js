import React, { useState } from "react";
import Header from "../../Components/headers/light.js";
import Footer from "../../Components/footer/MiniCenteredFooter.js";
import { Container as ContainerBase } from "../../Components/Misc/Layouts.js";
import { SectionHeading } from "../../Components/Misc/Headings.js";
import tw from "twin.macro";
import styled from "styled-components";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import {  ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import apiList from "../../Components/lib/apiList.js";
import axios from "axios";



const Container = tw(
  ContainerBase
)`h-full! bg-primary-500 text-white font-medium flex justify-center items-center m-8 rounded-lg`;

const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div` xl:w-5/12 p-6 sm:p-12`;
const Heading = tw(SectionHeading)``;
const Text = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Input = tw.input`w-1/2 px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-400 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5  font-semibold bg-primary-500! text-gray-100 w-1/6  py-4 rounded-lg hover:bg-primary-900! flex items-center justify-center focus:shadow-outline focus:outline-none`}
  }
`;

export default ({}) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(apiList.forgotpassword, { email })
      .then((response) => {
        // logic rehti haii
        if(response.data.message === "Password reset link sent successfully"){

          toast.success(response.data.message + " at this Email " + email);
        }else{
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 400) {
          toast.error(err.response.data.message);
        } else {
          toast.error("Retry!");
        }
      });
  };
  return (
  <>
        <ToastContainer/> 
    <AnimationRevealPage>
    <Header/>
      <Container>
        <Content>
          <MainContainer>
            <MainContent>
              <Heading>Forgot Password?</Heading>
              <Text>
                Dont worry. just provide your Email ID and we will send you a
                reset link for the password.{" "}
              </Text>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
              <SubmitButton type="submit" onClick={handleSubmit}>
                <span className="text">Send</span>
              </SubmitButton>
            </MainContent>
          </MainContainer>
        </Content>
      </Container>
      <Footer />
    </AnimationRevealPage>
                </>
  );
};
