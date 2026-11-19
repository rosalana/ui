import type { ClassValue } from 'vue';
import type { WebNavItem } from '../WebNav/types';

export type SideNavItem = WebNavItem & {
  defaultOpen?: boolean;
};
export type SideNavProps = {
  menu?: SideNavItem[];
  class?: ClassValue;
};
