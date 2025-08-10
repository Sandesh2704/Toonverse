"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Paperclip, Smile, ImageIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChatInputProps {
  onSendMessage: (content: string) => void
}

export function ChatInput({ onSendMessage }: ChatInputProps) {
  const [message, setMessage] = useState("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message.trim())
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)

    // Auto-resize textarea
    const textarea = e.target
    textarea.style.height = "auto"
    textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`
  }

  return (
    <TooltipProvider>
      <div className="flex items-end gap-2">
        {/* Attachment Options */}
        <div className="flex items-center gap-1">
          <Tooltip>
            <TooltipTrigger >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Paperclip className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Attach file</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger >
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <ImageIcon className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Upload image</TooltipContent>
          </Tooltip>
        </div>

        {/* Message Input */}
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleTextareaChange}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            className="min-h-[40px] max-h-[120px] resize-none pr-12"
            rows={1}
          />

          {/* Emoji Button */}
          <Tooltip>
            <TooltipTrigger >
              <Button variant="ghost" size="sm" className="absolute right-2 top-2 h-6 w-6 p-0">
                <Smile className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Add emoji</TooltipContent>
          </Tooltip>
        </div>

        {/* Send Button */}
        <Button onClick={handleSend} disabled={!message.trim()} size="sm" className="h-10 w-10 p-0">
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </TooltipProvider>
  )
}
