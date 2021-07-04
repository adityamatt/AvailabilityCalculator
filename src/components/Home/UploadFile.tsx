import React from 'react'
import { Stack, PrimaryButton } from '@fluentui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setNewDesign, setSystemError } from '../../store/actions/systemActions'
import { getSystem } from '../../store/selectors/systemSelector'
interface IUploadFile {}
export const UploadFile = (props: IUploadFile) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null)
  const dispatch = useDispatch()
  const system = useSelector(getSystem)

  const changeHandler: React.ChangeEventHandler<HTMLInputElement> = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) {
      return
    }

    handleSubmission(event.target.files[0])
  }

  const triggerFileUpload = () => {
    //TODO
    if (inputRef.current !== null) inputRef.current.click()
  }

  const handleSubmission = async (file: File | undefined) => {
    try {
      const jsonObjectstring = await file?.text()
      if (!jsonObjectstring) throw Error('empty or invalid json content')
      const jsonObject = JSON.parse(jsonObjectstring)

      const newSystem = system.clone()

      newSystem.fromJSON(jsonObject)
      dispatch(setNewDesign(newSystem))
    } catch (err) {
      dispatch(setSystemError(err))
    }
  }

  return (
    <Stack horizontal verticalAlign="center">
      <Stack.Item>
        <PrimaryButton iconProps={{ iconName: 'Upload' }} text="Upload" onClick={triggerFileUpload} />
      </Stack.Item>
      <Stack.Item>
        <input
          type="file"
          name="file"
          onChange={changeHandler}
          style={{ display: 'none' }}
          ref={(ref) => (inputRef.current = ref)}
          accept=".json"
        />
      </Stack.Item>
    </Stack>
  )
}
