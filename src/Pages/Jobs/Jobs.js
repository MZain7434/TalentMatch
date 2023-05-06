import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import Header from "../../Components/headers/light.js";
import {
  Container as ContainerBase,
} from "../../Components/Misc/Layouts.js";
import Footer from "../../Components/footer/MiniCenteredFooter.js";

import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import ListOfJobs from "../Jobs/ListofJobs.js"
import Filter from "../Jobs/Filter.js"

const JobContainer = tw(
  ContainerBase
)`h-full bg-primary-500 text-white font-medium flex justify-center items-center m-8 rounded-lg`;


const SearchBars = () => {
  return (
    <AnimationRevealPage>
      <Header />
      <Filter/>
      <JobContainer>
        <ListOfJobs/>
      </JobContainer>
      <Footer />
    </AnimationRevealPage>
  );
};

export default SearchBars;
