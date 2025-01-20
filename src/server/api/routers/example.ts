import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

const idSchema = z.object({ id: z.string() });

const userSchema = z.object({
  name: z.string(),
  email: z.string(),
});

const userUpdateSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
});

export const exampleRouter = createTRPCRouter({
  
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),

  
  getOne: publicProcedure
    .input(idSchema)
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findUnique({
        where: { id: input.id }, // Correctly specify the `where` condition
      });
    }),

  
  createUser: publicProcedure
    .input(userSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.create({
        data: input, 
      });
    }),

 
  updateUser: publicProcedure
    .input(userUpdateSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.update({
        where: { id: input.id }, 
        data: {
          name: input.name,
          email: input.email,
        }, 
      });
    }),

  
  deleteUser: publicProcedure
    .input(idSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.user.delete({
        where: { id: input.id }, 
      });
    }),
});
