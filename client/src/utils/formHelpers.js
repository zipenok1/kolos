export const createFormData = (formValues, excludeFields = []) => {
  const data = new FormData()
  Object.keys(formValues).forEach(key => {
    if (excludeFields.includes(key)) return
    
    const value = formValues[key]
    
    if (value !== undefined && value !== null) {
      if (value instanceof File) {
        data.append(key, value)
      } else {
        data.append(key, String(value))
      }
    }
  })
  
  return data
}