import React, {useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { SectionHeading, Subheading as SubheadingBase } from "../Misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "../Misc/Buttons.js";
import EmailIllustrationSrc from "../../images/email-illustration.svg";
import axios from "axios";
import apiList from "../lib/apiList.js";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0 `;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col justify-center max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8`

export default ({
  subheading = "Contact Us",
  heading = <>Feel free to <span tw="text-primary-500">get in touch</span><wbr/> with us.</>,
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  submitButtonText = "Send",
  textOnLeft = true,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    subject: "",
    message: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = JSON.stringify(formData);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post(apiList.contactUs, payload, config)
      .then((response) => {
        console.log(response);
        // handle success response
      })
      .catch((error) => {
        console.log(error);
        // handle error response
      });
  };

  return (
    <Container>
      <TwoColumn>
        <ImageColumn>
          <Image imageSrc={EmailIllustrationSrc} />
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form onSubmit={handleSubmit} >
              <Input
                type="email"
                name="email"
                placeholder="Your Email Address"
                value={formData.email}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <Input
                type="text"
                name="subject"
                placeholder="Subject"
                value={formData.subject}
                onChange={handleInputChange}
              />
              <Textarea
                name="message"
                placeholder="Your Message Here"
                value={formData.message}
                onChange={handleInputChange}
              />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
