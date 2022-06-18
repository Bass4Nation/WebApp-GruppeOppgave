import SupportItem from './SupportItem'
import { useState } from 'react'
import { useAllIssues } from '@/hooks/useAllIssues'

const SupportList = () => {
  const { allIssues, allDepartments } = useAllIssues()

  const severityOptions = [
    { value: 1, lable: 'Lav' },
    { value: 2, lable: 'Medium' },
    { value: 3, lable: 'Høy' },
  ]

  const [severity, setSeverity] = useState('')
  const [department, setDepartment] = useState('')
  const [severityState, setSeverityState] = useState(true)
  const [departmentState, setDepartmentState] = useState(true)

  const severityList = severityOptions.map((op) => (
    <option key={op.value} value={op.value}>
      {op.lable}
    </option>
  ))

  const departmentList = allDepartments.map((op) => (
    <option key={op.id} value={op.id}>
      {op.name}
    </option>
  ))

  const filterSeverity = (e) => {
    setSeverity(e.currentTarget.value)
    if (e.currentTarget.value === '') {
      setSeverityState(true)
    } else {
      setSeverityState(false)
    }
  }

  const filterDepartment = (e) => {
    setDepartment(e.currentTarget.value)
    if (e.currentTarget.value === '') {
      setDepartmentState(true)
    } else {
      setDepartmentState(false)
    }
  }

  const showAll = (
    <>
      {allIssues.map((issue) => (
        <SupportItem key={issue.id} item={issue} department={allDepartments} />
      ))}
    </>
  )

  const showFiltered = (
    <>
      {allIssues
        ?.filter((choosen) => choosen.severity.toString().includes(severity))
        ?.filter((choosen) =>
          choosen.departmentId.toString().includes(department)
        )
        .map((issue) => (
          <SupportItem
            key={issue.id}
            item={issue}
            department={allDepartments}
          />
        ))}
    </>
  )

  return (
    <section className="issues">
      <div className="listHeader">
        <h2>Henvendelser</h2>
        <div className="selectBox">
          <select
            key="severityKey"
            defaultValue=""
            name="severitySelected"
            id="severitySelected"
            onChange={filterSeverity}
          >
            <option key="startSeverity" value="">
              Viktighet
            </option>
            {severityList}
          </select>

          {/* Hvem avdeling hendvendelsene er for */}
          <select
            key="departmentKey"
            defaultValue=""
            name="departmentSelected"
            id="departmentSelected"
            onChange={filterDepartment}
          >
            <option key="startDepartment" value="">
              {' '}
              Avdeling{' '}
            </option>
            {departmentList}
          </select>
        </div>
      </div>
      <section>
        {/* Dropdown for hvor viktig henvendelsene er */}
        {severityState && departmentState ? showAll : showFiltered}
      </section>
    </section>
  )
}

export default SupportList
