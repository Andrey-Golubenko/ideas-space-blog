import { UserRole } from '@prisma/client'
import { NextResponse } from 'next/server'
import { getUserRole } from '~/utils/helpers/server.helpers'

export async function GET() {
  const userRole = await getUserRole()

  if (userRole === UserRole.ADMIN) {
    return new NextResponse(null, { status: 200 })
  }

  return new NextResponse(null, { status: 403 })
}
