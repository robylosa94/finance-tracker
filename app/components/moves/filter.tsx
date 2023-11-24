import FormField from "../form"

interface Props {
  filter: any[]
  title: string
}

export default function Filter({ filter, title }: Props) {
  return (
    <FormField type="select" title={title} name="type" value="tutti">
      <option value="tutti">Tutti</option>
      {filter.map((item, idx) => {
        return (
          <option key={idx} value={item}>
            {item}
          </option>
        )
      })}
    </FormField>
  )
}
