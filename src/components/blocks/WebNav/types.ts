export type WebNavItem = {
  title: string;
  href?: string;
  description?: string;
  tag?: string;
  disabled?: boolean;
  children?: WebNavItem[];
};

export type WebNavProps = {
  menu?: WebNavItem[];
};
