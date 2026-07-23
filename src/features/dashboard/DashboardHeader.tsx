import { AlertRegular, SearchRegular } from "@gamecrafters/base-ui-icons";

import { Button } from "@/components/ui/Button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup";

export const DashboardHeader = () => (
  <header className="flex items-center gap-2 border-b border-border px-4 py-3">
    <InputGroup className="hidden w-56 md:flex">
      <InputGroupInput aria-label="Search" placeholder="Search" />
      <InputGroupAddon>
        <SearchRegular />
      </InputGroupAddon>
    </InputGroup>
    <div className="ml-auto flex items-center gap-2">
      <Button
        aria-label="Notifications"
        size="icon"
        type="button"
        variant="ghost"
      >
        <AlertRegular />
      </Button>
    </div>
  </header>
);
