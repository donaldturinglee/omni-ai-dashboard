export type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastActive: string;
};

export type UserDraft = Pick<User, "name" | "email" | "role" | "status">;

export const userRoles = ["Owner", "Admin", "Member", "Viewer"];

export const userStatuses = ["Active", "Invited", "Suspended"];

export const initialUsers: User[] = [
  {
    id: "usr_01",
    name: "Avery Chen",
    email: "avery.chen@omni.ai",
    role: "Owner",
    status: "Active",
    lastActive: "2m ago",
  },
  {
    id: "usr_02",
    name: "Jordan Blake",
    email: "jordan.blake@omni.ai",
    role: "Admin",
    status: "Active",
    lastActive: "1h ago",
  },
  {
    id: "usr_03",
    name: "Priya Raman",
    email: "priya.raman@omni.ai",
    role: "Member",
    status: "Active",
    lastActive: "3h ago",
  },
  {
    id: "usr_04",
    name: "Sam Okafor",
    email: "sam.okafor@omni.ai",
    role: "Member",
    status: "Invited",
    lastActive: "Never",
  },
  {
    id: "usr_05",
    name: "Lena Vogt",
    email: "lena.vogt@omni.ai",
    role: "Viewer",
    status: "Suspended",
    lastActive: "Yesterday",
  },
];

export const emptyUserDraft: UserDraft = {
  name: "",
  email: "",
  role: "Member",
  status: "Invited",
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export const createUser = (users: User[], draft: UserDraft): User[] => [
  ...users,
  {
    ...draft,
    id: `usr_${String(users.length + 1).padStart(2, "0")}`,
    lastActive: "Never",
  },
];

export const retrieveUser = (users: User[], id: string) =>
  users.find((user) => user.id === id);

export const updateUser = (
  users: User[],
  id: string,
  draft: UserDraft,
): User[] =>
  users.map((user) => (user.id === id ? { ...user, ...draft } : user));

export const deleteUser = (users: User[], id: string): User[] =>
  users.filter((user) => user.id !== id);
