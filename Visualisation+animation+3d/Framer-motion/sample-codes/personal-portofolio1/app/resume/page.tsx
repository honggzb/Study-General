"use client";

import { motion } from "motion/react";
import { about, experience, education, skills } from '@/components/constants';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "radix-ui";

const Resume = () => {
  return (
      <motion.div
        initial={{ opacity: 0 }}
        animate= {{
          opacity: 1,
          transition: { delay: 2.4, duration: 0.4, ease:"easeIn"},
        }}
        className="min-h-[80vh] flex flex-col items-center py-12 xl:py-0 text-white"
      >
        <div className="mx-auto m-4">
          <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
            <TabsList className="flex flex-col w-full max-w-[380px] xl:mx-0 mx-auto gap-6">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>

            <div className="min-h-[70vh] w-full">
              <TabsContent value="experience" className="w-full">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{experience.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                  {/* <ScrollArea className="h-[400px]">
                    <ul>
                      {experience.map((item, index) => {
                        return (
                          <li key={item.education}>

                          </li>
                        )
                      })}
                    </ul>
                  </ScrollArea> */}
                </div>
              </TabsContent>
              <TabsContent value="education" className="w-full">
                education
              </TabsContent>
              <TabsContent value="skills" className="w-full">
                skills
              </TabsContent>
              <TabsContent value="about" className="w-full">
                about
              </TabsContent>
            </div>

          </Tabs>
        </div>
      </motion.div>
  )
}

export default Resume