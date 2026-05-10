import { Lock, Mail, User } from "lucide-react"

export const loginFields = [
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'email@example.com',
    required: true,
    icon: Mail
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '**********',
    required: true,
    icon: Lock,
    togglePassword: true
  }
]

export const registerFields = [
  {
    name: 'fullname',
    label: 'Nama Lengkap',
    type: 'text',
    placeholder: 'Mr Ambatudin',
    required: true,
    icon: User
  },
  ...loginFields
]
