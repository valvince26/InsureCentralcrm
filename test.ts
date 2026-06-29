import prisma from './src/lib/prisma';

async function main() {
  try {
    const count = await prisma.user.count();
    console.log("Success! Users:", count);
  } catch (e) {
    console.error("Prisma error:", e);
  }
}
main();
