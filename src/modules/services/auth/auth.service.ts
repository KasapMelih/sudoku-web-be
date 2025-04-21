import { prisma } from "../../../db/connection";

export async function _signUp(params: any) {
  const { email, username, role, password } = params;
  try {
    const user = await prisma.user.create({
      data: {
        email,
        username,
        role,
        password,
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
