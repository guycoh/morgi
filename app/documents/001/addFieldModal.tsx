

interface AddFieldModalProps {
  type: "name" | "email" | "id" | "signature";
  page: number;
  onAddField: (type: "name" | "email" | "id" | "signature", page: number) => void;
  onClose: () => void;
}

const AddFieldModal: React.FC<AddFieldModalProps> = ({ type, page, onAddField, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded shadow-lg">
        <h2 className="text-xl mb-4">Add Field</h2>
        <button onClick={() => onAddField(type, page)} className="bg-blue-500 text-white p-2 rounded">Add</button>
        <button onClick={onClose} className="bg-red-500 text-white p-2 rounded ml-2">Close</button>
      </div>
    </div>
  );
};

export default AddFieldModal;