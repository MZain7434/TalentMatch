import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { useState, useEffect } from 'react';
import { css } from "styled-components/macro"; //eslint-disable-line
import { Link } from "react-router-dom";
import Header, {
  NavBarLink,
  NavLinks,
  PrimaryLink,
  LogoLink,
  NavToggle,
  DesktopNavLinks,
} from "../headers/light.js";
import BackgroundImage from "../../images/hero-Background-Image.jpg"; 


const StyledHeader = styled(Header)`
  ${tw`pt-8 max-w-none`}
  ${DesktopNavLinks} {
    ${tw`text-white hover:border-gray-300 hover:text-gray-300`}
}

${NavBarLink}, ${LogoLink} {
    ${tw`text-gray-100 hover:border-gray-300 hover:text-gray-300`}
}

  ${NavToggle}.closed {
    ${tw`text-gray-100! hover:text-primary-500`}
  }
`;
const Container = styled.div`
  ${tw`relative -mx-8 -mt-8 bg-center bg-cover`}
  background-image: url(${BackgroundImage});
`;

const OpacityOverlay = tw.div`z-10 absolute inset-0 bg-primary-100 opacity-25`;

const HeroContainer = tw.div`z-20 relative px-4 sm:px-8 max-w-screen-xl mx-auto h-screen`;
const TwoColumn = tw.div`pt-24 pb-32 px-4 flex justify-between items-center flex-col lg:flex-row`;
const LeftColumn = tw.div`flex flex-col items-center lg:block`;
const RightColumn = tw.div`w-full sm:w-5/6 lg:w-1/2 mt-16 lg:mt-0 lg:pl-8`;

const Heading = styled.h1`
  ${tw`text-3xl text-center lg:text-left sm:text-4xl lg:text-5xl xl:text-6xl font-black text-gray-100 leading-none`}
  span {
    ${tw`inline-block mt-2`}
  }
`;

const SlantedBackground = styled.span`
  ${tw`relative text-primary-500 px-4 -mx-4 py-2`}
  &::before {
    content: "";
    ${tw`absolute inset-0 bg-gray-100 transform -skew-x-12 -z-10`}
  }
`;

const PrimaryAction = tw.button`px-8 py-3 mt-10 text-sm sm:text-base sm:mt-16 sm:px-8 sm:py-4 bg-primary-500 text-white font-bold rounded shadow transition duration-300 hocus:bg-primary-500 hocus:text-gray-100 focus:shadow-outline`;
export default () => {
  const navLinks = [

    <NavLinks key={1}>
      

      <NavBarLink>
        <Link to="/">Home</Link>
      </NavBarLink>
      <NavBarLink>
        <Link to="/jobs">Jobs</Link>
      </NavBarLink>
      <NavBarLink>
        <Link to="/candidate">Candidate</Link>
      </NavBarLink>
      <NavBarLink>
        <Link to="/recruiter">Recruiter</Link>
      </NavBarLink>
      
    </NavLinks>,
    <NavLinks key={2}>
      <PrimaryLink>
        {" "}
        <Link to="/login">Login</Link>
      </PrimaryLink>
      <PrimaryLink>
        {" "}
        <Link to="/signup">Sign up</Link>
      </PrimaryLink>
    </NavLinks>,
  ];
  const [headingIndex, setHeadingIndex] = useState(0);
  const headings = [
    <>
      <Heading>
        <span>Hire the best </span>
        <br />
        <SlantedBackground>Talent.</SlantedBackground>
      </Heading>
      <br />
      <PrimaryAction>
  <Link to="/signup">Sign Up</Link>
</PrimaryAction>
    </>,
    <>
      <Heading>
        <span>Become a part of the Best</span>
        <br />
        <SlantedBackground>Team.</SlantedBackground>
      </Heading>
      <br />
      <PrimaryAction>Sign Up</PrimaryAction>
    </>
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setHeadingIndex((headingIndex + 1) % headings.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [headingIndex]);

  return (
    <Container>
      <OpacityOverlay />
      <HeroContainer>
        <StyledHeader links={navLinks} />
        <TwoColumn>
          <LeftColumn>
            {headings[headingIndex]}
          </LeftColumn>
        </TwoColumn>
      </HeroContainer>
    </Container>
  );
};