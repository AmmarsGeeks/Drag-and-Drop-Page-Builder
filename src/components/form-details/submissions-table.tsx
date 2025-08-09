import type { Form, FormSubmission } from "@prisma/client"
import { format, formatDistance } from "date-fns"

import type {
  Field,
  FormElementInstance,
  UserFormSubmission,
} from "@/types/form-builder"
import { inputFields } from "@/types/form-builder"

import { Badge } from "../ui/badge"
import { Checkbox } from "../ui/checkbox"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import { RowActions } from "./row-actions"

type SubmissionsTableProps = Readonly<{
  form: Form & { formSubmissions: FormSubmission[] }
}>

type Column = {
  id: string
  label: string
  required: boolean
  type: Field
}

export const SubmissionsTable = ({ form }: SubmissionsTableProps) => {
  const formElements = form.content as FormElementInstance[]

  const columns: Column[] = []

  for (const element of formElements)
    if (inputFields.some((field) => field === element.type))
      columns.push({
        id: element.id,
        label: element.extraAttributes?.label,
        required: element.extraAttributes?.required,
        type: element.type,
      })

  const rows: UserFormSubmission[] = form.formSubmissions.map((submission) => ({
    ...submission,
    content: submission.content as Record<string, any>,
  }))

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.id}>{column.label}</TableHead>
            ))}
            <TableHead className="text-right">Submitted</TableHead>
            <TableHead className="w-[90px] text-right text-muted-foreground">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              {columns.map((column) => (
                <RowCell
                  key={column.id}
                  type={column.type}
                  value={row.content[column.id]}
                />
              ))}
              <TableCell className="text-right text-muted-foreground">
                {formatDistance(row.createdAt, new Date(), {
                  addSuffix: true,
                })}
              </TableCell>
              <TableCell className="flex justify-end">
                <RowActions submission={row} elements={formElements} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

type RowCellProps = Readonly<{ type: Field; value?: string }>

const RowCell = ({ type, value }: RowCellProps) => {
  let node: React.ReactNode = value

  switch (type) {
    case "date": {
      if (!value) break
      const date = new Date(value).toLocaleDateString()
      node = <Badge variant="outline">{format(date, "dd/MM/yyyyy")}</Badge>
      break
    }
    case "checkbox":
      node = <Checkbox checked={value === "true"} disabled />
      break
  }

  return <TableCell>{node}</TableCell>
}
