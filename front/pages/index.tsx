import type { NextPage } from 'next'
import Head from 'next/head'
import { Box, Container, Heading, Flex } from '@chakra-ui/react'
import { Layout } from "../components/Layout"
import { ResultTable } from '../components/ResultTable'
import { getSortedJsonData, getSortedTotalJsonData } from "../lib/get_json"
import { GetStaticProps } from "next";
import { LinerGraph } from '../components/LinerGraph'

const siteTitle = "weekly jockey result"

function Home({jsonData, jsonTotalData}:{jsonData:any, jsonTotalData:any}){
  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content="A page summarizing the riding results of this week's jockeys in horse racing" />
        <meta name="og:title" content={siteTitle} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <LinerGraph data={jsonTotalData}></LinerGraph>
        <ResultTable data={jsonData}></ResultTable>
      </main>
    </Layout>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const jsonData = getSortedJsonData();
  const jsonTotalData = getSortedTotalJsonData();
  return {
    props: {
      jsonData,
      jsonTotalData,
    },
  };
};