import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children, showSidebar = false }) => {
    return (
        <div className="h-screen overflow-hidden">
            <div className="flex h-full">
                {showSidebar && <Sidebar />}

                <div className="flex-1 flex flex-col min-w-0 min-h-0">
                    <Navbar />

                    <main className="flex-1 min-h-0 overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;