import { Box } from "@nathanhfoster/ui";
import { getAllPosts } from "@/domains/Newsletter/lib/mdxParser";
import { HeroSection } from "./components/HeroSection";
import { FeaturedProjectsSection } from "./components/FeaturedProjectsSection";
import { LatestArticlesSection } from "./components/LatestArticlesSection";
import { CallToActionSection } from "./components/CallToActionSection";

export default function Home() {
  const recentPosts = getAllPosts().slice(0, 3);

  return (
    <Box variant="main" className="flex flex-1 flex-col">
      <HeroSection />
      <FeaturedProjectsSection />
      <LatestArticlesSection posts={recentPosts} />
      <CallToActionSection />
    </Box>
  );
}
