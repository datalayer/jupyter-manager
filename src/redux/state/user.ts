export const userInitialState = {
  loading: true,
  error: {},
  user: null,
  users: [],
  user_page: { offset: 0, limit: 10 },
  name_filter: ''
};

export type UserState = {
  loading: boolean;
  error: any;
  user: User | null;
  users: User[];
  user_page: { offset: number; limit: number; total?: number; next?: any };
  name_filter: string;
};

export type Server = {
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  progress_url: string;
  ready: boolean;
  started: boolean | null;
  state: any;
  stopped: boolean;
  url: string;
  user_options: any;
};

export type User = {
  admin: boolean;
  auth_state: any;
  created: string;
  groups: string[];
  kind: 'user';
  last_activity: string | null;
  name: string;
  pending: boolean | null;
  roles: string[];
  server: Server | null;
  servers: Server[];
};
