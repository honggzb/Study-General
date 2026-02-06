import { describe } from "node:test";
import { title } from "process";

export const links = [
    {
        name: "home",
        path: "/"
    },
    {
        name: "services",
        path: "/services"
    },
    {
        name: "resume",
        path: "/resume"
    },
     {
        name: "work",
        path: "/work"
    },
    {
        name: "contact",
        path: "/contact"
    },
]

export const services = [
  {
    num:'01',
    title: "web development",
    description: "Mollit aliquip doloecat deserunt irure id. Anim veniam mollit nisi adipisicing.",
    href: ""
  },
  {
    num:'02',
    title: "UI/UX design",
    description: "Mollit aliquip doloecat deseruntoecat d oecat doecat doecat doecat d irure id. Anim veniam mollit nisi adipisicing.",
    href: ""
  },
  {
    num:'03',
    title: "Logo design",
    description: "Mollit aliquip doloecat deserunt irure id. Anim veniam mollit nisi adipisicing.",
    href: ""
  },
  {
    num:'04',
    title: "SEO",
    description: "Mollit aliquip doloecat deserunt irure id. Anim veniam mollit nisi adipisicing.",
    href: ""
  },
];

export const about = {
  title: "About me",
  description: "Enim do nostrud qui duis fugiat qui ullamco voluptate ut mollit est quis. Sint elit consectetur velit quis. Consectetur irure ullamco officia pariatur aute anim. Irure officia magna laborum nostrud aute sunt pariatur quis nostrud non.",
  info: [
    { fieldName: "Name", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Phone", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Experiences", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Nationality", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Email", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Freelance", fieldValue: "xxx xxxxxxx" },
    { fieldName: "Languages", fieldValue: "xxx xxxxxxx" },
  ]
};

export const experience = {
  icon: './assets/resume/badge.svg',
  title: "My experience",
  description: "empor dolore anim consequat sit aliqua esse sunt non sint laboris occaecat. Labore Loremonsectetur eu ipsum proident minim. Sint adipisicing voluptate aute ipsum nisi nisi cupidatat eu ad id. Nisi labore aliqua nulla ipsum do enim. Dolor mollit enim culpa consequat sunt officia ullamco cupidatat ea. Excepteur ea enim quis id id duis velit mollit minim.",
  items: [
    {
      company: "xx1",
      position: "Developer",
      duration: "2022 - present",
    },
     {
      company: "xx 2",
      position: "Developer",
      duration: "2020 - 2022",
    },
     {
      company: "xx 3",
      position: "Developer",
      duration: "2015 - 2020",
    },
     {
      company: "xx 4",
      position: "Developer",
      duration: "2011 - 2015",
    },
    {
      company: "xx 5",
      position: "Developer",
      duration: "2017 - 2011",
    },
  ],
};

export const education = {
  icon: "./assets/resume/cap.svg",
  title: "My education",
  description: "Magna commodo pctetur enim culpa ex reprehenderit laboris non eiusmod aliquip esse aliquip aliquip consequat officia.",
  items: [
    {
      institution: "institution 1",
      degree: "f Bootcamp",
      duration: "2018"
    },
    {
      institution: "institution 2",
      degree: "Codecademy",
      duration: "2022"
    },
    {
      institution: "institution 3",
      degree: "Online Course",
      duration: "2022"
    },
    {
      institution: "institution 3",
      degree: "Programming Course",
      duration: "2022"
    },
    {
      institution: "institution 3",
      degree: "Programming Course",
      duration: "2022"
    },
  ]
};

export const skills = {
  title: "My skills",
  description: "Magna commodo pctetur enim culpa ex reprehenderit laboris non eiusmod aliquip esse aliquip aliquip consequat officia.",
  skillList: [
    {
      icon: "",
      name: "html 5"
    },
    {
      icon: "",
      name: "css 3"
    },
    {
      icon: "",
      name: "javascript"
    },
    {
      icon: "",
      name: "react.js"
    },
    {
      icon: "",
      name: "next.js"
    },
    {
      icon: "",
      name: "tailwind.css"
    },
    {
      icon: "",
      name: "node.js"
    },
  ]
};
