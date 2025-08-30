"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, PenTool, Star, Zap, MessageSquare, Calendar, UsersRound, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";


export function PromotionBanner() {
    const [isVisible, setIsVisible] = useState(true);
    const [timeLeft, setTimeLeft] = useState(5);
    const { user } = useAuth();
    const router = useRouter();

    // Auto-close after 5 seconds
    useEffect(() => {
        if (!isVisible) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    setIsVisible(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isVisible]);

    // Handle Community click
    const handleCommunityClick = () => {
        if (user) {
            router.push("/community");
        } 
        setIsVisible(false);
    };

    // Handle Become Writer click
    const handleBecomeWriterClick = () => {
        if (user) {
            router.push("/auth/become-writer");
        } 
        setIsVisible(false);
    };

    // Don't show if user is already a writer
    const showBecomeWriter = !user || user?.role !== "writer";

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: -100, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -100, scale: 0.95 }}
                transition={{
                    type: "spring",
                    damping: 25,
                    stiffness: 300,
                    duration: 0.5
                }}
                className="fixed top-20 left-1/2 transform -translate-x-1/2 z-40 w-[95%] max-w-2xl"
            >
                <Card className="relative overflow-hidden shadow-2xl border-2 border-purple-200/50 bg-gradient-to-br from-white via-purple-50/30 to-pink-50/30 backdrop-blur-sm">
                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse" />
                        <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-gradient-to-br from-pink-400/20 to-purple-400/20 rounded-full blur-xl animate-pulse delay-1000" />
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-gradient-to-br from-purple-300/10 to-pink-300/10 rounded-full blur-2xl animate-ping" />
                    </div>

                    <CardContent className="relative p-6">
                        {/* Close button with timer */}
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <Badge variant="secondary" className="text-xs font-medium">
                                {timeLeft}s
                            </Badge>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsVisible(false)}
                                className="h-8 w-8 rounded-full hover:bg-gray-100/80 transition-colors"
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Header */}
                        <div className="mb-6 pr-16">
                            <div className="flex items-center gap-2 mb-2">
                                <Sparkles className="h-5 w-5 text-purple-500" />
                                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                                    Welcome to InkSaga!
                                </h3>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Join our vibrant community and unlock amazing features
                            </p>
                        </div>

                        {/* Action buttons */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Community Card */}
                            <motion.div
                                whileHover={{ scale: 1.02, y: -2 }}
                                whileTap={{ scale: 0.98 }}
                                transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            >
                                <Button
                                    onClick={handleCommunityClick}
                                    className="w-full h-auto p-4 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                    variant="default"
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="relative">
                                            <Users className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-pulse" />
                                        </div>
                                        <div className="flex-1 text-left">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-semibold">Join Community</span>
                                                <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                                                    <Star className="h-2 w-2 mr-1" />
                                                    50K+
                                                </Badge>
                                            </div>
                                            <div className="text-xs text-purple-100 space-y-1">
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare className="h-3 w-3" />
                                                    <span>Chat with fans</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <Calendar className="h-3 w-3" />
                                                    <span>Join events</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Button>
                            </motion.div>

                            {/* Become Writer Card */}
                            {showBecomeWriter && (
                                <motion.div
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    transition={{ type: "spring", damping: 20, stiffness: 300 }}
                                >
                                    <Button
                                        onClick={handleBecomeWriterClick}
                                        className="w-full h-auto p-4 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 group"
                                        variant="default"
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <div className="relative">
                                                <PenTool className="h-6 w-6 group-hover:scale-110 transition-transform" />
                                                <Zap className="absolute -top-1 -right-1 h-3 w-3 text-yellow-300 animate-pulse" />
                                            </div>
                                            <div className="flex-1 text-left">
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold">Become Writer</span>
                                                    <Badge variant="secondary" className="bg-white/20 text-white text-xs">
                                                        NEW
                                                    </Badge>
                                                </div>
                                                <div className="text-xs text-pink-100 space-y-1">
                                                    <div>• Publish your stories</div>
                                                    <div>• Build your audience</div>
                                                </div>
                                            </div>
                                        </div>
                                    </Button>
                                </motion.div>
                            )}
                        </div>

                        {/* Bottom text */}
                        <div className="mt-4 text-center">
                            <p className="text-xs text-muted-foreground">
                                {user ? "Ready to explore?" : "Sign in to unlock all features"}
                            </p>
                        </div>
                    </CardContent>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-20 animate-pulse"
                        style={{
                            background: 'linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)',
                            backgroundSize: '200% 100%',
                            animation: 'shimmer 3s infinite linear'
                        }}
                    />
                </Card>
            </motion.div>

    
        </AnimatePresence>
    );
}