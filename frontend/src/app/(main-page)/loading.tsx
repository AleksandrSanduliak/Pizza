import Loader from '@shared/ui/Loaders/Loader/Loader';

export default function Loading() {
  return (
    <div className="w-[100%] h-screen flex items-center justify-center">
      <Loader />
    </div>
  );
}
