import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
import clientPromise from '@/lib/mongodb'
import { getServerSession } from 'next-auth'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession()
    if (!session) {
      return NextResponse.json(
        { error: 'Non autorisé' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { status } = body

    if (!status) {
      return NextResponse.json(
        { error: 'Status requis' },
        { status: 400 }
      )
    }

    const client = await clientPromise
    const db = client.db("fabriq3d")
    
    const result = await db.collection("orders").updateOne(
      { _id: new ObjectId(params.id) },
      { $set: { status, updatedAt: new Date() } }
    )

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour' },
      { status: 500 }
    )
  }
}
