import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from "@react-email/components"
import type * as React from "react"

import config from "../../../config"

const WaitlistEmail = (): React.ReactElement => (
  <Html>
    <Head />
    <Preview>You're on the {config.appName} waitlist</Preview>
    <Body
      style={{ fontFamily: "system-ui, sans-serif", background: "#fafafa" }}
    >
      <Container style={{ padding: 24 }}>
        <Heading style={{ fontSize: 22 }}>You're on the list</Heading>
        <Text>We'll email you as soon as {config.appName} is ready.</Text>
      </Container>
    </Body>
  </Html>
)

export default WaitlistEmail
