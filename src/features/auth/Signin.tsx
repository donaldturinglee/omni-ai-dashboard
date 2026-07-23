import {
  ArrowRightRegular,
  EyeOffRegular,
  EyeRegular,
  LockClosedRegular,
  MailRegular,
} from "@gamecrafters/base-ui-icons";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/Button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/Empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/InputGroup";
import { routePaths } from "@/router/routes";

type SigninErrors = {
  email?: string;
  password?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [errors, setErrors] = React.useState<SigninErrors>({});

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: SigninErrors = {};

    if (!email) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    }

    setErrors(nextErrors);

    if (nextErrors.email || nextErrors.password) {
      return;
    }

    navigate(routePaths.home);
  };

  return (
    <Empty className="min-h-screen">
      <EmptyHeader>
        <EmptyTitle>Sign in</EmptyTitle>
      </EmptyHeader>
      <EmptyContent>
        <form
          noValidate
          className="flex w-full flex-col gap-2.5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <InputGroup>
              <InputGroupInput
                aria-describedby={errors.email ? "email-error" : undefined}
                aria-invalid={Boolean(errors.email)}
                aria-label="Email"
                autoComplete="email"
                name="email"
                placeholder="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <InputGroupAddon>
                <MailRegular />
              </InputGroupAddon>
            </InputGroup>
            {errors.email ? (
              <p
                id="email-error"
                className="text-left text-sm text-destructive"
              >
                {errors.email}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <InputGroup>
              <InputGroupInput
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                aria-invalid={Boolean(errors.password)}
                aria-label="Password"
                autoComplete="current-password"
                name="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <InputGroupAddon>
                <LockClosedRegular />
              </InputGroupAddon>
              <InputGroupAddon align="inline-end">
                <InputGroupButton
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  size="icon-xs"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOffRegular /> : <EyeRegular />}
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
            {errors.password ? (
              <p
                id="password-error"
                className="text-left text-sm text-destructive"
              >
                {errors.password}
              </p>
            ) : null}
          </div>
          <Button type="submit">
            Sign in
            <ArrowRightRegular aria-hidden="true" data-icon="inline-end" />
          </Button>
        </form>
        <EmptyDescription>
          Don&apos;t have an account? <a href="#">Sign up</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  );
};
