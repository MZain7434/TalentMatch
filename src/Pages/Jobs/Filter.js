
import {
  Container as ContainerBase,
} from "../../Components/Misc/Layouts.js";
import { AiOutlineSearch, AiOutlineCloseCircle } from "react-icons/ai";
import { BsHouseDoor } from "react-icons/bs";
import { CiLocationOn } from "react-icons/ci";
import React from "react";
import tw from "twin.macro";
import styled from "styled-components";

const Container = tw(
  ContainerBase
)`h-24 bg-primary-500 text-white font-medium flex justify-center items-center m-8 rounded-lg`;

const SearchBarContainer = tw.div`h-16 flex flex-col lg:flex-row items-center bg-white w-full rounded-lg py-2`;

const SearchBarWrapper = tw.div`relative mr-8 flex-shrink-0`;

const SearchBarInput = styled.input`
  ${tw`text-gray-900 font-medium bg-transparent border-none focus:outline-none transition-all duration-200 m-2 lg:m-8 relative z-10`}
  &::placeholder {
    ${tw`text-gray-400`}
  }
`;
const SearchBarIcon = tw.span`absolute inset-y-0 right-0 text-lg text-gray-800 flex items-center pr-4`;
const SearchBarLeftIcon = tw(SearchBarIcon)`left-0`;
const SearchBarRightIcon = tw(SearchBarIcon)`right-0 hocus:text-xl`;
const SearchButton = tw.button`px-6 py-2 rounded-full inline-block text-white bg-purple-600 hover:bg-purple-800 transition-all duration-200`;

const DropdownContainer = tw.div`flex justify-between w-full mt-4`;
const DropdownWrapper = tw.div`relative mr-8`;
const DropdownButton = tw.button`h-12 px-4 rounded-lg text-gray-900 font-medium bg-white border-2 border-gray-200 hover:border-gray-400 focus:border-gray-400 focus:outline-none transition-all duration-200`;
const DropdownMenu = tw.ul`absolute top-0 left-0 w-full bg-white border-2 border-gray-200 rounded-lg mt-2 p-4 shadow-lg`;
const DropdownItem = tw.li`py-2 hover:text-white hover:bg-purple-600 transition-all duration-200`;


const SearchBars = () => {
  return (
      <Container>
        <form action="">

        <SearchBarContainer>
          <SearchBarWrapper>
            <SearchBarLeftIcon>
              <AiOutlineSearch  />
            </SearchBarLeftIcon>
            <SearchBarInput type="text" placeholder="Search Job here" />
            <SearchBarRightIcon>
              <AiOutlineCloseCircle/>
            </SearchBarRightIcon>
          </SearchBarWrapper>
          <SearchBarWrapper>
            <SearchBarLeftIcon>
              <BsHouseDoor  />
            </SearchBarLeftIcon>
            <SearchBarInput type="text" placeholder="Search by Company" />
            <SearchBarRightIcon>
              <AiOutlineCloseCircle/>
            </SearchBarRightIcon>
          </SearchBarWrapper>
          <SearchBarWrapper>
            <SearchBarLeftIcon>
              <CiLocationOn  />
            </SearchBarLeftIcon>
            <SearchBarInput type="text" placeholder="Search By Location" />
            <SearchBarRightIcon>
              <AiOutlineCloseCircle/>
            </SearchBarRightIcon>
          </SearchBarWrapper>
            <SearchButton>Search</SearchButton>
        </SearchBarContainer>
        </form>

        {/* <DropdownContainer>
          <DropdownWrapper>
            <DropdownButton>Sort by:</DropdownButton>
            <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
          <DropdownWrapper>
            <DropdownButton>Type:</DropdownButton>
            <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
          <DropdownWrapper>
            <DropdownButton>Level:</DropdownButton>
            <DropdownMenu>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem>Option 3</DropdownItem>
            </DropdownMenu>
          </DropdownWrapper>
        </DropdownContainer> */}



      </Container>


  );
};

export default SearchBars;
