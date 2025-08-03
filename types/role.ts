export interface Permission {
  id: string
  name: string
  description: string
  resource: string
  action: "create" | "read" | "update" | "delete" | "manage"
}

export interface Role {
  id: string
  name: string
  description: string
  permissions: Permission[]
  level: number
}

export const ROLES = {
  READER: "reader",
  WRITER: "writer",
  MAINTAINER: "maintainer",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const

export const ROLE_LEVELS = {
  [ROLES.READER]: 1,
  [ROLES.WRITER]: 2,
  [ROLES.MAINTAINER]: 3,
  [ROLES.ADMIN]: 4,
  [ROLES.SUPER_ADMIN]: 5,
} as const
