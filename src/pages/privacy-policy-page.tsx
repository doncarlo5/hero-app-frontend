import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy for Hero App</h1>
      <p className="mb-4">Last updated: October 23, 2024</p>
      
      <div className="prose">
        <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</p>

        <p>We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Free Privacy Policy Generator.</p>

        <h2 className="text-2xl font-semibold mt-6 mb-4">Interpretation and Definitions</h2>
        
        {/* Add the rest of the privacy policy content here */}
        
        <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, You can contact us:</p>
        
        <p className="mt-8">Generated using Free Privacy Policy Generator</p>
      </div>

      <div className="mt-8">
        <Link to="/" className="text-blue-500 hover:underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
