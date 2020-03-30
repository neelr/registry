import React from "react";
import { Text, Flex, Button, Heading } from "rebass";
import { useThemeUI } from "theme-ui";
import Box from "../components/box";
import Link from "next/link";

const MainText = ({ sx, ...props }) => (
  <Heading
    sx={{
      fontSize: [5, 6, 7],
      textShadow: "currentcolor 0px 0px 5px",
      color: "primary",
      ...sx
    }}
    {...props}
  >
    {props.children}
  </Heading>
);
const Hero = ({ sx, ...props }) => (
  <Flex
    sx={{
      flexDirection: "column",
      width: "100vw",
      textAlign: "center"
    }}
    {...props}
  >
    {props.children}
  </Flex>
);
export default props => {
  return (
    <Hero>
      <Hero bg="muted" py="120px">
        <MainText m="auto">Global COVID19 Volunteer Registry</MainText>
        <Heading pb="10px" fontSize={[2, 3, 4]} m="auto">
          The official recovered COVID19 registry for donors and volunteers!
        </Heading>
        <Flex mx="auto">
          <Link href="/register">
            <Button variant="3D" m="10px">
              Register Now!
            </Button>
          </Link>
          <Link href="/search">
            <Button variant="3D" m="10px">
              Search for People!
            </Button>
          </Link>
        </Flex>
      </Hero>
      <Hero p="30px">
        <Flex flexWrap="wrap">
          <Box mb="auto">
            <Heading fontSize={3}>Hold on, Whats This?</Heading>
            <Text>
              This is the official COVID19 Registry where people who have
              already gotten COVID19 register, and can be called on by
              hospitals, and the public, for help! This is because{" "}
              <strong>
                people recovered from COVID19 are safe and cannot transmit or
                get the virus.
              </strong>{" "}
              This allows for you to stay anonomous, and recieve donor, or
              public help requests through email, and if you recieve one you
              feel would be a good fit, respond and work with the person to get
              it done!
            </Text>
          </Box>
          <Box mb="auto">
            <Heading fontSize={3}>Why is Convalescent Plasma Needed?</Heading>
            <Text>
              Use of convalescent plasma has been studied in outbreaks of other
              respiratory infections, including the 2009-2010 H1N1 influenza
              virus pandemic, 2003 SARS-CoV-1 epidemic, and the 2012 MERS-CoV
              epidemic. Although promising, convalescent plasma has not yet been
              shown to be effective in every disease studied. There are clinical
              trials ongoing to test if convalescent plasma from donors is
              effective at reducing the severity of COVID-19 infections.{" "}
              <strong>
                By registering, you allow for hospitals to reacy out to you as a
                donor!
              </strong>
            </Text>
          </Box>
          <Box mb="auto">
            <Heading fontSize={3}>
              What are We Doing and How Can you Help?
            </Heading>
            <Text>
              <strong>
                Patients around the world need and value donors and volunteers
                like you.
              </strong>{" "}
              If you are someone who had been tested previously positive for
              COVID-19 infection and have recovered completely, you may be able
              to help those that are infected. Currently there are no medicines
              or vaccines approved against the COVID-19 infection. Several drugs
              and vaccine trials are ongoing. We are creating a registry of
              COVID-19 recovered community. All personal data will be
              deidentified. Hospitals and people around the world can access
              only the relative location of such recovered person and can
              contact you for plasma donation or for community help. This is
              because since you are immune, you can help people who are
              recovering, or in public areas!
            </Text>
          </Box>
        </Flex>
      </Hero>
      <Hero p="30px">
        <Heading fontSize={[3, 4, 5]} p="10px">
          FAQ
        </Heading>
        <Box
          m="auto"
          sx={{ maxWidth: null, width: ["90vw", null, null, "70vw"] }}
        >
          <Flex flexDirection="column" m="15px">
            <Heading fontSize={2}>Is this gonna give me spam?</Heading>
            <Text>
              No, we ensure that your mailbox stays pristine and only gets
              genuine requests. This is because we use a captcha to make sure
              that your email will not be spammed, and your email is never given
              away, and is always encrypted from point to point, to keep your
              data HIPAA compliant!
            </Text>
          </Flex>
          <Flex flexDirection="column" m="15px">
            <Heading fontSize={2}>
              Will my personal data or information be shared?
            </Heading>
            <Text>
              No. Only your relative location – city, state and country will be
              shared. Each hospital will search the database for their location
              and can send requests to individuals in that city for request as a
              plasma donor. Only when you accept the request, you will be able
              to liaise directly with the hospital or clinic.
            </Text>
          </Flex>
          <Flex flexDirection="column" m="15px">
            <Heading fontSize={2}>
              Are there health requirements for me to be a donor?
            </Heading>
            <Text>
              Yes there will be some requirements of general good health and
              meet the plasma donation criteria. These will be communicated to
              you by the plasma donation center during evaluation.
            </Text>
          </Flex>
          <Flex flexDirection="column" m="15px">
            <Heading fontSize={2}>Is all plasma the same?</Heading>
            <Text>
              No, it's not. Plasma can differ in the kinds and amounts of
              antibodies it contains. If a donor has specific antibodies in
              sufficient quantities, he or she may be considered a special
              donor. People may also have unique blood types that make them
              special donors as well.
            </Text>
          </Flex>
          <Flex flexDirection="column" m="15px">
            <Heading fontSize={2}>
              What are the potential adverse effects during or after plasma
              donation?
            </Heading>
            <Text>
              Donating plasma is a low-risk procedure with minimal or no adverse
              effects. Before donating, you'll receive information and
              instruction on the plasmapheresis process from plasma donation
              center. They will discuss the risks of adverse reactions, injuries
              and events that may occur during or after plasma donation, and
              they will give you the opportunity to ask any questions you may
              have.
            </Text>
          </Flex>
        </Box>
      </Hero>
    </Hero>
  );
};
