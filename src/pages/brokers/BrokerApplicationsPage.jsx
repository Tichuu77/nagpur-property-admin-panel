import { useState } from 'react'
import { useBrokerApplications, useApproveBroker, useRejectBroker } from '@/features/brokers/hooks/useBrokers'
import { useDebounce } from '@/hooks/useDebounce'
import PageHeader from '@/components/shared/PageHeader'
import FilterBar from '@/components/shared/FilterBar'
import DataTable from '@/components/shared/DataTable'
import StatusBadge from '@/components/shared/StatusBadge'
import { Button } from '@/components/ui/button'
import { CheckCircle, XCircle } from 'lucide-react'
import { formatDate } from '@/utils/format'

const MOCK_APPLICATIONS = Array.from({ length: 12 }, (_, i) => ({
  id:          `app${i + 1}`,
  name:        `Applicant ${i + 1}`,
  email:       `applicant${i + 1}@example.com`,
  phone:       `+91 9800000${String(i).padStart(3, '0')}`,
  status:      'pending',
  appliedAt:   new Date(2024, 10, i + 1).toISOString(),
  experience:  `${i + 1} year${i > 0 ? 's' : ''}`,
}))

function BrokerApplicationsPage() {
  const [search, setSearch] = useState('')
  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useBrokerApplications({ search: debouncedSearch })
  const { mutate: approve, isPending: approving } = useApproveBroker()
  const { mutate: reject,  isPending: rejecting  } = useRejectBroker()

  const applications = data?.data ?? MOCK_APPLICATIONS

  const filtered = debouncedSearch
    ? applications.filter((a) =>
        a.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        a.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : applications

  const columns = [
    {
      key:    'name',
      header: 'Applicant',
      sortable: true,
      render: (val, row) => (
        <div>
          <p className="font-medium">{val}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: 'phone', header: 'Phone' },
    { key: 'experience', header: 'Experience' },
    {
      key:    'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key:    'appliedAt',
      header: 'Applied On',
      render: (val) => formatDate(val),
    },
    {
      key:    'actions',
      header: '',
      render: (_, row) =>
        row.status === 'pending' ? (
          <div className="flex items-center gap-2 justify-end">
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-emerald-600 border-emerald-300 hover:bg-emerald-50"
              disabled={approving}
              onClick={() => approve(row.id)}
            >
              <CheckCircle className="h-3.5 w-3.5" />
              Approve
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="h-7 gap-1 text-destructive border-red-300 hover:bg-red-50"
              disabled={rejecting}
              onClick={() => reject({ id: row.id })}
            >
              <XCircle className="h-3.5 w-3.5" />
              Reject
            </Button>
          </div>
        ) : (
          <StatusBadge status={row.status} />
        ),
    },
  ]

  return (
    <div className="p-6 space-y-5">
      <PageHeader
        title="Broker Applications"
        description="Review and manage incoming broker registration requests."
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search applications…"
      />

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        emptyTitle="No applications"
        emptyDescription="No pending broker applications at this time."
      />
    </div>
  )
}

export default BrokerApplicationsPage