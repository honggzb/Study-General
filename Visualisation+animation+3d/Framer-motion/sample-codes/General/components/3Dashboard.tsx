"use client";

/**
 *
 * Framer Motion: Variants in Motion
 *   handle sidebar open/close, sidebar's children animation
 */

import React, { useState } from 'react';
import { motion } from "motion/react";
import {
    Home,
    BarChart2,
    Users,
    Settings,
    ChevronLeft,
    ChevronRight,
    Bell
} from 'lucide-react';

type SidebarProps = {
    isOpen: boolean;
    toggleSidebar: () => void
}

const Sidebar = ({ isOpen, toggleSidebar }: SidebarProps) => {
    const menuItems = [
        { icon: Home, label: 'Home', active: false },
        { icon: BarChart2, label: 'Analytics', active: true }, // Assuming Analytics is active as per image? Actually Home usually default. Let's make none active or one. Image shows icons but no clear active state highlight except maybe text color? Let's just list them.
        { icon: Users, label: 'Users', active: false },
        { icon: Settings, label: 'Settings', active: false },
    ];
    const sidebarVariant = {
        open: { width: "16rem" },
        closed: { width: "4.5rem" },
    };
    const childrenVariant = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: -10  },
    };
    const parentVariant = {
        open: {
            transition: {
                staggerChildren: 0.7,
                delayChildren: 0.2
            }
        },
        closed: {
            transition: {
                staggerChildren: 0.5,
                delayChildren: -1
            }
          },
    };
    return (
        <motion.div
            initial={false}
            animate={ isOpen ? "open" : "closed" }
            className='h-screen border-r border-gray-200 flex flex-col'
        >
            <motion.div
                variants={sidebarVariant}
                transition={{ duration: 0.3 }}
                className='bg-white'
                // className={`bg-white h-screen border-r border-gray-200  flex flex-col ${isOpen ? 'w-64' : 'w-20'}`}
            >
                {/* Header */}
                <div className="h-16 flex items-center justify-between px-4 border-b border-gray-100">
                    {isOpen && ( <h1 className="text-xl font-bold text-gray-800">Dashboard</h1> )}
                    <button onClick={toggleSidebar} className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-500 transition-colors ml-auto">
                        {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
                {/* Navigation */}
                <nav className="flex-1 py-6 px-3 space-y-2">
                    {menuItems.map((item, index) => (
                        <motion.button
                            variants={parentVariant}
                            key={index}
                            className={`w-full flex items-center p-3 rounded-lg transition-colors group ${item.active
                                    ? 'bg-blue-50 text-blue-600'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                }`}
                        >
                            <div className='w-20px h-20px'><item.icon size={20} className={item.active ? 'text-blue-600' : 'text-gray-500 group-hover:text-gray-900'} /></div>
                            {/* <span className={`ml-3 font-medium transition-all duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'}`}> */}
                            <motion.span variants={childrenVariant} className='ml-3 font-medium transition-all duration-300 overflow-hidden whitespace-nowrap'>
                                {item.label}
                            </motion.span>
                        </motion.button>
                    ))}
                </nav>

                {/* User Profile (Optional placeholder for bottom) */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-gray-200 shrink-0" />
                        <div className={`ml-3 transition-all duration-300 overflow-hidden ${isOpen ? 'opacity-100 w-auto' : 'opacity-0 w-0'
                            }`}>
                            <p className="text-sm font-medium text-gray-700">User Name</p>
                            <p className="text-xs text-gray-500">user@example.com</p>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

type StatsCardProps = {
    title: string;
    value: string;
    change: string;
    changeType: string;
    subtext: string;
}

const StatsCard = ({ title, value, change, changeType, subtext }: StatsCardProps ) => {
    const getChangeColor = () => {
        switch (changeType) {
            case 'positive':
                return 'bg-green-100 text-green-700';
            case 'negative':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };
    return (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
                <span className={`text-xs font-bold px-2 py-1 rounded-full ${getChangeColor()}`}>
                    {change}
                </span>
            </div>

            <div className="flex flex-col">
                <span className="text-3xl font-bold text-gray-900 mb-1">{value}</span>
                <span className="text-xs text-gray-500">{subtext}</span>
            </div>
        </div>
    );
};

const DashboardContext = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '2,543',
            change: '+12%',
            changeType: 'positive',
            subtext: 'Increased by 257 since last month'
        },
        {
            title: 'Revenue',
            value: '$45,257',
            change: '+8%',
            changeType: 'positive',
            subtext: 'Increased by $3,257 since last month'
        },
        {
            title: 'Active Sessions',
            value: '1,325',
            change: '+5%',
            changeType: 'positive',
            subtext: 'Increased by 103 since yesterday'
        },
        {
            title: 'Conversion Rate',
            value: '12.3%',
            change: '-2%',
            changeType: 'negative',
            subtext: 'Decreased by 1.8% since last week'
        }
    ];
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 h-screen">
            {/* Top Header */}
            <header className="bg-white px-8 py-4 flex justify-between items-center sticky top-0 z-10 border-b border-gray-100">
                <h2 className="text-2xl font-bold text-gray-800">Overview</h2>

                <div className="flex items-center space-x-6">
                    <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
                        <Bell size={24} />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>

                    <div className="h-10 w-10 rounded-full bg-gray-200">
                        {/* User Avatar Placeholder */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="p-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, index) => (
                        <StatsCard key={index} {...stat} />
                    ))}
                </div>

                {/* Charts Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* User Activity Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">User Activity</h3>
                        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <span className="text-gray-400 font-medium">Chart Placeholder</span>
                        </div>
                    </div>

                    {/* Revenue Overview Chart */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                        <h3 className="text-lg font-bold text-gray-800 mb-6">Revenue Overview</h3>
                        <div className="h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                            <span className="text-gray-400 font-medium">Chart Placeholder</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

const Dashboard = () => {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={toggleSidebar}
      />
      <DashboardContext />
    </div>
    )
}

export default Dashboard