'use client'

import { type FC, type Reducer } from 'react'
import {
	createContextWithName,
	Provider,
	type ReducerActionCreators,
} from '@nathanhfoster/resurrection'
import { entrySlice, entryActions } from './entrySlice'
import type { EntryState } from './types'

// Re-export actions from slice for backward compatibility
export const entryContextActions = entryActions

// Define actions type using slice actions
export type EntryActions = ReducerActionCreators<typeof entryActions, 'Entry'>

// Create context using slice's initialState and reducer
export const EntryContext = createContextWithName<EntryState, EntryActions>(
	'Entry',
	entrySlice.initialState,
)

// Destructure context utilities
export const {
	StateContext: EntryStateContext,
	useSelector: useEntrySelector,
	DispatchContext: EntryDispatchContext,
	useDispatch: useEntryDispatch,
} = EntryContext

// Initializer function using slice's initialState
const getInitialState = (initialState?: Partial<EntryState>): EntryState => {
	return {
		...entrySlice.initialState,
		...initialState,
	}
}

// Create provider component using slice's reducer
export const EntryContextProvider: FC<{
	children: React.ReactNode
	initialState?: Partial<EntryState>
}> = ({ children, initialState, ...restOfProps }) => {
	return (
		<Provider
			{...restOfProps}
			StateContext={EntryStateContext}
			reducer={
				entrySlice.reducer as unknown as Reducer<EntryState, EntryActions>
			}
			initializer={getInitialState}
			DispatchContext={EntryDispatchContext}
			initialState={initialState}
		>
			{children}
		</Provider>
	)
}
