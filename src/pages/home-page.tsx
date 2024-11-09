import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import BorderRotateButton from "@/components/ui/border-rotate-button";

export function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="py-20 text-center">
          <h1 className="mb-6 text-5xl font-bold tracking-tighter sm:text-6xl md:text-7xl">
            Hero App Workout
          </h1>
          <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
            Your personalized fitness companion for tracking workouts, setting goals, and achieving results. 
            Built for both beginners and experienced athletes.
          </p>
          <div className="flex flex-col items-center gap-4">
            <Link to="/signup">
              <BorderRotateButton />
            </Link>
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="mb-12 text-center text-3xl font-bold">Key Features</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg p-6 text-center">
              <h3 className="mb-3 text-xl font-semibold">Workout Tracking</h3>
              <p className="text-gray-600">Log your exercises, sets, reps, and weights with our intuitive interface</p>
            </div>
            <div className="rounded-lg p-6 text-center">
              <h3 className="mb-3 text-xl font-semibold">Progress Analytics</h3>
              <p className="text-gray-600">Visualize your progress with detailed charts and statistics</p>
            </div>
            <div className="rounded-lg p-6 text-center">
              <h3 className="mb-3 text-xl font-semibold">Achievement System</h3>
              <p className="text-gray-600">Stay motivated with our trophy system and milestone tracking</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 text-center text-sm text-gray-600">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
        </footer>
      </main>
    </div>
  );
}

export default HomePage;
