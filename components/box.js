import React from "react"
import { Card } from "rebass"

export default ({ sx, ...props }) => (
    <Card sx={{
        boxShadow: "md",
        borderRadius: "10px",
        p: "15px",
        maxWidth: ["100%", "40%", null, "30%"],
        m: "15px",
        flexDirection: "column",
        ...sx
    }} {...props}>
        {props.children}
    </Card>
)