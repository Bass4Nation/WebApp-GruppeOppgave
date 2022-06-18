import { useState, useEffect } from 'react'
import { validate } from '@/lib/validation'
import axios from 'axios'



const SupportForm = ({ departments }) => {

  const [form, setForm] = useState({
    title: '',
    creator: '',
    description: '',
    departmentId: '',
    severity: '',
   })

  const [error, setError] = useState('')
  const [validationErrors, setValidationErrors] = useState(null)

  const severityOptions = [
    { value: 1, lable: 'Lav' },
    { value: 2, lable: 'Medium' },
    { value: 3, lable: 'Høy' },
  ]

  const severityList = severityOptions.map((op) => (
    <option key={op.value} type='number' value={parseInt(op.value)}>
      {op.lable}
    </option>
  ))

  const departmentList = departments.map((op) => (
    <option key={op.id} value={op.id}>
      {op.name}
    </option>
  ))


  const [severity, setSeverity] = useState('')
  const [department, setDepartment] = useState('')

  const handleInputOnChange = ({ currentTarget: { name, value } }) =>
    setForm((state) => ({ ...state, [name]: value }))

  const handleSendSupport = async (event) => {
    event.preventDefault()

    const minTitle = validate.minLength(25, form.title)
    const maxTitle = validate.maxLength(150, form.title)
    const maxDesc = validate.maxLength(250, form.description)
    const upCapName = validate.isCapitalLetter(form.creator)
    const nameFirstLastCheck = validate.mustHaveFirstnameAndLastname(form.creator)
    // ------------ Error TEXT -----------------------------
    const minTitleErr = 'Tittelen må være på minst 25 karakterer'
    const maxTitleErr = 'Tittelen kan ikke være på lenger enn 150 karakterer'

    if (!minTitle) {
      setValidationErrors({
        title: minTitleErr,
      })
    } else if (!maxTitle) {
      setValidationErrors({
        title: maxTitleErr,
      })
    } else if (!maxDesc) {
      setValidationErrors({
        description:
          'Description kan ikke være lenger enn 250 karakterer. Vennligst skriv litt kortere.',
      })
    } else if (!nameFirstLastCheck) {
      setValidationErrors({
        creator: 'Må ha Fornavn og Etternavn. Består av minst to ord',
      })
    } else if (!upCapName) {
      setValidationErrors({
        creator: 'Husk stor forbokstav i Fornavn og Etternavn',
      })
    } else {
      try {
        form.severity = parseInt(form.severity)
        postIssueForm()
        window.location.href = "/issues";
      } catch (err) {
        setError(err)
      }
    }
    console.log(form)
  }

  const postIssueForm = async () => {
    try {
      const response = await axios.post('/api/issues/', form)
      if(response?.data?.success){
        console.log("Data sendt inn til databasen")
      }
    } catch (error) {
      console.log("ERROR:")
      console.log(error?.response?.data)
    }
  }

  useEffect(() => {
    postIssueForm()
  }, [])

  return (
    <form className="support_form" onSubmit={handleSendSupport}>
      <h2>Ny henvendelse</h2>
      <section id="errorVisning">
        {validationErrors ? JSON.stringify(validationErrors) : null}
      </section>
      <div>
        <label htmlFor="title">Tittel</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={handleInputOnChange}
          value={form.title}
          minLength="1"
          maxLength="150"
          required
        />
      </div>
      <div>
        <label htmlFor="creator">Navn</label>
        <input
          type="text"
          id="creator"
          name="creator"
          onChange={handleInputOnChange}
          value={form.creator}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Beskrivelse</label>
        <textarea
          type="text"
          id="description"
          name="description"
          onChange={handleInputOnChange}
          value={form.description}
          maxLength="252"
          required
        />
      </div>

      <div>
        {/* TODO Add department */}
        <select
          defaultValue=""
          name="departmentId"
          id="departmentId"
          onChange={handleInputOnChange}
          required
        >
          <option value="" disabled>
            {' '}
            Avdeling
          </option>
          {departmentList}
        </select>
      </div>
      <div>
        {/* TODO Add severity */}
        <select
          defaultValue=""
          name="severity"
          id="severity"
          onChange={handleInputOnChange}
          required
        >
          <option value="" disabled>
            {' '}
            Viktighet
          </option>
          {severityList}
        </select>
      </div>
      <button type="sumbit">Send henvendelse</button>
    </form>
  )
}

export default SupportForm
