import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

// Form field types
interface FormField {
  value: string | number | boolean | string[]
  error?: string
  touched: boolean
  required?: boolean
}

interface FormState {
  [fieldName: string]: FormField
}

interface FormData {
  [formId: string]: FormState
}

interface FormsState {
  // Form data storage
  forms: FormData
  
  // Form submission states
  submitting: { [formId: string]: boolean }
  
  // Form validation states
  valid: { [formId: string]: boolean }
  
  // Form visibility states
  open: { [formId: string]: boolean }
  
  // Form errors
  errors: { [formId: string]: string | null }
  
  // Form success states
  success: { [formId: string]: boolean }
}

const initialState: FormsState = {
  forms: {},
  submitting: {},
  valid: {},
  open: {},
  errors: {},
  success: {}
}

const formsSlice = createSlice({
  name: "forms",
  initialState,
  reducers: {
    // Initialize form
    initializeForm: (state, action: PayloadAction<{ formId: string; initialData?: Record<string, any> }>) => {
      const { formId, initialData = {} } = action.payload
      
      if (!state.forms[formId]) {
        state.forms[formId] = {}
      }
      
      // Initialize fields with default values
      Object.entries(initialData).forEach(([fieldName, value]) => {
        state.forms[formId][fieldName] = {
          value,
          error: undefined,
          touched: false,
          required: false
        }
      })
      
      // Initialize other states
      state.submitting[formId] = false
      state.valid[formId] = true
      state.open[formId] = false
      state.errors[formId] = null
      state.success[formId] = false
    },
    
    // Update form field
    updateField: (state, action: PayloadAction<{ formId: string; fieldName: string; value: any }>) => {
      const { formId, fieldName, value } = action.payload
      
      if (!state.forms[formId]) {
        state.forms[formId] = {}
      }
      
      if (!state.forms[formId][fieldName]) {
        state.forms[formId][fieldName] = {
          value,
          error: undefined,
          touched: true,
          required: false
        }
      } else {
        state.forms[formId][fieldName].value = value
        state.forms[formId][fieldName].touched = true
        // Clear error when user starts typing
        if (state.forms[formId][fieldName].error) {
          state.forms[formId][fieldName].error = undefined
        }
      }
    },
    
    // Set field error
    setFieldError: (state, action: PayloadAction<{ formId: string; fieldName: string; error: string }>) => {
      const { formId, fieldName, error } = action.payload
      
      if (state.forms[formId] && state.forms[formId][fieldName]) {
        state.forms[formId][fieldName].error = error
      }
    },
    
    // Clear field error
    clearFieldError: (state, action: PayloadAction<{ formId: string; fieldName: string }>) => {
      const { formId, fieldName } = action.payload
      
      if (state.forms[formId] && state.forms[formId][fieldName]) {
        state.forms[formId][fieldName].error = undefined
      }
    },
    
    // Mark field as touched
    touchField: (state, action: PayloadAction<{ formId: string; fieldName: string }>) => {
      const { formId, fieldName } = action.payload
      
      if (state.forms[formId] && state.forms[formId][fieldName]) {
        state.forms[formId][fieldName].touched = true
      }
    },
    
    // Set field as required
    setFieldRequired: (state, action: PayloadAction<{ formId: string; fieldName: string; required: boolean }>) => {
      const { formId, fieldName, required } = action.payload
      
      if (!state.forms[formId]) {
        state.forms[formId] = {}
      }
      
      if (!state.forms[formId][fieldName]) {
        state.forms[formId][fieldName] = {
          value: "",
          error: undefined,
          touched: false,
          required
        }
      } else {
        state.forms[formId][fieldName].required = required
      }
    },
    
    // Set form submission state
    setSubmitting: (state, action: PayloadAction<{ formId: string; submitting: boolean }>) => {
      const { formId, submitting } = action.payload
      state.submitting[formId] = submitting
    },
    
    // Set form validation state
    setFormValid: (state, action: PayloadAction<{ formId: string; valid: boolean }>) => {
      const { formId, valid } = action.payload
      state.valid[formId] = valid
    },
    
    // Set form open/closed state
    setFormOpen: (state, action: PayloadAction<{ formId: string; open: boolean }>) => {
      const { formId, open } = action.payload
      state.open[formId] = open
    },
    
    // Set form error
    setFormError: (state, action: PayloadAction<{ formId: string; error: string | null }>) => {
      const { formId, error } = action.payload
      state.errors[formId] = error
    },
    
    // Set form success
    setFormSuccess: (state, action: PayloadAction<{ formId: string; success: boolean }>) => {
      const { formId, success } = action.payload
      state.success[formId] = success
    },
    
    // Reset form
    resetForm: (state, action: PayloadAction<{ formId: string; initialData?: Record<string, any> }>) => {
      const { formId, initialData = {} } = action.payload
      
      if (state.forms[formId]) {
        Object.keys(state.forms[formId]).forEach(fieldName => {
          const initialValue = initialData[fieldName] || ""
          state.forms[formId][fieldName] = {
            value: initialValue,
            error: undefined,
            touched: false,
            required: state.forms[formId][fieldName].required || false
          }
        })
      }
      
      state.submitting[formId] = false
      state.valid[formId] = true
      state.errors[formId] = null
      state.success[formId] = false
    },
    
    // Clear form
    clearForm: (state, action: PayloadAction<string>) => {
      const formId = action.payload
      delete state.forms[formId]
      delete state.submitting[formId]
      delete state.valid[formId]
      delete state.open[formId]
      delete state.errors[formId]
      delete state.success[formId]
    },
    
    // Validate form
    validateForm: (state, action: PayloadAction<{ formId: string; validationRules: Record<string, (value: any) => string | undefined> }>) => {
      const { formId, validationRules } = action.payload
      
      if (!state.forms[formId]) return
      
      let isValid = true
      
      Object.entries(validationRules).forEach(([fieldName, validator]) => {
        const field = state.forms[formId][fieldName]
        if (field) {
          const error = validator(field.value)
          if (error) {
            field.error = error
            isValid = false
          } else {
            field.error = undefined
          }
        }
      })
      
      state.valid[formId] = isValid
    },
    
    // Get form data
    getFormData: (state, action: PayloadAction<{ formId: string }>) => {
      // This is just a placeholder - actual data extraction should be done in selectors
      // or components using the state
    },
    
    // Set multiple fields at once
    setMultipleFields: (state, action: PayloadAction<{ formId: string; fields: Record<string, any> }>) => {
      const { formId, fields } = action.payload
      
      if (!state.forms[formId]) {
        state.forms[formId] = {}
      }
      
      Object.entries(fields).forEach(([fieldName, value]) => {
        if (!state.forms[formId][fieldName]) {
          state.forms[formId][fieldName] = {
            value,
            error: undefined,
            touched: true,
            required: false
          }
        } else {
          state.forms[formId][fieldName].value = value
          state.forms[formId][fieldName].touched = true
        }
      })
    },
    
    // Mark all fields as touched
    touchAllFields: (state, action: PayloadAction<string>) => {
      const formId = action.payload
      
      if (state.forms[formId]) {
        Object.keys(state.forms[formId]).forEach(fieldName => {
          state.forms[formId][fieldName].touched = true
        })
      }
    }
  }
})

export const {
  initializeForm,
  updateField,
  setFieldError,
  clearFieldError,
  touchField,
  setFieldRequired,
  setSubmitting,
  setFormValid,
  setFormOpen,
  setFormError,
  setFormSuccess,
  resetForm,
  clearForm,
  validateForm,
  getFormData,
  setMultipleFields,
  touchAllFields
} = formsSlice.actions

export default formsSlice.reducer

