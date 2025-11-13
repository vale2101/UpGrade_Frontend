interface UserInfoProps {
  name: string;
  email: string;
}

export default function UserInfo({ name, email }: UserInfoProps) {
  return (
    <div className="px-4 py-3 border-b border-gray-100">
      <p className="text-sm font-medium text-gray-900">{name}</p>
      <p className="text-xs text-gray-500">{email}</p>
    </div>
  );
}


