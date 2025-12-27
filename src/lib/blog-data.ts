export type BlogPost = {
  slug: string;
  title: string;
  category: string;
  date: string;
  author: string;
  excerpt: string;
  image: string;
  content?: { heading: string; body: string }[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "modern-marketing-insights",
    title: "Latest Insights into Modern Marketing",
    category: "Marketing",
    date: "2023-12-18",
    author: "Liam Anderson",
    excerpt:
      "Discover the dynamic realm of modern marketing through our latest insights. In an era marked by technological evolution...",
    image: "/assets/hero-img.svg",
    content: [
      {
        heading: "What happen to modern marketing now?",
        body:
          "Discover the dynamic realm of modern marketing through our latest insights. In an era marked by technological evolution, our comprehensive analysis delves into groundbreaking strategies shaping the industry.",
      },
      {
        heading: "1. AI-Powered Personalization: The Next Frontier",
        body:
          "Artificial intelligence continues to be a driving force, with its applications in marketing becoming increasingly sophisticated. Our latest insights explore how AI is revolutionizing personalization strategies.",
      },
      {
        heading: "2. Rise of Virtual Events: Redefining Audience Engagement",
        body:
          "The global shift towards remote interactions has catalyzed the rise of virtual events. This segment explores how businesses are leveraging digital platforms to maximize reach.",
      },
      {
        heading: "3. Sustainable Marketing Practices: More Than a Trend",
        body:
          "Sustainability is no longer a peripheral concern. Learn how brands are integrating sustainable practices into their marketing strategies and messaging.",
      },
      {
        heading: "4. Shoppable Content: Seamless Path from Inspiration to Purchase",
        body:
          "Discover the strategies behind successful shoppable content and the integration of e-commerce into digital experiences.",
      },
      {
        heading: "5. Privacy-Centric Marketing in the Digital Age",
        body:
          "With increasing concerns about data privacy, learn how transparent practices can build trust and maintain engagement.",
      },
    ],
  },
  {
    slug: "tech-innovations-business",
    title: "Tech Innovations Redefining the Business Landscape",
    category: "Information Technology",
    date: "2023-12-20",
    author: "Nora Fields",
    excerpt:
      "In the ever-evolving business landscape, groundbreaking tech innovations are reshaping the way enterprises operate...",
    image: "/assets/about-us.svg",
    content: [
      {
        heading: "How technology is reshaping leadership decisions",
        body:
          "Modern teams are balancing automation with human judgement to keep pace with change. This article highlights the most impactful shifts.",
      },
    ],
  },
  {
    slug: "financial-stewardship-principles",
    title: "Key Principles for Effective Financial Stewardship",
    category: "Financial",
    date: "2023-12-22",
    author: "Marcus Lee",
    excerpt:
      "Effective financial stewardship hinges on a set of key principles that guide decision-making and long-term growth...",
    image: "/assets/our-work-2.svg",
    content: [
      {
        heading: "Build resilient finance operations",
        body:
          "From scenario planning to real-time reporting, financial stewardship is about steady, deliberate leadership during uncertainty.",
      },
    ],
  },
  {
    slug: "contemporary-market-strategies",
    title: "Strategies for Conquering Contemporary Markets",
    category: "Marketing",
    date: "2023-12-26",
    author: "Rosa Patel",
    excerpt:
      "Conquering contemporary markets requires more than a strong product. It takes sharp positioning and execution...",
    image: "/assets/offer-5.svg",
  },
  {
    slug: "design-industry-challenges",
    title: "Overcoming Challenges in the Design Industry",
    category: "Design",
    date: "2023-12-28",
    author: "Dylan Price",
    excerpt:
      "In the dynamic world of design, industry professionals encounter constant shifts in tools, trends, and expectations...",
    image: "/assets/benefit-2.svg",
  },
  {
    slug: "untapped-business-avenues",
    title: "Identifying and Exploiting Untapped Business Avenues",
    category: "Business",
    date: "2024-01-02",
    author: "Avery Brooks",
    excerpt:
      "The ever-evolving scope of business uncovers new paths. This article dives into spotting and seizing opportunities...",
    image: "/assets/our-work-3.svg",
  },
  {
    slug: "entrepreneurial-success",
    title: "Seizing Opportunities for Entrepreneurial Success",
    category: "Information Technology",
    date: "2024-01-07",
    author: "Jordan Cole",
    excerpt:
      "In a rapidly changing business climate, entrepreneurs must identify and act on high-impact opportunities quickly...",
    image: "/assets/offer-2.svg",
  },
  {
    slug: "agriculture-profit-growth",
    title: "Maximizing Profit in the Fields of Agriculture",
    category: "Business",
    date: "2024-01-10",
    author: "Sasha Whit",
    excerpt:
      "Agriculture leaders are embracing data and supply chain improvements to increase profits and reduce volatility...",
    image: "/assets/hero-img.svg",
  },
];
