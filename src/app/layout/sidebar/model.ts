export interface SidebarItem {
  label: string;
  icon?: string;
  link?: string;
  isPublic: boolean;
  children?: Pick<SidebarItem, 'label' | 'link'>[];
}
