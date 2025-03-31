
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Community from "@/components/home/Community";

const HomePage = () => {
  document.title = "Home | Communion Hub";
  return (
    <Layout>
      <Hero />
      <About />
      <Community />
    </Layout>
  );
};

export default HomePage; 