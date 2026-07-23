import {
  DeleteRegular,
  EditRegular,
  EyeRegular,
  MoreHorizontalRegular,
  PersonAddRegular,
  SearchRegular,
} from "@gamecrafters/base-ui-icons";
import * as React from "react";

import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/InputGroup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/Table";
import {
  createUser,
  deleteUser,
  getInitials,
  initialUsers,
  retrieveUser,
  updateUser,
  type User,
  type UserDraft,
} from "@/features/users/service";
import { UserDeleteDialog } from "@/features/users/components/UserDeleteDialog";
import { UserDetailsDialog } from "@/features/users/components/UserDetailsDialog";
import { UserFormDialog } from "@/features/users/components/UserFormDialog";

type UserAction = "create" | "retrieve" | "update" | "delete";

export const Users = () => {
  const [users, setUsers] = React.useState<User[]>(initialUsers);
  const [action, setAction] = React.useState<UserAction>();
  const [selectedId, setSelectedId] = React.useState<string>();

  const selectedUser = selectedId ? retrieveUser(users, selectedId) : undefined;

  const openAction = (nextAction: UserAction, id?: string) => {
    setSelectedId(id);
    setAction(nextAction);
  };

  const closeAction = (open: boolean) => {
    if (!open) {
      setAction(undefined);
    }
  };

  const handleSubmit = (draft: UserDraft) => {
    if (action === "update" && selectedId) {
      setUsers(updateUser(users, selectedId, draft));

      return;
    }

    setUsers(createUser(users, draft));
  };

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <InputGroup className="w-56">
          <InputGroupInput
            aria-label="Search users"
            placeholder="Search users"
          />
          <InputGroupAddon>
            <SearchRegular />
          </InputGroupAddon>
        </InputGroup>
        <Button
          className="ml-auto"
          type="button"
          onClick={() => openAction("create")}
        >
          <PersonAddRegular aria-hidden="true" data-icon="inline-start" />
          Invite user
        </Button>
      </div>
      <div className="rounded-xl border border-border bg-card px-2 text-card-foreground">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last active</TableHead>
              <TableHead className="w-0" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar size="sm">
                      <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-medium">{user.name}</span>
                      <span className="text-muted-foreground">
                        {user.email}
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.role}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.status}
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {user.lastActive}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      render={
                        <Button
                          aria-label={`Actions for ${user.name}`}
                          size="icon-sm"
                          type="button"
                          variant="ghost"
                        />
                      }
                    >
                      <MoreHorizontalRegular />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-40">
                      <DropdownMenuItem
                        onClick={() => openAction("retrieve", user.id)}
                      >
                        <EyeRegular aria-hidden="true" />
                        View details
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openAction("update", user.id)}
                      >
                        <EditRegular aria-hidden="true" />
                        Edit user
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        variant="destructive"
                        onClick={() => openAction("delete", user.id)}
                      >
                        <DeleteRegular aria-hidden="true" />
                        Delete user
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <UserFormDialog
        key={selectedId ?? "create"}
        open={action === "create" || action === "update"}
        user={action === "update" ? selectedUser : undefined}
        onOpenChange={closeAction}
        onSubmit={handleSubmit}
      />
      <UserDetailsDialog
        open={action === "retrieve"}
        user={selectedUser}
        onOpenChange={closeAction}
      />
      <UserDeleteDialog
        open={action === "delete"}
        user={selectedUser}
        onOpenChange={closeAction}
        onConfirm={() => selectedId && setUsers(deleteUser(users, selectedId))}
      />
    </div>
  );
};
