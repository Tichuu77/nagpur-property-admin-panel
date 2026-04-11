export const queryKeys = {
  brokers: {
    all:    ['brokers'],
    list:   () => ['brokers', 'list'],
    detail: (id) => ['brokers', 'detail', id],
  },
  customers: {
    all:    ['customers'],
    list:   () => ['customers', 'list'],
    detail: (id) => ['customers', 'detail', id],
  },
  properties: {
    all:    ['properties'],
    list:   () => ['properties', 'list'],
    detail: (id) => ['properties', 'detail', id],
  },
  leads: {
    all:    ['leads'],
    list:   () => ['leads', 'list'],
    detail: (id) => ['leads', 'detail', id],
  },
  plans: {
    all:    ['plans'],
    list:   () => ['plans', 'list'],
    detail: (id) => ['plans', 'detail', id],
  },
  revenue: {
    all:          ['revenue'],
    list:         () => ['revenue', 'list'],
    transactions: () => ['revenue', 'transactions'],
  },
  analytics: {
    all:  ['analytics'],
    list: () => ['analytics', 'list'],
  },
  notifications: {
    all:  ['notifications'],
    list: () => ['notifications', 'list'],
  },
  subAdmins: {
    all:    ['subAdmins'],
    list:   () => ['subAdmins', 'list'],
    detail: (id) => ['subAdmins', 'detail', id],
  },
}