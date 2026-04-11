import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCustomers, useDeleteCustomer } from '@/features/customers/customers'
import { useDebounce } from '@/hooks/useDebounce'
import PageHeader from '@/components/shared/PageHeader'
import FilterBar from '@/components/shared/FilterBar'
import DataTable from '@/components/shared/DataTable'
import StatusBadge from '@/components/shared/StatusBadge'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { Button } from '@/components/ui/button'
import { Eye, Trash2 } from 'lucide-react'
import { formatDate } from '@/utils/format'
import { ROUTES } from '@/routes/route-paths'

const MOCK_CUSTOMERS = Array.from({ length: 30 }, (_, i) => ({
  id:       `c${i + 1}`,
  name:     `Customer ${i + 1}`,
  email:    `customer${i + 1}@example.com`,
  phone:    `+91 9700000${String(i).padStart(3, '0')}`,
  status:   i % 5 === 0 ? 'inactive' : 'active',
  joinedAt: new Date(2024, i % 12, (i % 28) + 1).toISOString(),
  leads:    Math.floor(Math.random() * 10),
}))

function CustomersPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)
  const debouncedSearch = useDebounce(search)

  const { data, isLoading } = useCustomers({ search: debouncedSearch })
  const { mutate: deleteCustomer, isPending: deleting } = useDeleteCustomer()

  const customers = data?.data ?? MOCK_CUSTOMERS
  const filtered = debouncedSearch
    ? customers.filter(
        (c) =>
          c.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          c.email.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : customers

  const columns = [
    {
      key:      'name',
      header:   'Customer',
      sortable: true,
      render:   (val, row) => (
        <div>
          <p className="font-medium">{val}</p>
          <p className="text-xs text-muted-foreground">{row.email}</p>
        </div>
      ),
    },
    { key: 'phone', header: 'Phone' },
    { key: 'status', header: 'Status', render: (val) => <StatusBadge status={val} /> },
    { key: 'leads', header: 'Leads', sortable: true },
    { key: 'joinedAt', header: 'Joined', render: (val) => formatDate(val) },
    {
      key:    'actions',
      header: '',
      render: (_, row) => (
        <div className="flex items-center gap-2 justify-end">
          <Button variant="ghost" size="icon" className="h-8 w-8"
            onClick={() => navigate(ROUTES.CUSTOMER_DETAIL.replace(':id', row.id))}>
            <Eye className="h-3.5 w-3.5" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive"
            onClick={() => setDeleteTarget(row)}>
            <Trash2 className="h-3.5 w-3.5" />
          </Button>
        </div>
      ),
    },
  ]

  return (
    <div className="p-6 space-y-5">
      <PageHeader title="Customers" description="All registered customers on the platform." />
      <FilterBar search={search} onSearchChange={setSearch} searchPlaceholder="Search customers…" />
      <DataTable columns={columns} data={filtered} isLoading={isLoading}
        emptyTitle="No customers found" pageSize={10} />

      <ConfirmDialog
        open={Boolean(deleteTarget)}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
        title={`Remove ${deleteTarget?.name}?`}
        description="This will permanently delete the customer record."
        confirmLabel={deleting ? 'Removing…' : 'Remove'}
        onConfirm={() => { deleteCustomer(deleteTarget.id); setDeleteTarget(null) }}
        variant="destructive"
      />
    </div>
  )
}

export default CustomersPage