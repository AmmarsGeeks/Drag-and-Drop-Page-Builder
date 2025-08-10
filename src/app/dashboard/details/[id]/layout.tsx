export default function DetailsLayout({ children }: LayoutProps) {
  return (
    <div className="flex flex-grow flex-col overflow-x-hidden">{children}</div>
  )
}
