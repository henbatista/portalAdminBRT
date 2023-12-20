interface UserComplete {
  tenant_id: number;
  name: string;
}

export interface ListUserComplete extends Array<UserComplete> {}
