
import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link } from '@chakra-ui/react'

export function ResultTable({ data }: { data: any }) {
  return (
    <Box>
      {Object.keys(data).map((key: any) => (
        <Box py={4} key={key}>
          {key.split(".")[0]}
          <Table size="sm" mt={4} key={key}>
            <Thead>
              <Tr>
                <Th>名前</Th>
                <Th>勝ち鞍</Th>
                <Th>着順</Th>
                <Th>人気</Th>
              </Tr>
            </Thead>
            {data[key].filter((d: { win_cnt: number }) => d.win_cnt > 0).map((j: any, index: number) => (
              <Tr key={index}>
                <Td minW={20}>
                  <Link color='blue.500' href={j.url} target="_blank" rel="noopener">
                  {j.name}
                  </Link>
                  
                </Td>
                <Td minW={20}>{j.win_cnt}</Td>
                <Td minW={20}>{j.rank_arr}</Td>
                <Td minW={20}>{j.odds_rank_arr}</Td>
              </Tr>
            ))}
          </Table>
        </Box>
      ))}
    </Box>
  )
}

