type User = Timestamps & {
    _id: string
    username: string
    password?: string
    email: string
    fullName: string
    phone: string
    avatar: string
    bonusPoints: number
    orderHistory: string[]
    reviews: string[]
    role: 'admin' | 'member'
}
type Login = Required<Pick<User, 'username' | 'password'>>
type NewUser = Required<Pick<User, 'username' | 'password' | 'email' | 'phone'>>
