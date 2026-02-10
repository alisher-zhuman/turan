import { z } from "zod";
import { ROLE } from "@/shared/constants";

export const RoleSchema = z.enum([
  ROLE.SUPER_ADMIN,
  ROLE.ADMIN,
  ROLE.USER,
  ROLE.CONTROLLER,
]);

export const IdNameSchema = z
  .object({
    id: z.number(),
    name: z.string(),
  })
  .passthrough();
