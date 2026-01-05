'use client'
import { cloneElement, useActionState, useState } from 'react'
import { Form } from './form/form'
import { SubmitButton } from './form/submit-button'
import {
  EMPTY_ACTION_STATE,
  ErrorToActionStateType,
} from './form/utils/error-to-action-state'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog'

type useConfirmDialogProps = {
  title?: string
  description?: string
  action: () => Promise<ErrorToActionStateType | void>
  trigger: React.ReactElement<{ onClick?: () => void }>
}
const useConfirmDialog = ({
  title = 'Are you absolutely sure?',
  description = ' This action cannot be undone.This will permanently delete your account and remove your data from our servers.',
  action,
  trigger,
}: useConfirmDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  //Wrap the action to always return ErrorToActionStateType as handleDelete returns void( redirects)
  const wrappedAction = async (): Promise<ErrorToActionStateType> => {
    const result = await action()
    return result ?? EMPTY_ACTION_STATE
  }
  const [actionState, formAction] = useActionState(
    wrappedAction,
    EMPTY_ACTION_STATE
  )
  const dialogTrigger = cloneElement(trigger, {
    onClick: () => setIsOpen((state) => !state),
  })

  const handleDialogClose = ()=>{
    setIsOpen(false)
  }
  const dialog = (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            {/* We need to typecast action as unknown as form submission does not care about return type  */}
            <Form
              action={formAction as unknown as (formData: FormData) => void}
              actionState={actionState}
              onSuccess={handleDialogClose}
            >
              <SubmitButton label='Submit' />
            </Form>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
  return [dialogTrigger, dialog]
}
export { useConfirmDialog }
