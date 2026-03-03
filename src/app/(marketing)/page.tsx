import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero placeholder */}
      <section className="bg-navy-900 text-white px-8 py-24 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Kenexis Consulting Corporation
        </h1>
        <p className="text-xl text-navy-200 mb-8 max-w-2xl mx-auto">
          Globally recognized process safety consultancy specializing in risk
          analysis and engineered safeguards for the chemical process industry.
        </p>
        <div className="flex gap-4 justify-center flex-wrap items-center">
          {/* Navy primary button (via --primary = #0a1628) */}
          <Button size="lg">Our Services</Button>

          {/* Orange accent button */}
          <Button
            size="lg"
            className="bg-accent text-accent-foreground hover:bg-orange-600"
          >
            Contact Us
          </Button>

          {/* 21st.dev ShimmerButton */}
          <ShimmerButton
            background="rgba(232, 119, 34, 0.9)"
            shimmerColor="#ffffff"
            shimmerDuration="2.5s"
          >
            <span className="text-sm font-semibold">Get Started</span>
          </ShimmerButton>
        </div>
      </section>

      {/* shadcn Card showcase */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Core Service Pillars
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Engineering Consulting</CardTitle>
                <CardDescription>
                  Process Hazards Analysis, Quantitative Risk Analysis, Fire
                  &amp; Gas Mapping, SIS Design
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Software Products</CardTitle>
                <CardDescription>
                  KISS platform including Open-PHA, Vertigo, Arbor, Bowtie-Q,
                  and more cloud-based tools
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  View Software
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Training</CardTitle>
                <CardDescription>
                  Process safety training center with courses and the Kenexis
                  Unlimited subscription bundle
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" size="sm">
                  Browse Courses
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Brand color showcase */}
      <section className="py-16 px-8 bg-muted">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
            Brand Design System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Navy palette */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Navy Palette
              </h3>
              <div className="space-y-2">
                <div className="h-10 rounded bg-navy-50 border border-border flex items-center px-3 text-xs text-foreground">
                  navy-50 #f0f2f5
                </div>
                <div className="h-10 rounded bg-navy-200 flex items-center px-3 text-xs text-navy-900">
                  navy-200 #b3bdcd
                </div>
                <div className="h-10 rounded bg-navy-500 flex items-center px-3 text-xs text-white">
                  navy-500 #415a82
                </div>
                <div className="h-10 rounded bg-navy-700 flex items-center px-3 text-xs text-white">
                  navy-700 #1e2f4e
                </div>
                <div className="h-10 rounded bg-navy-900 flex items-center px-3 text-xs text-white">
                  navy-900 #0a1628 (Primary)
                </div>
              </div>
            </div>

            {/* Orange palette */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Orange Palette
              </h3>
              <div className="space-y-2">
                <div className="h-10 rounded bg-orange-50 border border-border flex items-center px-3 text-xs text-foreground">
                  orange-50 #fef3eb
                </div>
                <div className="h-10 rounded bg-orange-200 flex items-center px-3 text-xs text-orange-900">
                  orange-200 #fbc199
                </div>
                <div className="h-10 rounded bg-orange-500 flex items-center px-3 text-xs text-white">
                  orange-500 #e87722 (Accent)
                </div>
                <div className="h-10 rounded bg-orange-700 flex items-center px-3 text-xs text-white">
                  orange-700 #a05015
                </div>
                <div className="h-10 rounded bg-orange-900 flex items-center px-3 text-xs text-white">
                  orange-900 #582c0b
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typography showcase */}
      <section className="py-16 px-8 bg-background">
        <div className="max-w-2xl mx-auto">
          <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-6">
            Inter Typography (font-sans)
          </p>
          <h1 className="text-5xl font-bold text-foreground mb-3">
            Heading 1 — Bold
          </h1>
          <h2 className="text-3xl font-semibold text-foreground mb-3">
            Heading 2 — Semibold
          </h2>
          <p className="text-lg text-foreground mb-3">
            Body text — Process safety engineering at the highest standard.
          </p>
          <p className="text-sm text-muted-foreground">
            Muted text — Supporting information and captions.
          </p>
        </div>
      </section>
    </div>
  );
}
