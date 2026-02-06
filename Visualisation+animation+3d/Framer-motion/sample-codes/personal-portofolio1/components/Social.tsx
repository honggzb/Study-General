
import { GithubIcon, LinkedinIcon, XIcon, YoutubeIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

// const socials = [
//     { icon: <GithubIcon />, path: "/" },
//     { icon: <LinkedinIcon />, path: "/" },
//     { icon: <YoutubeIcon />, path: "/" },
//     { icon: <XIcon />, path: "/" },
// ]

const Social = ({containerstyles, iconStyles}: {containerstyles: React.CSSProperties, iconStyles: React.CSSProperties}) => {
  return (
    <div className={containerstyles}>
        {/* {socials.map((social, index) => {
          return (
            <Link key={social.index} href={social.path} className={iconStyles}>
                {social.icon}
            </Link>
          )
        })} */}
        <Link href="/" className={iconStyles}>
            <GithubIcon />
        </Link>
        <Link href="/" className={iconStyles}>
            <LinkedinIcon />
        </Link>
        <Link href="/" className={iconStyles}>
            <YoutubeIcon />
        </Link>
        <Link href="/" className={iconStyles}>
            <XIcon />
        </Link>
    </div>
  )
}

export default Social