import { useEffect, useState } from "react";
import ian from "@/assets/images/Ian.jpg";
import { useDataContext } from "@/hooks/useDataContext";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Dialog, DialogHeader, DialogContent, DialogTitle, DialogFooter} from "./ui/dialog";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import { Upload } from "lucide-react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axiosPublic from "@/api/axiosInstances";
import useAuth from "@/hooks/useAuth";

export default function Account() {
  const { auth, setAuth } = useAuth();
  const {userData} = useDataContext();  
  // USER DATA
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(auth?.user?.email);

  // EDIT STATES
  const [editUsername, setEditUsername] = useState(false);
  const [editEmail, setEditEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);

  // PASSWORD STATES
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [editPfp, setEditPfp] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [pfp, setPfp] = useState<string>();

  const axiosPrivate = useAxiosPrivate();


  const openEdit = (open: boolean) => {
    setEditPfp(open);
    if (!open) {
      setSelectedImage(null);
      setPreviewUrl('');
    }
  };

  useEffect(() => {
    setUsername(auth?.user?.username);
    setEmail(auth?.user?.email);

    const getProfilePicture = async () => {
      try{
        
        const res = await axiosPublic.get(`/users/pfp/${userData._id}`, {
          responseType: 'blob'
        });

        // Create object URL from blob
        const imageUrl = URL.createObjectURL(res.data);
        setPfp(imageUrl);

        console.log(imageUrl);

      }catch(err){
        console.error(err);
      }
    }
    getProfilePicture();
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) return;
    try {
      const formData = new FormData();
      formData.append('pfp', selectedImage); 

      const response = await axiosPrivate.put(
        `/users/pfp/${auth.user?._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      console.log('Profile picture updated:', response.data);
      setEditPfp(false);

        const res = await axiosPublic.get(`/users/pfp/${auth.user?._id}`, {
          responseType: 'blob'
        });

        // Create object URL from blob
        const imageUrl = URL.createObjectURL(res.data);
        setPfp(imageUrl);
    } catch (error) {
      console.error('Upload failed:', error);
    }
  };




  return (
    <>
      <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white mb-6">
        Account
      </h3>
      {/* PROFILE SECTION */}
      <div className="flex gap-10 w-2xl">
          <Tooltip>
            <TooltipTrigger>
              <Avatar onClick={() => openEdit(true)} className="hover:opacity-50 cursor-pointer transition h-35 w-35">
                <AvatarImage src={pfp} alt="User" />
                <AvatarFallback>IAN</AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              Edit Profile Picture
            </TooltipContent>
          </Tooltip>
        <div className="w-full">
          {/* USERNAME */}
          <div className="h-18">
            <div className="flex justify-between items-center pb-2">
              <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
                Username
              </h3>

              {!editUsername ? (
                <button
                  onClick={() => {
                    setEditUsername(true);
                    setUsername(auth?.user?.username);
                  }}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Edit
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditUsername(false);
                    }}
                    className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      setEditUsername(false);
                      const user = {
                        ...auth.user, 
                        username: username
                      }
                      setAuth({
                        ...auth, 
                        user: user
                      });
                      handleUserUpdate();
                    }}
                    className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>

            {!editUsername ? (
              <p className="h-10 text-dark-3 text-base dark:text-gray-400">{username}</p>
            ) : (
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="h-10 w-full p-2 border rounded-md"
              />
            )}
          </div>

        </div>
      </div>

      <Dialog open={editPfp} onOpenChange={setEditPfp}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Profile Picture</DialogTitle>
          </DialogHeader>

          <div className="flex flex-col items-center gap-4 py-4">
            {/* Preview */}
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-40 h-40 rounded-full object-cover border-4 border-gray-200"
              />
            ) : (
              <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center">
                <Upload className="w-12 h-12 text-gray-400" />
              </div>
            )}

            {/* File Input */}
            <div className="w-full">
              <Label htmlFor="pfp-input" className="cursor-pointer">
                <div className="flex items-center justify-center gap-2 px-4 py-2 border border-dashed rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition">
                  <Upload className="w-4 h-4" />
                  <span>Choose Image</span>
                </div>
                <Input
                  id="pfp-input"
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </Label>
            </div>

            {selectedImage && (
              <p className="text-sm text-gray-500">
                {selectedImage.name} ({(selectedImage.size / 1024).toFixed(2)} KB)
              </p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPfp(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpload} disabled={!selectedImage}>
              Upload
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* EMAIL & PASSWORD */}
      <div className="w-2xl border-b border-primary-dark dark:border-primary-white pb-4">

        {/* EMAIL */}
        <div className="h-18">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
              Email
            </h3>

            {!editEmail ? (
              <button
                onClick={() => {
                  setEditEmail(true);
                  setEmail(auth?.user?.email);
                }}
                className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
              >
                Change Email
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => setEditEmail(false)}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setEditEmail(false);
                    const user = {
                      ...auth.user, 
                      email: email
                    }
                    setAuth({
                      ...auth, 
                      user: user
                    });
                    handleUserUpdate();
                  }}
                  className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                >
                  Apply
                </button>
              </div>
            )}
          </div>

          {!editEmail ? (
            <p className="text-dark-3 text-base dark:text-gray-400">{email}</p>
          ) : (
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
            />
          )}
        </div>

        {/* PASSWORD */}
        <div className="pt-2">
          <div className="flex justify-between items-center pb-2">
            <h3 className="text-primary-dark text-xl font-bold dark:text-primary-white">
              Password
            </h3>

            {!changePassword && (
              <button
                onClick={() => setChangePassword(true)}
                className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
              >
                Change Password
              </button>
            )}
          </div>

          {!changePassword ? (
            <p className="text-dark-3 text-base dark:text-gray-400">
              Change your password to secure your account
            </p>
          ) : (
            <div className="flex flex-col gap-3 mt-3">
              <input
                type="password"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="p-2 border rounded-md"
              />
              <input
                type="password"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-2 border rounded-md"
              />

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setChangePassword(false);
                    setCurrentPassword("");
                    setNewPassword("");
                    setConfirmPassword("");
                  }}
                  className="px-4 border border-primary-dark dark:border-primary-white rounded-md cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (newPassword !== confirmPassword) {
                      alert("Passwords do not match!");
                      return;
                    }
                    alert("Password updated (frontend only)");
                    setChangePassword(false);
                  }}
                  className="px-4 bg-primary-dark text-white dark:bg-primary-white dark:text-primary-dark rounded-md cursor-pointer"
                >
                  Update Password
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
