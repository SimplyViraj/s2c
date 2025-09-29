import { SubscriptionEntitlementQuery } from '@/convex/query.config'
import { combinedSlug } from '@/lib/utils'
import { redirect } from 'next/navigation'
import Navbar from '@/components/navbar/index'
import React from 'react'
type Props = {
    children: React.ReactNode
}
const Layout =async ({ children }: Props) => {
    const {profileName,entitlement}=await SubscriptionEntitlementQuery()
    // if(!entitlement._valueJSON)
    // {
    //     //Todo: remove billing hardcoded
    //     redirect(`/dashboard/${combinedSlug(profileName!)}`)
    // }
  return (
    <div className='grid grid-cols-1'>
        <Navbar />
      {children}
    </div>
  )
}

export default Layout