import { Loader} from 'lucide-react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center ">
      <Loader className="w-6 h-6 animate-spin text-primary" />
    </div>
  )
}

export default Loading