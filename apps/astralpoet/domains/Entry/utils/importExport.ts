/**
 * Entry import/export utilities
 * Following FSD pattern - domain-level utilities
 */

import { getValidDate, isArray, isString } from '@nathanhfoster/utils'
import type { Entry, EntryFile } from '../model/types'

export const getStringFromObject = (obj: Object, key = 'name') => {
	if (!Array.isArray(obj)) return obj

	return obj.reduce((acc, e, i, { length }) => {
		const value = e[key]

		if (length === 1 || i === length - 1) {
			acc += value
		} else {
			acc += `${value},`
		}

		return acc
	}, '')
}

export const getObjectFromString = (s: string, key = 'name') => {
	if (!isString(s) || !s) return []

	return s.split(',').reduce((acc: { [key: string]: string }[], name) => {
		if (name) {
			acc.push({ [key]: name })
		}

		return acc
	}, [])
}

export const getTagStringFromObject = (tagOrPeople: Entry['tags']) =>
	getStringFromObject(tagOrPeople)

export const getTagObjectFromString = (s: string) => getObjectFromString(s)

export const entryTagOrPeopleTransform = (
	tagsOrPeople: string | any,
	shouldExport = true,
) => {
	// If it's already a string, keep it as a string
	if (isString(tagsOrPeople)) {
		return tagsOrPeople
	}

	if (shouldExport) {
		return getTagStringFromObject(tagsOrPeople)
	}

	// When importing, if it's a string, keep it as a string (Entry type expects string)
	if (isString(tagsOrPeople)) {
		return tagsOrPeople
	}

	return getTagObjectFromString(tagsOrPeople as string)
}

export const entryDateTransform = (date: string) => getValidDate(date)

export const stringToIntegerTransform = (s: string, shouldExport = true) => {
	if (shouldExport) {
		return `${s}`
	}
	const int = parseInt(s)

	if (isNaN(int)) {
		return s
	}

	return int
}

export const stringToFloatTransform = (s: string, shouldExport = true) => {
	if (shouldExport) {
		return `${s}`
	}
	const float = parseFloat(s)

	return float
}

export const stringToBoolTransform = (
	s: string | boolean,
	shouldExport = true,
) => {
	if (shouldExport) {
		if (s === true) return 'true'

		return 'false'
	}

	if (s === true) return true
	if (s === 'true') return true

	return false
}

export const jsonParseDates = (_key: string, value: unknown) =>
	getValidDate(value, true)

export const arrayOfObjectsTransform = (
	EntryFiles: string | EntryFile[],
	shouldExport = true,
) => {
	if (shouldExport) {
		return JSON.stringify(EntryFiles)
	}

	return JSON.parse((EntryFiles as string) || '[]', jsonParseDates)
}

export const entryKeyTransform = (entry: Entry) =>
	Object.keys(entry).map((key) => {
		const entryTransform: any = { key }

		switch (key) {
			case 'id':
			case 'author':
			case 'views':
			case 'rating':
			case 'size':
			case '_size':
				entryTransform.transform = stringToIntegerTransform
				break
			case 'latitude':
			case 'longitude':
				entryTransform.transform = stringToFloatTransform
				break
			case 'is_public':
			case '_shouldDelete':
			case '_shouldPost':
				entryTransform.transform = stringToBoolTransform
				break
			case 'tags':
			case 'people':
				entryTransform.transform = entryTagOrPeopleTransform
				break
			case 'date_created':
			case 'date_created_by_author':
			case 'date_updated':
			case '_lastUpdated':
			case '_calendarDate':
				entryTransform.transform = entryDateTransform
				break
			case 'EntryFiles':
				entryTransform.transform = arrayOfObjectsTransform
				break

			default:
				entryTransform.transform = (e: any) => e
		}

		return entryTransform
	})

export const getEntryTransform = (
	entry: Entry,
	returnObject = true,
	shouldExport = true,
) =>
	entryKeyTransform(entry).reduce(
		(acc, { key, transform }) => {
			const newEntryKey = transform(entry[key as keyof Entry], shouldExport)

			if (returnObject) {
				acc[key] = newEntryKey
			} else {
				acc.push(newEntryKey)
			}

			return acc
		},
		returnObject ? ({} as Entry) : ([] as any),
	)

export const formattedEntries = (entries: unknown): Entry[] => {
	if (isArray(entries)) {
		return entries.map((entry) => getEntryTransform(entry, true, false))
	}

	return []
}

/**
 * Export entries to JSON string
 */
export const exportEntriesToJson = (entries: Entry[]): string => {
	const transformedEntries = entries.map((entry) =>
		getEntryTransform(entry, true, true),
	)
	return JSON.stringify(transformedEntries, null, 2)
}

/**
 * Import entries from JSON string
 */
export const importEntriesFromJson = (jsonString: string): Entry[] => {
	if (!jsonString || typeof jsonString !== 'string') {
		throw new Error('Invalid JSON string: input is empty or not a string')
	}

	const trimmed = jsonString.trim()
	if (!trimmed) {
		throw new Error('Invalid JSON string: input is empty after trimming')
	}

	try {
		const parsed = JSON.parse(trimmed)
		return formattedEntries(parsed)
	} catch (error) {
		throw new Error(
			`Failed to parse JSON: ${error instanceof Error ? error.message : 'Unknown error'}`,
		)
	}
}

/**
 * Export entries to CSV string
 */
export const exportEntriesToCsv = (entries: Entry[]): string => {
	if (entries.length === 0) return ''

	// Use returnObject = true to get an object with keys for CSV headers
	const transformedEntries = entries.map((entry) =>
		getEntryTransform(entry, true, true),
	)

	// Get headers from first transformed entry
	const firstTransformed = transformedEntries[0]
	if (!firstTransformed) return ''

	const headers = Object.keys(firstTransformed)

	// Create CSV rows
	const rows = transformedEntries.map((entry) =>
		headers.map((header) => {
			const value = entry[header as keyof typeof entry]
			// Escape quotes and wrap in quotes if contains comma or newline
			if (
				typeof value === 'string' &&
				(value.includes(',') || value.includes('\n'))
			) {
				return `"${value.replace(/"/g, '""')}"`
			}
			return value ?? ''
		}),
	)

	// Combine headers and rows
	const csvRows = [headers.join(','), ...rows.map((row) => row.join(','))]

	return csvRows.join('\n')
}

/**
 * Import entries from CSV string
 */
export const importEntriesFromCsv = (csvString: string): Entry[] => {
	try {
		const lines = csvString.trim().split('\n')
		if (lines.length < 2) return []

		const firstLine = lines[0]
		if (!firstLine) return []

		const headers = firstLine.split(',').map((h) => h.trim())
		const entries: any[] = []

		for (let i = 1; i < lines.length; i++) {
			const line = lines[i]
			if (!line) continue

			const values = parseCsvLine(line)
			const entry: any = {}

			headers.forEach((header, index) => {
				entry[header] = values[index] ?? ''
			})

			entries.push(entry)
		}

		return formattedEntries(entries)
	} catch (error) {
		throw new Error(
			`Failed to parse CSV: ${error instanceof Error ? error.message : 'Unknown error'}`,
		)
	}
}

/**
 * Parse a CSV line, handling quoted values
 */
const parseCsvLine = (line: string): string[] => {
	const values: string[] = []
	let current = ''
	let inQuotes = false

	for (let i = 0; i < line.length; i++) {
		const char = line[i]
		const nextChar = line[i + 1]

		if (char === '"') {
			if (inQuotes && nextChar === '"') {
				// Escaped quote
				current += '"'
				i++ // Skip next quote
			} else {
				// Toggle quote state
				inQuotes = !inQuotes
			}
		} else if (char === ',' && !inQuotes) {
			// End of value
			values.push(current.trim())
			current = ''
		} else {
			current += char
		}
	}

	// Add last value
	values.push(current.trim())

	return values
}
