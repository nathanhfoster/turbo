import { FC, memo } from 'react'
import { WysiwygEditor } from '@nathanhfoster/ui'
import { EditorProps } from './types'

const Editor: FC<EditorProps> = ({ onChange, value, ...restOfProps }) => {
	return (
		<WysiwygEditor
			{...restOfProps}
			value={value}
			onChange={(html) => {
				if (onChange) {
					onChange(html)
				}
			}}
			placeholder="Start writing your entry..."
			editable={true}
			showBubbleMenu={true}
		/>
	)
}

export default memo(Editor)
