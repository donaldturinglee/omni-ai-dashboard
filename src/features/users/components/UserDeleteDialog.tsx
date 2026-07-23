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
import type { User } from "@/features/users/service";

export const UserDeleteDialog = ({
  open,
  user,
  onOpenChange,
  onConfirm,
}: {
  open: boolean;
  user?: User;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Delete user</DialogTitle>
        <DialogDescription>
          {user?.name} will lose access to this workspace. This action cannot be
          undone.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <DialogClose render={<Button type="button" variant="outline" />}>
          Cancel
        </DialogClose>
        <Button
          type="button"
          variant="destructive"
          onClick={() => {
            onConfirm();
            onOpenChange(false);
          }}
        >
          Delete user
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);
