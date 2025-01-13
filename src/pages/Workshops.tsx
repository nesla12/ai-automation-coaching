import React, { useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { Users, Clock, Check, Brain, Zap, Code, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { WorkshopBooking } from '../components/workshops/WorkshopBooking';
import { AnimatePresence } from 'framer-motion';

export const Workshops = () => {
  const [showBooking, setShowBooking] = useState(false);

  const workshops = [
    {
      title: 'Make.com Fundamentals',
      duration: '1 Day Workshop',
      price: '997',
      maxParticipants: 5,
      topics: [
        'Understanding Make.com interface',
        'Creating basic workflows',
        'Working with common apps and services',
        'Error handling basics',
        'Best practices for beginners'
      ],
      level: 'Beginner'
    },
    {
      title: 'Advanced Automation',
      duration: '1 Day Workshop',
      price: '1994',
      maxParticipants: 8,
      topics: [
        'Complex workflow architecture',
        'Custom functions and formulas',
        'Advanced error handling',
        'Performance optimization',
        'Real-world case studies',
        'Available online or in-person'
      ],
      level: 'Advanced'
    },
    {
      title: 'Prompt Engineering Mastery',
      duration: '1 Day Workshop',
      price: '997',
      maxParticipants: 5,
      topics: [
        'Advanced prompt crafting techniques',
        'Chain-of-thought prompting',
        'Context window optimization',
        'Few-shot learning strategies',
        'Practical prompt templates'
      ],
      level: 'All Levels'
    },
    {
      title: 'AI Productivity Tools',
      duration: '1 Day Workshop',
      price: '1497',
      maxParticipants: 8,
      topics: [
        'AI tool selection and evaluation',
        'ChatGPT advanced techniques',
        'AI-powered content creation',
        'Office productivity AI tools',
        'Integration best practices'
      ],
      level: 'All Levels'
    }
  ];

  return (
    <Layout>
      <div className="py-12 bg-gradient-to-b from-background-light to-white dark:from-background-dark dark:to-background-dark/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold mb-6">AI Automation Workshops</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Hands-on training to master Make.com, AI automation, and prompt engineering
            </p>
            <p className="text-lg text-primary mb-12">
              In person workshops are held in Bolzano city-center or at your company up to 50 km away
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Brain className="w-12 h-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-2">Expert Instruction</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Learn from experienced automation specialists with real-world expertise
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Zap className="w-12 h-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-2">Hands-on Practice</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Build real workflows and solutions during interactive sessions
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Code className="w-12 h-12 text-primary mx-auto mb-4 transform hover:scale-110 transition-transform duration-300" />
                <h3 className="font-semibold mb-2">Real-world Solutions</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Apply learning directly to your business challenges
                </p>
              </motion.div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            {workshops.map((workshop, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold">{workshop.title}</h2>
                  <span className="px-3 py-1 text-sm font-medium rounded-full bg-primary/10 text-primary">
                    {workshop.level}
                  </span>
                </div>

                <div className="flex items-center space-x-6 mb-6">
                  <div className="flex items-center">
                    <Clock className="w-5 h-5 text-primary mr-2" />
                    <span>{workshop.duration}</span>
                  </div>
                  <div className="flex items-center">
                    <Users className="w-5 h-5 text-primary mr-2" />
                    <span>Up to {workshop.maxParticipants} participants</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="font-semibold mb-4">What you'll learn:</h3>
                  <ul className="space-y-3">
                    {workshop.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start">
                        <Check className="w-5 h-5 text-primary mr-2 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold">€{workshop.price}</span>
                    <span className="text-gray-600 dark:text-gray-400"> per day</span>
                  </div>
                  <Button onClick={() => setShowBooking(true)}>
                    Book Workshop <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Group Discount Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl p-8 text-center mb-16"
          >
            <h2 className="text-2xl font-bold mb-4">Group Discounts Available</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Book multiple workshops or bring more team members for special pricing.
              Contact us for custom training packages tailored to your needs.
            </p>
            <Link
              to="/contact"
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <Button size="lg">
                Workshop Request <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
        <AnimatePresence>
          {showBooking && <WorkshopBooking onClose={() => setShowBooking(false)} />}
        </AnimatePresence>
      </div>
    </Layout>
  );
};