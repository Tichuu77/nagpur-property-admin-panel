export default function AsyncWrapper({ isLoading, error, fallback = null, children }) {
  if (isLoading) return fallback ?? <div>Loading...</div>;
  if (error) return <div>{error?.message ?? 'Something went wrong'}</div>;
  return children;
}
