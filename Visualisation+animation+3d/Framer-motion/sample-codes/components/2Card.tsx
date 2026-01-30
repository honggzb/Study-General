"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import { AlarmSmoke, MessageSquareMore, Send, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
/**
 *
 * Framer Motion : Hover & Exit Animations
 *   Page and fragment
 */

const CardContent = () => {
    return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
            <Card />
        </div>
    )
}

const Card = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                className={cn("w-72 min-h-104 h-104 rounded-xl p-6 flex flex-col", "shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)]")}
            >
                <h2 className="font-bold text-[10px]">Aceternit UI Card</h2>
                <p className="text-neutral-600 mt-2 text-[10px]">A collection of beautiful UI Components</p>
                <div className="flex items-center justify-center">
                    <Button onClick={() => setIsOpen(false)} className="flex items-center gap-1 text-[10px] shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)] rounded-md px-2 py-1 cursor-pointer">
                        <Image className="h-4 w-4" width={50} height={50} alt="logo" src="/globe.svg" /> {" "}Aceternity
                    </Button>
                    <X className="h-3 w-3 text-neutral-400" />
                </div>
                <div className="relative bg-gray-100 flex-1 mt-4 rounded-lg border border-neutral-200">
                    {/* Motion div here */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                        whileHover={{ opacity: 1, scale: 1.05, filter: "blur(0px)" }}
                        // transition={{ duration: 0.5, ease: "easeInOut" }}
                        transition={{ type: "spring", stiffness: 100, damping: 5, mass: 1 }}
                        className="absolute inset-0 h-full w-full bg-white border border-neutral-200 rounded-lg divide-y divide-neutral-200"
                    >
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 shrink-0 bg-linear-to-br shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                <MessageSquareMore className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">Aceternity UI components</p>
                                <p className="text-neutral-400 text-[8px] mt-1">A collection of UI components</p>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 shrink-0 bg-linear-to-br shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                <Send className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">Sample 2</p>
                                <p className="text-neutral-400 text-[8px] mt-1"> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4">
                            <div className="h-7 w-7 shrink-0 bg-linear-to-br shadow-[0px_1px_1px_0px_rgba(0,0,0,0.05),0px_24px_68px_rgba(47,48,55,0.05),0px_2px_3px_rgba(0,0,0,0.04)] bg-white rounded-md flex items-center justify-center">
                                <AlarmSmoke className="h-4 w-4 text-neutral-600" />
                            </div>
                            <div className="flex flex-col">
                                <p className="text-[8px] font-bold text-neutral-600">Sample 3</p>
                                <p className="text-neutral-400 text-[8px] mt-1"> xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CardContent