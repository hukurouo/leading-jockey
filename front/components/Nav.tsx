import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Stack,
  useColorMode,
  useColorModeValue
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import Link from 'next/link'

export function Nav() {
  const { colorMode, toggleColorMode } = useColorMode();
  const activeColor = useColorModeValue('teal.500', 'teal.500')
  const inActiveColor = useColorModeValue('gray.600', 'gray.400')
  const WhatColor = (page: string, type: string) => {
    if (page == type) {
      return activeColor
    } else {
      return inActiveColor
    }
  }
  return (
    <>
      <Box pt={4}>
        <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
          <Heading size="md">今週のジョッキー成績</Heading>

          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7}>
              <Button onClick={toggleColorMode} mr={2}>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <hr></hr>
    </>
  );
}