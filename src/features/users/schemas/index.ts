import { z } from "zod";

import { canSelectCompanyForRole } from "@/shared/helpers";
import type { Role } from "@/shared/types";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createUserFormSchema = (
  actorRole: Role | undefined,
  isEditing: boolean,
) =>
  z
    .object({
      email: z.string().optional(),
      firstName: z.string().trim().min(3, "Имя должно быть не менее 3 символов"),
      lastName: z
        .string()
        .trim()
        .min(3, "Фамилия должно быть не менее 3 символов"),
      role: z.string(),
      companyId: z.number().nullable().optional(),
    })
    .superRefine((values, ctx) => {
      if (!isEditing) {
        if (!values.email || values.email.length < 3) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email должен быть не менее 3 символов",
            path: ["email"],
          });
        } else if (!EMAIL_REGEX.test(values.email)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Email должен быть валидным",
            path: ["email"],
          });
        }
      }

      const shouldSelectCompany = canSelectCompanyForRole(
        actorRole,
        values.role as Role,
      );

      if (shouldSelectCompany && !values.companyId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Выберите компанию",
          path: ["companyId"],
        });
      }
    });
