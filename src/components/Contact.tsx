import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Check, Github, Mail, MapPin, AlertCircle } from 'lucide-react';
import { CalancoLogo } from '../assets/icons';
import { ContactService } from '../services';

const contactMethods = [
	{
		icon: Mail,
		title: 'Email',
		description: 'Best for detailed project discussions',
		value: 'contact@calanco.dev',
		href: 'mailto:contact@calanco.dev',
	},
	{
		icon: Github,
		title: 'GitHub',
		description: 'Check out my code and projects',
		value: 'github.com/FraBzz',
		href: 'https://github.com/FraBzz',
	},
	{
		icon: MapPin,
		title: 'Location',
		description: 'Available for remote work worldwide',
		value: 'Remote / Italy',
		href: null,
	},
];

const Contact: React.FC = () => {
	const [formState, setFormState] = useState({
		name: '',
		email: '',
		message: '',
	});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		const { name, value } = e.target;
		setFormState((prev) => ({ ...prev, [name]: value }));
		if (error) setError(null);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setError(null);

		try {
			const result = await ContactService.submitContactForm(formState);
			
			if (result.success) {
				setIsSubmitted(true);
				setFormState({ name: '', email: '', message: '' });
				
				setTimeout(() => {
					setIsSubmitted(false);
				}, 6000);
			} else {
				setError(result.message);
			}
		} catch (error) {
			setError('An unexpected error occurred. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<>
			{/* Hero Section */}
			<section className="py-24 sm:py-32">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5 }}
						className="max-w-4xl mx-auto text-center mb-20"
					>            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Let's <span className="text-accent">Connect</span>
            </h1>
						<p className="text-xl text-text-dark mb-8 max-w-3xl mx-auto">
							Ready to bring your project to life? Let's discuss how we can work together to build
							<span className="text-cta font-semibold"> exceptional</span> solutions that exceed your
							expectations.
						</p>
					</motion.div>

					{/* Contact Methods */}
					<motion.div
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: 0.15 }}
						className="grid md:grid-cols-3 gap-6 mb-16"
					>
						{contactMethods.map((method, index) => {
							const Component = method.href ? 'a' : 'div';
							return (
								<motion.div
									key={method.title}
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
									className={`p-6 bg-neutral-800 rounded-xl border border-separator-dark transition-all group ${
										method.href ? 'hover:border-accent/50 hover:shadow-lg cursor-pointer' : ''
									}`}
								>
									<Component
										{...
										(method.href
											? {
													href: method.href,
													target: method.href.startsWith('http') ? '_blank' : undefined,
													rel: method.href.startsWith('http') ? 'noopener noreferrer' : undefined,
													className: 'block',
											  }
											: {})}
									>
										<div className="flex items-start gap-4">
											<div className="p-3 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
												<method.icon className="h-6 w-6 text-accent" />
											</div>
											<div className="flex-1">
												<h3 className="font-semibold mb-1 group-hover:text-accent transition-colors">
													{method.title}
												</h3>
												<p className="text-text-dark text-sm mb-2">
													{method.description}
												</p>
												<p className="text-cta font-medium text-sm">{method.value}</p>
											</div>
										</div>
									</Component>
								</motion.div>
							);
						})}
					</motion.div>
				</div>
			</section>

			{/* Contact Form Section */}
			<section className="py-16 border-t border-separator-dark">
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="max-w-3xl mx-auto">
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.3 }}
							className="text-center mb-12"
						>
							<h2 className="text-3xl font-bold mb-4">
								Send a <span className="text-cta">Message</span>
							</h2>
							<p className="text-text-dark">
								Ready to start your project? Drop me a message and let's discuss your requirements.
							</p>
						</motion.div>
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.4 }}
							className="p-6 sm:p-8 bg-neutral-800 rounded-xl border border-separator-dark shadow-sm"
						>
							{isSubmitted ? (
								<motion.div
									initial={{ opacity: 0, scale: 0.9 }}
									animate={{ opacity: 1, scale: 1 }}
									className="flex items-center justify-center p-8 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-lg"
								>
									<Check className="h-6 w-6 mr-3" />
									<div className="text-center">
										<h3 className="font-semibold mb-1">Message sent successfully!</h3>
										<p className="text-sm">I'll get back to you within 24 hours.</p>
									</div>
								</motion.div>							) : (
								<form onSubmit={handleSubmit} className="space-y-6">
									{error && (
										<motion.div
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
											className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded-lg border border-red-200 dark:border-red-800"
										>
											<AlertCircle className="h-5 w-5 flex-shrink-0" />
											<p className="text-sm">{error}</p>
										</motion.div>
									)}
									<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
										<div>
											<label
												htmlFor="name"
												className="block text-sm font-medium mb-2 text-text-primary dark:text-text-primary-dark"
											>
												Full Name *
											</label>
											<input
												type="text"
												id="name"
												name="name"
												value={formState.name}
												onChange={handleChange}
												required
												className="w-full p-3 bg-background-dark border border-separator-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
												placeholder="Your full name"
											/>
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium mb-2 text-text-primary dark:text-text-primary-dark"
											>
												Email Address *
											</label>
											<input
												type="email"
												id="email"
												name="email"
												value={formState.email}
												onChange={handleChange}
												required
												className="w-full p-3 bg-background-dark border border-separator-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors"
												placeholder="your.email@example.com"
											/>
										</div>
									</div>

									<div>
										<label
											htmlFor="message"
											className="block text-sm font-medium mb-2 text-text-primary dark:text-text-primary-dark"
										>
											Project Details *
										</label>
										<textarea
											id="message"
											name="message"
											value={formState.message}
											onChange={handleChange}
											required
											rows={6}
											className="w-full p-3 bg-background-dark border border-separator-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition-colors resize-vertical"
											placeholder="Tell me about your project, timeline, and requirements..."
										></textarea>
									</div>

									<div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
										<p className="text-sm text-text-dark">
											* Required fields
										</p>
										<button
											type="submit"
											disabled={isSubmitting}											className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
												isSubmitting
													? 'bg-cta/20 text-cta/50 cursor-not-allowed'
													: 'bg-cta hover:bg-cta/90 text-white shadow-lg hover:shadow-xl hover:scale-105'
											}`}
										>
											{isSubmitting ? (
												<>
													<div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
													Sending...
												</>
											) : (
												<>
													Send Message
													<Send className="h-4 w-4" />
												</>
											)}
										</button>
									</div>
								</form>
							)}
						</motion.div>						{/* Additional CTA */}
						<motion.div
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.5, delay: 0.7 }}
							className="text-center mt-12"
						>							<div className="bg-gradient-to-r from-accent/10 to-accent2/10 rounded-2xl p-12 border border-accent/20">								<div className="flex flex-col items-center text-center mb-8">
									<div className="p-12 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-3xl shadow-2xl mb-8 border-2 border-accent/40 transform hover:scale-105 transition-all duration-300 hover:shadow-3xl hover:border-accent/60">
										<div className="w-48 h-48 flex items-center justify-center">
											<CalancoLogo size="4xl" className="w-full h-full drop-shadow-2xl filter brightness-110" />
										</div>
									</div>
									<h3 className="text-3xl font-bold mb-3">Prefer a Quick Chat?</h3>
									<div className="text-xl text-accent font-bold tracking-wide mb-2">POWERED BY CALANCO</div>
									<div className="text-sm text-text-dark italic">Premium Development & Design</div>
								</div>
								<p className="text-text-dark mb-6">
									Sometimes a direct conversation is the best way to understand your needs.
								</p>
								<a
									href="mailto:contact@calanco.dev?subject=Quick%20Chat%20Request"
									className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white hover:bg-accent/90 rounded-lg font-semibold transition-colors"
								>
									<Mail className="h-4 w-4" />
									Schedule a Call
								</a>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</>
	);
};

export default Contact;


