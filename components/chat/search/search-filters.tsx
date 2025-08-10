"use client"

import { useSelector, useDispatch } from "react-redux"
import type { RootState } from "@/store"
import { setSearchFilters } from "@/store/chatSlice"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { CalendarIcon, Hash, User, FileText, ImageIcon, File, Settings, X } from "lucide-react"
import { format } from "date-fns"
import { mockParticipants } from "@/data/chat"

export function SearchFilters() {
  const dispatch = useDispatch()
  const { search, activeRooms } = useSelector((state: RootState) => state.chat)
  const { filters } = search

  const updateFilters = (updates: Partial<typeof filters>) => {
    dispatch(setSearchFilters(updates))
  }

  const clearAllFilters = () => {
    dispatch(
      setSearchFilters({
        roomIds: [],
        senderIds: [],
        messageTypes: ["text", "image", "file", "system"],
        dateRange: {},
        hasAttachments: undefined,
        hasReactions: undefined,
      }),
    )
  }

  const messageTypeIcons = {
    text: FileText,
    image: ImageIcon,
    file: File,
    system: Settings,
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-4 space-y-6">
        {/* Clear Filters */}
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Filters</h3>
          <Button variant="ghost" size="sm" onClick={clearAllFilters}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>

        {/* Chat Rooms */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Chat Rooms</Label>
          <div className="space-y-2">
            {activeRooms.map((room) => (
              <div key={room.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`room-${room.id}`}
                  checked={filters.roomIds.includes(room.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({ roomIds: [...filters.roomIds, room.id] })
                    } else {
                      updateFilters({ roomIds: filters.roomIds.filter((id) => id !== room.id) })
                    }
                  }}
                />
                <Label htmlFor={`room-${room.id}`} className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={room.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {room.type === "group" ? <Hash className="h-3 w-3" /> : <User className="h-3 w-3" />}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{room.name}</span>
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Message Senders */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Message Senders</Label>
          <div className="space-y-2">
            {mockParticipants.map((participant) => (
              <div key={participant.userId} className="flex items-center space-x-2">
                <Checkbox
                  id={`sender-${participant.userId}`}
                  checked={filters.senderIds.includes(participant.userId)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateFilters({ senderIds: [...filters.senderIds, participant.userId] })
                    } else {
                      updateFilters({ senderIds: filters.senderIds.filter((id) => id !== participant.userId) })
                    }
                  }}
                />
                <Label htmlFor={`sender-${participant.userId}`} className="flex items-center gap-2 cursor-pointer">
                  <Avatar className="h-5 w-5">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{participant.name}</span>
                  {participant.isOnline && <div className="h-2 w-2 bg-green-500 rounded-full" />}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        {/* Message Types */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Message Types</Label>
          <div className="space-y-2">
            {(["text", "image", "file", "system"] as const).map((type) => {
              const Icon = messageTypeIcons[type]
              return (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${type}`}
                    checked={filters.messageTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateFilters({ messageTypes: [...filters.messageTypes, type] })
                      } else {
                        updateFilters({ messageTypes: filters.messageTypes.filter((t) => t !== type) })
                      }
                    }}
                  />
                  <Label htmlFor={`type-${type}`} className="flex items-center gap-2 cursor-pointer">
                    <Icon className="h-4 w-4" />
                    <span className="text-sm capitalize">{type}</span>
                  </Label>
                </div>
              )
            })}
          </div>
        </div>

        <Separator />

        {/* Date Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Date Range</Label>
          <div className="space-y-2">
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger >
                  <Button variant="outline" size="sm" className="justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.from ? format(filters.dateRange.from, "PPP") : "From date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.from}
                    onSelect={(date) => updateFilters({ dateRange: { ...filters.dateRange, from: date } })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex gap-2">
              <Popover>
                <PopoverTrigger >
                  <Button variant="outline" size="sm" className="justify-start text-left font-normal bg-transparent">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.dateRange.to ? format(filters.dateRange.to, "PPP") : "To date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.dateRange.to}
                    onSelect={(date) => updateFilters({ dateRange: { ...filters.dateRange, to: date } })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        <Separator />

        {/* Additional Filters */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Additional Filters</Label>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-attachments"
                checked={filters.hasAttachments === true}
                onCheckedChange={(checked) => {
                  updateFilters({ hasAttachments: checked ? true : undefined })
                }}
              />
              <Label htmlFor="has-attachments" className="text-sm cursor-pointer">
                Has attachments
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="has-reactions"
                checked={filters.hasReactions === true}
                onCheckedChange={(checked) => {
                  updateFilters({ hasReactions: checked ? true : undefined })
                }}
              />
              <Label htmlFor="has-reactions" className="text-sm cursor-pointer">
                Has reactions
              </Label>
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}
