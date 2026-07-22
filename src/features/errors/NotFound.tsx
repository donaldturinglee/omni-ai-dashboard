import {
  ArrowLeftRegular,
  HomeRegular,
  SearchRegular,
} from "@gamecrafters/base-ui-icons";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Kbd } from "@/components/ui/kbd";
import { routePaths } from "@/router/routes";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyTitle>404 - Not Found</EmptyTitle>
        <EmptyDescription>
          The page you&apos;re looking for doesn&apos;t exist. Try searching for
          what you need below.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <InputGroup className="sm:w-3/4">
          <InputGroupInput
            aria-label="Search pages"
            placeholder="Try searching for pages..."
          />
          <InputGroupAddon>
            <SearchRegular />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon>
        </InputGroup>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeftRegular aria-hidden="true" data-icon="inline-start" />
            Back
          </Button>
          <Button type="button" onClick={() => navigate(routePaths.home)}>
            <HomeRegular aria-hidden="true" data-icon="inline-start" />
            Home
          </Button>
        </div>
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};
