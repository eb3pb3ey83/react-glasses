export interface Props {
  onSelectChange: (
    event: React.ChangeEvent<{
      value: '1' | '2'
    }>,
  ) => void
}
