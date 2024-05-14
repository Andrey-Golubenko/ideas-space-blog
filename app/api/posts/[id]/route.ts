import { NextResponse } from 'next/server'
import { headers, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params

  // only readonly ))
  const headersList = headers()
  const type = headersList.get('Content-Type')

  // Not only readonly ))
  const cookiesList = cookies()
  const cook1 = cookiesList.get('Cookie_1')?.value

  // logic for delete post
  // redirect('/blog')

  return NextResponse.json({ id, type, cook1 })
}
