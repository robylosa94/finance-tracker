"use client"

import { MoveTypes } from "@/lib/types"
import { currencyFormatter } from "@/lib/utils"
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartOptions } from "chart.js"
import { Doughnut } from "react-chartjs-2"
import s from "./chart.module.css"

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  data: MoveTypes[]
}

export default function Chart({ data }: Props) {
  const getColorForeground =
    typeof window !== "undefined"
      ? window.getComputedStyle(document.documentElement).getPropertyValue("--color-foreground")
      : ""

  //Group tags
  const uniqueTags: any = {}
  const tagSet: any = []

  for (let i in data) {
    const tag = data[i].tag
    uniqueTags[tag.name] = data[i].tag
  }

  for (let i in uniqueTags) {
    tagSet.push(uniqueTags[i])
  }

  //Group amounts by tag
  const uniqueAmounts = data.reduce((object: any, item: MoveTypes) => {
    const tag = item.tag.name
    const amount = item.amount

    if (!object.hasOwnProperty(tag)) {
      object[tag] = amount
    } else {
      object[tag] += amount
    }

    return object
  }, {})

  tagSet.map((tag: any) => {
    tag.amount = uniqueAmounts[tag.name]
  })

  const tagNames = tagSet.map((tag: any) => tag.name)
  const tagColors = tagSet.map((tag: any) => tag.color)
  const tagAmounts = tagSet.map((tag: any) => tag.amount)

  const chartOptions: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          boxHeight: 9,
          boxWidth: 9,
          color: `rgb(${getColorForeground})`,
          font: {
            family: "Manrope",
            weight: "500",
          },
          padding: 20,
          usePointStyle: true,
        },
        onClick: () => void 0,
        position: "right",
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            let label = " "

            if (context.parsed !== null) {
              label += currencyFormatter(context.parsed)
            }

            return label
          },
        },
        multiKeyBackground: "rgba(0,0,0,0)",
        usePointStyle: true,
      },
    },
  }

  return (
    <div className={s.root}>
      <Doughnut
        data={{
          labels: tagNames,
          datasets: [
            {
              data: tagAmounts,
              backgroundColor: tagColors,
              borderColor: tagColors,
              borderWidth: 0,
            },
          ],
        }}
        options={chartOptions}
      />
    </div>
  )
}
