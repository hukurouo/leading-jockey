import { Table, Thead, Tbody, Tr, Th, Td, Box, Text, Link } from '@chakra-ui/react'
import { Line } from 'react-chartjs-2';
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export function LinerGraph({ data }: { data: any }) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          boxWidth: 20
        }
      }
    },
  };
  function dateTrim(date: string) {
    return date.split("-")[1] + "/" + date.split("-")[2]
  }
  const colors = [
    'rgba(255, 99, 132, 0.5)',
    'rgba(54, 162, 235, 0.5)',
    'rgba(255, 206, 86, 0.5)',
    'rgba(75, 192, 192, 0.5)',
    'rgba(153, 102, 255, 0.5)',
    'rgba(255, 159, 64, 0.5)',
    'rgba(54, 62, 235, 0.5)',
    'rgba(255, 99, 32, 0.5)',
  ]
  function genGraphData(data: any): {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  } {
    const labels = Object.keys(data).map((key: any) => dateTrim(key)).reverse()
    const latest_key = Object.keys(data)[0]
    const latest_hash_keys = Object.keys(data[latest_key])
    const list: any[] = []
    latest_hash_keys.forEach((key: string) => {
      const row = [key]
      row.push(data[latest_key][key].name)
      row.push(data[latest_key][key].cnt)
      list.push(row)
    }
    )
    const sortedlist = list.sort(function (a: any, b: any) {
      if (a[2] > b[2]) return -1;
      if (a[2] < b[2]) return 1;
      return 0;
    });
    const datasets: any = []
    sortedlist.slice(0, 8).forEach((l: any[], index: number) => {
      const jockey_id = l[0]
      const name = l[1]
      const win_cnts: any[] = []
      Object.keys(data).forEach((key: string) => {
        if (data[key][jockey_id]) {
          const win_cnt = data[key][jockey_id].cnt
          win_cnts.push(win_cnt)
        } else {
          win_cnts.push(win_cnts[-1])
        }
      })
      datasets.push(
        {
          label: name,
          data: win_cnts.reverse(),
          backgroundColor: colors[index],
          borderColor: colors[index]
        }
      )
    })
    const graphData = {
      labels,
      datasets,
    }
    return graphData
  }

  return (
    <>
      <Line options={options} data={genGraphData(data)} height={"220"} />
    </>
  )
}