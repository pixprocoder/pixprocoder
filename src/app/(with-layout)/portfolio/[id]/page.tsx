'use client';
import { Button } from '@/src/components/ui/button';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/src/components/ui/tabs';
import { projects } from '@/src/constants';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowLeft, FiExternalLink, FiGithub } from 'react-icons/fi';

async function PortfolioDetailPage({ params }: any) {
  const { id } = await params;
  const singleProject = projects.find((p) => p.id === id);

  if (!singleProject) return <div>Project not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto"
      >
        {/* Back Navigation */}
        <div className="mb-8">
          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Back to Portfolio
          </Link>
        </div>

        {/* Project Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-transparent mb-4">
            {singleProject.title}
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            {singleProject.description}
          </p>
        </div>

        {/* Hero Image */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="relative aspect-video rounded-xl overflow-hidden border border-border mb-12"
        >
          <Image
            src={singleProject.image}
            alt={singleProject.title}
            fill
            className="object-cover"
          />
        </motion.div>

        {/* Project Details Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid grid-cols-3 md:grid-cols-4 gap-2 bg-background/50 backdrop-blur">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="tech">Technologies</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="py-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Project Challenge</h3>
                <p className="text-muted-foreground">
                  {singleProject.challenge || 'Challenge description...'}
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Key Results</h3>
                <ul className="space-y-2">
                  {singleProject.results?.map((result, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-primary">▹</span>
                      {result}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* Features Tab */}
          <TabsContent value="features" className="py-8">
            <div className="grid md:grid-cols-2 gap-8">
              {singleProject.features?.map((feature, i) => (
                <div
                  key={i}
                  className="p-6 rounded-xl border border-border bg-background/50"
                >
                  <h4 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Technologies Tab */}
          <TabsContent value="tech" className="py-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {singleProject.technologies?.map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg border border-border bg-background/50"
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={32}
                    height={32}
                    className="w-8 h-8"
                  />
                  <div>
                    <h4 className="font-medium">{tech.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {tech.purpose}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Gallery Tab */}
          <TabsContent value="gallery" className="py-8">
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4">
              {singleProject.screenshots?.map((screenshot, i) => (
                <div key={i} className="mb-4 break-inside-avoid">
                  <Image
                    src={screenshot}
                    alt={`Screenshot ${i + 1}`}
                    width={640}
                    height={360}
                    className="rounded-lg border border-border"
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Project Links */}
        <div className="flex flex-wrap gap-4 mt-12">
          <Link href={singleProject.gitHubLink} target="_blank">
            <Button className="gap-2" variant="outline">
              <FiGithub className="w-5 h-5" />
              View Source Code
            </Button>
          </Link>
          <Link href={singleProject.liveLink} target="_blank">
            <Button className="gap-2 bg-gradient-to-r from-primary to-blue-500 text-background">
              <FiExternalLink className="w-5 h-5" />
              Live Preview
            </Button>
          </Link>
        </div>

        {/* Related Projects */}
        {/* <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8">More Projects</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.id !== params.id).slice(0, 3).map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div> */}
      </motion.div>
    </div>
  );
}

export default PortfolioDetailPage;
