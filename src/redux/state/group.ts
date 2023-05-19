export const groupInitialState = {
  loading: true,
  error: "A group error",
  group: null,
  groups: [],
  group_page: { offset: 0, limit: 10 }
};

export type GroupState = {
  loading: boolean;
  error: any;
  group: Group | null;
  groups: Group[];
  group_page: { offset: number; limit: number; total?: number; next?: any };
};

export type Group = {
  kind: 'group';
  name: string;
  properties: Record<string, any>;
  roles: string[];
  users: string[];
};
