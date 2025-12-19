import { useState } from "react";
import { useParams } from "react-router-dom"
import Layout from "@/components/layout/Layout";
import NavigationBar from "@/components/layout/NavigationBar"
import ian from "@/assets/images/Ian.jpg"
import { Facebook, Twitch, Notebook, Pen, MoreVertical, Plus, X, Youtube, Linkedin, Instagram, ChevronDown } from "lucide-react";
import NotesGrid from "@/components/layout/NotesGrid";
import { useCardType } from "@/hooks/useCardType"
import UserLayout from "@/components/layout/User/UserLayout";
import { Input } from "@/components/ui/input";

interface SocialLink {
    id: number;
    platform: string;
    url: string;
}

export default function UsersSelf() {
    const { cardType, notes, quizzes } = useCardType();
    const { name } = useParams();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [description, setDescription] = useState("Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum repudiandae obcaecati tenetur quas eligendi adipisci. Ipsa ratione odit alias nulla! Eum itaque in natus ea harum, esse minima eveniet temporibus?");
    const [tempDescription, setTempDescription] = useState(description);
    const [openPlatformDropdown, setOpenPlatformDropdown] = useState<number | null>(null);
    
    const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
        { id: 1, platform: "Facebook", url: "https://facebook.com" },
        { id: 2, platform: "Twitch", url: "https://twitch.tv" }
    ]);
    const [tempSocialLinks, setTempSocialLinks] = useState<SocialLink[]>(socialLinks);

    const MAX_CHARS = 250;
    const availablePlatforms = ["Facebook", "Twitch", "Youtube", "Linkedin", "Instagram"];

    const handleEdit = () => {
        setIsDropdownOpen(false);
        setIsEditing(true);
        setTempDescription(description);
        setTempSocialLinks(socialLinks);
    };

    const handleSave = () => {
        setDescription(tempDescription);
        setSocialLinks(tempSocialLinks);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setTempDescription(description);
        setTempSocialLinks(socialLinks);
        setIsEditing(false);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        if (value.length <= MAX_CHARS) {
            setTempDescription(value);
        }
    };

    const addSocialLink = () => {
        const newLink: SocialLink = {
            id: Date.now(),
            platform: "Facebook",
            url: ""
        };
        setTempSocialLinks([...tempSocialLinks, newLink]);
    };

    const removeSocialLink = (id: number) => {
        setTempSocialLinks(tempSocialLinks.filter(link => link.id !== id));
    };

    const updateSocialLink = (id: number, field: 'platform' | 'url', value: string) => {
        setTempSocialLinks(tempSocialLinks.map(link => 
            link.id === id ? { ...link, [field]: value } : link
        ));
    };

    const getSocialIcon = (platform: string) => {
        switch(platform.toLowerCase()) {
            case 'facebook':
                return <Facebook className="w-5 h-5" />;
            case 'twitch':
                return <Twitch className="w-5 h-5" />;
            case 'youtube':
                return <Youtube className="w-5 h-5" />;
            case 'linkedin':
                return <Linkedin className="w-5 h-5" />;
            case 'instagram':
                return <Instagram className="w-5 h-5" />;
            default:
                return null;
        }
    };

    const selectPlatform = (linkId: number, platform: string) => {
        updateSocialLink(linkId, 'platform', platform);
        setOpenPlatformDropdown(null);
    };

    return (
        <>
            <UserLayout
                title="Profile"
                description='Yez'
            >
                <section className="flex max-w-350 gap-1 mb-8 p-8 border border-light-4 dark:border-dark-3 rounded-md relative">
                    {/* Three Dot Menu Button */}
                    {!isEditing && (
                        <div className="absolute top-4 right-4">
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="p-2 hover:bg-[#D6D9DB] dark:hover:bg-[#2B2B2B] rounded-full cursor-pointer transition-colors"
                                >
                                    <MoreVertical className="w-5 h-5 text-primary-dark dark:text-primary-white" />
                                </button>

                                {/* Dropdown Menu */}
                                {isDropdownOpen && (
                                    <div className="absolute left-0 mt-2 w-32 bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-[#D6D9DB] dark:border-[#2B2B2B] rounded-md shadow-lg z-10">
                                        <button
                                            onClick={handleEdit}
                                            className="w-full text-left px-4 py-3 hover:bg-[#D6D9DB] dark:hover:bg-[#2B2B2B] cursor-pointer text-primary-dark dark:text-primary-white transition-colors rounded-md"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <img className="min-w-60 max-h-60 gap-2 object-cover rounded-full" src={ian} />
                    <div className="flex flex-col justify-between mx-8 my-5 w-full">
                        <div>
                            <h1 className="text-4xl font-bold mb-5">Vangos <span className="text-dark-4 h- mb-5 text-[20px]">Ivan Rualen</span></h1>
                            
                            {isEditing ? (
                                <div className="mb-5">
                                    <label className="block text-sm font-medium mb-2">Description</label>
                                    <textarea
                                        value={tempDescription}
                                        onChange={handleDescriptionChange}
                                        className="w-full p-3 border border-[#D6D9DB] dark:border-[#2B2B2B] rounded-md bg-[#FCFCFD] dark:bg-[#1A1A1A] text-primary-dark dark:text-primary-white min-h-32 resize-y focus:outline-none focus:ring-2 focus:ring-[#492AE5]"
                                        placeholder="Enter your description"
                                    />
                                    <div className="flex justify-between items-center mt-2 mb-6">
                                        <span className={`text-sm ${tempDescription.length >= MAX_CHARS ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>
                                            {tempDescription.length}/{MAX_CHARS}
                                        </span>
                                    </div>

                                    <label className="block text-sm font-medium mb-2">Social Media Links</label>
                                    <div className="flex flex-col gap-3 mb-4">
                                        {tempSocialLinks.map((link) => (
                                            <div key={link.id} className="flex items-center gap-3 bg-[#FCFCFD] dark:bg-[#2B2B2B] rounded-md p-3 border border-[#D6D9DB] dark:border-[#2B2B2B]">
                                                <div className="flex items-center gap-2 w-40 relative">
                                                    {getSocialIcon(link.platform)}
                                                    
                                                    {/* Custom Dropdown */}
                                                    <div className="flex-1 relative">
                                                        <button
                                                            onClick={() => setOpenPlatformDropdown(openPlatformDropdown === link.id ? null : link.id)}
                                                            className="w-full flex items-center justify-between bg-transparent text-primary-dark dark:text-primary-white cursor-pointer hover:bg-[#D6D9DB] dark:hover:bg-[#1A1A1A] rounded px-2 py-1 transition-colors"
                                                        >
                                                            <span>{link.platform}</span>
                                                            <ChevronDown className={`w-4 h-4 transition-transform ${openPlatformDropdown === link.id ? 'rotate-180' : ''}`} />
                                                        </button>
                                                        
                                                        {openPlatformDropdown === link.id && (
                                                            <div className="absolute top-full left-0 mt-1 w-full bg-[#FCFCFD] dark:bg-[#1A1A1A] border border-[#D6D9DB] dark:border-[#2B2B2B] rounded-md shadow-lg z-20 overflow-hidden">
                                                                {availablePlatforms.map((platform) => (
                                                                    <button
                                                                        key={platform}
                                                                        onClick={() => selectPlatform(link.id, platform)}
                                                                        className="w-full flex items-center gap-2 px-3 py-2 hover:bg-[#D6D9DB] dark:hover:bg-[#2B2B2B] cursor-pointer text-primary-dark dark:text-primary-white transition-colors text-left"
                                                                    >
                                                                        {getSocialIcon(platform)}
                                                                        <span>{platform}</span>
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <Input
                                                    type="text"
                                                    value={link.url}
                                                    onChange={(e) => updateSocialLink(link.id, 'url', e.target.value)}
                                                    placeholder="URL"
                                                    className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-2 bg-transparent"
                                                />
                                                <button
                                                    onClick={() => removeSocialLink(link.id)}
                                                    className="text-gray-500 hover:text-red-500 cursor-pointer"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ))}
                                        
                                        <button
                                            onClick={addSocialLink}
                                            className="flex items-center justify-center gap-2 p-3 border border-[#D6D9DB] dark:border-[#2B2B2B] rounded-md cursor-pointer hover:bg-[#D6D9DB] dark:hover:bg-[#2B2B2B] transition-colors"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Social Link
                                        </button>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-3">
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 border border-[#D6D9DB] dark:border-[#2B2B2B] text-primary-dark dark:text-primary-white rounded-md cursor-pointer hover:bg-[#D6D9DB] dark:hover:bg-[#2B2B2B]"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={handleSave}
                                            className="px-4 py-2 bg-[#492AE5] hover:bg-[#3d23c4] text-white rounded-md cursor-pointer"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <p className="mb-5">
                                    {description}
                                </p>
                            )}
                        </div>
                        {!isEditing && (
                            <div className="flex gap-2">
                                {socialLinks.map((link) => (
                                    <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:opacity-70">
                                        {getSocialIcon(link.platform)}
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
                <div className="flex gap-2">
                    <button
                        className="user-buttons"
                        onClick={notes}>
                        <Notebook className="h-5" />
                        Notes
                    </button>
                    <button
                        className="user-buttons"
                        onClick={quizzes}>
                        <Pen className="h-5" />
                        Quizzes
                    </button>
                </div>
                <NotesGrid type={cardType} />
            </UserLayout>
        </>
    )
}