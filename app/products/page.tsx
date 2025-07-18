"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ShoppingCart, Search, Filter, Star, ArrowUpDown, Heart, Eye, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

const allProducts = [
  {
    id: 1,
    name: "Premium Jollof Rice Mix - Authentic Nigerian Seasoning Blend",
    price: 5200,
    originalPrice: 7800,
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=250&h=250&fit=crop",
    rating: 4.8,
    reviews: 1240,
    category: "Rice & Grains",
    inStock: true,
    sold: 2847,
    freeShipping: true,
    choice: true,
    seller: "Lagos Spice Co.",
    location: "Lagos, Nigeria",
  },
  {
    id: 2,
    name: "Authentic Red Palm Oil (1L) - Pure Nigerian Palm Oil",
    price: 4000,
    originalPrice: 6400,
    image: "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=250&h=250&fit=crop",
    rating: 4.9,
    reviews: 890,
    category: "Oils & Condiments",
    inStock: true,
    sold: 1567,
    freeShipping: true,
    choice: false,
    seller: "Delta Palm Ltd",
    location: "Delta, Nigeria",
  },
  {
    id: 3,
    name: "Mixed Dried Fish Assortment - Stockfish & Catfish",
    price: 9200,
    originalPrice: 14400,
    image: "https://images.unsplash.com/photo-1544943910-4c1dc44aab44?w=250&h=250&fit=crop",
    rating: 4.7,
    reviews: 1560,
    category: "Protein",
    inStock: true,
    sold: 934,
    freeShipping: false,
    choice: true,
    seller: "Rivers Fish Market",
    location: "Rivers, Nigeria",
  },
  {
    id: 4,
    name: "Crispy Plantain Chips (500g) - Sweet & Salty",
    price: 2800,
    originalPrice: 4400,
    image: "https://images.unsplash.com/photo-1541544181051-e46607bc22a4?w=250&h=250&fit=crop",
    rating: 4.6,
    reviews: 2030,
    category: "Snacks",
    inStock: true,
    sold: 4521,
    freeShipping: true,
    choice: false,
    seller: "Ogun Snacks",
    location: "Ogun, Nigeria",
  },
  {
    id: 5,
    name: "Maggi Seasoning Cubes (50pcs) - Essential Nigerian Cooking",
    price: 3600,
    originalPrice: 5200,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=250&h=250&fit=crop",
    rating: 4.9,
    reviews: 3120,
    category: "Spices & Seasonings",
    inStock: true,
    sold: 8934,
    freeShipping: true,
    choice: true,
    seller: "Nestle Nigeria",
    location: "Lagos, Nigeria",
  },
  {
    id: 6,
    name: "Premium White Garri (2kg) - From Fresh Cassava",
    price: 4800,
    originalPrice: 6800,
    image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=250&h=250&fit=crop",
    rating: 4.5,
    reviews: 870,
    category: "Rice & Grains",
    inStock: true,
    sold: 2156,
    freeShipping: true,
    choice: false,
    seller: "Cassava Farms Ltd",
    location: "Oyo, Nigeria",
  },
  {
    id: 7,
    name: "Hot Scotch Bonnet Pepper Paste (200g)",
    price: 3200,
    originalPrice: 4800,
    image: "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=250&h=250&fit=crop",
    rating: 4.8,
    reviews: 1450,
    category: "Spices & Seasonings",
    inStock: false,
    sold: 3421,
    freeShipping: false,
    choice: true,
    seller: "Pepper Palace",
    location: "Kano, Nigeria",
  },
  {
    id: 8,
    name: "Zobo Leaves Premium (200g) - Hibiscus Tea",
    price: 2400,
    originalPrice: 3600,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=250&h=250&fit=crop",
    rating: 4.4,
    reviews: 760,
    category: "Beverages",
    inStock: true,
    sold: 1876,
    freeShipping: true,
    choice: false,
    seller: "Herbal Nigeria",
    location: "Abuja, Nigeria",
  },
]

const categories = ["Rice & Grains", "Spices & Seasonings", "Oils & Condiments", "Protein", "Snacks", "Beverages"]

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [freeShippingOnly, setFreeShippingOnly] = useState(false)
  const [choiceOnly, setChoiceOnly] = useState(false)
  const [sortBy, setSortBy] = useState("featured")
  const [cartCount, setCartCount] = useState(0)

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => {
        const matchesSearch =
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.seller.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category)
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
        const matchesShipping = !freeShippingOnly || product.freeShipping
        const matchesChoice = !choiceOnly || product.choice
        return matchesSearch && matchesCategory && matchesPrice && matchesShipping && matchesChoice
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "rating":
            return b.rating - a.rating
          case "sold":
            return b.sold - a.sold
          case "name":
            return a.name.localeCompare(b.name)
          default:
            return 0
        }
      })
  }, [searchTerm, selectedCategories, priceRange, freeShippingOnly, choiceOnly, sortBy])

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      setSelectedCategories(selectedCategories.filter((c) => c !== category))
    }
  }

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

  const FilterContent = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-semibold mb-3 text-slate-800">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={(checked) => handleCategoryChange(category, checked as boolean)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-slate-800">Price Range</h3>
        <div className="px-2">
          <Slider value={priceRange} onValueChange={setPriceRange} max={20000} min={0} step={100} className="mb-2" />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{formatPrice(priceRange[0])}</span>
            <span>{formatPrice(priceRange[1])}</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold mb-3 text-slate-800">Features</h3>
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Checkbox id="freeShipping" checked={freeShippingOnly} onCheckedChange={setFreeShippingOnly} />
            <Label htmlFor="freeShipping" className="text-sm">
              Free Shipping
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="choice" checked={choiceOnly} onCheckedChange={setChoiceOnly} />
            <Label htmlFor="choice" className="text-sm">
              NaijaFoods Choice
            </Label>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Banner */}
      <div className="bg-slate-800 text-white py-2 text-center text-sm">
        🎉 Flash Sale: Up to 70% OFF Nigerian Foods | Free shipping on orders over ₦20,000
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
                  placeholder="Search products, brands, sellers..."
                  className="pl-4 pr-12 h-10 border-2 border-gray-200 focus:border-slate-400"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button className="absolute right-0 top-0 h-10 px-6 bg-slate-800 hover:bg-slate-700">
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

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
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 shrink-0">
            <Card className="p-4 sticky top-24">
              <FilterContent />
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter and Sort */}
            <div className="flex items-center justify-between mb-4 lg:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                    <SheetDescription>Filter products by your preferences</SheetDescription>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterContent />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Sort and Results */}
            <div className="flex items-center justify-between mb-4 bg-white p-4 rounded-lg border">
              <div>
                <h1 className="text-xl font-bold text-slate-800">Nigerian Foods & Ingredients</h1>
                <p className="text-gray-600 text-sm">
                  {filteredProducts.length} results {searchTerm && `for "${searchTerm}"`}
                </p>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    <ArrowUpDown className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuRadioGroup value={sortBy} onValueChange={setSortBy}>
                    <DropdownMenuRadioItem value="featured">Best Match</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="sold">Most Popular</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-low">Price: Low to High</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="price-high">Price: High to Low</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="rating">Highest Rated</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="name">Name A-Z</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="hover:shadow-lg transition-shadow border border-gray-200 group">
                  <CardContent className="p-0">
                    <div className="relative">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        width={250}
                        height={250}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.choice && <Badge className="bg-amber-600 text-white text-xs font-bold">Choice</Badge>}
                        {product.originalPrice && (
                          <Badge className="bg-slate-800 text-white text-xs font-bold">
                            -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        )}
                      </div>
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {product.freeShipping && (
                          <Badge className="bg-emerald-600 text-white text-xs">
                            <Truck className="w-3 h-3 mr-1" />
                            Free
                          </Badge>
                        )}
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <div className="flex space-x-2">
                          <Button size="sm" variant="secondary" className="bg-white">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="secondary" className="bg-white">
                            <Heart className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-sm mb-1 line-clamp-2 h-10">{product.name}</h3>
                      <div className="flex items-center mb-2">
                        <div className="flex items-center">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-xs ml-1 font-medium">{product.rating}</span>
                        </div>
                        <span className="text-xs text-gray-500 ml-2">({product.reviews})</span>
                      </div>
                      <div className="mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-slate-800">{formatPrice(product.price)}</span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              {formatPrice(product.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-xs text-gray-500 mb-2">{product.sold} sold</div>
                      <div className="text-xs text-gray-600 mb-3">
                        <div className="font-medium">{product.seller}</div>
                        <div>{product.location}</div>
                      </div>
                      <Button
                        className="w-full bg-slate-800 hover:bg-slate-700 text-xs h-8"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        {product.inStock ? "Add to Cart" : "Out of Stock"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12 bg-white rounded-lg">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
                <Button
                  variant="outline"
                  className="border-slate-600 text-slate-700 hover:bg-slate-50 bg-transparent"
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategories([])
                    setPriceRange([0, 20000])
                    setFreeShippingOnly(false)
                    setChoiceOnly(false)
                  }}
                >
                  Clear All Filters
                </Button>
              </div>
            )}

            {/* Pagination would go here */}
            {filteredProducts.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    Previous
                  </Button>
                  <Button className="bg-slate-800 hover:bg-slate-700">1</Button>
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    2
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    3
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-700 bg-transparent">
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
