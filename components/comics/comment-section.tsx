"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageSquare, Heart, Reply, Star, Send, Flag, MoreHorizontal, Edit, Trash2 } from "lucide-react"
import type { Comment } from "@/types/comic"
import { useSelector } from "react-redux"
import type { RootState } from "@/store"
import { toast } from "sonner"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface CommentSectionProps {
  comments: Comment[]
  comicId: string
  onCommentsUpdate: (comments: Comment[]) => void
}

export function CommentSection({ comments, comicId, onCommentsUpdate }: CommentSectionProps) {
  const { user } = useSelector((state: RootState) => state.user)
  const [newComment, setNewComment] = useState("")
  const [newRating, setNewRating] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  const handleSubmitComment = async () => {
    if (!user) {
      toast.error("Please login to comment")
      return
    }

    if (!newComment.trim()) {
      toast.error("Please enter a comment")
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      const comment: Comment = {
        id: `comment-${Date.now()}`,
        comicId,
        userId: user.id,
        userName: user.name,
        userAvatar: user.avatar,
        content: newComment,
        rating: newRating || undefined,
        likes: 0,
        replies: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }

      onCommentsUpdate([comment, ...comments])
      setNewComment("")
      setNewRating(0)
      setIsSubmitting(false)
      toast.success("Comment posted successfully!")
    }, 1000)
  }

  const handleSubmitReply = async (commentId: string) => {
    if (!user || !replyText.trim()) return

    // Simulate API call
    setTimeout(() => {
      const updatedComments = comments.map((comment) => {
        if (comment.id === commentId) {
          const newReply = {
            id: `reply-${Date.now()}`,
            commentId,
            userId: user.id,
            userName: user.name,
            userAvatar: user.avatar,
            content: replyText,
            likes: 0,
            createdAt: new Date().toISOString(),
          }
          return {
            ...comment,
            replies: [...comment.replies, newReply],
          }
        }
        return comment
      })

      onCommentsUpdate(updatedComments)
      setReplyText("")
      setReplyingTo(null)
      toast.success("Reply posted successfully!")
    }, 500)
  }

  const handleLikeComment = (commentId: string) => {
    const updatedComments = comments.map((comment) => {
      if (comment.id === commentId) {
        return { ...comment, likes: comment.likes + 1 }
      }
      return comment
    })
    onCommentsUpdate(updatedComments)
    toast.success("Comment liked!")
  }

  const averageRating =
    comments.reduce((acc, comment) => {
      return acc + (comment.rating || 0)
    }, 0) / comments.filter((c) => c.rating).length || 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <span>Comments & Reviews ({comments.length})</span>
            </CardTitle>

            {comments.filter((c) => c.rating).length > 0 && (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-semibold">{averageRating.toFixed(1)}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  ({comments.filter((c) => c.rating).length} reviews)
                </span>
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Comment Form */}
          {user ? (
            <div className="space-y-4 p-4 border rounded-lg bg-muted/30">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-muted-foreground">Share your thoughts</p>
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <p className="text-sm font-medium">Rate this comic (optional)</p>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button key={star} onClick={() => setNewRating(star)} className="p-1">
                      <Star
                        className={`h-5 w-5 transition-colors ${
                          star <= newRating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-muted-foreground hover:text-yellow-400"
                        }`}
                      />
                    </button>
                  ))}
                  {newRating > 0 && (
                    <button
                      onClick={() => setNewRating(0)}
                      className="ml-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>

              <Textarea
                placeholder="Write your comment or review..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[100px]"
              />

              <div className="flex justify-end">
                <Button onClick={handleSubmitComment} disabled={isSubmitting || !newComment.trim()}>
                  {isSubmitting ? (
                    "Posting..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Post Comment
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center p-8 border rounded-lg bg-muted/30">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Join the Discussion</h3>
              <p className="text-muted-foreground mb-4">Login to share your thoughts and connect with other readers.</p>
              <Button>Login to Comment</Button>
            </div>
          )}

          {/* Comments List */}
          <div className="space-y-6">
            {comments.length === 0 ? (
              <div className="text-center py-12">
                <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Comments Yet</h3>
                <p className="text-muted-foreground">Be the first to share your thoughts about this comic!</p>
              </div>
            ) : (
              comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  currentUser={user}
                  onLike={() => handleLikeComment(comment.id)}
                  onReply={() => setReplyingTo(comment.id)}
                  replyingTo={replyingTo}
                  replyText={replyText}
                  setReplyText={setReplyText}
                  onSubmitReply={() => handleSubmitReply(comment.id)}
                  onCancelReply={() => setReplyingTo(null)}
                />
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface CommentCardProps {
  comment: Comment
  currentUser: any
  onLike: () => void
  onReply: () => void
  replyingTo: string | null
  replyText: string
  setReplyText: (text: string) => void
  onSubmitReply: () => void
  onCancelReply: () => void
}

function CommentCard({
  comment,
  currentUser,
  onLike,
  onReply,
  replyingTo,
  replyText,
  setReplyText,
  onSubmitReply,
  onCancelReply,
}: CommentCardProps) {
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = () => {
    setIsLiked(!isLiked)
    onLike()
  }

  return (
    <div className="space-y-4">
      <div className="flex space-x-3">
        <Avatar>
          <AvatarImage src={comment.userAvatar || "/placeholder.svg"} />
          <AvatarFallback>{comment.userName.charAt(0)}</AvatarFallback>
        </Avatar>

        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <p className="font-medium">{comment.userName}</p>
              {comment.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{comment.rating}</span>
                </div>
              )}
              <span className="text-sm text-muted-foreground">{new Date(comment.createdAt).toLocaleDateString()}</span>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {currentUser?.id === comment.userId ? (
                  <>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </>
                ) : (
                  <DropdownMenuItem>
                    <Flag className="mr-2 h-4 w-4" />
                    Report
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-sm leading-relaxed">{comment.content}</p>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={handleLike} className={`h-8 ${isLiked ? "text-red-500" : ""}`}>
              <Heart className={`mr-1 h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              {comment.likes + (isLiked ? 1 : 0)}
            </Button>

            {currentUser && (
              <Button variant="ghost" size="sm" onClick={onReply} className="h-8">
                <Reply className="mr-1 h-4 w-4" />
                Reply
              </Button>
            )}
          </div>

          {/* Reply Form */}
          {replyingTo === comment.id && (
            <div className="space-y-3 mt-4 p-3 border rounded-lg bg-muted/30">
              <Textarea
                placeholder="Write your reply..."
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                className="min-h-[80px]"
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm" onClick={onCancelReply}>
                  Cancel
                </Button>
                <Button size="sm" onClick={onSubmitReply} disabled={!replyText.trim()}>
                  Reply
                </Button>
              </div>
            </div>
          )}

          {/* Replies */}
          {comment.replies.length > 0 && (
            <div className="space-y-3 mt-4 pl-4 border-l-2 border-muted">
              {comment.replies.map((reply) => (
                <div key={reply.id} className="flex space-x-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={reply.userAvatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-xs">{reply.userName.charAt(0)}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center space-x-2">
                      <p className="font-medium text-sm">{reply.userName}</p>
                      <span className="text-xs text-muted-foreground">
                        {new Date(reply.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-sm leading-relaxed">{reply.content}</p>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">
                      <Heart className="mr-1 h-3 w-3" />
                      {reply.likes}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
