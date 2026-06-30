const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Cleaning up mock data...');

  const deletedEmails = await prisma.emailMessage.deleteMany({
    where: { body: { contains: 'InsureFlow CRM' } }
  });
  console.log(`Deleted ${deletedEmails.count} mock emails`);
  
  const deletedThreads = await prisma.emailThread.deleteMany({
    where: { subject: { contains: "Urgent: Policy Renewal" } }
  });
  console.log(`Deleted ${deletedThreads.count} mock threads`);

  const deletedMessages = await prisma.message.deleteMany({
    where: { body: { contains: 'homeowners insurance' } }
  });
  console.log(`Deleted ${deletedMessages.count} mock messages`);
  
  const deletedMessages2 = await prisma.message.deleteMany({
    where: { body: { contains: 'quick 5-minute call' } }
  });
  console.log(`Deleted ${deletedMessages2.count} mock messages`);

  const deletedOpps = await prisma.opportunity.deleteMany({
    where: {
      OR: [
        { title: "Auto Policy Renewal" },
        { title: "Home Insurance Quote" }
      ]
    }
  });
  console.log(`Deleted ${deletedOpps.count} mock opportunities`);

  const deletedContacts = await prisma.contact.deleteMany({
    where: {
      OR: [
        { firstName: "Robert", lastName: "Patterson" },
        { firstName: "Samantha", lastName: "Reed" }
      ]
    }
  });
  console.log(`Deleted ${deletedContacts.count} mock contacts`);

  console.log('Cleanup complete!');
}

main().catch(console.error).finally(() => prisma.$disconnect());
