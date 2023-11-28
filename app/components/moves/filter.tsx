import FormField from "../form"

interface Props {
  filter: any[]
  title: string
  name: string
  selected: string
  submitHandler: any
}

export default function Filter({ filter, title, name, selected, submitHandler }: Props) {
  return (
    <FormField type="select" title={title} name={name} onChange={submitHandler}>
      <option value="">Tutti</option>
      {filter.map((item, idx) => {
        return (
          <option key={idx} value={item} selected={item === selected}>
            {item}
          </option>
        )
      })}
    </FormField>
  )
}
