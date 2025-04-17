import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { login } from '../api/auth'
import useApi from '../hooks/useApi'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Loading from '../components/common/Loading'

const Login = () => {
    const navigate = useNavigate()
    const { login: authLogin } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    })
    const [touched, setTouched] = useState({
        email: false,
        password: false
    })

    const loginApi = useApi(login)

    const validateForm = () => {
        const errors = {
            email: '',
            password: ''
        }
        let isValid = true

        if (!formData.email.trim()) {
            errors.email = 'Email is required'
            isValid = false
        }

        if (!formData.password.trim()) {
            errors.password = 'Password is required'
            isValid = false
        }

        setFormErrors(errors)
        return isValid
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
        // Clear error when user starts typing
        if (formErrors[name]) {
            setFormErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const handleBlur = (e) => {
        const { name } = e.target
        setTouched(prev => ({
            ...prev,
            [name]: true
        }))
        validateForm()
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setTouched({
            email: true,
            password: true
        })

        if (!validateForm()) {
            return
        }

        try {
            const data = await loginApi.execute(formData.email, formData.password)
            if (data?.token && data?.user) {
                authLogin(data.token, data.user)
                navigate('/', { replace: true })
            }
        } catch (err) {
            console.error('Login error:', err.message)
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                        {loginApi.error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm" role="alert">
                                {loginApi.error}
                            </div>
                        )}
                        
                        <div className="relative">
                            <Input
                                label="Email address"
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                disabled={loginApi.loading}
                                placeholder="Enter your email"
                                error={false}
                            />
                            {touched.email && formErrors.email && (
                                <div className="absolute right-0 top-0 mt-2 mr-2 bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-1">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                    </svg>
                                    {formErrors.email}
                                </div>
                            )}
                        </div>

                        <div className="relative">
                            <Input
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                required
                                disabled={loginApi.loading}
                                placeholder="Enter your password"
                                error={false}
                            />
                            {touched.password && formErrors.password && (
                                <div className="absolute right-0 top-0 mt-2 mr-2 bg-red-50 text-red-600 text-xs px-2 py-1 rounded border border-red-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 inline-block mr-1">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                                    </svg>
                                    {formErrors.password}
                                </div>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={loginApi.loading}
                            >
                                {loginApi.loading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Loading size="sm" />
                                        <span>Signing in...</span>
                                    </div>
                                ) : (
                                    'Sign in'
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">
                                    Don't have an account?
                                </span>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                type="button"
                                variant="outline"
                                className="w-full"
                                onClick={() => navigate('/register')}
                                disabled={loginApi.loading}
                            >
                                Create new account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
