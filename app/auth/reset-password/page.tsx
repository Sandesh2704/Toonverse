"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Lock, Eye, EyeOff, CheckCircle, AlertCircle, ArrowLeft } from "lucide-react"
import { toast } from "sonner"

const passwordRequirements = [
  { regex: /.{8,}/, text: "At least 8 characters" },
  { regex: /[A-Z]/, text: "One uppercase letter" },
  { regex: /[a-z]/, text: "One lowercase letter" },
  { regex: /\d/, text: "One number" },
  { regex: /[^A-Za-z0-9]/, text: "One special character" },
]

export default function ResetPasswordPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get("token")

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string; token?: string }>({})

  useEffect(() => {
    if (!token) {
      setErrors({ token: "Invalid or missing reset token" })
    }
  }, [token])

  const getPasswordStrength = () => {
    const metRequirements = passwordRequirements.filter((req) => req.regex.test(password)).length
    return (metRequirements / passwordRequirements.length) * 100
  }

  const getPasswordStrengthText = () => {
    const strength = getPasswordStrength()
    if (strength < 40) return { text: "Weak", color: "text-red-600" }
    if (strength < 80) return { text: "Medium", color: "text-yellow-600" }
    return { text: "Strong", color: "text-green-600" }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})

    // Validation
    if (!password) {
      setErrors({ password: "Password is required" })
      return
    }

    if (getPasswordStrength() < 100) {
      setErrors({ password: "Password doesn't meet all requirements" })
      return
    }

    if (!confirmPassword) {
      setErrors({ confirmPassword: "Please confirm your password" })
      return
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" })
      return
    }

    if (!token) {
      setErrors({ token: "Invalid reset token" })
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
      toast.success("Password reset successfully!")
    }, 2000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-xl border-0">
            <CardContent className="p-8 text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <h1 className="text-2xl font-bold mb-2">Password Reset Successfully!</h1>
              <p className="text-muted-foreground mb-6">
                Your password has been updated. You can now log in with your new password.
              </p>

              <Button  className="w-full">
                <Link href="/auth/login">Continue to Login</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-bold">Reset Your Password</CardTitle>
            <CardDescription>Enter your new password below</CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {errors.token && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-2 text-red-600">
                  <AlertCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Invalid Reset Link</span>
                </div>
                <p className="text-sm text-red-600 mt-1">
                  This reset link is invalid or has expired. Please request a new one.
                </p>
                <Button variant="outline" size="sm" className="mt-3 bg-transparent" >
                  <Link href="/auth/forgot-password">Request New Link</Link>
                </Button>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                    disabled={!!errors.token}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={!!errors.token}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.password && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.password}</span>
                  </div>
                )}
              </div>

              {password && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Password Strength</span>
                    <span className={`text-sm font-medium ${getPasswordStrengthText().color}`}>
                      {getPasswordStrengthText().text}
                    </span>
                  </div>
                  <Progress value={getPasswordStrength()} className="h-2" />
                  <div className="space-y-1">
                    {passwordRequirements.map((req, index) => (
                      <div key={index} className="flex items-center space-x-2 text-xs">
                        {req.regex.test(password) ? (
                          <CheckCircle className="w-3 h-3 text-green-600" />
                        ) : (
                          <div className="w-3 h-3 border border-gray-300 rounded-full" />
                        )}
                        <span className={req.regex.test(password) ? "text-green-600" : "text-muted-foreground"}>
                          {req.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                    disabled={!!errors.token}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={!!errors.token}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors.confirmPassword}</span>
                  </div>
                )}
                {confirmPassword && password !== confirmPassword && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    <span>Passwords don't match</span>
                  </div>
                )}
                {confirmPassword && password === confirmPassword && password && (
                  <div className="flex items-center space-x-2 text-green-600 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Passwords match</span>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoading || !!errors.token || getPasswordStrength() < 100 || password !== confirmPassword}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Resetting...</span>
                  </div>
                ) : (
                  <>
                    <Lock className="w-4 h-4 mr-2" />
                    Reset Password
                  </>
                )}
              </Button>
            </form>

            <div className="text-center">
              <Button variant="ghost" >
                <Link href="/auth/login">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Login
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
