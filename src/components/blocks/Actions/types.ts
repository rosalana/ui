import {
  DropdownMenuContentEmits,
  DropdownMenuContentProps,
  DropdownMenuRootEmits,
  DropdownMenuRootProps,
} from "reka-ui";

export type ActionItem = {
  label: string;
  class?: string;
  onClick: () => void;
  icon?: string;
  disabled?: boolean;
  hidden?: boolean;
  children?: ActionItem[];
};

export interface ActionsProps {
  /** Array of action items */
  items: ActionItem[];
  /** Custom class for the actions container */
  class?: string;
  /** Optional label for the actions block */
  label?: string;
  /** Whether to show empty state when no actions are available */
  showEmptyState?: boolean;

  /** Dropdown menu root props */
  open?: DropdownMenuRootProps["open"];
  defaultOpen?: DropdownMenuRootProps["defaultOpen"];
  modal?: DropdownMenuRootProps["modal"];

  /** Dropdown menu content props */
  align?: DropdownMenuContentProps["align"];
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  sideFlip?: DropdownMenuContentProps["sideFlip"];
  alignFlip?: DropdownMenuContentProps["alignFlip"];
  alignOffset?: DropdownMenuContentProps["alignOffset"];
  arrowPadding?: DropdownMenuContentProps["arrowPadding"];
  avoidCollisions?: DropdownMenuContentProps["avoidCollisions"];
  collisionBoundary?: DropdownMenuContentProps["collisionBoundary"];
  collisionPadding?: DropdownMenuContentProps["collisionPadding"];
  disableUpdateOnLayoutShift?: DropdownMenuContentProps["disableUpdateOnLayoutShift"];
  forceMount?: DropdownMenuContentProps["forceMount"];
  hideWhenDetached?: DropdownMenuContentProps["hideWhenDetached"];
  loop?: DropdownMenuContentProps["loop"];
  positionStrategy?: DropdownMenuContentProps["positionStrategy"];
  prioritizePosition?: DropdownMenuContentProps["prioritizePosition"];
  updatePositionStrategy?: DropdownMenuContentProps["updatePositionStrategy"];
  sticky?: DropdownMenuContentProps["sticky"];
}

export interface ActionsEmits {
  "update:open": DropdownMenuRootEmits["update:open"];
}
