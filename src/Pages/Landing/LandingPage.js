import React from "react";
import tw from "twin.macro"; //eslint-disable-line
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "../../helpers/AnimationRevealPage.js";

import Hero from "../../Components/hero/BackgroundAsImage.js";
import Features from "../../Components/features/DashedBorderSixFeatures.js";
import MainFeature from "../../Components/features/TwoColSingleFeatureWithStats2.js";
import MainFeature2 from "../../Components/features/TwoColWithTwoFeaturesAndButtons.js";
import Testimonial from "../../Components/testimonial/TwoColumnWithImageAndProfilePictureReview.js";
import FAQ from "../../Components/faq/SimpleWithSideImage.js";
import ContactUsForm from "../../Components/forms/TwoColContactUsWithIllustrationFullForm.js";
import Footer from "../../Components/footer/MiniCenteredFooter.js";
import customerSupportIllustrationSrc from "../../images/customer-support-illustration.svg";
import DP1 from "../../images/testimonial1_DP.png"
import DP2 from "../../images/testimonial2_DP.png"
import Slick2 from "../../images/testimonial_Slick1.png"
import Slick1 from "../../images/testimonial_Slick2.png"

export default () => (
  <AnimationRevealPage>
    <Hero />
    <MainFeature />
    <Features />
    <MainFeature2 />

    <Testimonial
      subheading="Testimonials"
      heading={
        <>
          Our Clients <span tw="text-primary-500">Love Us.</span>
        </>
      }
      description = "Don't just take our word for it. Hear what our satisfied candidates and recruiters have to say about their experience with TalentMatch."
      testimonials={[
        {
          imageSrc: Slick1,
          profileImageSrc: DP1,
          quote:
            "The completeness scoring feature on TalentMatch  was a game-changer for us. It saved us countless hours by allowing us to quickly assess the quality of candidate profiles. We found exceptional talent through their platform and successfully filled key positions in our organization.",
          customerName: "Charlotte Hale",
          customerTitle: "CEO, Delos Inc."
        },
        {
          imageSrc: Slick2,
          profileImageSrc: DP2,
          quote:
            "I have been using TalentMatch for my hiring needs, and I'm impressed with the level of talent they have in their database. The certification aggregation feature helped us identify candidates with specialized skills, giving us a competitive edge in our industry.",
          customerName: "Adam Cuppy",
          customerTitle: "Founder, EventsNYC"
        }
      ]}
      textOnLeft={true}
    />
    <FAQ
      imageSrc={customerSupportIllustrationSrc}
      imageContain={true}
      imageShadow={false}
      subheading="FAQs"
      heading={
        <>
          <span tw="text-primary-500">Got Questions ?</span>
        </>
      }
    />
    <ContactUsForm />
    <Footer />
  </AnimationRevealPage>
);
