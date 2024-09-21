import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '@/context/AuthContext'
import IUser from '@/types/user'
import { toast } from 'sonner'

const useLogout = () => {
    const navigates = useNavigate()
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext()

    const logout = async () => {
        setLoading(true)
        try {
            // const params = {}
            // await authApi.logout(params)
            localStorage.removeItem('__user-information')
            toast.success('Đăng xuất thành công')
            navigates('/')
            setAuthUser({} as IUser)
        } catch (error) {
            toast.error('Đã xảy ra lỗi')
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}
export default useLogout
