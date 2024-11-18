import LogoutButton from '@/components/LogoutButton';

export default function ProtectedPage() {
  return (
    <div>
      <h1>Welcome to the protected page!</h1>
      <LogoutButton />
    </div>
  );
}
