import { useState } from 'react'
import { TEMPLATES, fillTemplate } from './templates'

const FIELDS = [
  { name: 'firstName', label: 'First name', type: 'text', autoComplete: 'given-name' },
  { name: 'lastName', label: 'Last name', type: 'text', autoComplete: 'family-name' },
  { name: 'companyName', label: 'Company name', type: 'text', autoComplete: 'organization' },
  { name: 'email', label: 'Email', type: 'email', autoComplete: 'email' },
]

const MAIL_TYPES = ['LinkedIn Post', 'Job Poster', 'Cold Email']
const ROLE_TYPES = ['Backend', 'Frontend']
const TECH_STACKS = ['Java', 'Python', 'Node.js']

const EMPTY_FORM = { firstName: '', lastName: '', companyName: '', email: '', mailType: '', roleType: '', techStack: '', role: '' }

function validate(values) {
  const errors = {}
  for (const { name, label } of FIELDS) {
    if (!values[name].trim()) errors[name] = `${label} is required`
  }
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address'
  }
  if (!values.mailType) errors.mailType = 'Mail type is required'
  if (!values.roleType) errors.roleType = 'Role type is required'
  if (!values.techStack) errors.techStack = 'Tech stack is required'
  if (!values.role.trim()) errors.role = 'Role is required'
  return errors
}

function App() {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(null)

  const template = TEMPLATES[values.mailType]
  const subject = template ? fillTemplate(template.subject, values) : ''
  const body = template ? fillTemplate(template.body, values) : ''
  const missingTemplate = values.mailType && !template

  function handleChange(e) {
    const { name, value } = e.target
    setValues((v) => ({ ...v, [name]: value }))
    if (errors[name]) setErrors((errs) => ({ ...errs, [name]: undefined }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitted(values)
    setValues(EMPTY_FORM)
  }

  return (
    <main className="flex min-h-screen items-start justify-center bg-slate-50 px-3 py-4 sm:items-center sm:px-4 sm:py-12">
      <div className="w-full max-w-2xl rounded-2xl bg-white p-5 shadow-lg sm:p-8 ring-1 ring-slate-200">
        <h1 className="text-xl font-semibold text-slate-900 sm:text-2xl">Outreachy</h1>
        <p className="mt-1 text-sm text-slate-500">All fields are required.</p>

        <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {FIELDS.slice(0, 2).map((field) => (
              <Field key={field.name} {...field} value={values[field.name]} error={errors[field.name]} onChange={handleChange} />
            ))}
          </div>
          {FIELDS.slice(2).map((field) => (
            <Field key={field.name} {...field} value={values[field.name]} error={errors[field.name]} onChange={handleChange} />
          ))}

          <div>
            <label htmlFor="mailType" className="block text-sm font-medium text-slate-700">
              Mail type
            </label>
            <select
              id="mailType"
              name="mailType"
              value={values.mailType}
              onChange={handleChange}
              aria-invalid={Boolean(errors.mailType)}
              aria-describedby={errors.mailType ? 'mailType-error' : undefined}
              className={`mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-slate-900 sm:py-2 shadow-sm focus:outline-none focus:ring-2 ${
                errors.mailType
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                  : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
              }`}
            >
              <option value="" disabled>
                Select a mail type
              </option>
              {MAIL_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
            <FieldError name="mailType" error={errors.mailType} />
          </div>

          <RadioGroup
            name="roleType"
            label="Role type"
            options={ROLE_TYPES}
            value={values.roleType}
            error={errors.roleType}
            onChange={handleChange}
          />
          <RadioGroup
            name="techStack"
            label="Tech stack"
            options={TECH_STACKS}
            value={values.techStack}
            error={errors.techStack}
            onChange={handleChange}
          />

          <Field
            name="role"
            label="Role"
            type="text"
            placeholder="e.g. Senior Software Engineer"
            value={values.role}
            error={errors.role}
            onChange={handleChange}
          />

          {missingTemplate && (
            <p className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 ring-1 ring-amber-200">
              No template for {values.mailType} yet.
            </p>
          )}
          <GeneratedField name="subject" label="Subject" value={subject} rows={2} />
          <GeneratedField name="body" label="Body" value={body} rows={14} />

          <button
            type="submit"
            className="w-full rounded-lg bg-indigo-600 px-4 py-3 font-medium sm:py-2.5 text-white hover:bg-indigo-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2"
          >
            Submit
          </button>
        </form>

        {submitted && (
          <div className="mt-6 rounded-lg bg-green-50 p-4 text-sm text-green-800 ring-1 ring-green-200">
            Thanks, {submitted.firstName}! We received your details.
          </div>
        )}
      </div>
    </main>
  )
}

function Field({ name, label, type, autoComplete, placeholder, value, error, onChange }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-1 block w-full rounded-lg border px-3 py-2.5 text-slate-900 sm:py-2 shadow-sm focus:outline-none focus:ring-2 ${
          error
            ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
            : 'border-slate-300 focus:border-indigo-500 focus:ring-indigo-200'
        }`}
      />
      <FieldError name={name} error={error} />
    </div>
  )
}

function RadioGroup({ name, label, options, value, error, onChange }) {
  return (
    <fieldset aria-describedby={error ? `${name}-error` : undefined}>
      <legend className="block text-sm font-medium text-slate-700">{label}</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <label
            key={option}
            className="flex min-w-24 flex-1 cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-3 py-3 text-sm text-slate-700 sm:py-2 has-checked:border-indigo-500 has-checked:bg-indigo-50"
          >
            <input
              type="radio"
              name={name}
              value={option}
              checked={value === option}
              onChange={onChange}
              className="accent-indigo-600"
            />
            {option}
          </label>
        ))}
      </div>
      <FieldError name={name} error={error} />
    </fieldset>
  )
}

function GeneratedField({ name, label, value, rows }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <label htmlFor={name} className="block text-sm font-medium text-slate-700">
          {label}
        </label>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!value}
          className="-mr-2 rounded px-2 py-1.5 text-sm font-medium text-indigo-600 hover:text-indigo-500 disabled:cursor-not-allowed disabled:text-slate-300"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <textarea
        id={name}
        value={value}
        rows={rows}
        readOnly
        placeholder="Fills in automatically once you pick a mail type"
        className="mt-1 block w-full resize-y rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-base text-slate-900 sm:text-sm shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 focus:outline-none"
      />
    </div>
  )
}

function FieldError({ name, error }) {
  if (!error) return null
  return (
    <p id={`${name}-error`} className="mt-1 text-sm text-red-600">
      {error}
    </p>
  )
}

export default App
