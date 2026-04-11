import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useBrokers, useDeleteBroker } from '@/features/brokers/hooks/useBrokers'
import { useDebounce } from '@/hooks/useDebounce'
import PageHeader from '@/components/shared/PageHeader'
import FilterBar from '@/components/shared/FilterBar'
import DataTable from '@/components/shared/DataTable'
import StatusBadge from '@/components/shared/StatusBadge'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Eye, Trash2, UserPlus } from 'lucide-react'
import { formatDate } from '@/utils/format'
import { ROUTES } from '@/routes/route-paths'

// ── Mock data (replace with real API when backend is ready) ──────────────────
const MOCK_BROKERS = Array.from({ length: 24 }, (_, i) => ({
  id:        `b${i + 1}`,
  name:      `Broker ${i + 1}`,
  email:     `broker${i + 1}@example.com`,
  phone:     `+91 9${String(800000000 + i).slice(-9)}`,
  status:    ['active', 'pending', 'inactive'][i % 3],
  joinedAt:  new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  listings:  Math.floor(Math.random() * 40),
}))

function BrokersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useBrokers({ search: debouncedSearch })
  const { mutate: deleteBroker, isPending: deleting } = useDeleteBroker()

  // Fall back to mock data while API is not connected
  const brokers = data?.data ?? MOCK_BROKERS

  const filtered = debouncedSearch
    ? brokers.filter(
        (b) =>
          b.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          b.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : brokers

  const columns = [
    {
      key:      'name',
      header:   'Broker',
      sortable: true,
      render:   (val, row) => (
        <div>
          <p className="font-medium text-foreground">{val}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: 'phone', header: 'Phone' },
    {
      key:    'status',
      header: 'Status',
      render: (val) => <StatusBadge status={val} />,
    },
    {
      key:      'listings',
      header:   'Listings',
      sortable: true,
      render:   (val) => <span className="font-medium">{val}</span>,
    },
    {
      key:    'joinedAt',
      header: 'Joined',
      render: (val) => formatDate(val),
    },
    {
      key:    'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center gap-2 justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => navigate(ROUTES.BROKER_DETAIL.replace(':id', row.id))}
          >
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setDeleteTarget(row)}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-5">
      <PageHeader
        title="Brokers"
        description="Manage all registered brokers on the platform."
        action={
          <Button size="sm" className="gap-1.5">
            <UserPlus className="h-4 w-4" />
            Add Broker
          </Button>
        }
      />

      <FilterBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search brokers…"
      />

      <DataTable
        columns={columns}
        data={filtered}
        isLoading={isLoading}
        emptyTitle="No brokers found"
        emptyDescription="Try adjusting your search or add a new broker."
        pageSize={10}
      />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title={`Remove ${deleteTarget?.name}?`}
        description="This will permanently remove the broker and all associated data. This action cannot be undone."
        confirmLabel={deleting ? 'Removing…' : 'Remove'}
        onConfirm={() => {
          deleteBroker(deleteTarget.id)
          setDeleteTarget(null)
        }}
        variant="destructive"
      />
    </div>
  )
}

export default BrokersPage