const { z } = require('zod');

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6)
});

const registerSchema = z.object({
  parent: z.object({
    name: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(6),
    phone: z.string().min(8)
  }),
  student: z.object({
    name: z.string().min(3),
    registration: z.string().min(3),
    birthDate: z.string().datetime(),
    classId: z.number().int().positive()
  })
});

const forgotPasswordSchema = z.object({
  email: z.string().email()
});

module.exports = { loginSchema, registerSchema, forgotPasswordSchema };
