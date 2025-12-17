import { z, ZodError } from 'zod'

export type ErrorToActionStateType = {
  message: string
  fieldErrors: Record<string, string[]> | undefined
  payload?: FormData
}
export const fromErrorToActionState = (
  error: unknown,
  formData: FormData
): ErrorToActionStateType => {
  if (error instanceof ZodError) {
    return {
      message: '',
      fieldErrors: z.flattenError(error).fieldErrors,
      payload: formData,
    }
  } else if (error instanceof Error) {
    return { message: error.message, fieldErrors: {}, payload: formData }
  } else {
    return {
      message: 'Unknown error occurred',
      fieldErrors: {},
      payload: formData,
    }
  }
}
