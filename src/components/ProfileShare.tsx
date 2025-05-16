import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Share, Copy, Download, Check, Facebook, Twitter, Linkedin, Mail, MessageCircle, Send } from 'lucide-react';

interface ProfileShareProps {
  username: string;
}

const ProfileShare: React.FC<ProfileShareProps> = ({ username }) => {
  const [copied, setCopied] = useState(false);
  const profileUrl = `https://l.ixnix.net/@${username}`;
  
  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(profileUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };
  
  const handleDownloadQR = () => {
    const svg = document.getElementById('profile-qr-code');
    if (!svg) return;
    
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = `${username}-qrcode.png`;
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };
  
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, color: 'bg-blue-600', url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}` },
    { name: 'Twitter', icon: Twitter, color: 'bg-blue-400', url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(profileUrl)}&text=Check out my pronouns page:` },
    { name: 'LinkedIn', icon: Linkedin, color: 'bg-blue-700', url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}` },
    { name: 'Email', icon: Mail, color: 'bg-red-500', url: `mailto:?subject=My Pronouns Page&body=Check out my pronouns page: ${profileUrl}` },
    { name: 'WhatsApp', icon: MessageCircle, color: 'bg-green-500', url: `https://wa.me/?text=${encodeURIComponent(`Check out my pronouns page: ${profileUrl}`)}` },
    { name: 'Telegram', icon: Send, color: 'bg-blue-500', url: `https://t.me/share/url?url=${encodeURIComponent(profileUrl)}&text=Check out my pronouns page` }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold flex items-center">
          <Share className="mr-2" size={20} />
          Share Your Profile
        </h2>
      </div>
      
      <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
        <div className="p-4 bg-white shadow-sm rounded-lg border border-gray-200">
          <QRCode
            id="profile-qr-code"
            value={profileUrl}
            size={150}
            style={{ height: "auto", maxWidth: "100%", width: "150px" }}
            level="M"
            fgColor="#DB2777"
          />
        </div>
        
        <div className="flex-1">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Link</label>
            <div className="flex">
              <input
                type="text"
                value={profileUrl}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <button
                onClick={handleCopyLink}
                className="px-3 py-2 bg-pink-600 text-white rounded-r-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
              >
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
          
          <button
            onClick={handleDownloadQR}
            className="flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 w-full"
          >
            <Download size={18} className="mr-2" />
            Download QR Code
          </button>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium mb-3">Share on Social Media</h3>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white p-2 rounded-full hover:opacity-90 transition-opacity`}
              aria-label={`Share on ${link.name}`}
            >
              <link.icon size={20} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileShare;