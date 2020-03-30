import React from "react";
import { IconButton, useColorMode } from "theme-ui";
import { Flex, Heading, Text } from "rebass";
import { ArrowLeft, Plus, Moon, Sun } from "react-feather";
import Link from "next/link"

const NavButton = ({ sx, ...props }) => (
    <IconButton
        {...props}
        sx={{
            color: "primary",
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
const NavLink = ({ sx, ...props }) => (
    <Link {...props}>
        <Text sx={{
            fontWeight: "bold",
            my: "auto",
            mx: "15px",
            fontSize: 2,
            color: "primary",
            ":hover": {
                color: "secondary",
                textDecoration: "none",
                cursor: "pointer"
            },
            ...sx
        }}>
            {props.children}
        </Text>
    </Link>
)
export default ({ sx, ...props }) => {
    const [mode, setMode] = useColorMode();
    return (
        <Flex height="60px" flexDirection="reverse-row" {...props}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/register">Register</NavLink>
            <NavLink href="/search">Search</NavLink>
            <NavButton
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
                title="Reverse color scheme"
                m="10px"
                ml="auto"
            >
                {mode == "dark" ? <Moon size={24} /> : <Sun size={24} />}
            </NavButton>
        </Flex>
    );
};
