import React from "react";
import { motion } from "framer-motion";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line

import useAnimatedNavToggler from "../../helpers/useAnimatedNavToggler.js";

import logo from "../../images/logo.svg";
import { ReactComponent as MenuIcon } from "feather-icons/dist/icons/menu.svg";
import { ReactComponent as CloseIcon } from "feather-icons/dist/icons/x.svg";
import { Link, useNavigate } from "react-router-dom";

const Header = tw.header`
  flex justify-between items-center
  max-w-screen-xl mx-auto
`;

export const NavLinks = tw.div`inline-block`;

/* hocus: stands for "on hover or focus"
 * hocus:bg-primary-700 will apply the bg-primary-700 class on hover or focus
 */
export const NavBarLink = tw.a`
  text-lg my-2 lg:text-sm lg:mx-6 lg:my-0
  font-semibold tracking-wide transition duration-300
  pb-1 border-b-2 border-transparent hover:border-primary-500 hocus:text-primary-500
`;

export const PrimaryLink = tw(NavBarLink)`
  
  px-8 py-3 rounded bg-primary-500 text-gray-100
  hocus:bg-primary-700 hocus:text-gray-200 focus:shadow-outline
  border-b-0
`;

export const LogoLink = styled(NavBarLink)`
  ${tw`flex items-center font-black border-b-0 text-2xl! ml-0!`};

  img {
    ${tw`w-10 mr-3`}
  }
`;

export const MobileNavLinksContainer = tw.nav`flex flex-1 items-center justify-between lg:hidden`;

export const NavToggle = tw.button`
  lg:hidden z-20 focus:outline-none hocus:text-primary-500 transition duration-300
`;
export const MobileNavLinks = motion(styled.div`
  ${tw`lg:hidden z-10 fixed top-0 inset-x-0 mx-4 my-6 p-8 border text-center rounded-lg text-gray-900! bg-white`}
  ${NavLinks} {
    ${tw`flex! flex-col! items-center!`}
  }
`);

export const DesktopNavLinks = tw.nav`
  hidden lg:flex flex-1 justify-between items-center 
`;
//const IsLoggedIn = localStorage.getItem("TalentMatch_token");
export default ({
  IsLoggedIn,
  type,
  roundedHeaderButton = false,
  logoLink,
  links,
  className,
  collapseBreakpointClass = "lg",
}) => {
  const navigate = useNavigate("");
  const handleLogout = () => {
    // Clear local storage
    localStorage.clear();
    // Redirect to home page
    
  };
  if(type=="candidate"){
    var menuURL = "/candidate";
    var menuName = "Candidate"; 
  }if(type=="recruiter"){
    var menuURL = "/recruiter";
    var menuName = "Recruiter"; 

  }
  const defaultLinks = [
    <NavLinks key={1}>
      <NavBarLink>
        {" "}
        <Link to="/">Home</Link>
      </NavBarLink>
      <NavBarLink>
        {" "}
        <Link to="/jobs">Jobs</Link>
      </NavBarLink>
      <NavBarLink>
        {" "}
        <Link to={menuURL}>{menuName}</Link>
      </NavBarLink>
    </NavLinks>,
  ];
  if (IsLoggedIn) {
    defaultLinks.push(
      <NavLinks key={2}>
        <PrimaryLink css={roundedHeaderButton && tw`rounded-full`} onClick={handleLogout}>
          <a href="/">Log Out</a>
        </PrimaryLink>
      </NavLinks>
    );
  } else {
    defaultLinks.push(
      <NavLinks key={2}>
        <PrimaryLink css={roundedHeaderButton && tw`rounded-full mr-2`}>
          <Link to="/login">Log In</Link>
        </PrimaryLink>
        <PrimaryLink css={roundedHeaderButton && tw`rounded-full`}>
          <Link to="/signup">Sign Up</Link>
        </PrimaryLink>
      </NavLinks>
    );
  }
  const { showNavLinks, animation, toggleNavbar } = useAnimatedNavToggler();
  const collapseBreakpointCss =
    collapseBreakPointCssMap[collapseBreakpointClass];

  const defaultLogoLink = (
    <LogoLink>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      TalentMatch
    </LogoLink>
  );

  logoLink = logoLink || defaultLogoLink;
  links = links || defaultLinks;

  return (
    <Header className={className || "header-light"}>
      <DesktopNavLinks css={collapseBreakpointCss.desktopNavLinks}>
        {logoLink}
        {links}
      </DesktopNavLinks>

      <MobileNavLinksContainer
        css={collapseBreakpointCss.mobileNavLinksContainer}
      >
        {logoLink}
        {
          <MobileNavLinks
            initial={{ x: "150%", display: "none" }}
            animate={animation}
            css={collapseBreakpointCss.mobileNavLinks}
          >
            {links}
          </MobileNavLinks>
        }
        <NavToggle
          onClick={toggleNavbar}
          className={showNavLinks ? "open" : "closed"}
        >
          {showNavLinks ? (
            <CloseIcon tw="w-6 h-6" />
          ) : (
            <MenuIcon tw="w-6 h-6" />
          )}
        </NavToggle>
      </MobileNavLinksContainer>
    </Header>
  );
};

/* The below code is for generating dynamic break points for navbar.
 * Using this you can specify if you want to switch
 * to the toggleable mobile navbar at "sm", "md" or "lg" or "xl" above using the collapseBreakpointClass prop
 * Its written like this because we are using macros and we can not insert dynamic variables in macros
 */

const collapseBreakPointCssMap = {
  sm: {
    mobileNavLinks: tw`sm:flex`,
    desktopNavLinks: tw`sm:hidden`,
    mobileNavLinksContainer: tw`sm:flex`,
  },
  md: {
    mobileNavLinks: tw`md:flex`,
    desktopNavLinks: tw`md:hidden`,
    mobileNavLinksContainer: tw`md:flex`,
  },
  lg: {
    mobileNavLinks: tw`lg:hidden`,
    desktopNavLinks: tw`lg:flex`,
    mobileNavLinksContainer: tw`lg:hidden`,
  },
  xl: {
    mobileNavLinks: tw`xl:hidden`,
    desktopNavLinks: tw`xl:flex`,
    mobileNavLinksContainer: tw`xl:hidden`,
  },
};
