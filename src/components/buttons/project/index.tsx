'use-client'
import { useProjectCreation } from '@/hooks/use-project'
import { Button } from '@/components/ui/button'
import { is } from 'date-fns/locale'
import { Loader2, PlusIcon } from 'lucide-react'
import React from 'react'


const CreateProject = () => {
    const {createProject,canCreate,isCreating}=useProjectCreation()
  return (
    <Button
        variant={"default"}
        onClick={() => createProject()}
        disabled={!canCreate||isCreating}
        className="flex items-center gap-2 cursor-pointer rounded-full "
        >
            {isCreating ? (<Loader2 className='h-4 w-4 animate-spin' />) : <PlusIcon className='h-4 w-4' />
            }
            {isCreating ? 'Creating...' : 'New Project'}
        </Button>
  )
}

export default CreateProject