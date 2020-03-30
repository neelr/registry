import React, { Component, useState, useEffect } from "react";
import Map from "google-map-react";
import Box from "../components/box";
import { Heading, Flex, Text, Button } from "rebass";
import { User } from "react-feather";
import { geolocated } from "react-geolocated";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const Marker = ({ sx, ...props }) => (
    <Flex
        sx={{
            color: props.$hover ? "primary" : "dark",
            width: "20px",
            height: "20px"
        }}
    >
        <User size={24} />
    </Flex>
);

const Search = props => {
    var [people, setPeople] = useState([]);
    var [selected, setSelected] = useState(null);
    useEffect(async () => {
        const res = await fetch(
            "/api/getAll"
        );
        const json = await res.json();
        setPeople(json);
    }, []);
    console.log(`hello! ${JSON.stringify(props.people)}`);
    return (
        <Flex p="30px" flexDirection="column" mb="auto" bg="muted">
            <Heading pb="15px" fontSize={[4, 5, 6]} mx="auto">
                Search!
      </Heading>
            {props.isGeolocationEnabled ? (
                <Flex flexDirection="column">
                    <Box
                        sx={{
                            maxWidth: null,
                            width: ["90vw", null, null, "70vw"],
                            m: "auto",
                            height: "50vh",
                            p: 0,
                            overflow: "hidden"
                        }}
                    >
                        <Map
                            bootstrapURLKeys={{
                                key: "AIzaSyA-2hnuNBmRX9xLjbdSWATM_G_ZLDsc6BM"
                            }}
                            center={
                                props.coords
                                    ? { lat: props.coords.latitude, lng: props.coords.longitude }
                                    : { lat: 0, lng: 0 }
                            }
                            defaultZoom={11}
                            onChildClick={e => setSelected(e)}
                        >
                            {people.map(v => (
                                <Marker lat={v.coords[0]} lng={v.coords[1]} />
                            ))}
                        </Map>
                    </Box>
                    <Box
                        sx={{
                            bg: "background",
                            maxWidth: null,
                            width: ["63vw", null, null, "49vw"],
                            mx: "auto",
                            my: "20px",
                            height: "50vh",
                            textAlign: "center"
                        }}
                    >
                        <Heading>Person Description!</Heading>
                        {selected !== null ? (
                            <ul>
                                <Text>
                                    <span style={{ fontWeight: "bold" }}>Day Infected:</span>{" "}
                                    {new Date(people[selected].dayInfected).toLocaleDateString()}
                                </Text>
                                <Text>
                                    <span style={{ fontWeight: "bold" }}>Day Recovered:</span>{" "}
                                    {new Date(people[selected].dayCured).toLocaleDateString()}
                                </Text>
                                <Text>
                                    <span style={{ fontWeight: "bold" }}>Blood Type:</span>{" "}
                                    {people[selected].bloodType.toUpperCase()}
                                </Text>
                                <Text>
                                    <span style={{ fontWeight: "bold" }}>Description:</span>{" "}
                                    {people[selected].desc.split("\n").map(v => (
                                        <Text>{v}</Text>
                                    ))}
                                </Text>
                                <Link href={`/mail/${people[selected]._id}`}>
                                    <Button
                                        sx={{ ":hover": { cursor: "pointer", bg: "secondary" } }}
                                        m="10px"
                                    >
                                        Mail Me!
                  </Button>
                                </Link>
                            </ul>
                        ) : (
                                <Text>Select a Person!</Text>
                            )}
                    </Box>
                </Flex>
            ) : (
                    <Text>Please enable location!</Text>
                )}
        </Flex>
    );
};
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false
    },
    userDecisionTimeout: 5000
})(Search);
