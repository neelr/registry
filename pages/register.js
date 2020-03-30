import { useRef, useState } from "react";
import { Flex, Text, Link, Heading, Button } from "rebass";
import { Input, Textarea, Checkbox, Label } from "@rebass/forms";
import Box from "../components/box";
import Select from "react-select";
import axios from "axios";
import crypto from "crypto-browserify";
import Captcha from "react-google-recaptcha";
import { X } from "react-feather";
import { useColorMode, IconButton } from "theme-ui";
var Buffer = require("buffer/").Buffer;
const NavButton = ({ sx, ...props }) => (
  <IconButton
    {...props}
    sx={{
      color: "red.6",
      width: "40px",
      height: "40px",
      borderRadius: "100%",
      transition: "box-shadow .125s ease-in-out",
      ":hover,:focus": {
        boxShadow: "0 0 0 2px",
        outline: "none",
        cursor: "pointer"
      },
      ...sx
    }}
  />
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
const TextInput = ({ sx, ...props }) => (
  <Flex
    flexDirection="column"
    width={["90%", null, null, "70%"]}
    m="auto"
    p="10px"
    {...props}
  >
    <Heading m="10px" fontSize={3}>
      {props.title}:
    </Heading>
    <Input
      type={props.type}
      name={props.name}
      id={props.name}
      placeholder={props.placeholder}
    />
  </Flex>
);
function encrypt(text, password) {
  var cipher = crypto.createCipher("aes-256-ctr", password);
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
}

export default ({ sx, ...props }) => {
  let [theme, setTheme] = useColorMode();
  var publicKey = axios.get("/public.pem");
  publicKey.then(e => (publicKey = e.data));
  var [bloodType, setType] = useState(0);
  var [flag, setFlag] = useState({ open: false, text: "Success!" });
  let [name, setName] = useState(
    "Upload COVID19 Testing & Recovery Documents, & Blood Type Confirmation Documents"
  );
  const inputFile = useRef(null);
  const captcha = useRef(null);
  const handleForm = function(e) {
    e.preventDefault();
    let token = crypto.randomBytes(117);
    console.log(e.target);
    let payload = {
      name: encrypt(document.getElementById("name").value, token),
      email: encrypt(document.getElementById("email").value, token),
      dayInfected: document.getElementById("dayInfected").value,
      dayCured: document.getElementById("dayCured").value,
      hospitalAddress: document.getElementById("hospitalAdress").value,
      bloodType: bloodType,
      desc: document.getElementById("desc").value,
      report: encrypt(document.fileReader.result, token),
      token: crypto.publicEncrypt(publicKey, Buffer.from(token)),
      captcha: captcha.current.getValue()
    };
    setFlag({ open: true, text: "Sending..." });
    console.log(Buffer.from(document.fileReader.result));
    axios
      .post("/api/register", payload)
      .then(d => {
        setFlag({ open: true, text: "Success!" });
        document.getElementById("form").reset();
      })
      .catch(e => {
        setFlag({ open: true, text: "Error, Please Enter Captcha!" });
      });
  };
  return (
    <Flex flexDirection="column">
      <Flex
        css={{ display: flag.open ? "visible" : "none !important" }}
        bg={flag.text == "Success!" ? "green.4" : "red.4"}
        p="30px"
      >
        <Heading m="auto">{flag.text}</Heading>
        <NavButton m="10px" ml="auto" onClick={() => setFlag({ open: false })}>
          <X size={24} />
        </NavButton>
      </Flex>
      <Hero p="30px" bg="muted">
        <MainText p="15px">Register!</MainText>
        <Box
          bg="background"
          id="form"
          as="form"
          onSubmit={handleForm}
          m="auto"
          sx={{ maxWidth: null, width: ["90vw", null, null, "70vw"] }}
        >
          <TextInput title="Name" name="name" placeholder="John Doe" required />
          <TextInput
            type="email"
            title="Email"
            name="email"
            placeholder="john@doe.io"
            required
          />
          <TextInput
            type="date"
            title="Day Infected"
            name="dayInfected"
            required
          />
          <TextInput
            type="date"
            title="Day Recovered"
            name="dayCured"
            required
          />
          <TextInput
            title="Hospital Address"
            name="hospitalAdress"
            placeholder="1234 Hospital Street, San Fransisco CA"
            required
          />
          <Flex
            flexDirection="column"
            width={["90%", null, null, "70%"]}
            m="auto"
            p="10px"
          >
            <Heading m="10px" fontSize={3}>
              Description:
            </Heading>
            <Textarea
              id="desc"
              placeholder="A quick description about you, and what you can do for the community!"
            />
          </Flex>
          <Flex
            p="10px"
            flexDirection="column"
            width="70%"
            m="auto"
            sx={{ "> div": { width: "90%", m: "auto" } }}
          >
            <Heading fontSize={3} p="10px">
              Blood Type:
            </Heading>
            <Select
              styles={{
                menu: (_, __) => ({
                  color: "black",
                  background: "white"
                })
              }}
              options={[
                { value: "a-", label: "A-" },
                { value: "a+", label: "A+" },
                { value: "b-", label: "B-" },
                { value: "b+", label: "B+" },
                { value: "ab-", label: "AB-" },
                { value: "ab+", label: "AB+" },
                { value: "o-", label: "O-" },
                { value: "o+", label: "O+" }
              ]}
              inputId="blood"
              onChange={v => setType(v.value)}
            />
          </Flex>
          <input
            id="report"
            accept=".pdf"
            type="file"
            ref={inputFile}
            style={{ display: "none" }}
            onChange={e => {
              setName(e.target.files[0].name);
              document.fileReader = new FileReader();
              document.fileReader.readAsDataURL(e.target.files[0]);
            }}
            required
          />
          <Button variant="3D" onClick={() => inputFile.current.click()}>
            {name}
          </Button>
          <Label>
            <Flex m="auto">
              <Checkbox width="40px" required />
              <Text my="auto">
                I consent to the small possibility that this information might
                be leaked.
              </Text>
            </Flex>
          </Label>
          <Label>
            <Flex m="auto">
              <Checkbox width="40px" required />
              <Text my="auto">
                I agree that I have had, and recovered from COVID19 and have
                been tested accordingly.
              </Text>
            </Flex>
          </Label>
          <Flex my="10px" mx="auto" sx={{ "> div": { m: "auto" } }}>
            <Captcha
              ref={captcha}
              sitekey="6LfL6-QUAAAAAPLw5fWUi9e-DF-bmx5c7qLY2r0H"
              theme={theme == "default" ? "light" : theme}
            />
          </Flex>
          <Button display="block" mx="auto" my="20px" variant="3D" bg="green.4">
            Submit
          </Button>
        </Box>
      </Hero>
    </Flex>
  );
};
