import React, { useState } from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { Container as ContainerBase } from "../../Components/Misc/Layouts.js";
import { SectionHeading } from "../../Components/Misc/Headings.js";
import Header from "../../Components/headers/light.js";
import Footer from "../../Components/footer/MiniCenteredFooter.js";
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";
import ViewJobs from "./ViewJobs.js";
import AddJobs from "./AddJobs.js";
import Profile from "./Profile.js";
import Applicants from "./Applicants.js";

const JobContainer = tw(
  ContainerBase
)`h-full! bg-primary-500 text-white font-medium flex justify-center items-center m-8 rounded-lg`;

const HeaderRow = tw.div`flex justify-center  items-center flex-col xl:flex-row`;
const HeadingHeader = tw(SectionHeading)``;
const TabsControl = tw.div`flex flex-wrap bg-gray-200 px-2 py-2 rounded leading-none mt-12 xl:mt-0`;

const TabControl = styled.div`
  ${tw`cursor-pointer px-6 py-3 mt-2 sm:mt-0 sm:mr-2 last:mr-0 text-gray-600 font-medium rounded-sm transition duration-300 text-sm sm:text-base w-1/2 sm:w-auto text-center`}
  &:hover {
    ${tw`bg-gray-300 text-gray-700`}
  }
  ${(props) => props.active && tw`bg-primary-500! text-gray-100!`}
  }
`;

const TabContent = tw(
  motion.div
)`mt-6 flex flex-wrap sm:-mr-10 md:-mr-6 lg:-mr-12`;

const Click = tw.div` flex flex-col w-11/12 h-full`;
const heading = "Welcome to TalentMatch";
export default ({
  tabs = {
    "View Jobs": {
      component: (
        <Click>
          <ViewJobs/>
        </Click>
      ),
    },
    "Post Jobs": {
      component: (
        <Click>
          <AddJobs/>
        </Click>
      ),
    },
    Applicants: {
      component: (
        <Click>
          <Applicants/>
        </Click>
      ),
    },
    Profile: {
      component: <Profile />,
    },
  },
}) => {
  const tabsKeys = Object.keys(tabs);
  const [activeTab, setActiveTab] = useState(tabsKeys[0]);

  return (
    <AnimationRevealPage>
      <Header />

      <HeadingHeader>{heading}</HeadingHeader>
      <HeaderRow>
        <TabsControl>
          {Object.keys(tabs).map((tabName, index) => (
            <TabControl
              key={index}
              active={activeTab === tabName}
              onClick={() => setActiveTab(tabName)}
            >
              {tabName}
            </TabControl>
          ))}
        </TabsControl>
      </HeaderRow>
      <TabContent
        variants={{
          current: {
            opacity: 1,
            scale: 1,
            display: "flex",
          },
          hidden: {
            opacity: 0,
            scale: 0.8,
            display: "none",
          },
        }}
        transition={{ duration: 0.4 }}
        initial="current"
        animate="current"
      >
        {tabs[activeTab].component}
      </TabContent>
      <Footer />
    </AnimationRevealPage>
  );
};
