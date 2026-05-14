import type { WebNavItem, WebNavProps } from '../WebNav/types';

export type SideNavItem = WebNavItem & {
  defaultOpen?: boolean;
};
export type SideNavProps = {
  menu?: SideNavItem[];
};
