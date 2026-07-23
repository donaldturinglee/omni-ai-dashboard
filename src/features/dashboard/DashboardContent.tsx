import {
  ArrowTrendingRegular,
  ChatRegular,
  PeopleRegular,
  SparkleRegular,
} from "@gamecrafters/base-ui-icons";

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

export const DashboardContent = () => (
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
