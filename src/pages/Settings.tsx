import Account from '../components/Account.tsx'
import Preferences from '../components/Preferences.tsx'
import Sidebar from '@/components/layout/Sidebar.tsx';
import UserLayout from '@/components/layout/User/UserLayout.tsx';
import ThemeSwitcher from "../components/ThemeSwitcher";


export default function Settings() {
    return (
        <>
            <UserLayout
                title="Settings"
                description='Yez'
            >
                <section className="antialiased max-w-screen-xl mx-auto flex flex-row justify-center">
                    <section className="w-full flex flex-col">
                        <Account/>
                        <Preferences/>
                        <div className='my-3 pb-10'>
                            <button className="font-bold text-xl text-primary-dark dark:text-white rounded-md cursor-pointer">
                                Logout
                            </button>
                        </div>
                    </section>
                </section>
            </UserLayout>
        </>
    );
}