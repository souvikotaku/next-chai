export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col justify-center min-h-screen py-2 items-center">
      <h1>Profile</h1>
      <hr />
      <div className="flex items-center">
        <p className="text-4xl">profile</p>
        <span className="text-4xl p-2 ml-2 rounded bg-orange-500 text-black">
          {params.id}
        </span>
      </div>
    </div>
  );
}
