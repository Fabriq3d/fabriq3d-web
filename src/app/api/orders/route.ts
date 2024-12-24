import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const client = await clientPromise
    const db = client.db("fabriq3d")
    
    const order = await db.collection("orders").insertOne({
      ...body,
      createdAt: new Date(),
      status: 'pending'
    })

    return NextResponse.json({ orderId: order.insertedId })
  } catch (error) {
    console.error('Error creating order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const client = await clientPromise
    const db = client.db("fabriq3d")
    
    const orders = await db.collection("orders")
      .find({})
      .sort({ createdAt: -1 })
      .toArray()

    return NextResponse.json(orders)
  } catch (error) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: 'Failed to fetch orders' },
      { status: 500 }
    )
  }
}
