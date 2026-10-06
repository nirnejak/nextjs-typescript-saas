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

interface Props {
  name: string
}

const WelcomeEmail = ({ name }: Props): React.ReactElement => (
  <Html>
    <Head />
    <Preview>Welcome to {config.appName}</Preview>
    <Body
      style={{ fontFamily: "system-ui, sans-serif", background: "#fafafa" }}
    >
      <Container style={{ padding: 24 }}>
        <Heading style={{ fontSize: 22 }}>Welcome, {name}</Heading>
        <Text>Thanks for signing up to {config.appName}.</Text>
      </Container>
    </Body>
  </Html>
)

WelcomeEmail.PreviewProps = { name: "Ada" } satisfies Props

export default WelcomeEmail
