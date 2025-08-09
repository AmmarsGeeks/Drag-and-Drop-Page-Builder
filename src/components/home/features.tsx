import { Layers, Edit3, UploadCloud } from "lucide-react"

export const Features = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    <FeatureCard
      title="Pre-Made Sections"
      description="Choose from a library of professionally designed sections like heroes, footers, and galleries."
      icon={<Layers />}
    />
    <FeatureCard
      title="Fully Editable"
      description="Easily customize text, images, and layouts with a simple, intuitive editor."
      icon={<Edit3 />}
    />
    <FeatureCard
      title="Import / Export"
      description="Save your work as JSON and reload it anytime to continue building."
      icon={<UploadCloud />}
    />
  </div>
)

type FeatureCardProps = Readonly<{
  title: string
  description: string
  icon: React.ReactNode
}>

const FeatureCard = ({ title, description, icon }: FeatureCardProps) => (
  <div className="flex flex-col rounded-md border bg-secondary p-6 shadow-sm transition-colors hover:bg-secondary/80">
    <div className="mb-2 text-ring">{icon}</div>
    <h5 className="text-lg font-semibold">{title}</h5>
    <p className="font-medium text-muted-foreground">{description}</p>
  </div>
)
