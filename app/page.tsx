"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search, Star, Truck, Clock, FlameIcon as Fire, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const flashSaleProducts = [
  {
    id: 1,
    name: "Premium Jollof Rice Mix",
    price: 5200,
    originalPrice: 7800,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=300&h=300&fit=crop",
    rating: 4.8,
    reviews: 1240,
    sold: 2847,
    discount: 35,
    freeShipping: true,
  },
  {
    id: 2,
    name: "Authentic Palm Oil (1L)",
    price: 4000,
    originalPrice: 6400,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=300&h=300&fit=crop",
    rating: 4.9,
    reviews: 890,
    sold: 1567,
    discount: 38,
    freeShipping: true,
  },
  {
    id: 3,
    name: "Dried Fish Assortment",
    price: 9200,
    originalPrice: 14400,
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=300&h=300&fit=crop",
    rating: 4.7,
    reviews: 1560,
    sold: 934,
    discount: 36,
    freeShipping: false,
  },
  {
    id: 4,
    name: "Plantain Chips (500g)",
    price: 2800,
    originalPrice: 4400,
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=300&h=300&fit=crop",
    rating: 4.6,
    reviews: 2030,
    sold: 4521,
    discount: 36,
    freeShipping: true,
  },
]

const categories = [
  {
    name: "Rice & Grains",
    icon: "🌾",
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=60&h=60&fit=crop",
  },
  {
    name: "Spices & Seasonings",
    icon: "🌶️",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=60&h=60&fit=crop",
  },
  {
    name: "Oils & Condiments",
    icon: "🫒",
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=60&h=60&fit=crop",
  },
  {
    name: "Protein & Fish",
    icon: "🐟",
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=60&h=60&fit=crop",
  },
  {
    name: "Snacks & Treats",
    icon: "🍌",
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=60&h=60&fit=crop",
  },
  {
    name: "Beverages",
    icon: "🥤",
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=60&h=60&fit=crop",
  },
  {
    name: "Yam & Cassava",
    icon: "🍠",
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=60&h=60&fit=crop",
  },
  {
    name: "Soup Ingredients",
    icon: "🥣",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=60&h=60&fit=crop",
  },
]

const recommendedProducts = [
  {
    id: 5,
    name: "Maggi Seasoning Cubes (50pcs)",
    price: 3600,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=180&h=180&fit=crop",
    rating: 4.9,
    reviews: 3120,
    sold: 8934,
    freeShipping: true,
    choice: true,
  },
  {
    id: 6,
    name: "Garri White Premium (2kg)",
    price: 4800,
    originalPrice: 6800,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=180&h=180&fit=crop",
    rating: 4.5,
    reviews: 870,
    sold: 2156,
    freeShipping: true,
    choice: false,
  },
  {
    id: 7,
    name: "Scotch Bonnet Pepper Paste",
    price: 3200,
    originalPrice: 4800,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=180&h=180&fit=crop",
    rating: 4.8,
    reviews: 1450,
    sold: 3421,
    freeShipping: false,
    choice: true,
  },
  {
    id: 8,
    name: "Zobo Leaves Premium (200g)",
    price: 2400,
    originalPrice: 3600,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=180&h=180&fit=crop",
    rating: 4.4,
    reviews: 760,
    sold: 1876,
    freeShipping: true,
    choice: false,
  },
  {
    id: 9,
    name: "Ogbono Seeds Ground (500g)",
    price: 7600,
    originalPrice: 10000,
    image: "https://images.unsplash.com/photo-1609501676725-7186f734b2e1?w=180&h=180&fit=crop",
    rating: 4.7,
    reviews: 1230,
    sold: 2890,
    freeShipping: true,
    choice: true,
  },
  {
    id: 10,
    name: "Bitter Leaf Dried (100g)",
    price: 4000,
    originalPrice: 5600,
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=180&h=180&fit=crop",
    rating: 4.6,
    reviews: 890,
    sold: 1567,
    freeShipping: false,
    choice: false,
  },
]

export default function HomePage() {
  const [cartCount, setCartCount] = useState(0)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 45, seconds: 30 })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const addToCart = (productId: number) => {
    setCartCount((prev) => prev + 1)
  }

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
        🎉 Welcome to NaijaFoods! Free shipping on orders over ₦20,000 | Use code: NAIJA10 for 10% off
      </div>

      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50 shadow-sm">
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

            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <Input
                  placeholder="Search for Nigerian foods, spices, ingredients..."
                  className="pl-4 pr-12 h-10 border-2 border-gray-200 focus:border-slate-400"
                />
                <Button className="absolute right-0 top-0 h-10 px-6 bg-slate-800 hover:bg-slate-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/cart" className="relative">
                <Button variant="outline" size="icon" className="border-gray-200 hover:border-slate-400 bg-transparent">
                  <ShoppingCart className="w-5 h-5 text-slate-700" />
                </Button>
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 w-5 h-5 rounded-full p-0 flex items-center justify-center text-xs bg-slate-800">
                    {cartCount}
                  </Badge>
                )}
              </Link>
              <Button className="bg-slate-800 hover:bg-slate-700">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Categories */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-8 py-3 overflow-x-auto">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={`/products?category=${encodeURIComponent(category.name)}`}
                className="flex items-center space-x-2 whitespace-nowrap hover:text-slate-700 transition-colors"
              >
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={24}
                  height={24}
                  className="rounded"
                />
                <span className="text-sm font-medium">{category.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Premium Deals on
                <br />
                Nigerian Foods!
              </h1>
              <p className="text-xl mb-6 text-slate-200">
                Up to 70% OFF on authentic ingredients from home. Limited time offers!
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <Badge className="bg-amber-500 text-black px-3 py-1 text-sm font-bold">
                  <Fire className="w-4 h-4 mr-1" />
                  Flash Sale
                </Badge>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>Ends in:</span>
                  <div className="flex space-x-1">
                    <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.hours}h</span>
                    <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.minutes}m</span>
                    <span className="bg-black bg-opacity-30 px-2 py-1 rounded">{timeLeft.seconds}s</span>
                  </div>
                </div>
              </div>
              <Link href="/products">
                <Button size="lg" className="bg-white text-slate-800 hover:bg-gray-100 font-bold px-8">
                  Shop Flash Sale
                </Button>
              </Link>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=400&fit=crop"
                alt="Nigerian foods"
                width={500}
                height={400}
                className="rounded-lg"
              />
              <Badge className="absolute top-4 left-4 bg-slate-800 text-white px-3 py-2 text-lg font-bold">
                UP TO 70% OFF
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sale Section */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-bold text-slate-800 flex items-center">
                <Fire className="w-6 h-6 mr-2" />
                Flash Sale
              </h2>
              <div className="flex items-center space-x-2 text-sm">
                <Clock className="w-4 h-4 text-gray-600" />
                <span>Ends in:</span>
                <div className="flex space-x-1">
                  <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-bold">{timeLeft.hours}</span>
                  <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-bold">
                    {timeLeft.minutes}
                  </span>
                  <span className="bg-slate-800 text-white px-2 py-1 rounded text-xs font-bold">
                    {timeLeft.seconds}
                  </span>
                </div>
              </div>
            </div>
            <Link href="/products?sale=flash">
              <Button variant="outline" className="border-slate-600 text-slate-700 hover:bg-slate-50 bg-transparent">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {flashSaleProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={200}
                      height={200}
                      className="w-full h-40 object-cover"
                    />
                    <Badge className="absolute top-2 left-2 bg-slate-800 text-white text-xs font-bold">
                      -{product.discount}%
                    </Badge>
                    {product.freeShipping && (
                      <Badge className="absolute top-2 right-2 bg-emerald-600 text-white text-xs">Free Ship</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-slate-800">{formatPrice(product.price)}</span>
                        <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">{product.sold} sold</div>
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700 text-xs h-8"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-slate-800">Shop by Category</h2>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4">
            {categories.map((category, index) => (
              <Link key={index} href={`/products?category=${encodeURIComponent(category.name)}`}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border border-gray-200">
                  <CardContent className="p-4 text-center">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      width={60}
                      height={60}
                      className="mx-auto mb-2 rounded-lg"
                    />
                    <h3 className="text-xs font-medium text-center">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended Products */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-800">Recommended for You</h2>
            <Link href="/products">
              <Button variant="outline" className="border-slate-600 text-slate-700 hover:bg-slate-50 bg-transparent">
                View All
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {recommendedProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-shadow border border-gray-200">
                <CardContent className="p-0">
                  <div className="relative">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="w-full h-36 object-cover"
                    />
                    {product.choice && (
                      <Badge className="absolute top-2 left-2 bg-amber-600 text-white text-xs">Choice</Badge>
                    )}
                    {product.freeShipping && (
                      <Badge className="absolute top-2 right-2 bg-emerald-600 text-white text-xs">Free Ship</Badge>
                    )}
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{product.name}</h3>
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs ml-1">{product.rating}</span>
                      </div>
                      <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                    </div>
                    <div className="mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-slate-800">{formatPrice(product.price)}</span>
                        <span className="text-sm text-gray-500 line-through">{formatPrice(product.originalPrice)}</span>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500 mb-3">{product.sold} sold</div>
                    <Button
                      className="w-full bg-slate-800 hover:bg-slate-700 text-xs h-8"
                      onClick={() => addToCart(product.id)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Promotional Banners */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-r from-slate-700 to-slate-600 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">New Customer Special</h3>
                    <p className="mb-4">Get 15% off your first order</p>
                    <Button className="bg-white text-slate-700 hover:bg-gray-100">Claim Now</Button>
                  </div>
                  <Gift className="w-16 h-16 opacity-50" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2">Free Worldwide Shipping</h3>
                    <p className="mb-4">On orders over ₦20,000</p>
                    <Button className="bg-white text-emerald-700 hover:bg-gray-100">Shop Now</Button>
                  </div>
                  <Truck className="w-16 h-16 opacity-50" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">NF</span>
                </div>
                <div>
                  <div className="font-bold text-xl">NaijaFoods</div>
                  <div className="text-xs text-gray-400">Taste of Home</div>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Connecting Nigerians worldwide with authentic taste of home. Quality guaranteed, fast delivery.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/returns" className="hover:text-white">
                    Returns & Refunds
                  </Link>
                </li>
                <li>
                  <Link href="/shipping" className="hover:text-white">
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Categories</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/products?category=rice" className="hover:text-white">
                    Rice & Grains
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=spices" className="hover:text-white">
                    Spices & Seasonings
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=protein" className="hover:text-white">
                    Protein & Fish
                  </Link>
                </li>
                <li>
                  <Link href="/products?category=snacks" className="hover:text-white">
                    Snacks & Treats
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">f</span>
                </div>
                <div className="w-8 h-8 bg-blue-400 rounded flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">t</span>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded flex items-center justify-center cursor-pointer">
                  <span className="text-xs font-bold">i</span>
                </div>
              </div>
              <p className="text-sm text-gray-400">Get updates on deals and new products</p>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 NaijaFoods. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
