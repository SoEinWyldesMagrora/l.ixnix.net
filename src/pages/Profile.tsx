import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PronounLanguageSection from '../components/PronounLanguageSection';
import ProfileShare from '../components/ProfileShare';
import { User } from '../types/user';
import { Link as LinkIcon, Settings, User as UserIcon } from 'lucide-react';

const Profile: React.FC = () => {
  const { username } = useParams();
  const { currentUser, updateProfile } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // German pronoun options
  const germanPronouns = [
    { id: 'sie/ihr', label: 'sie/ihr' },
    { id: 'er/ihm', label: 'er/ihm' },
    { id: 'they/them', label: 'they/them' },
    { id: 'sie/ihnen', label: 'sie/ihnen' }
  ];

  // English pronoun options
  const englishPronouns = [
    { id: 'they/them', label: 'they/them' },
    { id: 'she/her', label: 'she/her' },
    { id: 'he/him', label: 'he/him' },
    { id: 'ze/hir', label: 'ze/hir' }
  ];

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoading(true);
      try {
        if (username) {
          // In a real app, we would fetch the user from an API
          // For now, we'll just use the current user if usernames match
          if (currentUser && currentUser.username === username) {
            setUser(currentUser);
          } else {
            // Mock fetching another user
            const mockUser: User = {
              id: '456',
              email: 'mock@example.com',
              username: username,
              displayName: username,
              avatarUrl: 'https://via.placeholder.com/150',
              pronouns: {
                de: ['sie/ihr'],
                en: ['they/them']
              }
            };
            setUser(mockUser);
            setIsEditing(false);
          }
        } else if (currentUser) {
          setUser(currentUser);
          setIsEditing(true);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUser();
  }, [username, currentUser, navigate]);

  const handlePronounToggle = (language: 'de' | 'en', pronoun: string) => {
    if (!user || !isEditing) return;
    
    const newPronouns = { ...user.pronouns };
    
    if (newPronouns[language].includes(pronoun)) {
      newPronouns[language] = newPronouns[language].filter(p => p !== pronoun);
    } else {
      newPronouns[language] = [...newPronouns[language], pronoun];
    }
    
    setUser({ ...user, pronouns: newPronouns });
    
    if (currentUser) {
      updateProfile({ pronouns: newPronouns });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <p className="mb-4">The user you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate('/')}
          className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-6 text-white">
          <div className="flex items-center mb-4">
            {user.avatarUrl ? (
              <img 
                src={user.avatarUrl} 
                alt={user.displayName || user.username} 
                className="w-20 h-20 rounded-full border-4 border-white object-cover"
              />
            ) : (
              <div className="w-20 h-20 rounded-full border-4 border-white bg-pink-300 flex items-center justify-center">
                <UserIcon size={40} className="text-white" />
              </div>
            )}
            <div className="ml-4">
              <h1 className="text-2xl font-bold">@{user.username}</h1>
              {user.displayName && user.displayName !== user.username && (
                <p className="text-white opacity-90">{user.displayName}</p>
              )}
            </div>
          </div>
        </div>

        <div className="p-6">
          <PronounLanguageSection 
            language="Deutsch"
            selectedPronouns={user.pronouns.de}
            pronounOptions={germanPronouns}
            onToggle={(pronoun) => handlePronounToggle('de', pronoun)}
            isEditable={isEditing}
          />
          
          <div className="border-t my-6"></div>
          
          <PronounLanguageSection 
            language="English"
            selectedPronouns={user.pronouns.en}
            pronounOptions={englishPronouns}
            onToggle={(pronoun) => handlePronounToggle('en', pronoun)}
            isEditable={isEditing}
          />
        </div>
      </div>

      <ProfileShare username={user.username} />
    </div>
  );
};

export default Profile;