import { Container, Box } from '@chakra-ui/react'
import {Nav} from "../components/Nav"

export const siteTitle = "みんなのオールタイムベスト";

type typeLayout = {
  children: React.ReactNode;
};

export function Layout({ children }: typeLayout) {
  return (
    <Container maxWidth={720} mb={16}>
      <Nav/>
      <Box py={4}></Box>
      <main>{children}</main>
    </Container>
  );
}