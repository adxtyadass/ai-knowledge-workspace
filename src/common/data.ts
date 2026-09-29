import {
  AddressBookIcon,
  HouseIcon,
  InfoIcon,
  PhoneCallIcon,
} from "@phosphor-icons/react";

export const sideBarItems = [
  {
    label: "Home",
    icon: HouseIcon,
    href: "/home",
  },
  {
    label: "About",
    icon: InfoIcon,
    href: "/about",
  },
  {
    label: "Contact",
    icon: PhoneCallIcon,
    href: "/contact",
  },
  {
    label: "Directory",
    icon: AddressBookIcon,
    href: "/",
  },
];

export const mockUsers = [
  {
    id: "user-1",
    name: "Demo User",
    email: "demo@example.com",
    password: "password123",
    role: "user",
  },
];