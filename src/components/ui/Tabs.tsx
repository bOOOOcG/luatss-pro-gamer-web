import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"
import { cn } from "../../lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-12 items-center justify-center rounded-t-lg bg-gray-800 text-white shadow-sm p-1 border border-yellow-500 border-b-0",
      className
    )}
    {...props}
  />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "inline-flex items-center justify-center whitespace-nowrap rounded-t-lg px-4 py-2 text-base font-semibold transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative data-[state=active]:bg-indigo-600 data-[state=active]:text-white",
      className
    )}
    {...props}
  />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "bg-gray-800 text-white shadow-sm p-6 transition-opacity duration-300 ease-in-out border border-yellow-500 rounded-b-lg rounded-tr-lg",
      className
    )}
    {...props}
  />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

const TabsRoot = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, ...props }, ref) => {
  const [activeTab, setActiveTab] = React.useState(0)
  const listRef = React.useRef<HTMLDivElement>(null)
  const [indicatorStyle, setIndicatorStyle] = React.useState({})

  React.useEffect(() => {
    const updateIndicator = () => {
      const list = listRef.current
      if (list) {
        const activeButton = list.children[activeTab] as HTMLElement
        if (activeButton) {
          const { offsetLeft, offsetWidth } = activeButton
          setIndicatorStyle({
            left: `${offsetLeft}px`,
            width: `${offsetWidth}px`,
          })
        }
      }
    }

    updateIndicator()
    window.addEventListener('resize', updateIndicator)
    return () => window.removeEventListener('resize', updateIndicator)
  }, [activeTab])

  return (
    <Tabs
      ref={ref}
      className={cn("relative", className)}
      {...props}
      onValueChange={(value) => {
        setActiveTab(parseInt(value))
        if (props.onValueChange) {
          props.onValueChange(value)
        }
      }}
    >
      <div ref={listRef} className="relative">
        <TabsList>
          {React.Children.map(props.children, (child, index) => (
            <TabsTrigger value={index.toString()}>{child}</TabsTrigger>
          ))}
        </TabsList>
        <div
          className="absolute bottom-0 h-1 bg-indigo-600 transition-all duration-300 ease-in-out"
          style={{
            ...indicatorStyle,
            transition: 'all 0.3s cubic-bezier(0.25, 0.1, 0.25, 1.0)',
          }}
        />
      </div>
      {React.Children.map(props.children, (child, index) => (
        <TabsContent value={index.toString()}>{child}</TabsContent>
      ))}
    </Tabs>
  )
})
TabsRoot.displayName = "TabsRoot"

export { TabsRoot as Tabs, TabsList, TabsTrigger, TabsContent }