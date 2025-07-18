"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Minus, Plus, ShoppingCart, ArrowLeft, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

const initialCartItems = [
  {
    id: 1,
    name: "Premium Jollof Rice Mix - Authentic Nigerian Seasoning",
    price: 5200,
    originalPrice: 7800,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
    quantity: 2,
    category: "Rice & Grains",
    seller: "Lagos Spice Co.",
    freeShipping: true,
    choice: true,
  },
  {
    id: 2,
    name: "Authentic Red Palm Oil (1L) - Pure Nigerian",
    price: 4000,
    originalPrice: 6400,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=100&h=100&fit=crop",
    quantity: 1,
    category: "Oils & Condiments",
    seller: "Delta Palm Ltd",
    freeShipping: true,
    choice: false,
  },
  {
    id: 3,
    name: "Crispy Plantain Chips (500g) - Sweet & Salty",
    price: 2800,
    originalPrice: 4400,
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=100&h=100&fit=crop",
    quantity: 3,
    category: "Snacks",
    seller: "Ogun Snacks",
    freeShipping: true,
    choice: false,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [promoCode, setPromoCode] = useState("")
  const [selectedItems, setSelectedItems] = useState<number[]>(cartItems.map((item) => item.id))

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      removeItem(id)
      return
    }
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
    setSelectedItems((items) => items.filter((itemId) => itemId !== id))
  }

  const toggleItemSelection = (id: number) => {
    setSelectedItems((items) => (items.includes(id) ? items.filter((itemId) => itemId !== id) : [...items, id]))
  }

  const selectAll = () => {
    setSelectedItems(cartItems.map((item) => item.id))
  }

  const deselectAll = () => {
    setSelectedItems([])
  }

  const selectedCartItems = cartItems.filter((item) => selectedItems.includes(item.id))
  const subtotal = selectedCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalSubtotal = selectedCartItems.reduce(
    (sum, item) => sum + (item.originalPrice || item.price) * item.quantity,
    0,
  )
  const savings = originalSubtotal - subtotal
  const shipping = subtotal > 20000 ? 0 : 4000
  const tax = subtotal * 0.075
  const discount = promoCode === "NAIJA10" ? subtotal * 0.1 : 0
  const total = subtotal + shipping + tax - discount

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      minimumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-slate-800 text-white py-2 text-center text-sm">
        🎉 Free shipping on orders over ₦20,000 | Use code: NAIJA10 for 10% off
      </div>

      {/* Header */}
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">NF</span>
              </div>
              <div>
                <div className="font-bold text-xl text-slate-800">NaijaFoods</div>
                <div className="text-xs text-gray-500">Taste of Home</div>
              </div>
            </Link>

            <Link href="/products">
              <Button variant="outline" className="border-slate-600 text-slate-700 hover:bg-slate-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="border border-gray-200">
              <CardHeader className="bg-slate-50">
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center">
                    <ShoppingCart className="w-5 h-5 mr-2 text-slate-700" />
                    <span>Shopping Cart ({cartItems.length} items)</span>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <Button variant="ghost" size="sm" onClick={selectAll} className="text-slate-700">
                      Select All
                    </Button>
                    <Button variant="ghost" size="sm" onClick={deselectAll} className="text-gray-600">
                      Deselect All
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                    <p className="text-gray-600 mb-4">Add some delicious Nigerian foods to get started!</p>
                    <Link href="/products">
                      <Button className="bg-slate-800 hover:bg-slate-700">Start Shopping</Button>
                    </Link>
                  </div>
                ) : (
                  <div>
                    {cartItems.map((item, index) => (
                      <div key={item.id}>
                        <div className="flex items-start space-x-4 p-4">
                          <Checkbox
                            checked={selectedItems.includes(item.id)}
                            onCheckedChange={() => toggleItemSelection(item.id)}
                          />
                          <Image
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={100}
                            height={100}
                            className="rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <h3 className="font-medium mb-1">{item.name}</h3>
                            <div className="flex items-center space-x-2 mb-2">
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                              {item.choice && <Badge className="bg-amber-600 text-white text-xs">Choice</Badge>}
                              {item.freeShipping && (
                                <Badge className="bg-emerald-600 text-white text-xs">
                                  <Truck className="w-3 h-3 mr-1" />
                                  Free Ship
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">Sold by: {item.seller}</p>
                            <div className="flex items-center space-x-2 mb-3">
                              <span className="text-lg font-bold text-slate-800">{formatPrice(item.price)}</span>
                              {item.originalPrice && (
                                <span className="text-sm text-gray-500 line-through">
                                  {formatPrice(item.originalPrice)}
                                </span>
                              )}
                              {item.originalPrice && (
                                <Badge className="bg-slate-100 text-slate-700 text-xs">
                                  Save {formatPrice(item.originalPrice - item.price)}
                                </Badge>
                              )}
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8 border-gray-300 bg-transparent"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  <Minus className="w-4 h-4" />
                                </Button>
                                <span className="w-12 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="w-8 h-8 border-gray-300 bg-transparent"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  <Plus className="w-4 h-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-slate-600 hover:text-slate-800 hover:bg-slate-50"
                                  onClick={() => removeItem(item.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        {index < cartItems.length - 1 && <div className="border-t" />}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          {cartItems.length > 0 && (
            <div className="space-y-4">
              <Card className="border border-gray-200">
                <CardHeader className="bg-slate-50">
                  <CardTitle className="text-slate-800">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Items ({selectedCartItems.length})</span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    {savings > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>You Save</span>
                        <span>-{formatPrice(savings)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount (NAIJA10)</span>
                        <span>-{formatPrice(discount)}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-slate-800">{formatPrice(total)}</span>
                    </div>
                  </div>

                  {subtotal < 20000 && subtotal > 0 && (
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-800">
                        <Truck className="w-4 h-4 inline mr-1" />
                        Add {formatPrice(20000 - subtotal)} more for free shipping!
                      </p>
                    </div>
                  )}

                  <Link href="/checkout">
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700"
                      size="lg"
                      disabled={selectedItems.length === 0}
                    >
                      Proceed to Checkout ({selectedItems.length} items)
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
