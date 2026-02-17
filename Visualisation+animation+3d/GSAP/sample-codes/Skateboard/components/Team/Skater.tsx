import React from 'react'
import { SkaterScribble } from './SkaterScribble';
import { ButtonLink } from '../ButtonLink';
import clsx from 'clsx';

type Props ={
    photo_background: string;
    photo_foreground: string;
    scribble_color: string;
    first_name: string;
    last_name: string;
    customizer_link: string;
}

const Skater = ({photo_background, photo_foreground, scribble_color, first_name, last_name, customizer_link}: Props) => {

  return (
    <div className="skater group relative flex flex-col items-center gap-4">
      <div className="stack-layout overflow-hidden m-6">
        <img src={photo_background} width={500} alt=""
          className="scale-110 transform transition-all duration-1000 ease-in-out group-hover:scale-100 group-hover:brightness-75 group-hover:saturate-[.8]"
        />
        <SkaterScribble className="relative" color={scribble_color} />
        <img src={photo_foreground} width={500} alt=""
          className="transform transition-transform duration-1000 ease-in-out group-hover:scale-110 z-10"
        />
        <div className="relative h-48 w-full place-self-end bg-linear-to-t from-black via-transparent to-transparent"></div>
        <h3 className="relative grid top-0 place-self-end justify-self-start p-2 font-sans text-brand-gray ~text-2xl/3xl text-white  uppercase z-11">
            <span className="mb-[-.3em] block">{first_name}</span>
            <span className="block">{last_name}</span>
        </h3>
      </div>
      <ButtonLink href={customizer_link} size="sm">
        Build their board
      </ButtonLink>
    </div>
  )
}

export default Skater