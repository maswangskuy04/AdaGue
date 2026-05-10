import { Input } from "@headlessui/react"
import { useRef } from "react"

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
      inputsRef.current[index + 1].focus()
    }
  }

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      if (!value[index] && index > 0) {
        inputsRef.current[index - 1].focus()
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
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="w-12 h-12 text-center text-xl border border-indigo-400 rounded-lg focus:outline-none focus:ring focus:ring-indigo-500"
        />
      ))}
    </div>
  )
}

export default OtpInput