"use client"

import { useState } from "react"
import { ResourceTable, type Column } from "@/components/resource-table"
import { StatusBadge } from "@/components/status-badge"
import { DetailDialog } from "@/components/detail-dialog"
import type { ApplicationRecord } from "@/lib/types"

function fullName(r: ApplicationRecord): string {
  const s = r.step1
  return [s?.firstName, s?.middleName, s?.lastName].filter(Boolean).join(" ") || "—"
}

const columns: Column<ApplicationRecord>[] = [
  {
    key: "applicant",
    header: "Applicant",
    render: (r) => (
      <div className="flex flex-col">
        <span className="font-medium">{fullName(r)}</span>
        <span className="text-xs text-muted-foreground">
          {r.step1?.studentEmail}
        </span>
      </div>
    ),
  },
  {
    key: "program",
    header: "Program",
    className: "hidden sm:table-cell",
    render: (r) => r.step1?.program || "—",
  },
  {
    key: "citizenship",
    header: "Citizenship",
    className: "hidden lg:table-cell",
    render: (r) => r.step1?.countryOfCitizenship || "—",
  },
  {
    key: "status",
    header: "Status",
    render: (r) => <StatusBadge status={r.status} />,
  },
]

export function ApplicationsView() {
  const [selected, setSelected] = useState<ApplicationRecord | null>(null)

  return (
    <>
      <ResourceTable<ApplicationRecord>
        resource="applications"
        columns={columns}
        getId={(r) => r._id}
        getStatus={(r) => r.status}
        getLabel={(r) => fullName(r) + "'s application"}
        getSearchText={(r) =>
          [
            fullName(r),
            r.step1?.studentEmail,
            r.step1?.program,
            r.step1?.passportNumber,
            r.step1?.countryOfCitizenship,
          ]
            .filter(Boolean)
            .join(" ")
        }
        onRowClick={setSelected}
        searchPlaceholder="Search applicants..."
      />

      {selected ? (
        <DetailDialog
          open={!!selected}
          onOpenChange={(o) => !o && setSelected(null)}
          title={fullName(selected)}
          subtitle={selected.step1?.program}
          status={selected.status}
          sections={[
            {
              heading: "Applicant",
              fields: [
                { label: "Program", value: selected.step1?.program },
                { label: "Student Email", value: selected.step1?.studentEmail },
                { label: "Parent Email", value: selected.step1?.parentEmail },
                { label: "Mobile", value: selected.step1?.mobilePhone },
                { label: "Gender", value: selected.step1?.gender },
                { label: "Age", value: selected.step1?.age },
                { label: "Date of Birth", value: selected.step1?.dateOfBirth },
                { label: "Passport No.", value: selected.step1?.passportNumber },
                {
                  label: "Citizenship",
                  value: selected.step1?.countryOfCitizenship,
                },
                { label: "Joining Date", value: selected.step1?.joiningDate },
              ],
            },
            {
              heading: "Emergency Contacts",
              fields:
                selected.emergencyContacts && selected.emergencyContacts.length > 0
                  ? selected.emergencyContacts.map((c, i) => ({
                      label: `Contact ${i + 1}`,
                      value: [c.fullName, c.relation, c.phoneNumber]
                        .filter(Boolean)
                        .join(" · "),
                    }))
                  : [{ label: "Contacts", value: undefined }],
            },
            {
              heading: "Agent & Statement",
              fields: [
                { label: "Agent Name", value: selected.agentInformation?.name },
                {
                  label: "Agent Contact",
                  value: selected.agentInformation?.contactInformation,
                },
                {
                  label: "Personal Statement",
                  value: selected.personalStatement,
                },
                {
                  label: "Submitted",
                  value: selected.createdAt
                    ? new Date(selected.createdAt).toLocaleString()
                    : undefined,
                },
              ],
            },
          ]}
        />
      ) : null}
    </>
  )
}
