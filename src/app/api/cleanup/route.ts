import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const r1 = await prisma.emailMessage.deleteMany({
      where: { body: { contains: 'homeowners insurance' } }
    });
    
    const r2 = await prisma.emailThread.deleteMany({
      where: { subject: { contains: "Urgent: Policy Renewal" } }
    });

    const r3 = await prisma.message.deleteMany({
      where: { body: { contains: 'homeowners insurance' } }
    });

    const r4 = await prisma.opportunity.deleteMany({
      where: {
        OR: [
          { title: "Auto Policy Renewal" },
          { title: "Home Insurance Quote" }
        ]
      }
    });

    const r5 = await prisma.contact.deleteMany({
      where: {
        OR: [
          { firstName: "Robert", lastName: "Patterson" },
          { firstName: "Samantha", lastName: "Reed" }
        ]
      }
    });

    return NextResponse.json({
      emails: r1.count,
      threads: r2.count,
      messages: r3.count,
      opps: r4.count,
      contacts: r5.count
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
