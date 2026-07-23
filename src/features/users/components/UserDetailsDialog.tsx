import { Avatar, AvatarFallback } from "@/components/ui/Avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { getInitials, type User } from "@/features/users/service";

export const UserDetailsDialog = ({
  open,
  user,
  onOpenChange,
}: {
  open: boolean;
  user?: User;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>User details</DialogTitle>
        <DialogDescription>
          Everything recorded for this workspace member.
        </DialogDescription>
      </DialogHeader>
      {user ? (
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-medium">{user.name}</span>
              <span className="text-muted-foreground">{user.email}</span>
            </div>
          </div>
          <dl className="flex flex-col">
            <div className="flex items-center justify-between gap-4 border-b border-border py-2 last:border-b-0">
              <dt className="text-muted-foreground">Role</dt>
              <dd>{user.role}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border py-2 last:border-b-0">
              <dt className="text-muted-foreground">Status</dt>
              <dd>{user.status}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-border py-2 last:border-b-0">
              <dt className="text-muted-foreground">Last active</dt>
              <dd>{user.lastActive}</dd>
            </div>
          </dl>
        </div>
      ) : null}
      <DialogFooter showCloseButton />
    </DialogContent>
  </Dialog>
);
