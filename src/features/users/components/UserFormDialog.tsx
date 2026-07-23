import * as React from "react";

import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import {
  emptyUserDraft,
  userRoles,
  userStatuses,
  type UserDraft,
} from "@/features/users/service";

type UserFormErrors = {
  name?: string;
  email?: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const UserFormDialog = ({
  open,
  user,
  onOpenChange,
  onSubmit,
}: {
  open: boolean;
  user?: UserDraft;
  onOpenChange: (open: boolean) => void;
  onSubmit: (draft: UserDraft) => void;
}) => {
  const [draft, setDraft] = React.useState<UserDraft>(user ?? emptyUserDraft);
  const [errors, setErrors] = React.useState<UserFormErrors>({});

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen) {
      setDraft(user ?? emptyUserDraft);
      setErrors({});
    }
    onOpenChange(nextOpen);
  };

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: UserFormErrors = {};

    if (!draft.name) {
      nextErrors.name = "Name is required.";
    }

    if (!draft.email) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(draft.email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    setErrors(nextErrors);

    if (nextErrors.name || nextErrors.email) {
      return;
    }

    onSubmit(draft);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{user ? "Edit user" : "Invite user"}</DialogTitle>
          <DialogDescription>
            {user
              ? "Update the details for this workspace member."
              : "Send an invitation to join this workspace."}
          </DialogDescription>
        </DialogHeader>
        <form
          noValidate
          id="user-form"
          className="flex flex-col gap-2.5"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col gap-1.5">
            <Input
              aria-describedby={errors.name ? "user-name-error" : undefined}
              aria-invalid={Boolean(errors.name)}
              aria-label="Name"
              name="name"
              placeholder="Name"
              value={draft.name}
              onChange={(event) =>
                setDraft({ ...draft, name: event.target.value })
              }
            />
            {errors.name ? (
              <p
                id="user-name-error"
                className="text-left text-sm text-destructive"
              >
                {errors.name}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col gap-1.5">
            <Input
              aria-describedby={errors.email ? "user-email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              aria-label="Email"
              name="email"
              placeholder="Email"
              type="email"
              value={draft.email}
              onChange={(event) =>
                setDraft({ ...draft, email: event.target.value })
              }
            />
            {errors.email ? (
              <p
                id="user-email-error"
                className="text-left text-sm text-destructive"
              >
                {errors.email}
              </p>
            ) : null}
          </div>
          <Select
            value={draft.role}
            onValueChange={(role) => role && setDraft({ ...draft, role })}
          >
            <SelectTrigger aria-label="Role" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userRoles.map((role) => (
                  <SelectItem key={role} value={role}>
                    {role}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={draft.status}
            onValueChange={(status) => status && setDraft({ ...draft, status })}
          >
            <SelectTrigger aria-label="Status" className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {userStatuses.map((status) => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </form>
        <DialogFooter>
          <DialogClose render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button form="user-form" type="submit">
            {user ? "Save changes" : "Send invite"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
