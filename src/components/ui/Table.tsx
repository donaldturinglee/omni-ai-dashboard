import * as React from "react";

import { classNames } from "@/utilities/classnames";

const Table = ({ className, ...props }: React.ComponentProps<"table">) => (
  <div data-slot="table-container" className="relative w-full overflow-x-auto">
    <table
      data-slot="table"
      className={classNames("w-full caption-bottom text-sm", className)}
      {...props}
    />
  </div>
);

const TableHeader = ({
  className,
  ...props
}: React.ComponentProps<"thead">) => (
  <thead
    data-slot="table-header"
    className={classNames("[&_tr]:border-b", className)}
    {...props}
  />
);

const TableBody = ({ className, ...props }: React.ComponentProps<"tbody">) => (
  <tbody
    data-slot="table-body"
    className={classNames("[&_tr:last-child]:border-0", className)}
    {...props}
  />
);

const TableFooter = ({
  className,
  ...props
}: React.ComponentProps<"tfoot">) => (
  <tfoot
    data-slot="table-footer"
    className={classNames(
      "border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
      className,
    )}
    {...props}
  />
);

const TableRow = ({ className, ...props }: React.ComponentProps<"tr">) => (
  <tr
    data-slot="table-row"
    className={classNames(
      "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
      className,
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: React.ComponentProps<"th">) => (
  <th
    data-slot="table-head"
    className={classNames(
      "h-10 px-2 text-left align-middle font-medium whitespace-nowrap text-foreground [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);

const TableCell = ({ className, ...props }: React.ComponentProps<"td">) => (
  <td
    data-slot="table-cell"
    className={classNames(
      "p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
      className,
    )}
    {...props}
  />
);

const TableCaption = ({
  className,
  ...props
}: React.ComponentProps<"caption">) => (
  <caption
    data-slot="table-caption"
    className={classNames("mt-4 text-sm text-muted-foreground", className)}
    {...props}
  />
);

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
};
