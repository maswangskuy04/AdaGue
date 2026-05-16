import { Input } from "@headlessui/react"
import { useRef, useState } from "react"
import { NeumorphismCard } from "../../../styles/components"

const OtpInput = ({ length = 6, value, onChange }) => {
  const inputsRef = useRef([])

  const handleChange = (e, index) => {
    const val = e.target.value.replace(/\D/g, "")
    if (!val) return

    const newOtp = value.split('')
    newOtp[index] = val[0]

    const finalOtp = newOtp.join('')
    onChange(finalOtp)

    // pindah ke input selanjutna
    if (index < length - 1) {
      inputsRef.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      const newOtp = value.split('')
      newOtp[index] = ''
      
      onChange(newOtp.join(''))

      // balik ke input selanjutnya
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1]?.focus()
      }
    }
  }

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData('text').replace(/\D/g, "")
    if (!paste) return

    const newOtp = paste.slice(0, length).split('')
    onChange(newOtp.join(''))

    inputsRef.current[newOtp.length - 1]?.focus()
  }

  return (
    <div className="flex justify-between gap-2 mt-6" onPaste={handlePaste}>
      {[...Array(length)].map((_, i) => (
        <Input
          key={i}
          ref={(el) => (inputsRef.current[i] = el)}
          type="text"
          maxLength={1}
          value={value[i] || ''}
          placeholder="-"
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className={`w-12 h-12 text-center text-xl border rounded-lg focus:outline-none transition-all duration-200
            ${value[i] ? 'border-green-500 bg-green-50 text-green-600' : 'border-zinc-400 focus:ring focus:ring-zinc-500'}
          `}
        />
      ))}
    </div>
  )
}

export default OtpInput