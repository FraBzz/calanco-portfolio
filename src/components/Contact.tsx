import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Github, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Have a project in mind? Let's discuss how we can work together to build
            robust backend solutions for your needs.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8 mb-12">
            <motion.a
              href="mailto:contact@calanco.dev"
              whileHover={{ y: -3 }}
              className="flex-1 flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg border border-separator-light dark:border-separator-dark"
            >
              <div className="p-3 bg-accent/10 rounded-full">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold mb-1">Email</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">contact@calanco.dev</p>
              </div>
            </motion.a>
            
            <motion.a
              href="https://github.com/calanco"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -3 }}
              className="flex-1 flex items-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg border border-separator-light dark:border-separator-dark"
            >
              <div className="p-3 bg-accent/10 rounded-full">
                <Github className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-display font-semibold mb-1">GitHub</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">github.com/calanco</p>
              </div>
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="p-6 sm:p-8 bg-white dark:bg-gray-900 rounded-lg border border-separator-light dark:border-separator-dark"
          >
            <h3 className="text-xl font-bold mb-6">Send a Message</h3>
            
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center p-6 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg"
              >
                <Check className="h-5 w-5 mr-2" />
                <span>Message sent successfully! I'll get back to you soon.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-separator-light dark:border-separator-dark rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      required
                      className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-separator-light dark:border-separator-dark rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full p-3 bg-gray-50 dark:bg-gray-800 border border-separator-light dark:border-separator-dark rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-md font-medium transition-colors ${
                    isSubmitting 
                      ? 'bg-gray-400 text-white cursor-not-allowed' 
                      : 'bg-cta hover:bg-cta/90 text-white'
                  }`}
                >
                  {isSubmitting ? (
                    <>Processing<span className="animate-pulse">...</span></>
                  ) : (
                    <>Send Message <Send className="h-4 w-4" /></>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;