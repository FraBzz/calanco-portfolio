import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Bell, CheckCircle2 } from 'lucide-react';

const NotificationDemo: React.FC = () => {
  const [formState, setFormState] = useState({
    recipientEmail: '',
    subject: '',
    message: '',
    notificationType: 'email'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<any>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResponse({
        status: 'success',
        data: {
          notification: {
            id: `notif_${Math.floor(Math.random() * 10000000)}`,
            type: formState.notificationType,
            recipient: formState.recipientEmail,
            subject: formState.subject,
            content: formState.message,
            createdAt: new Date().toISOString(),
            status: 'delivered'
          }
        }
      });
      
      setIsLoading(false);
    }, 1500);
  };

  const resetDemo = () => {
    setResponse(null);
    setFormState({
      recipientEmail: '',
      subject: '',
      message: '',
      notificationType: 'email'
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-medium mb-6">Send Notification</h4>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="notificationType" className="block text-sm font-medium mb-1">
              Notification Type
            </label>
            <select
              id="notificationType"
              name="notificationType"
              value={formState.notificationType}
              onChange={handleChange}
              className="w-full p-2 bg-white dark:bg-gray-900 border border-separator-light dark:border-separator-dark rounded-md"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push Notification</option>
            </select>
          </div>
          
          <div className="mb-4">
            <label htmlFor="recipientEmail" className="block text-sm font-medium mb-1">
              {formState.notificationType === 'sms' ? 'Phone Number' : 'Email Address'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {formState.notificationType === 'email' ? (
                  <Mail className="h-5 w-5 text-gray-400" />
                ) : (
                  <Bell className="h-5 w-5 text-gray-400" />
                )}
              </div>
              <input
                type={formState.notificationType === 'email' ? 'email' : 'text'}
                id="recipientEmail"
                name="recipientEmail"
                value={formState.recipientEmail}
                onChange={handleChange}
                placeholder={formState.notificationType === 'sms' ? '+1234567890' : 'recipient@example.com'}
                className="pl-10 w-full p-2 bg-white dark:bg-gray-900 border border-separator-light dark:border-separator-dark rounded-md"
                required
              />
            </div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="subject" className="block text-sm font-medium mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formState.subject}
              onChange={handleChange}
              placeholder="Notification subject"
              className="w-full p-2 bg-white dark:bg-gray-900 border border-separator-light dark:border-separator-dark rounded-md"
              required
            />
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
              placeholder="Your notification message..."
              rows={4}
              className="w-full p-2 bg-white dark:bg-gray-900 border border-separator-light dark:border-separator-dark rounded-md"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-2.5 rounded-md font-medium transition-colors flex items-center justify-center gap-2 ${
              isLoading 
                ? 'bg-gray-400 text-white cursor-not-allowed' 
                : 'bg-accent hover:bg-accent/90 text-white'
            }`}
          >
            {isLoading ? (
              'Sending...'
            ) : (
              <>
                Send Notification
                <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
      
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
        <h4 className="font-medium mb-4">Notification Preview</h4>
        
        {response ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6"
          >
            <div className="bg-white dark:bg-gray-900 p-5 rounded-md border border-separator-light dark:border-separator-dark">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <div>
                  <h5 className="font-medium">{response.data.notification.subject}</h5>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Sent to: {response.data.notification.recipient} • {new Date(response.data.notification.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              </div>
              <div className="py-2 px-3 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                {response.data.notification.content}
              </div>
            </div>
            
            <div>
              <h5 className="text-sm font-medium mb-2">API Response</h5>
              <div className="bg-gray-100 dark:bg-gray-900/80 p-3 rounded-md overflow-x-auto">
                <pre className="text-xs">
                  {JSON.stringify(response, null, 2)}
                </pre>
              </div>
            </div>
            
            <button
              onClick={resetDemo}
              className="text-sm text-accent hover:underline"
            >
              Reset demo
            </button>
          </motion.div>
        ) : (
          <div className="text-center py-16 text-gray-500 dark:text-gray-400">
            <Bell className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Fill out the form to send a notification and see a preview.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDemo;