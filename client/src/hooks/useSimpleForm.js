import { useState } from 'react'

export const useSimpleForm = (initialValues = {}) => {
  const [formValue, setFormValue] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value, type, files } = e.target
    
    if (type === 'file') {
      setFormValue(prev => ({
        ...prev,
        [name]: files[0]
      }))
    } else {
      setFormValue(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const resetForm = () => {
    setFormValue(initialValues)
  }

  return {
    formValue,
    setFormValue,
    handleChange,
    resetForm
  }
}