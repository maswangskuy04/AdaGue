import { useSnackbar } from "notistack";

export function useAlert() {
  const { enqueueSnackbar } = useSnackbar()

  const normalize = (msg, fallback) => {
    if (typeof msg === 'string') return msg
    if (msg?.message) return msg.message
    return fallback
  }

  return {
    success: (msg) =>
      enqueueSnackbar(normalize(msg, 'Success'), { variant: 'success' }),

    error: (msg) =>
      enqueueSnackbar(normalize(msg, 'Something went wrong'), {
        variant: 'error'
      }),

    info: (msg) =>
      enqueueSnackbar(normalize(msg, 'Info'), { variant: 'info' }),

    warning: (msg) =>
      enqueueSnackbar(normalize(msg, 'Warning'), { variant: 'warning' }),
  }
}
