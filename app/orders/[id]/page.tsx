"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Package, Truck, Clock, MapPin, Phone, Mail, Star, MessageCircle, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Progress } from "@/components/ui/progress"

// Mock order data - in real app this would come from API
const orderData = {
  id: "NF-2024-001",
  date: "2024-01-15",
  status: "shipped",
  total: 45.97,
  subtotal: 39.97,
  shipping: 6.0,
  tax: 0.0,
  tracking: "NF2024001TRACK",
  estimatedDelivery: "2024-01-25",
  shippingMethod: "Standard Shipping",
  shippingAddress: {
    name: "John Doe",
    address: "123 Main Street",
    city: "New York",
    state: "NY",
    zip: "10001",
    country: "United States",
    phone: "+1 (555) 123-4567",
  },
  items: [
    {
      id: 1,
      name: "Premium Jollof Rice Mix - Authentic Nigerian Seasoning Blend",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=200&h=200&fit=crop",
      quantity: 2,
      price: 12.99,
      originalPrice: 19.99,
      seller: "Lagos Spice Co.",
      sellerLocation: "Lagos, Nigeria",
      sellerRating: 4.8,
    },
    {
      id: 2,
      name: "Authentic Red Palm Oil (1L) - Pure Nigerian Palm Oil",
      image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=200&h=200&fit=crop",
      quantity: 1,
      price: 9.99,
      originalPrice: 15.99,
      seller: "Delta Palm Ltd",
      sellerLocation: "Delta, Nigeria",
      sellerRating: 4.9,
    },
    {
      id: 3,
      name: "Crispy Plantain Chips (500g) - Sweet & Salty Nigerian Snack",
      image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=200&h=200&fit=crop",
      quantity: 3,
      price: 6.99,
      originalPrice: 10.99,
      seller: "Ogun Snacks",
      sellerLocation: "Ogun, Nigeria",
      sellerRating: 4.6,
    },
  ],
  trackingHistory: [
    {
      date: "2024-01-15T10:00:00Z",
      status: "Order Placed",
      description: "Your order has been confirmed and is being processed",
      location: "NaijaFoods Warehouse, Lagos",
      icon: Package,
    },
    {
      date: "2024-01-16T14:30:00Z",
      status: "Processing",
      description: "Items are being picked and packed",
      location: "NaijaFoods Warehouse, Lagos",
      icon: Clock,
    },
    {
      date: "2024-01-17T09:15:00Z",
      status: "Shipped",
      description: "Package has been dispatched and is on its way",
      location: "Lagos International Airport",
      icon: Truck,
    },
    {
      date: "2024-01-20T16:45:00Z",
      status: "In Transit",
      description: "Package arrived at destination country",
      location: "JFK International Airport, New York",
      icon: Truck,
    },
    {
      date: "2024-01-22T11:20:00Z",
      status: "Out for Delivery",
      description: "Package is out for delivery to your address",
      location: "Local Delivery Hub, New York",
      icon: Truck,
    },
  ],
}

export default function OrderTrackingPage({ params }: { params: { id: string } }) {
  const [copiedTracking, setCopiedTracking] = useState(false)

  const copyTrackingNumber = () => {
    navigator.clipboard.writeText(orderData.tracking)
    setCopiedTracking(true)
    setTimeout(() => setCopiedTracking(false), 2000)
  }

  const getProgressValue = () => {
    const statusMap = {
      "Order Placed": 20,
      Processing: 40,
      Shipped: 60,
      "In Transit": 80,
      "Out for Delivery": 90,
      Delivered: 100,
    }
    const currentStatus = orderData.trackingHistory[orderData.trackingHistory.length - 1]?.status
    return statusMap[currentStatus as keyof typeof statusMap] || 0
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 text-center text-sm">
        📦 Real-time order tracking | 🚚 Delivered fresh from Nigeria to your door
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
                <div className="text-xs text-gray-500">Order Tracking</div>
              </div>
            </Link>

            <Link href="/orders">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Orders
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Order Header */}
          <Card className="border border-gray-200">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl text-red-600">Order {orderData.id}</CardTitle>
                  <p className="text-gray-600">Placed on {new Date(orderData.date).toLocaleDateString()}</p>
                </div>
                <Badge className="bg-blue-100 text-blue-800 px-4 py-2">
                  <Truck className="w-4 h-4 mr-2" />
                  In Transit
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Tracking Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Tracking Number:</span>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-sm">{orderData.tracking}</span>
                        <Button size="sm" variant="ghost" onClick={copyTrackingNumber} className="h-6 w-6 p-0">
                          {copiedTracking ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Shipping Method:</span>
                      <span className="text-sm font-medium">{orderData.shippingMethod}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Expected Delivery:</span>
                      <span className="text-sm font-medium text-green-600">
                        {new Date(orderData.estimatedDelivery).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Delivery Address</h3>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="font-medium text-gray-900">{orderData.shippingAddress.name}</p>
                    <p>{orderData.shippingAddress.address}</p>
                    <p>
                      {orderData.shippingAddress.city}, {orderData.shippingAddress.state}{" "}
                      {orderData.shippingAddress.zip}
                    </p>
                    <p>{orderData.shippingAddress.country}</p>
                    <p className="flex items-center mt-2">
                      <Phone className="w-3 h-3 mr-1" />
                      {orderData.shippingAddress.phone}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tracking Progress */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Package className="w-5 h-5 mr-2" />
                Tracking Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Order Progress</span>
                  <span className="text-sm text-gray-600">{getProgressValue()}% Complete</span>
                </div>
                <Progress value={getProgressValue()} className="h-2" />
              </div>

              <div className="space-y-4">
                {orderData.trackingHistory.map((event, index) => {
                  const IconComponent = event.icon
                  const isLatest = index === orderData.trackingHistory.length - 1
                  return (
                    <div
                      key={index}
                      className={`flex items-start space-x-4 ${isLatest ? "bg-blue-50 p-4 rounded-lg border border-blue-200" : ""}`}
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          isLatest ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${isLatest ? "text-blue-600" : "text-gray-900"}`}>
                            {event.status}
                          </h4>
                          <span className="text-sm text-gray-500">
                            {new Date(event.date).toLocaleDateString()} at {new Date(event.date).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                        <div className="flex items-center text-xs text-gray-500 mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-red-600">Order Items</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                {orderData.items.map((item, index) => (
                  <div key={item.id}>
                    <div className="flex items-start space-x-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={80}
                        height={80}
                        className="rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge variant="secondary" className="text-xs">
                            Qty: {item.quantity}
                          </Badge>
                          <div className="flex items-center text-xs text-gray-600">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 mr-1" />
                            {item.sellerRating}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="text-red-600 font-bold">${item.price}</span>
                          <span className="text-gray-500 line-through text-sm">${item.originalPrice}</span>
                          <Badge className="bg-red-100 text-red-600 text-xs">
                            Save ${((item.originalPrice - item.price) * item.quantity).toFixed(2)}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>
                            Sold by: <span className="font-medium">{item.seller}</span>
                          </p>
                          <p className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {item.sellerLocation}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                        <div className="flex space-x-2 mt-2">
                          <Button size="sm" variant="outline" className="border-red-600 text-red-600 bg-transparent">
                            <MessageCircle className="w-3 h-3 mr-1" />
                            Contact Seller
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < orderData.items.length - 1 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card className="border border-gray-200">
            <CardHeader>
              <CardTitle className="text-red-600">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${orderData.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>${orderData.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${orderData.tax.toFixed(2)}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span className="text-red-600">${orderData.total.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Help Section */}
          <Card className="border border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <CardContent className="p-6">
              <div className="text-center">
                <h3 className="font-semibold text-lg mb-2">Need Help with Your Order?</h3>
                <p className="text-gray-600 mb-4">
                  Our customer service team is here to help you track your package and answer any questions.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" className="border-blue-600 text-blue-600 bg-transparent">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Support
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Live Chat
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
