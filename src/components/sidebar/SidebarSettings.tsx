import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter,
    SidebarHeader,
    SidebarSeparator,
    useSidebar,
    SidebarMenuBadge,
    SidebarMenuAction,
  } from "@/components/ui/sidebar"
  
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User2, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDataContext } from "@/hooks/useDataContext";
import axiosPublic from "@/api/axiosInstances";
import useAuth from "@/hooks/useAuth";

interface SidebarSettingsProps{
  isCollapsed: boolean;

}

export default function SidebarSettings({isCollapsed} : SidebarSettingsProps){

  const navigate = useNavigate();
  const {userData, userPfp} = useDataContext();
  const {setAuth} = useAuth();

  async function handleLogout(){
        try {
            const res = await axiosPublic.delete(
                    '/auth/logout',
                    { withCredentials: true }
                );
            console.log(res.status);
            setAuth({});
            navigate('/login');
        } catch (err) {
            console.error(err);
        }
    }



  return (
        <SidebarMenu >
            <SidebarMenuItem >
                <DropdownMenu >
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton  asChild>
                            <div className={isCollapsed ? "flex justify-center" : "flex items-center gap-3"}>
                                <Avatar className="min-h-8 min-w-8">
                                    <AvatarImage src={userPfp || ""} alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                {!isCollapsed && (
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{userData.username}</span>
                                    <span className="text-xs text-muted-foreground">{userData.email}</span>
                                </div>
                                )}
                            </div>
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuItem className="flex gap-1">
                            <div className={"flex items-center gap-3"}>
                                <Avatar className="min-h-12 min-w-12">
                                    <AvatarImage src={userPfp || ""} alt="User" />
                                    <AvatarFallback>U</AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{userData.username}</span>
                                    <span className="text-xs text-muted-foreground">{userData.email}</span>
                                </div>
                            </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/profile/${userData._id}`)} className="flex gap-2">
                            <User2/>
                            <span>Profile</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate('/settings')} className="flex gap-2">
                            <Settings/>
                            <span>Settings</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleLogout} className="flex gap-2">
                            <LogOut/>
                            <span>Sign Out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                    
            </SidebarMenuItem>
        </SidebarMenu>
  )
}