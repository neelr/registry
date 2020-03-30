import React, { useRef, useState } from "react"
import { useRouter } from 'next/router'
import Box from "../../components/box"
import { Flex, Heading, Text, Button } from "rebass"
import { Input, Textarea, Checkbox, Label } from "@rebass/forms"
import axios from "axios"
import Captcha from "react-google-recaptcha";
import { IconButton } from "theme-ui"
import { X } from "react-feather"

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
export default () => {
    const [flag, setFlag] = useState({ open: false })
    const router = useRouter()
    const { id } = router.query
    const captcha = useRef()
    return (
        <Flex flexDirection="column" mb="auto">
            <Flex css={{ display: flag.open ? "visible" : "none !important" }} bg={flag.text == "Success!" ? "green.4" : "red.4"} p="30px">
                <Heading m="auto">{flag.text}</Heading>
                <NavButton
                    m="10px"
                    ml="auto"
                    onClick={() => setFlag({ open: false })}
                >
                    <X size={24} />
                </NavButton>
            </Flex>
            <Flex bg="muted" p="30px" flexDirection="column">
                <Heading mx="auto" fontSize={[4, 5, 6]}>Email!</Heading>
                <Box bg="background" id="form" onSubmit={e => {
                    e.preventDefault()
                    setFlag({ open: true, text: "Sending..." })
                    axios.post("/api/mail", {
                        subject: document.getElementById("subject").value,
                        email: document.getElementById("email").value,
                        body: document.getElementById("body").value,
                        captcha: captcha.current.getValue(),
                        _id: id
                    }).then(() => {
                        setFlag({ open: true, text: "Success!" })
                        document.getElementById("form").reset()
                    }).catch(e => {
                        setFlag({ open: true, text: "Captcha not checked!" })
                    })
                }} as="form" sx={{ maxWidth: null, width: ["90vw", null, null, "70vw"], mx: "auto", my: "15px" }}>
                    <TextInput type="email" name="email" title="Email" placeholder="Email" />
                    <TextInput name="subject" title="Subject" placeholder="Subject" />
                    <Flex
                        flexDirection="column"
                        width={["90%", null, null, "70%"]}
                        m="auto"
                        p="10px"
                    >
                        <Heading m="10px" fontSize={3}>
                            Body:
                    </Heading>
                        <Textarea
                            id="body"
                            placeholder="Email Body"
                        />
                        <Label>
                            <Flex m="auto">
                                <Checkbox width="40px" required />
                                <Text my="auto">I acknowledge that the registry is not responsible for any adverse consequences.</Text>
                            </Flex>
                        </Label>
                        <Flex mx="auto" my="10px">
                            <Captcha
                                ref={captcha}
                                sitekey="6LfL6-QUAAAAAPLw5fWUi9e-DF-bmx5c7qLY2r0H"
                                theme="light"
                            />
                        </Flex>
                        <Button sx={{ bg: "highlight", color: "white", ":hover": { bg: "muted" } }} mx="auto" my="10px" variant="elevated">Send!</Button>
                    </Flex>
                </Box>
            </Flex>
        </Flex>
    )
}

