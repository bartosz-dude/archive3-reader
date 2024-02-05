import { SQLValue } from "../../../types/database"

export default function updateSQLQuery<Data extends [ string, unknown ][]>(table: string, data: Data, where: [ string, SQLValue ][], dataPreprocessor?: (dataEntry: Data[ 0 ], index: number, arr: Data) => [ string, SQLValue ]) {

	if (data.length < 1)
		throw new Error(`updateSQLQuery data must not be empty`)

	let baseQuery = `UPDATE ${table} SET`

	const filtered = data.filter((v, i, a) => {
		if (![ "string", "number", "boolean", "null" ].find(type => typeof v[ 1 ] == type))
			return
		return v
	})

	console.log(filtered)

	filtered.forEach((v, i, a) => {
		let dataEntry = v

		if (dataPreprocessor) {
			dataEntry = dataPreprocessor(v, i, a as Data)
		}

		if (typeof dataEntry[ 1 ] == "string") {
			baseQuery += ` ${dataEntry[ 0 ]} = "${dataEntry[ 1 ]}"`
		} else {
			baseQuery += ` ${dataEntry[ 0 ]} = ${dataEntry[ 1 ]}`
		}

		baseQuery += (a.length - 1) == i ? "" : ","
	})

	baseQuery += ` WHERE`
	where.forEach((v, i, a) => {
		baseQuery += ` ${v[ 0 ]} = ${v[ 1 ]}`

		baseQuery += (a.length - 1) == i ? "" : " AND"
	})


	return baseQuery
}