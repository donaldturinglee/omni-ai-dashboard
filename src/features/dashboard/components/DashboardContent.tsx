import {
  ArrowTrendingRegular,
  ChatRegular,
  PeopleRegular,
  SparkleRegular,
} from "@gamecrafters/base-ui-icons";
import { LineChart, type LineSeriesOption } from "echarts/charts";
import {
  GridComponent,
  type GridComponentOption,
  TooltipComponent,
  type TooltipComponentOption,
} from "echarts/components";
import * as echarts from "echarts/core";
import type { ComposeOption } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import * as React from "react";

echarts.use([CanvasRenderer, GridComponent, LineChart, TooltipComponent]);

type DashboardChartOption = ComposeOption<
  GridComponentOption | LineSeriesOption | TooltipComponentOption
>;

// The --chart-* / --border / --muted-foreground tokens in src/styles/main.css are
// declared in oklch(), which ECharts cannot parse, so their sRGB equivalents are
// mirrored here.
const chartColors = {
  line: "#525252",
  area: "rgba(82, 82, 82, 0.1)",
  grid: "#e5e5e5",
  muted: "#737373",
  surface: "#ffffff",
};

const statistics = [
  {
    label: "Conversations",
    value: "2,481",
    change: "+12.4%",
    icon: ChatRegular,
  },
  {
    label: "Active users",
    value: "1,024",
    change: "+4.1%",
    icon: PeopleRegular,
  },
  {
    label: "Tokens used",
    value: "8.6M",
    change: "+18.2%",
    icon: SparkleRegular,
  },
  {
    label: "Avg. latency",
    value: "312ms",
    change: "-6.8%",
    icon: ArrowTrendingRegular,
  },
];

const conversationVolume = [
  { date: "Jul 10", value: 148 },
  { date: "Jul 11", value: 162 },
  { date: "Jul 12", value: 139 },
  { date: "Jul 13", value: 171 },
  { date: "Jul 14", value: 184 },
  { date: "Jul 15", value: 176 },
  { date: "Jul 16", value: 195 },
  { date: "Jul 17", value: 188 },
  { date: "Jul 18", value: 122 },
  { date: "Jul 19", value: 143 },
  { date: "Jul 20", value: 170 },
  { date: "Jul 21", value: 214 },
  { date: "Jul 22", value: 228 },
  { date: "Jul 23", value: 241 },
];

const activities = [
  {
    title: "Support assistant deployed",
    description: "Version 2.4 is now serving the production workspace.",
    timestamp: "2m ago",
  },
  {
    title: "Knowledge base synced",
    description: "1,204 documents were indexed without errors.",
    timestamp: "1h ago",
  },
  {
    title: "New member joined",
    description: "Avery Chen accepted the invitation to the workspace.",
    timestamp: "3h ago",
  },
  {
    title: "Usage limit updated",
    description: "The monthly token budget was raised to 12M.",
    timestamp: "Yesterday",
  },
];

export const DashboardContent = () => {
  const chartRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const container = chartRef.current;
    if (!container) {
      return;
    }

    const chart = echarts.init(container);
    const option: DashboardChartOption = {
      grid: { top: 8, right: 48, bottom: 24, left: 40 },
      tooltip: {
        trigger: "axis",
        axisPointer: { type: "line", lineStyle: { color: chartColors.grid } },
        borderWidth: 0,
        formatter: (params) => {
          const [point] = Array.isArray(params) ? params : [params];

          return `<strong>${point.value}</strong> conversations<br />${point.name}`;
        },
      },
      xAxis: {
        type: "category",
        boundaryGap: false,
        data: conversationVolume.map((entry) => entry.date),
        axisLine: { lineStyle: { color: chartColors.grid } },
        axisTick: { show: false },
        axisLabel: { color: chartColors.muted },
      },
      yAxis: {
        type: "value",
        splitLine: { lineStyle: { color: chartColors.grid } },
        axisLabel: {
          color: chartColors.muted,
          formatter: (value: number) => value.toLocaleString(),
        },
      },
      series: [
        {
          type: "line",
          name: "Conversations",
          data: conversationVolume.map((entry) => entry.value),
          showSymbol: false,
          symbolSize: 8,
          lineStyle: { color: chartColors.line, width: 2, cap: "round" },
          itemStyle: {
            color: chartColors.line,
            borderColor: chartColors.surface,
            borderWidth: 2,
          },
          areaStyle: { color: chartColors.area },
          endLabel: {
            show: true,
            color: chartColors.muted,
            offset: [4, 0],
            formatter: (params) => `${params.value}`,
          },
        },
      ],
    };

    chart.setOption(option);

    const observer = new ResizeObserver(() => chart.resize());
    observer.observe(container);

    return () => {
      observer.disconnect();
      chart.dispose();
    };
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((statistic) => (
          <div
            key={statistic.label}
            className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4 text-card-foreground"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-sm text-muted-foreground">
                {statistic.label}
              </span>
              <statistic.icon aria-hidden="true" className="size-4" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-xl font-medium tracking-tight">
                {statistic.value}
              </span>
              <span className="text-sm text-muted-foreground">
                {statistic.change}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground">
        <h2 className="font-heading text-sm font-medium tracking-tight">
          Conversation volume
        </h2>
        <div ref={chartRef} className="h-64 w-full" />
        <table className="sr-only">
          <caption>Conversation volume by day</caption>
          <thead>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Conversations</th>
            </tr>
          </thead>
          <tbody>
            {conversationVolume.map((entry) => (
              <tr key={entry.date}>
                <th scope="row">{entry.date}</th>
                <td>{entry.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-3 rounded-xl border border-border bg-card p-4 text-card-foreground">
        <h2 className="font-heading text-sm font-medium tracking-tight">
          Recent activity
        </h2>
        <ul className="flex flex-col">
          {activities.map((activity) => (
            <li
              key={activity.title}
              className="flex items-start justify-between gap-4 border-b border-border py-2.5 last:border-b-0 last:pb-0"
            >
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium">{activity.title}</span>
                <span className="text-sm text-muted-foreground">
                  {activity.description}
                </span>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">
                {activity.timestamp}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
