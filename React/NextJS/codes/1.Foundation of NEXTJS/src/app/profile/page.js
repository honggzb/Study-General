import React from 'react'
import { redirect } from 'next/navigation'

function Profile() {
  const profileDeleted = true;
  if(profileDeleted) redirect('/profile/setting')
  return (
    <div>Profile</div>
  )
}

export default Profile