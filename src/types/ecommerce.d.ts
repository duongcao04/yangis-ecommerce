// ProductType
type ProductProperties = {
    screen?: {
        size?: string
        technology?: string
        resolution?: string
        refreshRate?: string
        type?: string
    }
    rearCamera?: {
        rearCamera?: string[]
        video?: string[]
        features?: string[]
    }
    frontCamera?: {
        frontCamera?: string[]
        video?: string[]
        features?: string[]
    }
    storage?: {
        RAM?: string
        storage?: string
        memoryStick?: string
    }
    battery?: {
        battery?: string
        chargingTechnology?: string[]
        type?: string
    }
}
type Product = Timestamps & {
    _id: string
    name: string
    thumbnail: string
    featureImage: string[]
    price: number
    sale?: string
    description?: object | string
    variants: ProductVariant[]
    inStock: number
    properties?: ProductProperties
    category: { name: string }
    brand: { name: string }
    reviews?: string[]
    slug: string
}
type NewProduct = Omit<
    Product,
    '_id' | 'category' | 'brand' | 'variants' | 'slug' | keyof Timestamps
> & {
    category: string
    brand: string
    variants: string[]
    slug?: string
}

type ProductVariant = Timestamps & {
    _id: string
    label: string
    images: string[]
    inStock: number
}
type NewProductVariant = Omit<
    ProductVariant,
    '_id' | 'images' | keyof Timestamps
> & {
    images: File[]
}

// CartType
type NewCartItem = {
    product: Product
    quantity: number
    variant: ProductVariant
}
type CartItem = NewCartItem & {
    id: string
}
type Cart = CartItem[]

// BrandType
type Brand = Timestamps & {
    _id: string
    name: string
    logo: string
    products: Product[]
}
type NewBrand = Omit<Brand, '_id' | keyof Timestamps>

// CategoryType
type Category = Timestamps & {
    _id: string
    name: string
    thumbnail: string
    icon: string
    products: Product[]
}
type NewCategory = Omit<Category, '_id' | 'products' | keyof Timestamps>

// OrderType
type Order = Timestamps & {
    _id: string
    user: User
    deliveryInformation: {
        fullName: string
        phone: string
        email?: string
        address: string
    }
    paymentMethod: string
    products: ProductCart[]
    totalAmount: number
    subtotal: number
    shippingFee: number
    bonusPoints: number
}
type NewOrder = Omit<Order, '_id' | 'user' | keyof Timestamps> & {
    user: string
}

// ReviewType
type Review = Timestamps & {
    _id: string
    user: User | string
    product: Product | string
    rating: number
    comment: string
}
