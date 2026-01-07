import type { WysiwygEditorProps } from '@nathanhfoster/ui'

export interface EditorProps extends Omit<WysiwygEditorProps, 'onChange'> {
	toolbarId?: number
	topToolbarIsOpen?: boolean
	onChange?: (value: string) => void
}
