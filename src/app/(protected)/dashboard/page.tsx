import { SubscriptionEntitlementQuery } from '@/convex/query.config'
import { RedirectType } from 'next/navigation'
import { combinedSlug } from '@/lib/utils'
import { redirect } from 'next/navigation'

//Todo: remove billing hardcoded

const page = async () => {
  const {entitlement,profileName}= await SubscriptionEntitlementQuery()
  if(!entitlement._valueJSON)
  {
  redirect(`/dashboard/${combinedSlug(profileName!)}`)
  }
  redirect(`/dashboard/${combinedSlug(profileName!)}`)
 
}
export default page