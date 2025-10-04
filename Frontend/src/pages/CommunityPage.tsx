import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, UserCheck, Video, PlusCircle } from "lucide-react";

// Placeholder data for the page
const forumPosts = [
  { author: "John Farmer", avatar: "https://github.com/shadcn.png", title: "Best irrigation techniques for sandy soil?", replies: 12, likes: 34, time: "2 hours ago" },
  { author: "Jane Appleseed", avatar: "https://github.com/shadcn.png", title: "Dealing with pests on my tomato plants - organic solutions?", replies: 8, likes: 22, time: "5 hours ago" },
  { author: "Sam Root", avatar: "https://github.com/shadcn.png", title: "Market prices for corn are up this week in my region.", replies: 5, likes: 45, time: "1 day ago" },
];

const experts = [
  { name: "Dr. Anya Sharma", specialty: "Soil Scientist", avatar: "https://github.com/shadcn.png" },
  { name: "David Lee", specialty: "Pest Control Expert", avatar: "https://github.com/shadcn.png" },
  { name: "Maria Garcia", specialty: "Agronomist", avatar: "https://github.com/shadcn.png" },
];

// --- UPDATED TUTORIAL LINKS ---
const tutorials = [
  { title: "Mastering Drip Irrigation", thumbnail: "https://placehold.co/600x400/34d399/ffffff?text=Video", link: "https://www.youtube.com/watch?v=UE-45y6iK-I" },
  { title: "Organic Pest Control Basics", thumbnail: "https://placehold.co/600x400/34d399/ffffff?text=Video", link: "https://www.youtube.com/watch?v=Ra-i_9-u2gA" },
  { title: "Maximizing Wheat Yield", thumbnail: "https://placehold.co/600x400/34d399/ffffff?text=Video", link: "https://www.youtube.com/watch?v=D-41_p9-9fA" },
];

const CommunityPage = () => {
  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 pb-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Community Hub
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Connect, share, and learn with fellow farmers and experts from around the world.
          </p>
        </header>

        {/* Discussion Forums Section */}
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-foreground">Discussion Forums</h2>
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Forums
            </Button>
          </div>
          <div className="space-y-6">
            {forumPosts.map((post, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center gap-4">
                  <Avatar><AvatarImage src={post.avatar} alt={post.author} /><AvatarFallback>{post.author.charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <CardTitle className="text-lg">{post.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">Posted by {post.author} • {post.time}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-end items-center gap-6 text-muted-foreground">
                  <div className="flex items-center gap-2"><ThumbsUp className="h-4 w-4" /><span>{post.likes}</span></div>
                  <div className="flex items-center gap-2"><MessageSquare className="h-4 w-4" /><span>{post.replies}</span></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Expert Consultation Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-foreground mb-6">Expert Consultation</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert, index) => (
              <Card key={index} className="text-center p-6">
                <Avatar className="w-24 h-24 mx-auto mb-4"><AvatarImage src={expert.avatar} /><AvatarFallback>{expert.name.charAt(0)}</AvatarFallback></Avatar>
                <h3 className="text-xl font-semibold">{expert.name}</h3>
                <p className="text-primary font-medium">{expert.specialty}</p>
                <Button variant="outline" className="mt-4">Book a Session</Button>
              </Card>
            ))}
          </div>
        </section>

        {/* Video Tutorials Section */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-6">Video Tutorials</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tutorials.map((tutorial, index) => (
              <a href={"https://youtu.be/HEyFQo9RUWQ?si=8n7O4u-GCu9Q7ncm"} key={index} target="_blank" rel="noopener noreferrer">
                <Card className="overflow-hidden group cursor-pointer h-full">
                  <div className="relative">
                    <img src={tutorial.thumbnail} alt={tutorial.title} className="w-full h-40 object-cover" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Video className="h-12 w-12 text-white" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground">{tutorial.title}</h3>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CommunityPage;

