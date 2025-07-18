"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Package, Truck, CheckCircle, Clock, Star, Eye, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const orders = [
  {
    id: "NF-2024-001",
    date: "2024-01-15",
    status: "shipped",
    total: 45.97,
    items: [
      {
        name: "Premium Jollof Rice Mix",
        image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
        quantity: 2,
        price: 12.99,
        seller: "Lagos Spice Co.",
      },
      {
        name: "Authentic Red Palm Oil (1L)",
        image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop",
        quantity: 1,
        price: 9.99,
        seller: "Delta Palm Ltd",
      },
      {
        name: "Crispy Plantain Chips (500g)",
        image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=100&h=100&fit=crop",
        quantity: 3,
        price: 6.99,
        seller: "Ogun Snacks",
      },
    ],
    tracking: "NF2024001TRACK",
    estimatedDelivery: "2024-01-25",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "NF-2024-002",
    date: "2024-01-10",
    status: "delivered",
    total: 32.5,
    items: [
      {
        name: "Maggi Seasoning Cubes (50pcs)",
        image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=100&h=100&fit=crop",
        quantity: 2,
        price: 8.99,
        seller: "Nestle Nigeria",
      },
      {
        name: "Zobo Leaves Premium (200g)",
        image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=100&h=100&fit=crop",
        quantity: 1,
        price: 5.99,
        seller: "Herbal Nigeria",
      },
    ],
    tracking: "NF2024002TRACK",
    deliveredDate: "2024-01-18",
    shippingMethod: "Express Shipping",
  },
  {
    id: "NF-2024-003",
    date: "2024-01-20",
    status: "processing",
    total: 67.45,
    items: [
      {
        name: "Mixed Dried Fish Assortment",
        image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=100&h=100&fit=crop",
        quantity: 1,
        price: 22.99,
        seller: "Rivers Fish Market",
      },
      {
        name: "Premium White Garri (2kg)",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=100&h=100&fit=crop",
        quantity: 2,
        price: 11.99,
        seller: "Cassava Farms Ltd",
      },
    ],
    estimatedShipping: "2024-01-22",
    shippingMethod: "Standard Shipping",
  },
]

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter(
    (order) =>
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "processing":
        return <Clock className="w-4 h-4 text-orange-500" />
      case "shipped":
        return <Truck className="w-4 h-4 text-blue-500" />
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      default:
        return <Package className="w-4 h-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "bg-orange-100 text-orange-800"
      case "shipped":
        return "bg-blue-100 text-blue-800"
      case "delivered":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 text-center text-sm">
        📦 Track your orders in real-time | 🚚 Free shipping on orders over $50
      </div>

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NF</span>
              </div>
              <div>
                <div className="font-bold text-xl text-red-600">NaijaFoods</div>
                <div className="text-xs text-gray-500">My Orders</div>
              </div>
            </Link>

            <div className="flex items-center space-x-4">
              <Link href="/cart">
                <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-red-600">My Orders</h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search orders..."
                  className="pl-10 pr-4 w-64 border-gray-300"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Orders</TabsTrigger>
              <TabsTrigger value="processing">Processing</TabsTrigger>
              <TabsTrigger value="shipped">Shipped</TabsTrigger>
              <TabsTrigger value="delivered">Delivered</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {filteredOrders.map((order) => (
                <Card key={order.id} className="border border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader className="bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div>
                          <CardTitle className="text-lg text-red-600">Order {order.id}</CardTitle>
                          <p className="text-sm text-gray-600">Placed on {new Date(order.date).toLocaleDateString()}</p>
                        </div>
                        <Badge className={getStatusColor(order.status)}>
                          {getStatusIcon(order.status)}
                          <span className="ml-1 capitalize">{order.status}</span>
                        </Badge>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                        <p className="text-sm text-gray-600">{order.items.length} items</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Order Items */}
                      <div className="space-y-3">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center space-x-4">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              width={60}
                              height={60}
                              className="rounded-lg object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-sm text-gray-600">Sold by: {item.seller}</p>
                              <div className="flex items-center space-x-2">
                                <span className="text-red-600 font-bold">${item.price}</span>
                                <span className="text-gray-500">× {item.quantity}</span>
                              </div>
                            </div>
                            <div className="flex space-x-2">
                              {order.status === "delivered" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-600 text-red-600 bg-transparent"
                                >
                                  <Star className="w-4 h-4 mr-1" />
                                  Review
                                </Button>
                              )}
                              <Button size="sm" variant="outline" className="border-gray-300 bg-transparent">
                                <Eye className="w-4 h-4 mr-1" />
                                View
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Status & Actions */}
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            {order.status === "processing" && (
                              <p className="text-sm text-gray-600">
                                📦 Expected to ship: {new Date(order.estimatedShipping!).toLocaleDateString()}
                              </p>
                            )}
                            {order.status === "shipped" && (
                              <div className="space-y-1">
                                <p className="text-sm text-gray-600">
                                  🚚 Tracking: <span className="font-mono text-blue-600">{order.tracking}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                  📅 Expected delivery: {new Date(order.estimatedDelivery!).toLocaleDateString()}
                                </p>
                              </div>
                            )}
                            {order.status === "delivered" && (
                              <p className="text-sm text-green-600">
                                ✅ Delivered on {new Date(order.deliveredDate!).toLocaleDateString()}
                              </p>
                            )}
                            <p className="text-xs text-gray-500">Shipping: {order.shippingMethod}</p>
                          </div>
                          <div className="flex space-x-2">
                            {order.status !== "processing" && (
                              <Link href={`/orders/${order.id}`}>
                                <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                                  <Package className="w-4 h-4 mr-2" />
                                  Track Order
                                </Button>
                              </Link>
                            )}
                            <Button variant="outline" className="border-gray-300 bg-transparent">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact Seller
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="processing">
              {filteredOrders
                .filter((order) => order.status === "processing")
                .map((order) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-orange-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Order Processing</h3>
                        <p className="text-gray-600">Your order is being prepared for shipment</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="shipped">
              {filteredOrders
                .filter((order) => order.status === "shipped")
                .map((order) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <Truck className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Order Shipped</h3>
                        <p className="text-gray-600">Your order is on its way!</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>

            <TabsContent value="delivered">
              {filteredOrders
                .filter((order) => order.status === "delivered")
                .map((order) => (
                  <Card key={order.id} className="border border-gray-200">
                    <CardContent className="p-6">
                      <div className="text-center py-8">
                        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Order Delivered</h3>
                        <p className="text-gray-600">Hope you enjoyed your Nigerian foods!</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </TabsContent>
          </Tabs>

          {filteredOrders.length === 0 && (
            <Card className="border border-gray-200">
              <CardContent className="p-12 text-center">
                <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No orders found</h3>
                <p className="text-gray-600 mb-6">You haven't placed any orders yet or no orders match your search.</p>
                <Link href="/products">
                  <Button className="bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                    Start Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
