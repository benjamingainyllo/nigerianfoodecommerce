"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CreditCard, Truck, Shield, Check, Star, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"

const orderItems = [
  { name: "Premium Jollof Rice Mix", quantity: 2, price: 12.99, originalPrice: 19.99, seller: "Lagos Spice Co." },
  { name: "Authentic Red Palm Oil (1L)", quantity: 1, price: 9.99, originalPrice: 15.99, seller: "Delta Palm Ltd" },
  { name: "Crispy Plantain Chips (500g)", quantity: 3, price: 6.99, originalPrice: 10.99, seller: "Ogun Snacks" },
]

export default function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [shippingMethod, setShippingMethod] = useState("standard")
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [orderComplete, setOrderComplete] = useState(false)

  const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const originalSubtotal = orderItems.reduce((sum, item) => sum + item.originalPrice * item.quantity, 0)
  const savings = originalSubtotal - subtotal
  const shippingCost = shippingMethod === "express" ? 19.99 : shippingMethod === "standard" ? 9.99 : 0
  const tax = subtotal * 0.08
  const total = subtotal + shippingCost + tax

  const handlePlaceOrder = () => {
    setOrderComplete(true)
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Banner */}
        <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 text-center text-sm">
          🎉 Order confirmed! Track your package with our mobile app
        </div>

        <header className="bg-white border-b shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-orange-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NF</span>
                </div>
                <div>
                  <div className="font-bold text-xl text-red-600">NaijaFoods</div>
                  <div className="text-xs text-gray-500">Taste of Home</div>
                </div>
              </Link>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4 text-red-600">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order! We'll send you a confirmation email with tracking information once your order
              ships from Nigeria.
            </p>
            <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-red-200 mb-6">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="font-bold text-lg text-red-600">Order #NF-2024-001</p>
                    <p className="text-sm text-gray-600">Total: ${total.toFixed(2)}</p>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    Processing
                  </Badge>
                </div>
                <div className="text-left space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Estimated delivery:</span>
                    <span className="font-medium">7-14 business days</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping method:</span>
                    <span className="font-medium">
                      {shippingMethod === "express" ? "Express" : "Standard"} Shipping
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tracking available:</span>
                    <span className="font-medium text-blue-600">Within 24 hours</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="space-y-3">
              <Link href="/orders/NF-2024-001">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Track Your Order</Button>
              </Link>
              <Link href="/products">
                <Button className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600">
                  Continue Shopping
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white py-2 text-center text-sm">
        🔒 Secure checkout | 🚚 Free shipping on orders over $50 | 💳 Multiple payment options
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
                <div className="text-xs text-gray-500">Secure Checkout</div>
              </div>
            </Link>

            <Link href="/cart">
              <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Cart
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-red-600">Secure Checkout</h1>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="border border-gray-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="flex items-center text-red-600">
                    <Truck className="w-5 h-5 mr-2" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName" className="text-sm font-medium">
                        First Name *
                      </Label>
                      <Input id="firstName" placeholder="John" className="border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="lastName" className="text-sm font-medium">
                        Last Name *
                      </Label>
                      <Input id="lastName" placeholder="Doe" className="border-gray-300" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="email" className="text-sm font-medium">
                      Email Address *
                    </Label>
                    <Input id="email" type="email" placeholder="john@example.com" className="border-gray-300" />
                  </div>
                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">
                      Phone Number *
                    </Label>
                    <Input id="phone" placeholder="+1 (555) 123-4567" className="border-gray-300" />
                  </div>
                  <div>
                    <Label htmlFor="address" className="text-sm font-medium">
                      Street Address *
                    </Label>
                    <Input id="address" placeholder="123 Main Street" className="border-gray-300" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city" className="text-sm font-medium">
                        City *
                      </Label>
                      <Input id="city" placeholder="New York" className="border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-sm font-medium">
                        State/Province *
                      </Label>
                      <Input id="state" placeholder="NY" className="border-gray-300" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="zip" className="text-sm font-medium">
                        ZIP/Postal Code *
                      </Label>
                      <Input id="zip" placeholder="10001" className="border-gray-300" />
                    </div>
                    <div>
                      <Label htmlFor="country" className="text-sm font-medium">
                        Country *
                      </Label>
                      <Input id="country" placeholder="United States" className="border-gray-300" />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="notes" className="text-sm font-medium">
                      Delivery Notes (Optional)
                    </Label>
                    <Textarea
                      id="notes"
                      placeholder="Any special delivery instructions..."
                      className="border-gray-300"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Method */}
              <Card className="border border-gray-200">
                <CardHeader className="bg-orange-50">
                  <CardTitle className="text-red-600">Shipping Method</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Free Shipping</p>
                            <p className="text-sm text-gray-600">15-30 business days</p>
                            <p className="text-xs text-green-600">✓ Orders over $50</p>
                          </div>
                          <span className="font-bold text-green-600">FREE</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="standard" id="standard" />
                      <Label htmlFor="standard" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Standard Shipping</p>
                            <p className="text-sm text-gray-600">7-14 business days</p>
                            <p className="text-xs text-blue-600">✓ Tracking included</p>
                          </div>
                          <span className="font-bold">$9.99</span>
                        </div>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-medium">Express Shipping</p>
                            <p className="text-sm text-gray-600">3-7 business days</p>
                            <p className="text-xs text-orange-600">✓ Priority handling</p>
                          </div>
                          <span className="font-bold">$19.99</span>
                        </div>
                      </Label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="border border-gray-200">
                <CardHeader className="bg-green-50">
                  <CardTitle className="flex items-center text-red-600">
                    <CreditCard className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center space-x-2">
                        <CreditCard className="w-4 h-4" />
                        <span>Credit/Debit Card</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex items-center space-x-2">
                        <div className="w-4 h-4 bg-blue-600 rounded"></div>
                        <span>PayPal</span>
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber" className="text-sm font-medium">
                          Card Number *
                        </Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" className="border-gray-300" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiry" className="text-sm font-medium">
                            Expiry Date *
                          </Label>
                          <Input id="expiry" placeholder="MM/YY" className="border-gray-300" />
                        </div>
                        <div>
                          <Label htmlFor="cvv" className="text-sm font-medium">
                            CVV *
                          </Label>
                          <Input id="cvv" placeholder="123" className="border-gray-300" />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="cardName" className="text-sm font-medium">
                          Name on Card *
                        </Label>
                        <Input id="cardName" placeholder="John Doe" className="border-gray-300" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center space-x-2 mt-4">
                    <Checkbox id="terms" />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the{" "}
                      <Link href="/terms" className="text-red-600 hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-red-600 hover:underline">
                        Privacy Policy
                      </Link>
                    </Label>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-4 border border-gray-200">
                <CardHeader className="bg-red-50">
                  <CardTitle className="text-red-600">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 p-6">
                  <div className="space-y-3">
                    {orderItems.map((item, index) => (
                      <div key={index} className="flex justify-between items-start text-sm">
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-gray-600">
                            Qty: {item.quantity} | Seller: {item.seller}
                          </p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-red-600 font-bold">${item.price}</span>
                            <span className="text-gray-500 line-through text-xs">${item.originalPrice}</span>
                          </div>
                        </div>
                        <span className="font-bold">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>You Save</span>
                      <span>-${savings.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingCost === 0 ? "FREE" : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-red-600">${total.toFixed(2)}</span>
                  </div>

                  <Button
                    className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Place Order - ${total.toFixed(2)}
                  </Button>

                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-600">
                      <div className="flex items-center">
                        <Shield className="w-3 h-3 mr-1" />
                        <span>SSL Secured</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        <span>Trusted by 50K+</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500">🔒 Your payment information is secure and encrypted</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
