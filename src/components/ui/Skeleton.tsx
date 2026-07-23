import { classNames } from "@/utilities/classnames";

const Skeleton = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    data-slot="skeleton"
    className={classNames("animate-pulse rounded-md bg-muted", className)}
    {...props}
  />
);

export { Skeleton };
