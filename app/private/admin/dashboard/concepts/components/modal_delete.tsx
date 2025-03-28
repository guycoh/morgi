

interface ModalProps {
  isOpen: boolean;
  title: string;
  content: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function Modal_delete({ isOpen, title, content, onConfirm, onCancel }: ModalProps) {
  if (!isOpen) return null; // אם המודל סגור, לא מציגים כלום

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md text-center">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-6">{content}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            מחק
          </button>
          <button
            onClick={onCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            ביטול
          </button>
        </div>
      </div>
    </div>
  );
}
