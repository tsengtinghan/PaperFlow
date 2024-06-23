"use client";
import React from "react";
import { ArrowRight, FileText, Clock, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <header className="bg-white shadow-sm">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="font-bold text-xl text-blue-600">PaperFlow</div>
          <div className="space-x-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">Contact</Button>
            <Button>Get Started</Button>
          </div>
        </nav>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl">
            Automate Your Paperwork
          </h1>
          <p className="mt-3 max-w-md mx-auto text-xl text-gray-500 sm:text-2xl md:mt-5 md:max-w-3xl">
            Streamline your document processes, save time, and reduce errors
            with our intelligent automation platform.
          </p>
          <div className="mt-10 flex justify-center">
            <a href="/upload">
              <Button size="lg" className="px-8 py-3 text-lg">
                Start Free Trial
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-extrabold text-center">
            Why Choose PaperFlow?
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={<FileText className="h-12 w-12 text-blue-600" />}
              title="Smart Document Processing"
              description="Our AI-powered system intelligently extracts and processes information from your documents."
            />
            <FeatureCard
              icon={<Clock className="h-12 w-12 text-blue-600" />}
              title="Save Time and Resources"
              description="Automate repetitive tasks and free up your team to focus on high-value activities."
            />
            <FeatureCard
              icon={<Shield className="h-12 w-12 text-blue-600" />}
              title="Secure and Compliant"
              description="Bank-level encryption and compliance with major regulatory standards to keep your data safe."
            />
          </div>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Use Cases</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>Blog</li>
                <li>Documentation</li>
                <li>Support</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 PaperFlow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      {icon}
      <h3 className="mt-4 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-gray-500">{description}</p>
    </div>
  );
};

export default LandingPage;
