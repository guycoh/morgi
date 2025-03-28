"use client"
import { useState, useEffect } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const FormSelector = ({ onSelect }: { onSelect: (selectedForms: string[]) => void }) => {
  const [forms, setForms] = useState<string[]>([]);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);

  useEffect(() => {
    // שליפת רשימת הקבצים מתיקיית public/pdfs
    const fetchForms = async () => {
      const response = await fetch("/api/forms");
      const data = await response.json();
      setForms(data);
    };
    fetchForms();
  }, []);

  const handleSelect = (form: string) => {
    setSelectedForms((prev) =>
      prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]
    );
  };

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">בחר טפסים לשליחה</h2>
      <div className="space-y-2">
        {forms.map((form) => (
          <div key={form} className="flex items-center space-x-2">
            <Checkbox
              checked={selectedForms.includes(form)}
              onCheckedChange={() => handleSelect(form)}
            />
            <span>{form}</span>
          </div>
        ))}
      </div>
      <Button className="mt-4" onClick={() => onSelect(selectedForms)}>
        המשך
      </Button>
    </div>
  );
};

export default FormSelector;
