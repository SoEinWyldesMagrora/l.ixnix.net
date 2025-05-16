import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PronounLanguageSection from '../components/PronounLanguageSection';
import ProfileShare from '../components/ProfileShare';
import { User } from '../types/user';
import { Link as LinkIcon, Settings, User as UserIcon, Disc as Discord, Pencil } from 'lucide-react';

const Profile: React.FC = () => {
  const { username } = useParams();
  const { currentUser, updateProfile } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [discordLink, setDiscordLink] = useState('');
  const [customLink, setCustomLink] = useState({ label: '', url: '' });
  const [editingSymbol, setEditingSymbol] = useState(false);
  const navigate = useNavigate();

  const symbols = ['★', '♠', '♣', '♥', '♦', '♪', '♫', '☀', '☁', '☂', '☃', '☄', '☎', '☮', '☯', '☸', '☹', '☺', '♈', '♉'];

  const germanPronouns = [
    { id: 'sie/ihr', label: 'sie/ihr' },
    { id: 'er/ihm', label: 'er/ihm' },
    { id: 'they/them', label: 'they/them' },
    { id: 'sie/ihnen', label: 'sie/ihnen' }
  ];

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
          if (currentUser && currentUser.username === username) {
            setUser(currentUser);
            setDiscordLink(currentUser.links?.discord || '');
            setCustomLink(currentUser.links?.custom || { label: '', url: '' });
          } else {
            const mockUser: User = {
              id: '456',
              email: 'mock@example.com',
              username: username,
              displayName: username,
              profileSymbol: '★',
              pronouns: {
                de: ['sie/ihr'],
                en: ['they/them']
              },
              links: {
                discord: 'username#1234',
                custom: {
                  label: 'Website',
                  url: 'https://example.com'
                }
              }
            };
            setUser(mockUser);
            setIsEditing(false);
          }
        } else if (currentUser) {
          setUser(currentUser);
          setDiscordLink(currentUser.links?.discord || '');
          setCustomLink(currentUser.links?.custom || { label: '', url: '' });
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

  const handleSaveLinks = () => {
    if (!user || !isEditing) return;

    const newLinks = {
      discord: discordLink,
      custom: customLink.label && customLink.url ? customLink : undefined
    };

    setUser({ ...user, links: newLinks });
    
    if (currentUser) {
      updateProfile({ links: newLinks });
    }
  };

  const handleSymbolChange = (symbol: string) => {
    if (!user || !isEditing) return;
    
    setUser({ ...user, profileSymbol: symbol });
    setEditingSymbol(false);
    
    if (currentUser) {
      updateProfile({ profileSymbol: symbol });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
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
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-md overflow-hidden mb-6">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
          <div className="flex items-center mb-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border-4 border-white bg-indigo-300 flex items-center justify-center text-4xl">
                {user.profileSymbol || '★'}
              </div>
              {isEditing && (
                <button
                  onClick={() => setEditingSymbol(!editingSymbol)}
                  className="absolute -bottom-2 -right-2 bg-white text-indigo-600 rounded-full p-1 shadow-md hover:bg-indigo-50 transition-colors"
                >
                  <Pencil size={16} />
                </button>
              )}
            </div>
            <div className="ml-4">
              <h1 className="text-2xl font-bold">@{user.username}</h1>
              {user.displayName && user.displayName !== user.username && (
                <p className="text-white opacity-90">{user.displayName}</p>
              )}
            </div>
          </div>

          {editingSymbol && (
            <div className="mt-4 p-4 bg-white/10 rounded-lg">
              <h3 className="text-sm font-medium mb-2">Choose a Symbol</h3>
              <div className="grid grid-cols-10 gap-2">
                {symbols.map((symbol) => (
                  <button
                    key={symbol}
                    onClick={() => handleSymbolChange(symbol)}
                    className="w-8 h-8 flex items-center justify-center bg-white/20 rounded-md hover:bg-white/30 transition-colors text-xl"
                  >
                    {symbol}
                  </button>
                ))}
              </div>
            </div>
          )}

          {isEditing && (
            <div className="space-y-4 mt-6 bg-white/10 rounded-lg p-4">
              <div>
                <label className="block text-sm font-medium mb-1">Discord Username</label>
                <input
                  type="text"
                  value={discordLink}
                  onChange={(e) => setDiscordLink(e.target.value)}
                  placeholder="username#1234"
                  className="w-full px-3 py-2 bg-white/20 rounded-md placeholder-white/50 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Custom Link</label>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    value={customLink.label}
                    onChange={(e) => setCustomLink({ ...customLink, label: e.target.value })}
                    placeholder="Label"
                    className="px-3 py-2 bg-white/20 rounded-md placeholder-white/50 text-white"
                  />
                  <input
                    type="url"
                    value={customLink.url}
                    onChange={(e) => setCustomLink({ ...customLink, url: e.target.value })}
                    placeholder="https://"
                    className="px-3 py-2 bg-white/20 rounded-md placeholder-white/50 text-white"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveLinks}
                className="w-full bg-white/20 hover:bg-white/30 text-white py-2 rounded-md transition-colors"
              >
                Save Links
              </button>
            </div>
          )}

          {!isEditing && user.links && (
            <div className="flex gap-2 mt-4">
              {user.links.discord && (
                <a
                  href={`https://discord.com/users/${user.links.discord}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-[#5865F2] px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  <Discord size={20} />
                  <span>{user.links.discord}</span>
                </a>
              )}
              {user.links.custom && (
                <a
                  href={user.links.custom.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white/20 px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
                >
                  <LinkIcon size={20} />
                  <span>{user.links.custom.label}</span>
                </a>
              )}
            </div>
          )}
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